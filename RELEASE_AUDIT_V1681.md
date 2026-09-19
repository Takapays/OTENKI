# V1.6.81 Release Audit

- Base: V1.6.79
- V1.6.80 regression changes were not used as the base.
- Python syntax: PASS (existing invalid escape SyntaxWarning remains)
- JavaScript syntax: PASS
- ZIP layout: repository-root flat files only
- National cache engine bumped to v18-server-reconcile
- Browser cache key bumped to v1681-server-reconcile
- Ridge validation intentionally minimal: >=6 finite hours and max ridgeWind > 0.5 m/s
- No ABCDE threshold changes
