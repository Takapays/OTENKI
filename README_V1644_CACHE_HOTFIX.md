# Traten V1.6.44 cache hotfix - safe apply

## Why this package uses a patcher

The latest complete source available for validation was V1.6.42. A V1.6.43 checksum exists, but the V1.6.43 ZIP/source itself was not available. Replacing whole V1.6.43 files with V1.6.42-derived files could silently remove a V1.6.43 change, so this package deliberately does not do that.

`apply_v1644_cache_hotfix.py` applies only the known vulnerable cache fragments. It supports V1.6.42 and V1.6.43. If V1.6.43 changed any target fragment, it aborts before writing anything.

## Apply

From a local clone/folder containing `server.py`, `app.js`, `index.html`, and `data-audit.html`:

```bash
python3 apply_v1644_cache_hotfix.py --check-only /path/to/OTENKI
python3 apply_v1644_cache_hotfix.py /path/to/OTENKI
```

The first command changes nothing. The second command creates a timestamped `_v1644_backup_*` folder, runs Python/Node syntax preflight, then writes the four patched files.

After that, inspect the Git diff and commit/deploy those four files. Do not upload the backup folder.

## What it intentionally does not change

- Meteoblue concurrency/429 protection introduced in V1.6.39
- national rating thresholds or weather integration arithmetic
- route/CT/coordinates/representative-course data
- national engine/cache generation identifier
- Instagram behavior

See `RELEASE_AUDIT_V1644.md` for the detailed cause, regression scope, and validation results.
