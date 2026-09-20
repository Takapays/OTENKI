# Traten V1.6.88

Base: V1.6.87

Changes:
- PC scene report header grid repaired; title / score / best-time occupy explicit desktop grid areas.
- Saved-route restore preserves the saved passage dates/times when the saved start date is today or in the future.
- Only when the saved start date is in the past, the whole route is shifted so the first point starts tomorrow while keeping relative day offsets and saved times.
- Changing a point to an overnight stay now recalculates every downstream route card, including across later overnight points.
- Editing an overnight point date/time or its next-morning departure time also recalculates downstream dates/times.
