# Phases 6–7 — Collection experience & Stone Library

## Delivered

Phase 6 adds `/collections`, three category routes (tables, basins, objects) and eight product-study routes. Visitors can search/filter products, inspect supplied views and labelled detail crops, open a full-image gallery, read specification and customization information, browse related pieces and carry a product reference into a price/customization brief.

Phase 7 adds `/stone-library` and six material-study routes. Visitors can filter by tone and pattern, search descriptions, reset an empty selection, compare two or three studies, remove selections and carry their material directions into a downloadable/copyable brief. Comparison changes to a vertical reading order on small screens. Detail pages show the source photograph, descriptive palette, visible pattern, unknown origin/finish fields and related visual product directions.

The homepage, navigation and shared footer link to the new routes. The project-draft provider now spans the application, so a draft can remain available during client navigation. Context is replaced on each new inquiry trigger, preventing a previous product from being included in a material-only brief. Visitors can remove the reference explicitly.

## Content boundary

The owner authorized proceeding with provisional content and will supply confirmed catalogue facts later. The eight piece titles and six material titles are descriptive editorial names. Actual stone/trade names, origins, dimensions, finishes, weight, availability, production time, shipping and suitable applications remain unconfirmed. Unknown fields are `null` or empty lists, not guessed values.

The six additional optimized images derive from supplied originals; `phase-6-7-assets.json` records the mappings. Surface images are explicitly photographic details, not slab scans. Original files remain unchanged. Public repository publication of the supplied images was separately approved by the owner; their photographic/render provenance and depiction of actual SH MARBLES products remain unconfirmed.

Briefs are copied/downloaded by the visitor and are **not submitted**. There are no prices, fake stock states, fabricated manufacturing claims, geographic origin assumptions or shipping promises. The configurator, live inquiry service, CRM and AI are later phases.

## Architecture

- `src/content/catalogue-models.ts`: explicit product, material, collection and image contracts.
- `src/content/catalogue.ts`: local records behind the asynchronous `CatalogueRepository` read boundary.
- Static route generation and unique page/social metadata. Unknown slugs return real 404 responses.
- Server-rendered page composition; small client components for search, galleries, comparison and briefs.
- Shared header/footer/provider, breadcrumbs, product cards, surface images and palette components.
- No new dependency. Existing Next image optimization, local fonts, CSS and native dialogs handle the experience.
- Root README documents content editing, adding products/materials, CMS replacement, local setup and deployment prerequisites.

## Verification

The final production build and TypeScript check passed. Catalogue browser testing covered **35 responsive checks**: five representative route types at 375, 390, 430, 768, 1024, 1440 and 1920 px. No horizontal overflow or unloaded displayed images occurred; each page had one H1.

All **20 linked public page routes** returned 200 with unique titles and preview noindex. Invalid category/product/material routes returned 404. The browser reported no console/runtime errors during the tested flows.

**15 Axe states passed with zero violations** against WCAG 2 A/AA, 2.1 AA and 2.2 AA: desktop/mobile route views, full-image modal, product brief, desktop/mobile comparison and mobile navigation. Tests verified search/filter combinations, empty/reset states, three-study maximum, selection removal, image switching, modal keyboard closing and focus restoration, scroll restoration, contextual clipboard/download contents, stale-context clearing, specification disclosures, cross-route mobile navigation, reduced motion and server-rendered content without JavaScript.

Initial checks caught a small bronze label with insufficient contrast on limestone and an invalid ARIA label on decorative colour swatches. Both were corrected. A focused rerun retained successful unaffected checks and reran the Stone Library routes and all interaction flows. The consolidated report is `phase-6-7-qa-results.json`; screenshots and full logs are in ignored `output/playwright/catalogue/`.

These are local Microsoft Edge checks, not field performance or a claim of complete accessibility certification. Physical device testing, screen-reader review and a public deployment remain outside this evidence.

The existing homepage regression also passed all seven widths, its interaction flows and four Axe states with no console/runtime errors. Evidence: `phase-6-7-homepage-regression.json`.

One mobile Lighthouse run of `/stone-library` measured Performance **79**, Accessibility **100**, Best Practices **100**, SEO **66**; FCP 1.6 s, LCP 1.8 s, TBT 890 ms, CLS 0 and Speed Index 1.7 s. The 90+ performance target is **not met** in this local run. The trace shows substantial style/layout work and framework script evaluation; unused JavaScript was estimated at 29 KiB. This needs further work in Phase 11 and measurement on the deployment host. No score is represented as a field guarantee. SEO is intentionally limited by preview noindex/robots. The summary is `phase-6-7-lighthouse.json`; the full local HTML/JSON reports remain in ignored output.

## Four review perspectives

**Creative:** desktop/mobile imagery, typography, asymmetric collection introduction, material colour studies and comparison layout were inspected. Excessive hero magnification was reduced to preserve the supplied photograph's detail. Real slab/macro assets would improve the material library when available.

**UX:** navigation exposes real routes, filters provide result counts and useful resets, comparison limits are explicit, and all inquiry actions explain that a draft has not been sent. Modal controls work without a mouse and restore focus.

**Engineering:** typed data is separate from reusable components and routes, unknown facts are explicit, and content is statically rendered without a new UI dependency. A CMS adapter can replace the local read repository; runtime CMS validation will be required when that integration is added.

**Commercial:** product identity and material preferences reach the brief, supporting more specific future inquiries. Actual submission and confirmed commercial specifications still need the later inquiry phase and business data.

## Scope and release

Phases 6–7 are implemented locally. Phase 8 has not been started. Preview indexing remains off; production domain/canonical URLs, verified catalogue data and a real inquiry destination remain launch prerequisites. No deployment or GitHub publication was performed as part of these phases.
