# V1.6.27 Release Audit — 3-model PoC parser fix

Scope is PoC-only plus version/cache stamps. Production national/detail judgement logic is unchanged from V1.6.26.

Cause: `Intl.DateTimeFormat(...).format()` output was compared directly with YYYY-MM-DD. Browser formatting differences caused MET Norway and meteoblue rows to be discarded while NOAA GFS, fetched by explicit date/hour, remained populated. The PoC grade helper then returned A for empty rows.

Fix: JST year/month/day/hour are constructed from `formatToParts`; offset-less meteoblue timestamps are explicitly interpreted as JST; no-data grade is `?`; actual 6-15 row counts are displayed.
