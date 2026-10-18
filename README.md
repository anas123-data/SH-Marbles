# SH MARBLES

An editorial website for a marble furniture and handicraft brand. **Phases 1–11 are implemented locally:** foundation, homepage, collections, Stone Library, bespoke journey, brand pages, the Stone Concierge in guided catalogue mode, and SEO foundations. Live AI and inquiry delivery are not connected. Phase 11 improves measured loading, but the homepage and Stone Library remain below the 90 performance target. Final QA and public deployment verification remain pending.


The homepage now uses the owner-selected dark cinematic direction: charcoal surfaces, an image-led hero and revised typography/layouts. The dark direction now covers the homepage, Phase 9 brand/project pages and the Stone Concierge; collection, material and bespoke routes retain their previous styling. See `docs/12-dark-cinematic-homepage.md`.

## Run locally

Requirements: Node.js 24 LTS recommended (22.19+ supported), pnpm 11+.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open `http://127.0.0.1:3000`. For a production preview:

```sh
pnpm build
pnpm start
```

On this Windows workspace, if Node/pnpm are not on PATH, run `./scripts/start-local.ps1`. It uses the available Codex runtime when necessary, otherwise your installed Node/pnpm. No environment variables or external services are required for the current preview.

## Implemented experience

- Next.js App Router, React, strict TypeScript and Tailwind CSS.
- Server-rendered editorial homepage with locally hosted fonts and optimized `next/image` assets.
- Responsive navigation with a native modal mobile menu, keyboard focus restoration and Escape support.
- Collection studies with accessible tabs, keyboard navigation and alternate views.
- Material colour studies with native radio controls; no unverified stone names or stock claims.
- Bespoke introduction, craft detail, architect/designer invitation and large closing CTA.
- Project-brief dialog with category context, editable text, clipboard and plain-text download.
- Reduced-motion support, visible focus, semantic headings and image descriptions.
- Homepage metadata, favicon, deliberate noindex and a custom 404 page.
- Collections index, three category pages and eight descriptive product-study pages.
- Searchable product browsing, image galleries, full-image dialogs, specification tables and related pieces.
- Stone Library with six photographic colour studies, search/tone/pattern filters, empty/reset states and individual material pages.
- Accessible comparison of two or three material studies; selected directions carry into a copyable/downloadable brief.
- Shared site navigation/footer, breadcrumbs, route-specific metadata and statically generated catalogue routes.

- Bespoke landing page with a seven-step proposed project journey.
- Responsive 2D configurator with five piece types, compatible shape/edge choices, six colour studies and editable dimensions.
- Three-step inquiry with configuration/reference handoff, local file checks, contact validation, review, copy/download and confirmed clearing.
- Fail-closed inquiry API, typed future delivery contracts and privacy-safe local analytics events.

**The project brief does not submit data.** It stays in page memory and can be copied or downloaded by the visitor. No official contact details, inquiry-delivery service, CRM, analytics provider, database or AI service is configured. Do not represent a downloaded brief as a sent inquiry.

## Project structure

```text
src/app/                 homepage, catalogue routes, layout, CSS, metadata and 404
src/components/          typed navigation, editorial UI and interactive islands
src/content/home.ts      editable homepage studies and navigation
src/content/catalogue.ts typed product, collection and material records + read adapter
src/content/catalogue-models.ts  runtime catalogue content contracts
src/features/bespoke/    configurator, inquiry, validation and future delivery contracts
src/app/api/inquiries/   validated, explicitly unavailable submission boundary
public/media/            optimized derivatives of supplied imagery
design-system/           original review board, shared tokens, fonts and contracts
docs/                    strategy, asset audit, architecture and QA handoff
scripts/                 asset preparation, local launcher and browser QA
```

Edit the shared palette, spacing and motion tokens in `design-system/theme.css`. Next loads the existing fonts with `next/font/local`; the original board retains its own font declarations. `src/app/globals.css` contains the homepage/shared styling; `src/app/catalogue.css` covers collection and material experiences. `src/content/catalogue-models.ts` defines the current local catalogue. The original `design-system/content-models.ts` preserves broader future CMS/lead/AI contracts; it is not server validation.

## Content and imagery

Edit homepage studies in `src/content/home.ts`; editorial sections are in `src/app/page.tsx`. Edit collection/product/material content in `src/content/catalogue.ts`. Images are owner-supplied references with unconfirmed photographic/render provenance. The owner approved publishing the supplied images to the public repository; that approval does not verify the depicted products or their specifications. Original JPGs are unchanged. `docs/phase-5-assets.json` and `docs/phase-6-7-assets.json` record source/derivative mappings. Do not describe styled imagery as completed client installations or assign geological names from appearance.

