# Phase 9 — Brand pages and interior lookbook

Implemented locally on 17 October 2026. Phase 10 AI remains unstarted.

## Delivered

- Craftsmanship: product-detail hero, seven native process disclosures, supplied workshop reference, material exploration and inquiry paths.
- About: the brand perspective, stone/form/everyday-use principles and links into collections and craftsmanship.
- Projects: six illustrative interior studies, Residential / Hospitality / Commercial filters, keyboard-operable native radio controls and individual detail pages.
- Architects & Designers: six briefing topics, contextual sample/drawing/project inquiry links, downloadable trade checklist and practical questions.
- Contact: personal, trade and material inquiry routes, preparation guidance and a direct statement that official contact details and sending are not configured.
- Shared navigation and footer now expose all eight primary destinations. Homepage craft/trade invitations lead to their completed pages.

New routes use the selected dark palette. The catalogue and bespoke pages retain their prior styling. `studio-ui.tsx` provides the editorial shell, figure and closing invitation; `BriefLink` carries request context into the existing inquiry without putting personal information into a URL. Notes survive a change in request context. A new tab intentionally starts without in-memory context.

## Content integrity

The lookbook is explicitly a set of application ideas, not a completed-project portfolio. Client, location and completion fields are null. Supplied residential-style images used to suggest hospitality/commercial directions are described as such. No suitability, installed-project or client claims are inferred from photographs.

Craft content is a guide to project decisions, not documented evidence of a production line. Only existing supplied imagery is used. No fabricated makers, workshop videos, dates, manufacturing capacity or certifications. The trade download is a briefing checklist, not CAD or a product specification. Samples, drawings, sourcing, fabrication and delivery scope require individual confirmation.

Official email, WhatsApp, address and social channels are not supplied. Contact routes use the existing local inquiry builder. No request is sent, no sample is ordered and no service is booked. The Phase 8 fail-closed delivery boundary is unchanged.

## Verification

- Production build passed: five primary brand routes and six study detail routes generated successfully.
- `pnpm typecheck` passed after clearing an ignored stale TypeScript incremental cache; a clean non-incremental check also passed.
- 42 responsive checks: six representative routes at 375, 390, 430, 768, 1024, 1440 and 1920 px; no horizontal overflow or missing images.
- 11 new routes returned 200 with unique titles and preview noindex; invalid study returned 404.
- Zero Axe violations in 15 tested states, including desktop/mobile pages, a selected project filter, expanded craft content and the enlarged mobile menu.
- Filters, keyboard radio selection, project-to-inquiry references, notes retention, trade sample/drawing contexts, real checklist download and contact routing passed.
- Native disclosures work without JavaScript; all six lookbook studies are server-rendered without JavaScript.
- Homepage regression passed at seven widths, with zero violations in four Axe states. Tabs, material controls, draft exports, reduced motion and the new trade route passed.
- No browser runtime or unexpected console errors. Screenshot review covered desktop craft/trade and mobile projects/contact compositions.

Evidence: `phase-9-qa-results.json`, `phase-9-homepage-regression.json`. Screenshots remain under ignored `output/playwright/studio/`. Run `pnpm qa:studio` against the local server to reproduce. No new dependencies, deployment, commit, push or fresh Lighthouse score are claimed for this phase.

## Final review

Creative: dark editorial pages with purpose-specific compositions, large supplied imagery and restrained controls.

UX: every primary destination is reachable; trade and lookbook selections become useful inquiry context; mobile navigation remains scrollable and keyboard operable.

Engineering: static route shells, typed local repository, reusable presentation components and small client islands. Existing catalogue/configurator/inquiry behavior remains intact.

Commercial: project preparation and trade qualification routes are usable now. Actual lead delivery and a verified completed-project portfolio remain dependent on real business data and services.
