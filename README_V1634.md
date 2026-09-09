# Traten V1.6.34
- Route-map initial scale regression fix: mobile no longer forces zoom 13 around the route center. It now uses fitBounds so the complete route is visible initially, with mobile padding 20px and maxZoom 13.
- Route risk coloring inspected and intentionally unchanged: each segment uses the worse A-E grade of its two endpoint forecasts; A=green, B=yellow, C/D/E=red.
- No weather, route/CT/fixed-point, Instagram, national outlook, or model-integration logic changes.
