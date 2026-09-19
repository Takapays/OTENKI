# Release audit V1.6.77

- Base: V1.6.76
- Python syntax: checked with py_compile (existing invalid escape SyntaxWarning remains)
- JavaScript syntax: checked with node --check
- Version: server.py/app.js/index.html synchronized to 1.6.77
- Intended scope: nationwide safety-floor trace/cache coherence + pressure-level UI removal only
- Pressure-level source fields remain in fetch/calculation paths; only the user-facing 850/700/600hPa text block was removed.
