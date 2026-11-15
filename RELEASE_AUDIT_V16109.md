# V1.6.109 release audit

Scope is limited to Instagram credential diagnostics/runtime synchronization plus version metadata.
Forecast engine V19, cumulative wind C threshold 7 m/s, 25-mountain priority/progressive behavior, rolling cache semantics, and V1.6.102 egress controls are unchanged.

The diagnostic never returns the full token; only length, first/last four characters, a 12-hex SHA-256 prefix, and whitespace/normalization flags.
