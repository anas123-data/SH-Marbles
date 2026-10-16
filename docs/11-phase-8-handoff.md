# Phase 8 — Bespoke experience

Implemented locally on 14 October 2026. Scope stops at Phase 8; Phase 9 brand pages and Phase 10 AI are not started.

## Experience

- `/bespoke`: editorial introduction, proposed seven-step journey, configurator invitation and practical questions.
- `/bespoke/configure`: five piece types; compatible silhouette/edge choices; material colour studies from the existing catalogue; approximate millimetre dimensions; plan/elevation drawing; configuration handoff.
- `/bespoke/inquiry`: project details, reference selection, contact/destination, review, clipboard/plain-text export and confirmed clearing.
- Existing product/material quick briefs can continue into the detailed inquiry with their reference and notes intact.
- Homepage, desktop/mobile navigation and footer now link to the bespoke journey.

The drawing is explicitly indicative: no verified stone rendering, exact construction, price, availability, feasibility or delivery promise. Initial dimensions are illustrative and numeric limits are input sanity rules, not manufacturing capability. Collection data remains labelled visual studies.

## Delivery and privacy boundary

No official contact channel or durable destination was supplied. The UI remains in visible **draft mode** and never posts personal data. Download/copy is not a submission. Selected files are kept in memory, not uploaded, and their bytes are not included in the exported text. The exported brief tells visitors to attach originals separately.

Client navigation retains the draft through a root provider. Refresh/closing clears it. No localStorage, query strings, external analytics or database stores contact details. Local file selection checks count, size, MIME/extension and magic bytes; it is not a full format parser or malware scanner.

The `/api/inquiries` POST boundary rejects foreign/missing origins, unsupported content types, invalid JSON, oversized bodies, invalid fields/configurations and file-upload payloads. Valid requests receive **503 INQUIRY_UNAVAILABLE** and an explicit statement that nothing was received. This avoids a misleading success screen or ephemeral local-file inbox.

Before enabling delivery, implement durable `LeadRepository` storage with idempotency, a shared rate limiter, verified private uploads/quarantine, a real destination and appropriate privacy/retention terms. These are typed contracts, not installed services. See the root README. No API keys or new dependencies were added.

Local analytics seams emit only configuration type/material IDs, inquiry entry source and export method. No submission event is emitted. The future qualification helper measures brief completeness with transparent reasons; it does not infer customer wealth or prioritize countries.

## Review

- Creative: consistent editorial typography, warm stone palette, supplied imagery and a restrained drawing workspace. The review screen uses labelled sections rather than raw machine output.
- UX: visitors can enter through a collection reference, configure a new form or begin a brief directly. Errors identify fields; editing preserves details; clearing requires confirmation.
- Engineering: server-rendered route shells, typed client islands, shared validation, bounded API parsing and a replaceable catalogue/delivery boundary. Production build and TypeScript checks are part of verification.
- Commercial: structured buyer/project information and a portable brief are ready. Live lead capture is intentionally unavailable until a real delivery service is connected.

## Verification evidence

`scripts/bespoke.test.mjs` covers the shape/edge matrix, numeric bounds, contact validation, exports, qualification behavior and reference-file rejection. `scripts/qa-bespoke.cjs` checks the complete browser journey, seven widths, Axe states and API response boundaries. See `phase-8-qa-results.json` for final results and the root README for commands. Screenshots remain in ignored `output/playwright/bespoke/`.

Final results: production build and `pnpm typecheck` passed; all 6 model/file tests passed; 21 responsive page checks (3 routes × 7 widths) passed; 11 bespoke Axe states had zero violations; all 9 API cases returned the expected failure response; no browser runtime/console errors. Homepage regression passed at all 7 widths with zero violations in its 4 Axe states. `GET /api/inquiries` correctly returned 405. The origin check was repaired after integration testing exposed Next.js internal-hostname normalization. Drawing labels and the structured review layout were refined after screenshot inspection.

No fresh Lighthouse score is claimed for Phase 8. The previous measured catalogue score and remaining performance work are recorded in the Phase 6–7 handoff. Global production SEO/schema and final performance work remain Phase 11; preview noindex is preserved.

No deployment, commit or push was performed for this phase. Existing local Phase 6–7 changes are preserved.