Optional image regeneration: run `python scripts/prepare-homepage.py` and `python scripts/prepare-catalogue.py` with Pillow installed. Surface details use CSS crops of these same photographs and are labelled accordingly; they are not standalone slab scans. Font source and OFL licenses are in `design-system/assets/`. The logo treatment is typographic; obtain the original vector brand mark before final identity approval.

### Owner-supplied wash basins (18 October 2026)

Wash Basins contains only the thirteen owner-supplied product listings; the six earlier basin studies have been removed: Green Onyx (PKR 52,000), Dark Emperador (two sizes, PKR 38,000 / 50,000), Luxury Onyx (PKR 50,000), Ziarat White (14-inch diameter PKR 32,000 / 16-inch diameter PKR 38,000), Dark Green Onyx (12-inch PKR 24,000 / 14-inch PKR 30,000 / 16-inch PKR 38,000), Travertine (12-inch PKR 26,000 / 14-inch PKR 30,000 / 16-inch PKR 34,000), Green Marble (PKR 48,000), Round Travertine (12-inch PKR 22,000 / 14-inch PKR 26,000 / 16-inch PKR 30,000; height retained as 5 / 6 inches without diameter mapping), Green Onyx 19 × 13 × 6 inches (PKR 60,000), Ziarat White Fluted (12-inch PKR 30,000 / 14-inch PKR 38,000 / 16-inch PKR 45,000), the separate Ziyarat White Fluted design (12-inch PKR 30,000 / 14-inch PKR 38,000 / 16-inch PKR 45,000; all 5 inches high), and Rosso Levanto Square (12-inch PKR 28,000 / 14-inch PKR 35,000 / 16-inch PKR 40,000; all 5 inches high). Black Marble is the thirteenth listing (12-inch PKR 25,000 / 14-inch PKR 33,000 / 16-inch PKR 40,000; all 5.5 inches deep), with bulk-order and custom-size enquiries. Their source/image mapping is in `docs/basin-assets-2026-10-18.json`. Their typed records live in the corresponding `src/content/*-basin.ts` files, imported by the catalogue. Forty-one unchanged supplied JPEGs are in `public/products/`; `next/image` serves responsive optimized versions.

Product records support optional PKR prices, size-specific variants, partial dimensions (including diameter), care, installation and natural variation notes. The selected variant updates the displayed price and is carried into the local inquiry brief. Supplied product facts are marked verified; stock, production time and unprovided measurements remain unconfirmed; shipping information appears only where supplied. Original long titles are retained under Product title, with concise display titles. No checkout, payment or inquiry delivery service has been added.

### Add a product

For a visual study, add a record through the `product()` factory in `src/content/catalogue.ts` with a stable unique slug, category, descriptive title, images, form, character and a related `materialStudyId`. Add optimized images to `public/media/` and record their source. The factory deliberately keeps unknown stone, dimensions, weight, finish, lead time, shipping and customization capability as `null`. Populate them only from approved records. The page and related links are generated automatically on rebuild. Detail crops must be labelled; do not call an image of a different piece an alternate angle.

### Add a marble or material study

Add a record through `material()` with a stable slug, display title, image, tone (`dark`, `warm`, `coloured`), pattern (`veined`, `clouded`, `mottled`) and descriptive palette. Store verified trade name, origin/evidence, finishes and recommended applications only when supplied. Unknown fields remain `null`/empty; UI prompts studio confirmation. The current six records are explicitly visual studies, not a stock catalogue. New records appear in filters, comparisons and generated detail routes automatically. Adjust the image-specific crop in `catalogue.css` when needed.

### Connect a CMS later

Implement `CatalogueRepository` at the exported `catalogue` boundary. Page routes already read through its asynchronous methods. Preserve stable IDs/slugs and explicit unknown values. Validate incoming CMS data server-side before returning typed records; the current TypeScript interfaces are not runtime validation. No database credentials or external dependency are needed for local records.

## Checks

```sh
pnpm typecheck
pnpm build
pnpm audit
# Start the production server in another terminal before browser QA:
node scripts/qa-homepage.cjs
node scripts/qa-catalogue.cjs
pnpm test:bespoke
pnpm qa:bespoke
pnpm qa:studio
```

