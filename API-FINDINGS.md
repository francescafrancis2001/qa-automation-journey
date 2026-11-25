# API findings: Restful-Booker

| # | Endpoint | Expected (convention) | Actual | Notes |
|---|----------|-----------------------|--------|-------|
| 1 | POST /booking | 201 Created | 200 | ... |
| 2 | DELETE /booking/{id} | 200 or 204 | 201 + text "Created" | ... |
| 3 | POST /auth (bad credentials) | 401 | 200 + {"reason": "..."} | ... |
| 4 | POST /booking (missing field) | 400 or 422 | (what you saw) | ... |
| 5 | GET /booking/{id} (missing) | 404 + JSON | 404 + plain text | ... |