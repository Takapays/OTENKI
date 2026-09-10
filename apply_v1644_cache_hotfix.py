#!/usr/bin/env python3
"""Apply the Traten V1.6.44 nationwide-cache hotfix transactionally.

Supported source versions: V1.6.42 and V1.6.43.
The script edits only known cache/version fragments and aborts before writing if
any expected vulnerable fragment is missing or changed.
"""
from __future__ import annotations

import argparse
import datetime as dt
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

TARGET = "1.6.44"
SUPPORTED = {"1.6.42", "1.6.43"}


def one(text: str, old: str, new: str, label: str) -> str:
    count = text.count(old)
    if count != 1:
        raise RuntimeError(f"{label}: expected exactly one vulnerable fragment, found {count}")
    return text.replace(old, new, 1)


def patch_server(text: str, current: str) -> str:
    text = one(text, f'APP_VERSION = "{current}"', f'APP_VERSION = "{TARGET}"', "server version")

    old = 'NATIONAL_SUPABASE_VERIFY_DELAY = max(0.1, min(3.0, float(os.environ.get("NATIONAL_SUPABASE_VERIFY_DELAY", "0.6"))))\n'
    new = old + (
        '# V1.6.44: keep a scheduled refresh comfortably below the external 300-second HTTP ceiling.\n'
        '# The foreground/user path is intentionally unbounded so a user-triggered national analysis can still finish all due rows.\n'
        'NATIONAL_SCHEDULED_REFRESH_BUDGET = max(90, min(240, int(os.environ.get("NATIONAL_SCHEDULED_REFRESH_BUDGET", "210"))))\n'
        'NATIONAL_SCHEDULED_REFRESH_BATCH_GUARD = max(15, min(90, int(os.environ.get("NATIONAL_SCHEDULED_REFRESH_BATCH_GUARD", "60"))))\n'
    )
    text = one(text, old, new, "scheduled budget constants")

    text = one(
        text,
        'def _national_fetch_and_persist(date_text, points, due, initial=None):\n    """Fetch at most CHUNK_SIZE, checkpoint immediately and verify database writes."""',
        'def _national_fetch_and_persist(date_text, points, due, initial=None, *, deadline=None, allow_scheduled_remaining=False):\n'
        '    """Fetch due rows in checkpointed chunks and verify persistent writes.\n\n'
        '    Foreground calls keep the historical all-due behavior. Scheduled/background callers may pass\n'
        '    a deadline; then the function stops only at a chunk boundary and leaves the remaining rows for\n'
        '    the next scheduled cycle instead of turning expected unfinished work into an HTTP failure.\n'
        '    """',
        "fetch signature",
    )
    text = one(
        text,
        '    fetched_names = set(); persisted_names = set(); errors = []; chunks = []; limited = False\n    persistent = _national_supabase_enabled()\n',
        '    fetched_names = set(); persisted_names = set(); verification_pending = set(); errors = []; warnings = []; chunks = []; limited = False\n'
        '    persistent = _national_supabase_enabled(); attempted = 0; deferred_by_budget = 0\n',
        "fetch bookkeeping",
    )
    text = one(
        text,
        '        if _national_refresh_stop.is_set():\n            errors.append("refresh interrupted"); break\n        batch = due[start:start+NATIONAL_OUTLOOK_CHUNK_SIZE]\n',
        '        if _national_refresh_stop.is_set():\n            errors.append("refresh interrupted"); break\n'
        '        # V1.6.44: do not begin another expensive chunk when the scheduler deadline is close.\n'
        '        # Always allow the first chunk so every run makes progress.\n'
        '        if deadline is not None and start > 0 and time.monotonic() + NATIONAL_SCHEDULED_REFRESH_BATCH_GUARD >= deadline:\n'
        '            deferred_by_budget = len(due) - start\n'
        '            warnings.append(f"scheduled refresh budget reached; {deferred_by_budget} rows deferred")\n'
        '            break\n'
        '        batch = due[start:start+NATIONAL_OUTLOOK_CHUNK_SIZE]\n'
        '        attempted += len(batch)\n',
        "fetch deadline guard",
    )
    text = one(
        text,
        '                    if wrote:\n'
        '                        confirmed, verify_attempts, verify_error = _national_confirm_supabase_write(date_text,batch,valid)\n'
        '                        persisted_names.update(confirmed); cr["persisted"] = len(confirmed)\n'
        '                        cr["verifyAttempts"] = verify_attempts\n'
        '                        if verify_error:\n'
        '                            cr["error"] = "database read-back incomplete"\n'
        '                            cr["verifyDetail"] = verify_error\n'
        '                    else:\n'
        '                        cr["error"] = "database write failed"\n',
        '                    if wrote:\n'
        '                        if allow_scheduled_remaining:\n'
        '                            # Scheduled refreshes do not pay for a read-after-write round trip per chunk.\n'
        '                            # A single authoritative read below verifies all acknowledged chunks at once.\n'
        '                            cr["writeAcknowledged"] = len(valid)\n'
        '                        else:\n'
        '                            confirmed, verify_attempts, verify_error = _national_confirm_supabase_write(date_text,batch,valid)\n'
        '                            persisted_names.update(confirmed); cr["persisted"] = len(confirmed)\n'
        '                            cr["verifyAttempts"] = verify_attempts\n'
        '                            if verify_error:\n'
        '                                # A 2xx upsert was acknowledged. A transient read-after-write lag must not\n'
        '                                # fail the foreground request; unconfirmed rows remain due and are rechecked.\n'
        '                                pending = set(valid) - set(confirmed)\n'
        '                                verification_pending.update(pending)\n'
        '                                cr["verificationPending"] = len(pending)\n'
        '                                cr["verifyDetail"] = verify_error\n'
        '                                cr["warning"] = "database write acknowledged; read-back verification pending"\n'
        '                                warnings.append("database read-back incomplete; next refresh will verify/retry")\n'
        '                    else:\n'
        '                        cr["error"] = "database write failed"\n',
        "read-back verification handling",
    )
    text = one(
        text,
        '        fresh_count = len(fresh); stored = len(set(fresh)|set(stale))\n    else:\n',
        '        fresh_names = set(fresh)\n'
        '        persisted_names.update(fresh_names & fetched_names)\n'
        '        unconfirmed = fetched_names - fresh_names\n'
        '        if unconfirmed and not errors:\n'
        '            verification_pending.update(unconfirmed)\n'
        '            warnings.append(f"database final read-back pending for {len(unconfirmed)} rows; next refresh will verify/retry")\n'
        '        fresh_count = len(fresh); stored = len(set(fresh)|set(stale))\n    else:\n',
        "final aggregate verification",
    )

    text = one(
        text,
        '    report = {"ok":not errors and remaining==0,"requested":len(due),"pointsFetched":len(fetched_names),\n'
        '        "pointsUpdated":len(persisted_names) if persistent else fresh_count,\n'
        '        "persistedCount":len(persisted_names),"freshAfter":fresh_count,"missingAfter":max(0,len(points)-stored),\n'
        '        "remainingDueAfter":remaining,"chunkSize":NATIONAL_OUTLOOK_CHUNK_SIZE,"chunks":chunks,\n'
        '        "errors":list(dict.fromkeys(errors)),"rateLimited":limited,"backend":"supabase+local" if persistent else "local-only"}\n'
        '    if remaining and not report["errors"]:\n'
        '        report["errors"].append(f"fresh cache incomplete: {fresh_count}/{len(points)}")\n',
        '    report = {"ok":not errors and remaining==0,"requested":len(due),"attempted":attempted,\n'
        '        "pointsFetched":len(fetched_names),"pointsUpdated":len(persisted_names) if persistent else fresh_count,\n'
        '        "persistedCount":len(persisted_names),"verificationPendingCount":len(verification_pending),\n'
        '        "freshAfter":fresh_count,"missingAfter":max(0,len(points)-stored),\n'
        '        "remainingDueAfter":remaining,"deferredByBudget":deferred_by_budget,\n'
        '        "chunkSize":NATIONAL_OUTLOOK_CHUNK_SIZE,"chunks":chunks,\n'
        '        "warnings":list(dict.fromkeys(warnings)),"errors":list(dict.fromkeys(errors)),"rateLimited":limited,\n'
        '        "backend":"supabase+local" if persistent else "local-only"}\n'
        '    if remaining and not report["errors"]:\n'
        '        if allow_scheduled_remaining:\n'
        '            report["warnings"].append(f"scheduled refresh incomplete: {fresh_count}/{len(points)}; next run will resume")\n'
        '        else:\n'
        '            report["errors"].append(f"fresh cache incomplete: {fresh_count}/{len(points)}")\n',
        "fetch final report",
    )

    text = one(text, 'def _refresh_rolling_100_cache(*, force=False, max_dates=None):',
               'def _refresh_rolling_100_cache(*, force=False, max_dates=None, deadline=None):', "rolling signature")
    text = one(
        text,
        '    # Fill missing dates first; within equal deficit, earliest forecast day first.\n    due_dates.sort(key=lambda x:(-len(x[1]),x[0]))\n',
        '    # V1.6.44: finish a date already in progress before starting another one.\n'
        '    # This prevents a bounded scheduler from spreading partial rows across all seven dates.\n'
        '    due_dates.sort(key=lambda x:(0 if 0 < int(x[2].get("freshBefore") or 0) < len(points) else 1,x[0]))\n',
        "rolling date priority",
    )
    text = one(text, '            _,done = _national_fetch_and_persist(d,points,due,initial)',
               '            _,done = _national_fetch_and_persist(d,points,due,initial,deadline=deadline,allow_scheduled_remaining=True)', "rolling bounded fetch")
    text = one(
        text,
        '            if not done["ok"]:\n                report["errors"].append({"date":d,"error":done["errors"]})\n',
        '            if not done["ok"] and done["errors"]:\n'
        '                report["errors"].append({"date":d,"error":done["errors"]})\n'
        '            elif not done["ok"]:\n'
        '                status["scheduledRemaining"] = True\n',
        "rolling expected remainder",
    )
    text = one(
        text,
        '    report["windowComplete"] = report["remainingDueAfter"]==0\n    report["ok"] = not report["errors"]\n',
        '    report["windowComplete"] = report["remainingDueAfter"]==0\n    report["ok"] = bool(report["windowComplete"] and not report["errors"])\n',
        "rolling complete semantics",
    )

    text = one(text, 'def _refresh_national_local_cache():', 'def _refresh_national_local_cache(*, deadline=None):', "local refresh signature")
    text = one(
        text,
        '                _,done = _national_fetch_and_persist(d,ps,[p for p in ps if p["name"] not in fresh],snap)',
        '                _,done = _national_fetch_and_persist(d,ps,[p for p in ps if p["name"] not in fresh],snap,deadline=deadline,allow_scheduled_remaining=True)',
        "local bounded fetch",
    )

    text = one(
        text,
        '    started = time.time()\n    try:\n        rolling = _refresh_rolling_100_cache(force=force) if NATIONAL_100_ROLLING_AUTO_CACHE else',
        '    started = time.time()\n'
        '    deadline = time.monotonic() + NATIONAL_SCHEDULED_REFRESH_BUDGET\n'
        '    try:\n'
        '        rolling = _refresh_rolling_100_cache(force=force,deadline=deadline) if NATIONAL_100_ROLLING_AUTO_CACHE else',
        "persistent cycle deadline",
    )
    text = one(
        text,
        '        for d,ps in sorted(groups.items()):\n            ps = [p for p in ps if d not in dates or p["name"] not in seeds]\n',
        '        for d,ps in sorted(groups.items()):\n'
        '            if time.monotonic() + NATIONAL_SCHEDULED_REFRESH_BATCH_GUARD >= deadline:\n'
        '                report["maintenanceDeferred"] = True\n'
        '                break\n'
        '            ps = [p for p in ps if d not in dates or p["name"] not in seeds]\n',
        "on-demand maintenance deadline",
    )
    text = one(text, '                _,done = _national_fetch_and_persist(d,ps,due,initial)',
               '                _,done = _national_fetch_and_persist(d,ps,due,initial,deadline=deadline,allow_scheduled_remaining=True)', "maintenance bounded fetch")
    text = one(
        text,
        '                report["onDemandReports"].append(dict(done,date=d));report["pointsUpdated"]+=done["pointsUpdated"]\n'
        '                report["pointsDue"]+=len(due);report["datesProcessed"]+=1\n'
        '                if not done["ok"]:\n'
        '                    report["errors"].append({"date":d,"error":done["errors"]})\n',
        '                report["onDemandReports"].append(dict(done,date=d));report["pointsUpdated"]+=done["pointsUpdated"]\n'
        '                report["pointsDue"]+=len(due);report["datesProcessed"]+=1\n'
        '                if not done["ok"] and done["errors"]:\n'
        '                    report["errors"].append({"date":d,"error":done["errors"]})\n'
        '                elif not done["ok"]:\n'
        '                    report["maintenanceDeferred"] = True\n',
        "maintenance expected remainder",
    )
    text = one(
        text,
        '        report["instagram"] = _instagram_maybe_post_after_refresh()\n        report["ok"] = not report["errors"]\n',
        '        report["instagram"] = _instagram_maybe_post_after_refresh()\n'
        '        rolling_complete = bool(rolling.get("windowComplete", True))\n'
        '        on_demand_complete = all(int(x.get("remainingDueAfter") or 0) == 0 for x in report["onDemandReports"])\n'
        '        report["ok"] = bool(not report["errors"] and rolling_complete and on_demand_complete and not report.get("maintenanceDeferred"))\n',
        "persistent completion semantics",
    )
    text = one(text, '        report["elapsedSeconds"] = round(time.time()-started,2)',
               '        report["scheduledBudgetSeconds"] = NATIONAL_SCHEDULED_REFRESH_BUDGET\n        report["elapsedSeconds"] = round(time.time()-started,2)', "budget report")

    text = one(
        text,
        '        fatal_tokens = ("database write failed","database read-back incomplete","supabase national cache is not configured",\n'
        '                        "seed count/configuration mismatch","token is not configured","unauthorized")\n'
        '        fatal = any(t in m for m in messages for t in fatal_tokens)\n'
        '        transient_tokens = ("429","rate limit","forecast acquisition incomplete","fresh cache incomplete","timeout","timed out")\n'
        '        transient = rate_limited or any(t in m for m in messages for t in transient_tokens)\n'
        '        return bool(transient and not fatal)\n',
        '        fatal_tokens = ("database write failed","persistent cache read failed","supabase national cache is not configured",\n'
        '                        "seed count/configuration mismatch","token is not configured","unauthorized")\n'
        '        fatal = any(t in m for m in messages for t in fatal_tokens)\n'
        '        transient_tokens = ("429","rate limit","forecast acquisition incomplete","fresh cache incomplete","database read-back incomplete","timeout","timed out")\n'
        '        transient = rate_limited or any(t in m for m in messages for t in transient_tokens)\n'
        '        on_demand_remaining = any(int(x.get("remainingDueAfter") or 0) > 0 for x in (r.get("onDemandReports") or []))\n'
        '        scheduled_remaining = rolling.get("state") == "scheduled-remaining" or bool(r.get("maintenanceDeferred")) or on_demand_remaining\n'
        '        return bool((transient or scheduled_remaining) and not fatal)\n',
        "scheduler recoverability",
    )
    return text


