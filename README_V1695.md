# Traten V1.6.95

Hotfix for the nationwide cold-cache crash confirmed by the Render traceback.

The nullable per-point cache value is normalized to a dictionary before any cache-policy field is read. This makes cold-start safety structural and avoids any `None.get(...)` path.
