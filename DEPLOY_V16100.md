# Deploy V1.6.100

1. Apply the V1.6.100 files to the GitHub repository used by Render / Cloud Run.
2. Deploy normally.
3. Confirm `/api/health` reports `version: 1.6.100`.
4. Confirm health exposes:
   - `national_optimistic_verify_a_seconds: 3600`
   - `national_optimistic_verify_b_seconds: 7200`
5. Open the nationwide map on a date with at least one A or B. The saved map should paint immediately, then old A/B rows should be silently revalidated.
6. Tap a previously problematic mountain. If its live grade changes, the map marker should change to the same grade and the shared cache should be updated.
7. Press `最新情報取り込み` and confirm the request performs a full displayed-set refresh rather than returning the existing four-hour cache unchanged.
8. Confirm cache-age / average / oldest / TTL display remains visible.