def patch_app(text: str, current: str) -> str:
    text = one(text, f"const APP_VERSION = '{current}';", f"const APP_VERSION = '{TARGET}';", "app version")
    text = one(
        text,
        "const NATIONAL_OUTLOOK_BROWSER_CACHE_TTL=4*60*60*1000;\nconst NATIONAL_OUTLOOK_CACHE_ENGINE='metno-gfs-mb-v10-daily-light-rain';",
        "const NATIONAL_OUTLOOK_BROWSER_CACHE_TTL=4*60*60*1000;\nconst NATIONAL_OUTLOOK_BROWSER_STALE_BRIDGE_TTL=5*60*1000;\nconst NATIONAL_OUTLOOK_CACHE_ENGINE='metno-gfs-mb-v10-daily-light-rain';",
        "browser bridge constant",
    )
    text = one(
        text,
        '''function writeNationalOutlookBrowserCache(date,results,cache,engine){\n  try{\n    const expiresAt=Math.min(Date.parse(cache?.freshUntil||''),Date.now()+NATIONAL_OUTLOOK_BROWSER_CACHE_TTL);\n    if(engine!==NATIONAL_OUTLOOK_CACHE_ENGINE||!Number.isFinite(expiresAt)||expiresAt<=Date.now()){\n      localStorage.removeItem(NATIONAL_OUTLOOK_BROWSER_CACHE_KEY);return;\n    }\n    localStorage.setItem(NATIONAL_OUTLOOK_BROWSER_CACHE_KEY,JSON.stringify({date,engine,expiresAt,generatedAt:cache.generatedAt,results}));\n  }catch(_){}\n}\n''',
        '''function writeNationalOutlookBrowserCache(date,results,cache,engine){\n  try{\n    if(engine!==NATIONAL_OUTLOOK_CACHE_ENGINE||!Array.isArray(results)||!results.length){\n      localStorage.removeItem(NATIONAL_OUTLOOK_BROWSER_CACHE_KEY);return;\n    }\n    const now=Date.now();\n    const serverFreshUntil=Date.parse(cache?.freshUntil||'');\n    // The server aggregate uses the oldest row. One stale mountain must not erase an otherwise\n    // useful 300-mountain browser snapshot while the background refresh is catching up.\n    const expiresAt=Number.isFinite(serverFreshUntil)&&serverFreshUntil>now\n      ? Math.min(serverFreshUntil,now+NATIONAL_OUTLOOK_BROWSER_CACHE_TTL)\n      : now+NATIONAL_OUTLOOK_BROWSER_STALE_BRIDGE_TTL;\n    localStorage.setItem(NATIONAL_OUTLOOK_BROWSER_CACHE_KEY,JSON.stringify({date,engine,expiresAt,generatedAt:cache?.generatedAt,results}));\n  }catch(_){}\n}\n''',
        "browser cache writer",
    )
    return text


