# GitHub Desktop

Summary:
V1.5.65 Repair partial nationwide cache fills

Description:
Split the rolling nationwide cache refresh into 25-mountain blocks and persist each successful block immediately. Incomplete forecast dates stay prioritized for repair instead of leaving partial fresh caches such as 58/100. Add per-date cache completion diagnostics and show cache coverage on the initial nationwide display. Bump the browser cache key to avoid carrying old partial snapshots forward.
