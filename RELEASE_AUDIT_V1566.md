# RELEASE AUDIT V1.5.66

## Scope
Instagram nationwide-analysis bot only. Existing weather grade logic, national cache fetch/repair logic, route logic, CT data and frontend analysis behavior are unchanged.

## Changed files
- `server.py`
- `instagram_bot.py` (new)
- `requirements.txt`
- `render.yaml`
- `index.html`
- `README.md`
- `INSTAGRAM_BOT_V1566.md` (new)

## Checks performed
- Python syntax compile: PASS (`server.py`, `instagram_bot.py`)
- Instagram JPEG generation: PASS (1080 x 1350, progressive JPEG)
- 100-result completeness guard: PASS (99 results rejected)
- Scheduled gate: PASS (before 17:00 JST skipped; at/after 17:00 eligible when enabled)
- Signed public image URL HMAC validation: PASS
- Auto-post default: OFF
- Credentials embedded in source: NONE
- Live Meta publish: NOT RUN (no user Meta credentials were provided)
- Full Flask import/runtime route test: NOT RUN in this sandbox because Flask is not installed and outbound package installation is unavailable. Static syntax compile passed.

## Operational guardrails
- Post only tomorrow's forecast.
- Require fresh 100/100 rows.
- One post per forecast date; local state plus Instagram caption marker check.
- Instagram failures are isolated from national cache refresh result.
