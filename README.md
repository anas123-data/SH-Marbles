# SH MARBLES

An editorial website for a marble furniture and handicraft brand. **Phases 1–8 are implemented locally:** foundation, homepage, collection/product experience, Stone Library and the bespoke journey. Inquiry delivery remains in explicit draft mode. Phase 9 onward remains pending.


The homepage now uses the owner-selected dark cinematic direction: charcoal surfaces, an image-led hero and revised typography/layouts. This first redesign is scoped to the homepage; the collection, material and bespoke routes retain their previous styling. See `docs/12-dark-cinematic-homepage.md`.

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

**The project brief does not submit data.** It stays in page memory and can be copied or downloaded by the visitor. No contact details, backend, CRM, analytics provider, database or AI service is configured. Do not represent a downloaded brief as a sent inquiry.

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

### Add a product

Add a record through the `product()` factory in `src/content/catalogue.ts` with a stable unique slug, category, descriptive title, images, form, character and a related `materialStudyId`. Add optimized images to `public/media/` and record their source. The factory deliberately keeps unknown stone, dimensions, weight, finish, lead time, shipping and customization capability as `null`. Populate them only from approved records. The page and related links are generated automatically on rebuild. Detail crops must be labelled; do not call an image of a different piece an alternate angle.

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
```

Browser scripts default to installed Microsoft Edge. Set `QA_BROWSER_CHANNEL=chrome` for Chrome. They exercise seven widths (375–1920 px), native menus/dialogs, filters, comparisons, galleries, contextual copied/downloaded briefs, reduced motion, no-JavaScript content and Axe accessibility. The catalogue check additionally walks all linked catalogue routes, checks unique metadata and tests invalid slugs. Reports/screenshots are saved under ignored `output/phase-5/` and `output/playwright/catalogue/`. Browser tools and Lighthouse are development-only dependencies. No dependency was added for Phases 6–8. The bespoke suite covers configuration, validation, exports, local file handling, private-data reset, responsive states and API failures. Its evidence is under `output/playwright/bespoke/`.

## Deployment and release boundary

The app can build on a Node-compatible Next.js host; no deployment is performed here. Before public launch: confirm image rights/product claims; supply the domain and real contact channels; implement durable inquiry delivery and privacy policy; configure canonical/share URLs; complete production metadata/schema and the remaining phases. The current metadata and `robots.txt` intentionally prevent indexing. Do not remove those safeguards simply to raise an SEO audit score.

Secrets belong only in server environment variables when real integrations are added. No keys or `.env` files are committed. See `docs/04-technical-architecture.md` for planned server boundaries and the phase handoffs in `docs/` for verification evidence. Optional QA settings: `QA_BROWSER_CHANNEL` chooses an installed browser; `QA_BASE_URL` overrides the catalogue test's localhost URL. No application environment variables are currently required.

## Design foundation

The original Phases 1–4 dossier starts at `docs/README.md`. To view its standalone component board, open `design-system/index.html`. Phases 6–7 add the collection/product routes and material exploration. Phase 8 adds the bespoke journey, configurator and draft inquiry. Live inquiry delivery, later brand pages and AI concierge remain pending.

## Bespoke content and delivery

Routes: `/bespoke`, `/bespoke/configure`, `/bespoke/inquiry`. Edit the proposed process in `src/app/bespoke/page.tsx`. Update builder options, illustrative starting dimensions and validation in `src/features/bespoke/model.ts`. Input bounds are sanity limits, not fabrication capability. Shapes and edge options are briefing preferences; the SVG shows approximate plan/elevation proportions and colour, not verified construction or marble rendering. Material choices read from the same catalogue adapter as the Stone Library.

Journey state lives only in the root React provider. Client navigation retains drafts and locally selected files; refresh/closing clears them. No personal data is written to URLs, localStorage, analytics or a server. Exported text includes contact details and filenames, never image/PDF bytes. Visitors must attach originals separately when sharing. The client checks file count (3), each-file size (5 MB), combined size (10 MB), extension/MIME and magic bytes. This is not an upload scanner or a full file parser.

`POST /api/inquiries` validates same-origin JSON, a 32 KB streaming body limit, fields, configuration and collection references. All responses use `no-store`; valid drafts return **503 INQUIRY_UNAVAILABLE**, never a receipt. The draft UI does not call this endpoint. No email address, WhatsApp number, database or upload destination is invented.

Before enabling submission, implement the `LeadRepository`, shared `InquiryRateLimiter` and `PrivateReferenceStore` contracts in `lead-service.ts`; require durable storage, idempotent creation, private ownership-bound uploads, server byte/signature validation and quarantine. Add retention/privacy terms and an approved destination. Wire the UI only after these services pass end-to-end failure/success tests. Do not simply change `inquiryDelivery.available`: no live delivery implementation exists behind it. Store secrets server-side only.

`qualifyInquiry` scores brief completeness (product interest, dimensions, quantity, timeline and budget), with reasons and a rule version. It does not establish buyer value, pricing or lead priority and is not yet connected to a CRM.

`analytics.ts` dispatches local `sh-marbles:analytics` events: `configurator_completed`, `inquiry_started`, `brief_exported`. No external collector is installed. Connect an approved consent-aware adapter later; never add names, contact details, free text, filenames or budget/destination data. No `inquiry_submitted` event is emitted because nothing has been received.
