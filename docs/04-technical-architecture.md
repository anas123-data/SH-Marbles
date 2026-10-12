# SH MARBLES — Technical decisions

## Current stage

This is a framework-independent design-system foundation: CSS tokens, reusable presentation classes, an interactive internal HTML specimen, and TypeScript content contracts. No production Next application or server is installed. This keeps Phases 1–4 independently reviewable without building Phase 5 prematurely.

## Planned production stack

Next.js latest stable at the start of implementation, App Router, React, TypeScript strict mode and Tailwind CSS. Server Components handle editorial/catalogue content. Small client islands handle menu, filters, configurator and forms. Use `next/image` with explicit sizes/aspect ratios and `next/font/local` for the locally licensed typefaces. The official [Next App Router documentation](https://nextjs.org/docs/app/getting-started) and [Tailwind PostCSS guide](https://tailwindcss.com/docs/installation/using-postcss) were checked during planning. Verify exact stable versions, supported Node LTS, advisories and peer dependencies again when installing, then commit the lockfile. Do not encode a guessed future version now.

## Dependency audit / admission criteria

| Dependency | Decision | Reason |
|---|---|---|
| next, react, react-dom | Phase 5 | Requested rendering/routing foundation |
| typescript + relevant @types | Phase 5 dev | Typed code/content |
| tailwindcss, @tailwindcss/postcss, postcss | Phase 5 build | Token-mapped utility system; no CDN runtime |
| zod | Inquiry phase | Shared server/client validation; worth boundary protection |
| React Hook Form | Conditional | Native controls first; only if complex form state warrants it |
| Motion | Conditional | Only for proven animation needs beyond CSS |
| GSAP, Lenis | Defer | No demonstrated need; native scrolling stays reliable |
| Three.js / React Three Fiber | Defer | No measured 3D models/materials; 2D brief is more honest |
| Lucide | Optional | A few inline SVGs may be smaller; accessible names required |
| CMS/database SDK | Defer | Choose after content ownership, credentials and data residency |
| AI SDK/model client | Defer | No AI service needed in Phase 1–4 |
| Playwright / axe | QA tooling later | Browser and automated accessibility coverage, not client bundle |

Before additions inspect license, maintained version, advisories, transitive count, peer compatibility and bundle impact. Install only what has an immediate use, pin through a lockfile, audit installed dependency tree and document exceptions. No app packages were installed during this phase.

## Proposed project boundaries

```text
src/app/                     route composition, metadata, route handlers
src/components/ui/           Button, SectionHeading, form primitives
src/components/editorial/    ImageReveal, cards, Gallery, ProcessTimeline
src/features/catalog/        filters, server queries
src/features/configurator/   option matrix, reducer, indicative preview
src/features/inquiry/        validation, action, error/success UI
src/features/concierge/      interface, grounding, provider adapter
src/content/                 approved typed local records initially
src/lib/content/             repository interface + local/CMS adapters
src/lib/analytics/           typed event adapter; no-op default
src/lib/leads/               persistence + CRM/outbox adapters
src/styles/                  design-system tokens and global CSS
public/media/                approved derivatives only
```

The contracts in `design-system/content-models.ts` are the starting point. Unknown facts use null or explicit unknown states. Editorial aliases must not silently become stone/product names. Publication checks reject records without cleared rights and required specs. A local repository can later be replaced with Sanity or another CMS without rewriting page components. Leads require durable server-side storage; a source JSON file is not an inbox.

## Inquiry security and delivery design

Server validation is authoritative: field lengths, enums, dimension/quantity ranges, safe URLs and file limits. Render user text as text; no untrusted HTML. Same-origin checks, CSRF protections where relevant, honeypot plus rate limiting and optional accessible challenge. Do not log full messages or contacts. Server credentials stay in secret environment variables; no `NEXT_PUBLIC_` secret.

Upload proposal: max 3 files, 10 MB each, JPEG/PNG/WebP/PDF only; verify magic bytes, MIME and extension server-side, randomize storage keys, scan/quarantine, keep objects private with short-lived signed reads. Reject SVG/HTML/executable formats and oversized bodies. Allow no-file submission. Confirm provider request limits before implementation; use scoped direct upload grants when needed. Define deletion/retention policy with owner before collection.

Persist accepted lead with idempotency key → enqueue notification/CRM sync with retry → return receipt. A notification failure does not lose the lead; persistence failure never yields a success screen. Rate limiting must be shared across server instances. Protect staff access with authentication and least privilege. Avoid storing sensitive lead information in browser localStorage.

## Concierge architecture (future Phase 10)

UI collects intended piece, style, colour, dimensions, indoor/outdoor intent, optional budget and country. The retrieval adapter provides only published catalogue/material records. The provider returns a validated structured result containing record IDs and grounded reasons. Resolve names/specs from the repository, not free model text. The service cannot quote, assert stock or promise delivery; unknowns explicitly route to the studio. No model-generated suitability claims without approved application data. Treat user text, retrieved descriptions and files as untrusted content. No autonomous outbound messaging or ordering tools.

Without a configured API, label the feature “Guided project brief” and use a deterministic question flow, or leave it unlaunched. Never simulate a live AI response. Define timeouts, rate/cost limits, minimal logs, retention and a graceful contact fallback before launch. Provider selection and implementation belong to Phase 10.

## Performance and accessibility budgets

Aim for Lighthouse 90+ performance / 95+ accessibility / 95+ best practices / 95+ SEO on the finished application; these are targets, not measured scores. Field targets: LCP ≤2.5 s, CLS ≤0.1, INP ≤200 ms at the 75th percentile. Initial working budgets: homepage first-party JS ≤150 KB gzip, responsive hero ≤300 KB, small card ≤120 KB, initial font transfer ≤150 KB total. Validate realistic network/device settings and adjust image delivery without degrading stone readability.

Preload only the chosen hero image/font, reserve media dimensions, lazy-load below the fold, defer analytics, dynamically import configurator/concierge. Native scrolling, no WebGL and no autoplay video at launch. Do not hide SEO content pending hydration.

Target [WCAG 2.2 AA](https://www.w3.org/WAI/WCAG22/quickref/): labelled forms, visible focus, 4.5:1 normal text, 3:1 meaningful control boundaries, 44 px product target standard, semantic landmarks, skip link, dialog focus management, textual errors and status announcements. Preserve reflow and text zoom. `prefers-reduced-motion` is mandatory. Automated checks supplement keyboard and visual review.

## Deployment plan, not deployment

Use a Node-compatible Next hosting environment; Vercel is a candidate, not a purchased or linked dependency. Preview environments are noindex. Production requires a real domain, cleared content, working durable inquiry destination, policies, server validation and final QA. Secrets are set in host configuration. Verify image optimization and upload limits on the selected host. CMS/database/analytics vendors remain open until requirements and credentials are known.

Planned server variables (no values supplied): `SITE_URL`, `CONTACT_EMAIL`, `WHATSAPP_NUMBER`, `LEAD_DATABASE_URL`, `UPLOAD_*`, `CRM_*`, optional `AI_API_KEY`, optional `ANALYTICS_*`. Only intentionally public display data can cross the server boundary. Never ship an `.env` containing real secrets.
