#!/usr/bin/env python3
"""One-shot Cloud Run Job for the shared nationwide cache (no HTTP server)."""
from __future__ import annotations

import argparse
import json
import os
import time
from datetime import date, datetime, timedelta, timezone


def log(event, **fields):
    print(json.dumps({"event": event, **fields}, ensure_ascii=False, default=str), flush=True)


def ttl_seconds(target, today):
    offset = (date.fromisoformat(target) - today).days
    return (6 if offset <= 1 else 8 if offset <= 3 else 12) * 3600


def coverage(api, target, points):
    fresh, stale, meta = api._national_supabase_read_meta(target, points)
    if api._national_supabase_fallback_active():
        raise RuntimeError("Supabase unavailable; refusing local-only job")
    all_names = {p["name"] for p in points}
    return {"date": target, "fresh": fresh, "stale": stale,
            "missing": all_names - fresh - stale, "meta": meta}


def public_status(status):
    return {"date": status["date"], **{k: len(status[k]) for k in ("fresh", "stale", "missing")}}


def date_priority(status):
    # Finish an incomplete date before another empty date, and always fill missing
    # rows before refreshing merely stale rows. Among stale dates prefer the oldest.
    missing = len(status["missing"])
    if missing:
        return (0, 0 if status["fresh"] or status["stale"] else 1, status["date"])
    oldest = min((status["meta"][n]["fresh_until"] for n in status["stale"]), default=float("inf"))
    return (1, oldest, status["date"])


def run(api, *, budget=420, chunk_size=10, status_only=False, today=None):
    started = time.monotonic()
    deadline = started + budget
    today = today or datetime.now(timezone(timedelta(hours=9))).date()
    dates = [(today + timedelta(days=i)).isoformat() for i in range(1, 8)]
    if not api._national_supabase_enabled():
        raise RuntimeError("Supabase not configured")
    points = api._national_load_prefetch_points()
    if len(points) != 100 or len({p["name"] for p in points}) != 100:
        raise RuntimeError(f"Expected 100 distinct mountains, got {len(points)}")
    points = sorted(points, key=lambda p: (float(p["lat"]), float(p["lon"]), p["name"]))
    initial = [coverage(api, d, points) for d in dates]
    log("cache-before", dates=[public_status(s) for s in initial], budgetSeconds=budget, chunkSize=chunk_size)
    if status_only:
        return 0
    expected = sum(len(s["missing"] | s["stale"]) for s in initial)
    written = 0
    expected_writes = {}
    errors = []
    old_ttl = api.NATIONAL_OUTLOOK_CACHE_TTL
    stop = False
    try:
        for status in sorted(initial, key=date_priority):
            target = status["date"]
            # Missing points first; each group is south-to-north.
            for names in (status["missing"], status["stale"]):
                due = [p for p in points if p["name"] in names]
                for start in range(0, len(due), chunk_size):
                    if time.monotonic() + 45 >= deadline:
                        stop = True
                        break
                    batch = due[start:start + chunk_size]
                    # Skip newly completed rows and read old payloads only for the
                    # stale selected keys; preserve the existing WeatherAPI overlay.
                    fresh, stale, _ = api._national_supabase_read_meta(target, batch, restrict_keys=True)
                    batch = [p for p in batch if p["name"] not in fresh]
                    if not batch:
                        continue
                    previous = {}
                    stale_batch = [p for p in batch if p["name"] in stale]
                    if stale_batch:
                        old_fresh, old_stale, _ = api._national_supabase_read(target, stale_batch, restrict_keys=True)
                        previous = {**old_fresh, **old_stale}
                    api.NATIONAL_OUTLOOK_CACHE_TTL = ttl_seconds(target, today)
                    at = time.time()
                    log("chunk-start", date=target, count=len(batch), south=batch[0]["name"], north=batch[-1]["name"], ttlSeconds=api.NATIONAL_OUTLOOK_CACHE_TTL)
                    received, complete, limited, warning = api._national_fetch_shared(target, batch, force_fetch=True, deadline=deadline)
                    valid = api._national_valid_results(batch, received, fetched_at=at)
                    for name, row in list(valid.items()):
                        valid[name] = api._weatherapi_guard_carry_forward(row, previous.get(name), target)
                    if valid:
                        if not api._national_supabase_write(target, batch, list(valid.values())):
                            raise RuntimeError("Supabase write failed; refusing local-only job")
                        written += len(valid)
                        for name, row in valid.items():
                            expected_writes[(target, name)] = row["_cache_meta"]["generated_ts"]
                    log("chunk-finish", date=target, requested=len(batch), acknowledged=len(valid), complete=complete, warning=warning, elapsedSeconds=round(time.monotonic()-started, 1))
                    if not complete or len(valid) != len(batch):
                        errors.append({"date": target, "requested": len(batch), "received": len(valid), "warning": warning})
                    if limited:
                        stop = True
                        break
                if stop:
                    break
            if stop:
                break
    finally:
        api.NATIONAL_OUTLOOK_CACHE_TTL = old_ttl
    final = [coverage(api, d, points) for d in dates]
    totals = {k: sum(len(s[k]) for s in final) for k in ("fresh", "stale", "missing")}
    confirmed = sum(1 for s in final for name in s["fresh"]
                    if (s["date"], name) in expected_writes
                    and s["meta"][name]["generated_ts"] >= expected_writes[(s["date"], name)])
    if confirmed != len(expected_writes):
        errors.append({"writeVerification": f"{confirmed}/{len(expected_writes)} confirmed"})
    log("cache-after", dates=[public_status(s) for s in final], **totals, acknowledged=written, confirmed=confirmed,
        elapsedSeconds=round(time.monotonic()-started, 1), budgetDeferred=stop, errors=errors,
        complete=totals["fresh"] == 700)
    return int(bool(errors) or (expected > 0 and written == 0 and totals["fresh"] < 700))


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--status-only", action="store_true")
    parser.add_argument("--budget", type=int, default=420)
    args = parser.parse_args()
    if not 90 <= args.budget <= 480:
        parser.error("budget must be 90..480 seconds")
    # Prevent the imported web module from launching an unrelated refresh worker.
    os.environ["NATIONAL_OUTLOOK_AUTO_REFRESH"] = "0"
    os.environ["INSTAGRAM_AUTO_POST"] = "0"
    import server
    return run(server, budget=args.budget, status_only=args.status_only)


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as exc:
        # Do not print credentials or arbitrary request URLs.
        log("job-failed", errorType=type(exc).__name__)
        raise SystemExit(1)