Browser scripts default to installed Microsoft Edge. Set `QA_BROWSER_CHANNEL=chrome` for Chrome. They exercise seven widths (375–1920 px), native menus/dialogs, filters, comparisons, galleries, contextual copied/downloaded briefs, reduced motion, no-JavaScript content and Axe accessibility. The catalogue check additionally walks all linked catalogue routes, checks unique metadata and tests invalid slugs. Reports/screenshots are saved under ignored `output/phase-5/` and `output/playwright/catalogue/`. Browser tools and Lighthouse are development-only dependencies. No dependency was added for Phases 6–9. The bespoke suite covers configuration, validation, exports, local file handling, private-data reset, responsive states and API failures. Its evidence is under `output/playwright/bespoke/`.

## Deployment and release boundary

The app can build on a Node-compatible Next.js host; no deployment is performed here. Before public launch: confirm image rights/product claims; supply the domain and real contact channels; implement durable inquiry delivery and privacy policy; configure the real production origin and release indexing flag; complete final QA and verify the public deployment. The current metadata and `robots.txt` intentionally prevent indexing. Do not remove those safeguards simply to raise an SEO audit score.

Secrets belong only in server environment variables when real integrations are added. No keys or `.env` files are committed. See `docs/04-technical-architecture.md` for planned server boundaries and the phase handoffs in `docs/` for verification evidence. Optional QA settings: `QA_BROWSER_CHANNEL` chooses an installed browser; `QA_BASE_URL` overrides the catalogue test's localhost URL. No application environment variables are required locally. Optional Phase 11 origin/indexing settings are documented below and in `.env.example`.

## Design foundation

The original Phases 1–4 dossier starts at `docs/README.md`. To view its standalone component board, open `design-system/index.html`. Phases 6–7 add the collection/product routes and material exploration. Phase 8 adds the bespoke journey, configurator and draft inquiry. Phase 9 adds the brand and project pages. Phase 10 adds the guided Stone Concierge and its AI integration contract. Live inquiry delivery and external AI inference remain unconnected.

## Bespoke content and delivery

Routes: `/bespoke`, `/bespoke/configure`, `/bespoke/inquiry`. Edit the proposed process in `src/app/bespoke/page.tsx`. Update builder options, illustrative starting dimensions and validation in `src/features/bespoke/model.ts`. Input bounds are sanity limits, not fabrication capability. Shapes and edge options are briefing preferences; the SVG shows approximate plan/elevation proportions and colour, not verified construction or marble rendering. Material choices read from the same catalogue adapter as the Stone Library.

Journey state lives only in the root React provider. Client navigation retains drafts and locally selected files; refresh/closing clears them. No personal data is written to URLs, localStorage, analytics or a server. Exported text includes contact details and filenames, never image/PDF bytes. Visitors must attach originals separately when sharing. The client checks file count (3), each-file size (5 MB), combined size (10 MB), extension/MIME and magic bytes. This is not an upload scanner or a full file parser.

`POST /api/inquiries` validates same-origin JSON, a 32 KB streaming body limit, fields, configuration and collection references. All responses use `no-store`; valid drafts return **503 INQUIRY_UNAVAILABLE**, never a receipt. The draft UI does not call this endpoint. No email address, WhatsApp number, database or upload destination is invented.

Before enabling submission, implement the `LeadRepository`, shared `InquiryRateLimiter` and `PrivateReferenceStore` contracts in `lead-service.ts`; require durable storage, idempotent creation, private ownership-bound uploads, server byte/signature validation and quarantine. Add retention/privacy terms and an approved destination. Wire the UI only after these services pass end-to-end failure/success tests. Do not simply change `inquiryDelivery.available`: no live delivery implementation exists behind it. Store secrets server-side only.

`qualifyInquiry` scores brief completeness (product interest, dimensions, quantity, timeline and budget), with reasons and a rule version. It does not establish buyer value, pricing or lead priority and is not yet connected to a CRM.

`analytics.ts` dispatches local `sh-marbles:analytics` events: `configurator_completed`, `inquiry_started`, `brief_exported`. No external collector is installed. Connect an approved consent-aware adapter later; never add names, contact details, free text, filenames or budget/destination data. No `inquiry_submitted` event is emitted because nothing has been received.

## Brand pages and interior studies (Phase 9)

Routes: `/craftsmanship`, `/about`, `/projects`, `/projects/[slug]`, `/trade`, `/contact`. These extend the dark cinematic visual direction. Their common visual components are in `src/components/studio-ui.tsx`, with styles in `src/app/studio.css`. The shared navigation and footer now expose all eight primary destinations.

