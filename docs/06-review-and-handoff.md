# SH MARBLES — Foundation review & handoff

## Phase status

| Phase | Status | Evidence |
|---|---|---|
| 1 Discovery | Complete | 22-image inventory/contact sheet, identity/content gaps, skill discovery |
| 2 Brand & creative direction | Complete | Five routes considered, selected positioning, voice, palette, typography, photography and motion rules |
| 3 UX architecture | Complete | Sitemap, homeowner/trade/international journeys, conversion and SEO plans, content contracts, technical architecture |
| 4 Design system | Complete as a framework-independent foundation | Shared CSS tokens and primitives, responsive review board, interactive state specimens, component contracts |
| 5–12 | Not started | No production homepage, collection routes, live inquiry, configurator, concierge or deployment |

The owner confirmed the official name **SH MARBLES**. The proposed wordmark treatment and positioning are design recommendations. No other business facts were assumed to be confirmed.

## Browser verification

Run with bundled Playwright against a temporary headless Microsoft Edge profile and the local static server. No browser download or application package installation was needed. The default bundled Chromium binary was missing, so the available Edge browser was used. The sandbox required an approved browser-process launch.

Evidence: `output/playwright/review-results.json`; full-page screenshots `board-{width}.png`; full-resolution first-view screenshots `cover-1440.png` and `cover-390.png`.

| Width | Document width | Images / fonts | Internal anchors |
|---|---|---|---|
| 375 | 375 | Loaded | Valid |
| 390 | 390 | Loaded | Valid |
| 430 | 430 | Loaded | Valid |
| 768 | 768 | Loaded | Valid |
| 1024 | 1024 | Loaded | Valid |
| 1440 | 1440 | Loaded | Valid |
| 1920 | 1920 | Loaded | Valid |

All viewport checks passed without horizontal overflow. No runtime or console errors were observed. All displayed images have nonempty descriptive alt text. Board JavaScript and TypeScript contracts pass Node syntax checking; this is not a TypeScript semantic typecheck or a Next.js build.

Interactions verified: keyboard skip link; primary action moves focus to sample form; empty/whitespace validation; valid sample feedback explicitly says no data sent/saved; reset; radio pointer and keyboard-arrow selection; native disclosure; mobile index Escape/return-focus and link-close behaviour; reduced-motion scroll and transition styles. Width-based reflow checked at 375 px. Actual browser 200% zoom, screen-reader testing, forced-colours review, Safari/iOS and Android physical-device testing remain later QA work.

## Contrast review and fixes

The first run detected muted text on limestone at 4.27:1. The muted token was darkened from `#68675D` to `#626157` across code and documentation. The final measurements:

| Pair | Contrast | Requirement |
|---|---|---|
| Ink / paper | 13.16:1 | ≥4.5:1 text |
| Muted / paper | 5.49:1 | ≥4.5:1 text |
| Muted / limestone | 4.67:1 | ≥4.5:1 text |
| Bronze / paper | 4.89:1 | ≥4.5:1 text |
| Error / paper | 6.21:1 | ≥4.5:1 text |
| Control boundary / chalk | 3.77:1 | ≥3:1 control |
| Control boundary / paper | 3.46:1 | ≥3:1 control |
| Muted light / dark section | 8.31:1 | ≥4.5:1 text |

A pale focus ring overrides bronze in the dark image section. Decorative dividers need not meet control-boundary contrast and are not used as sole input boundaries.

## Asset efficiency

Original assets remain untouched (3,741,215 bytes total). Review images use WebP derivatives. The displayed table image is 226,486 bytes, basin 108,240 bytes and object 93,090 bytes; below-the-fold images are lazy-loaded and all media reserve space. Font optimization replaced ~1.36 MB of TTF files with 62,476 bytes total of locally served Latin WOFF2 fonts. License/source records are included. No runtime CDN, tracking script, animation framework or 3D engine is loaded.

No Lighthouse, Web Vitals or production bundle score is claimed. Those need the actual application, its deployment and representative device/network testing.

## Four audits — this phase's scope

**Creative direction:** the board establishes a coherent architectural editorial direction through large type, restrained colour, asymmetry and actual supplied objects. Desktop/tablet/mobile screenshots were visually reviewed. Its imagery remains reference-only. The supplied portrait side table supports the direction, but it cannot substitute for the eventual wide cinematic hero or real workshop photography.

**UX:** the future sitemap supports immediate collection discovery and distinct bespoke/trade routes. The board's controls have real, explicitly local behaviour; no button pretends to submit a lead. Public contact destinations are gated by real contact information.

**Engineering:** tokens, primitives and specimen composition are separated. Content contracts keep unknown facts explicit and prepare a repository boundary for a CMS. Package weight is held at zero application dependencies. Actual React components, runtime validation and server persistence are consciously deferred, not represented as finished.

**Commercial:** inquiry paths carry product, material and project intent into a structured brief, with international destination and trade context. Pricing, availability, capacity and delivery promises are never fabricated. Real lead generation still requires verified business contacts, durable persistence and the later inquiry implementation.

## Phase 5 starting brief

Build and polish only the homepage next, using this system. Verify current Next/React/Tailwind releases and audit dependencies before install. Port UI primitives to typed React components. Use the current supplied images only under their confirmed status; keep unpublished reference media out of public catalogue/project claims. Start with a deliberate portrait-friendly composition if a cleared wide hero remains unavailable, rather than stretching a portrait or inventing an installation. Preserve the selected positioning and image-first hierarchy.

The following owner information improves the next phase: image provenance and public-use rights; vector logo; real contact email/WhatsApp and domain; confirmed table/basin product records; stone names and approved finishes; wide hero/workshop imagery. The lack of these details is documented without inventing replacements.