def detect_version(server: str, app: str) -> str:
    sm = re.search(r'^APP_VERSION = "([^"]+)"', server, re.M)
    am = re.search(r"^const APP_VERSION = '([^']+)';", app, re.M)
    if not sm or not am or sm.group(1) != am.group(1):
        raise RuntimeError("server.py and app.js version markers are missing or inconsistent")
    current = sm.group(1)
    if current not in SUPPORTED:
        raise RuntimeError(f"unsupported source version {current}; expected one of {sorted(SUPPORTED)}")
    return current


def validate_transformed(files: dict[str, str], work: Path) -> None:
    for name, text in files.items():
        (work/name).write_text(text, encoding='utf-8')
    subprocess.run([sys.executable, '-m', 'py_compile', str(work/'server.py')], check=True)
    if shutil.which('node'):
        subprocess.run(['node', '--check', str(work/'app.js')], check=True)
    server = files['server.py']; app = files['app.js']
    required = [
        'NATIONAL_PREFETCH_COUNT = int(os.environ.get("NATIONAL_PREFETCH_COUNT", "300"))',
        'max_workers=1,thread_name_prefix="traten-national-mb"',
        'NATIONAL_SCHEDULED_REFRESH_BUDGET',
        'database write acknowledged; read-back verification pending',
    ]
    for marker in required:
        if marker not in server:
            raise RuntimeError(f"post-patch server guard missing: {marker}")
    for marker in [
        "const NATIONAL_OUTLOOK_CACHE_ENGINE='metno-gfs-mb-v10-daily-light-rain';",
        'NATIONAL_OUTLOOK_BROWSER_STALE_BRIDGE_TTL=5*60*1000',
    ]:
        if marker not in app:
            raise RuntimeError(f"post-patch app guard missing: {marker}")


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('root', nargs='?', default='.', help='Traten repository/folder containing server.py and app.js')
    ap.add_argument('--check-only', action='store_true', help='validate applicability without writing files')
    args = ap.parse_args()
    root = Path(args.root).resolve()
    names = ['server.py', 'app.js', 'index.html', 'data-audit.html']
    missing = [n for n in names if not (root/n).is_file()]
    if missing:
        raise RuntimeError('missing files: '+', '.join(missing))
    original = {n:(root/n).read_text(encoding='utf-8') for n in names}
    current = detect_version(original['server.py'], original['app.js'])

    transformed = dict(original)
    transformed['server.py'] = patch_server(original['server.py'], current)
    transformed['app.js'] = patch_app(original['app.js'], current)
    for n in ['index.html','data-audit.html']:
        if current not in original[n]:
            raise RuntimeError(f'{n}: source-version marker {current} not found; refusing mixed-version patch')
        transformed[n] = original[n].replace(current, TARGET)

    with tempfile.TemporaryDirectory(prefix='traten-v1644-preflight-') as td:
        validate_transformed(transformed, Path(td))

    if args.check_only:
        print(f'V1.6.44 hotfix applicable to V{current}: PASS (no files changed)')
        return 0

    stamp = dt.datetime.now().strftime('%Y%m%d-%H%M%S')
    backup = root/f'_v1644_backup_{stamp}'
    backup.mkdir()
    for n in names:
        shutil.copy2(root/n, backup/n)
    for n,text in transformed.items():
        (root/n).write_text(text, encoding='utf-8')
    print(f'Applied Traten V{TARGET} cache hotfix to V{current}.')
    print(f'Backup: {backup}')
    print('Preflight: Python compile PASS; Node syntax PASS if Node was available.')
    return 0


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except Exception as exc:
        print(f'ERROR: {exc}', file=sys.stderr)
        raise SystemExit(2)
