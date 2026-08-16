# Northstar Retail Support MVP — Go-Live Readiness Note

**Project:** Northstar Retail Support MVP  
**Date:** 2026-08-16  
**Version:** MVP v1.0  
**Readiness Status:** In Progress  
**Go/No-Go Owner:** Scrum Master / Project Team

---

## 1. MVP Scope

The MVP is focused on reducing manual work for common customer support requests.

### Supported customer journeys

- [x] Order status lookup
- [x] Returns and refunds
- [ ] Stock availability

### Current implementation

- Order tracking dashboard implemented.
- Mock order data added for testing.
- Returns and Refunds page implemented.
- Return request form added.
- Navigation between the support pages implemented.
- Deployment is still being set up.

---

## 2. Go-Live Readiness Checklist

| Area | Check | Status |
|---|---|---|
| Core functionality | Order status lookup works with mock data | In progress |
| Core functionality | Returns and Refunds page loads correctly | In progress |
| Core functionality | Return request form opens and submits | In progress |
| UI | Navigation links work between support pages | In progress |
| Data | Mock order records are available for testing | Ready |
| Testing | Main customer journeys have been tested | In progress |
| Deployment | Production deployment is configured | In progress |
| Documentation | Go-live documentation is available | In progress |
| Support | Known issues are documented | In progress |
| Rollback | Previous working commits are available in Git | Ready |

---

## 3. Known Risks and Open Items

- Production deployment still needs to be completed and tested.
- The main customer journeys need final end-to-end testing.
- The project currently uses mock order data instead of a production order API.
- The return request flow needs final testing.
- Final go-live approval has not been given.

---

## 4. Go/No-Go Criteria

The MVP should only be marked as ready when:

- [ ] Order lookup works correctly.
- [ ] Returns and refunds information is accessible.
- [ ] Return request flow works correctly.
- [ ] Navigation between the main support pages works.
- [ ] No critical JavaScript or UI errors remain.
- [ ] The deployed application is accessible.
- [ ] The main customer journeys have been tested.
- [ ] The team agrees that there are no remaining issues that would block the MVP.

**Current decision:** No-Go / In Progress

---

## 5. Post-Go-Live Monitoring

After deployment, the team should monitor:

- Order lookup failures.
- Broken navigation links.
- Return request failures.
- JavaScript errors.
- Page loading or availability issues.
- Customer feedback during the MVP demonstration.

**Escalation:** Northstar project team / assigned support owner.

---

## 6. Sign-Off

| Role | Name | Status |
|---|---|---|
| Scrum Master | TBD | Pending |
| Developer(s) | TBD | Pending |
| Tester / QA | TBD | Pending |
| Project Owner | TBD | Pending |

**Final Go/No-Go Decision:** Pending final testing and deployment verification.