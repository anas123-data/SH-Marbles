# Phase 10 — Stone Concierge

## Delivered

- `/concierge`: three-step guided consultation in the dark cinematic visual system. Captures piece type, setting, style, colour, optional dimensions, budget/currency and country.
- Results: photographic product and material references, explicit reasons, an outdoor review notice and a summary of the visitor's preferences. Architectural requests use a bespoke discussion rather than invented product records.
- Revise, clear with confirmation, download a text direction, and add the direction to the existing local inquiry. Earlier inquiry notes, references, configuration and attachments remain intact. Duplicate summaries are not appended; overlong notes are never truncated.
- Consultation state survives client navigation to products/materials and back. It is scoped to the current browser tab's memory; refresh clears it.
- Entry links from the homepage, footer and Contact page. The primary navigation stays compact.
- Validated, bounded `/api/concierge` endpoint. Same-origin JSON only; 8 KB streamed body limit; enum, text-length and control-character validation; no-store responses; no preference logging or persistence.
- An asynchronous server provider contract that accepts a restricted catalogue projection and can return only existing product/material IDs. No generated prose enters the product UI. Extra properties, unknown IDs, duplicates, cross-category products and incomplete selections are rejected. Errors and a five-second timeout fall back to guided selection.
- Local, privacy-conscious analytics events: `concierge_started`, `concierge_completed` (mode only), `concierge_brief_prepared`, `concierge_reset`. No external analytics collector.

## Current operating mode

**Guided catalogue mode, not live AI.** No model, SDK, API key, external AI service, chat history store or paid inference has been connected. This is the explicitly allowed no-credentials implementation of Phase 10: working UI, recommendations and an integration interface. No dependency was necessary.

Matching uses product category, photographed tone and pattern only. Style affects visual ranking, not technical suitability. Budget, dimensions and country are recorded for discussion and do not influence price, feasibility or shipping claims. Current catalogue records remain visual studies. Geological identity, origin, finish, dimensions, stock, price, lead time and suitability need studio confirmation.

Preferences are posted to this site's API to calculate references. They are not stored by application code or sent to a third-party model. The later project brief is still local: preparing/downloading it does not contact SH MARBLES.

## Integration map

| File | Responsibility |
| --- | --- |
| `src/features/concierge/model.ts` | Intake schema, visual ranking, catalogue projection, output validator and brief summary |
| `src/features/concierge/service.ts` | Provider contract, allowlist enforcement, timeout and guided fallback |
| `src/app/api/concierge/route.ts` | Input boundary, repository reads and restricted response |
| `src/features/concierge/provider.tsx` | Per-tab state across client navigation |
| `src/features/concierge/concierge.tsx` | Accessible consultation and inquiry handoff |
| `src/features/concierge/analytics.ts` | Local non-personal event contract |
| `src/app/concierge.css` | Scoped visual and responsive styling |

### Connecting real AI later

1. Implement `ConciergeProvider.rank` in a server-only adapter using the chosen provider's current documented SDK. Keep credentials in server environment variables, never `NEXT_PUBLIC_*`. There are no AI environment variables required or consumed today.
2. Have the model return exactly `{ productIds: string[], materialIds: string[] }` from the supplied candidate IDs. It cannot author specifications, prices, promises, HTML or customer-facing advice. The service validates the result and authors explanations from existing catalogue fields.
3. Add shared rate limiting and spending limits **before** passing an adapter to `recommend`. The current endpoint only performs inexpensive local matching and must not be switched to paid inference without those controls.
4. Update the mode and privacy disclosure before sending any preferences to an external provider. Only send what is necessary; dimensions, budget and country need not be supplied merely to rank visual references.
5. Add provider integration tests, review the approved catalogue and connect verified facts through the repository. Keep unknown facts unknown.

The existing asynchronous `CatalogueRepository` can be replaced by a database/CMS adapter without changing the consultation. Inquiry delivery/CRM remains a separate integration.

## QA

Verified on 17 October 2026:

- Production build: passed, 41 generated/static route entries plus dynamic API routes in the build report. Fresh TypeScript check passed.
- Six concierge unit tests passed, including invalid provider output and timeout fallback. Existing six bespoke unit tests passed.
- 28 responsive checks: four consultation states at 375, 390, 430, 768, 1024, 1440 and 1920 px. Images loaded and no horizontal overflow.
- Ten axe accessibility states: zero violations. Native radio keyboard navigation and step-heading focus verified.
- Eight API scenarios passed: valid request, cross-origin, non-JSON, malformed JSON, oversized body, unknown fields, invalid choices and HTML input.
- Ten browser journey checks passed, covering retry, editing, architectural fallback, download, navigation continuity, note preservation, duplicate prevention, overflow protection, reset and non-personal analytics. No recorded runtime/console errors.
- Homepage regression: all seven widths and four axe states passed, with existing interactions intact. See `phase-10-homepage-regression.json`.

See `phase-10-qa-results.json` for the browser report and run `pnpm test:concierge`, `pnpm qa:concierge`, `pnpm typecheck` and `pnpm build`. Browser screenshots are kept locally under ignored `output/playwright/concierge/`. No Lighthouse score is claimed for this phase.

## Review

- Creative: charcoal/ivory, editorial typography, supplied imagery and restrained controls continue the approved direction.
- UX: short required choices, optional practical details, useful results, clear limits and one explicit project-brief handoff.
- Engineering: typed catalogue boundary, deterministic fallback, no new dependencies, bounded API and reusable selection controls.
- Commercial: gathers a visual direction and project context without inventing stock, prices or manufacturing promises. Live AI and delivered inquiries remain explicitly unconnected.