Edit the six illustrative interior studies and seven craft discussion stages in `src/content/studio.ts`. Studies have stable slugs, sector, setting, narrative, considerations, a supplied image and a related product slug. The `StudioRepository` boundary can later read from a CMS. Every current record has `status: interior-study` and null client/location/completion fields. Hospitality and commercial categories are proposed application directions, not installed projects or verified material suitability. Do not turn these into client case studies without approved facts, permissions and corresponding schema/UI changes.

The craft page presents decisions and questions for a project, not a documented production tour. The original workshop photograph is clearly captioned; there are no fabricated makers, videos, capacity claims or certifications. About copy uses only the supplied brand positioning.

Trade sample/drawing requests, project references and contact paths use `BriefLink` to carry context into the Phase 8 inquiry in memory. Existing notes are preserved. New-tab links open the inquiry without memory context. The downloadable `public/resources/SH-MARBLES-trade-brief-checklist.txt` is a planning checklist, not a technical drawing or commercial commitment. Official contacts remain unconfigured; there are no invented email, WhatsApp, address or social links.

Run `pnpm qa:studio` against the local production server for responsive screenshots, Axe checks, study filters, detail routes, metadata, native disclosures, menu keyboard behavior, downloads and contextual handoffs. Output is under ignored `output/playwright/studio/`; final evidence and limitations are in `docs/14-phase-9-handoff.md`.

## Phase 10 — Stone Concierge

Open `/concierge` for the guided consultation. It collects a piece type, setting, style, colour and optional practical details, then selects existing visual catalogue references. Visitors can revise answers, download a direction or add it to their local project brief. Existing notes are preserved. Entry points are on the homepage, Contact page and footer.

**Live AI is not configured.** The functional fallback uses visual catalogue matching; it does not infer price, stock, stone identity, suitability or shipping. The provider interface, output allowlist and timeout are ready for a future server adapter. No new dependencies or environment variables are required. Consult `docs/16-phase-10-handoff.md` before enabling external AI: add provider credentials, shared abuse/spending controls and the appropriate privacy disclosure first.

Preferences are processed by this site's API and are not persisted or sent to external AI. Consultation state lives in tab memory and clears on refresh. Preparing a project brief does not submit it.

```sh
pnpm test:concierge
pnpm qa:concierge # requires the local server and installed Edge
```

The content source remains `src/content/catalogue.ts`; edit its typed product/material records and image references to update concierge suggestions as well as the collection pages. Ranking and allowed response fields live in `src/features/concierge/model.ts`; future model adapters implement `ConciergeProvider` from `service.ts`. The browser report is `docs/phase-10-qa-results.json`.

## Phase 11 — SEO, performance and publication

Metadata now includes unique canonicals and social cards when a real public origin is configured. `SITE_URL` takes precedence over Vercel’s actual `VERCEL_PROJECT_PRODUCTION_URL`. `SITE_INDEXABLE=true` enables indexing only in production with a valid origin; previews stay noindex. The inquiry, configurator and concierge remain noindex. Rebuild after changing settings. No domain is invented when these settings are absent.

The sitemap reads the same catalogue/project repositories as the pages. Organization/WebSite JSON-LD and breadcrumb microdata are included. Visual studies use CreativeWork schema; verified product records can use Product schema without made-up offers or ratings. The branded share image is `/social/sh-marbles.png`.

```sh
pnpm test:seo
pnpm qa:seo # running production preview + installed Edge
```

For an actual public deployment test, set `QA_BASE_URL`, `QA_SITE_ORIGIN` and `QA_INDEXABLE=true` to the verified production values. Do not use this to disguise a preview as a live release.

Homepage mobile LCP improved from 4.0 s to 2.5 s in local Lighthouse measurements; CLS stayed zero. Performance measured 83 homepage, 85 Stone Library and 90 product page, so the overall 90 target is not yet achieved. Accessibility and best-practice scores were 100. Preview SEO scored 66 because indexing is intentionally disabled. Raw and summarized evidence, remaining work and deployment status are documented in `docs/18-phase-11-handoff.md`.

Public deployment is authorized but not yet verified: Vercel currently denies access to the created `sh-marbles` project, and the owner is reconnecting the integration. There is no confirmed live URL. `scripts/prepare-deployment.py` can prepare an allowlisted direct upload once access is restored; it is not itself a deployment. GitHub linking also requires the account’s Login Connection.
