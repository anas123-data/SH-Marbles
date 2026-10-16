# Phase 8 — Bespoke journey, configurator and project inquiry

## Direction

Continue the existing local Next application. `/bespoke` explains a proposed seven-stage commission journey, `/bespoke/configure` shapes a starting brief, and `/bespoke/inquiry` gathers project requirements. Do not implement Phase 9 brand pages or the Phase 10 concierge.

Use a light, dimensioned SVG drawing instead of WebGL. Material selection supplies an approximate colour and an honest photographic reference; it never simulates a verified stone surface. No prices, structural certification, available stock or production promises are inferred. Product-specific shape/edge matrices describe this brief builder, not approved manufacturing capabilities. Dimension limits are input safeguards, not engineering limits.

## Journey

1. Explain how a bespoke project could progress: inspiration, material, measurements, refinement, fabrication, inspection and delivery planning. The studio must confirm the actual process.
2. Select a dining/coffee/side table, console or basin; choose an allowed shape, colour study, edge and millimetre dimensions.
3. Carry the exact configuration into a structured inquiry, with edit/reset/back controls and no PII in URLs or browser storage.
4. Gather project type, dimensions, quantity, material direction, budget/currency, timeline, destination, contact details and reference files. Retain values between steps; validate visibly and announce errors.
5. Review and export a plain-text brief. Files remain local and must be attached separately; their selection is never described as an upload. Actual collection remains disabled without configured durable persistence and private-upload services.

## Technical boundaries

Typed, pure configuration rules and inquiry validation are shared by browser and server. Lightweight context preserves the current draft during client navigation, not across reloads. The existing quick brief can hand its reference and notes to the full inquiry. A guarded API route validates requests but returns an explicit unavailable response while no lead repository is configured; never return a false receipt. A future repository must enforce durable persistence, idempotency and shared rate limits before being enabled. No new package or external provider is necessary for this phase.

Verify configuration matrices/dimensions, stale-context clearing, round-diameter synchronization, complete exports, validation/retained edits, file restrictions, safe API rejection, responsive layouts, keyboard use, reduced motion, existing journeys and a production build. No customer data is sent during QA.
