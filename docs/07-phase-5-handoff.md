# Phase 5 — Homepage handoff

## Delivered

The homepage is implemented in Next.js 16.4.0, React 19.3.0, TypeScript 7.0.2 and Tailwind 4.3.3. Package versions/licenses were checked against the registry before installation and are pinned in the manifest/lockfile. Node 24.19.0 was used locally. Only Next/React are runtime application dependencies; browser/accessibility/Lighthouse tools are development-only.

The homepage includes a portrait-led editorial hero, brand perspective, three collection cards, an accessible collection-study tab interface with alternate images, material colour studies, bespoke introduction, detail/craft section, trade invitation, project-brief dialog and footer. All navigation stays within implemented homepage sections. Product/collection routes, the full Stone Library, actual configurator and live inquiry/AI services remain for later phases.

The project-brief dialog preserves category context from a collection or trade CTA. Visitors can edit the draft, copy it or download a text file. It makes no network submission and explicitly says the brief has not been sent. No fictitious contact destination, price, delivery promise or stock information is present.

## Verification evidence

- `pnpm build`: successful optimized production build; homepage prerendered.
- `pnpm typecheck`: successful strict TypeScript check.
- `pnpm audit`: zero known vulnerabilities, including QA dependencies (233 total resolved dependencies reported by the audit).
- Seven viewport widths: 375, 390, 430, 768, 1024, 1440 and 1920 px. No horizontal overflow; one H1; all displayed images loaded; all internal anchor targets exist.
- Browser console/runtime errors: none during the verified homepage interactions.
- Axe WCAG 2 A/AA, 2.1 AA and 2.2 AA: zero violations on desktop, mobile, project dialog and mobile menu in the final run.
- Verified collection-card selection, tab arrows/Home, alternate image, material radios, project context, clipboard contents, downloaded brief contents, Escape, focus restoration, scroll unlock, reduced motion, server-rendered no-JavaScript content and HTTP 404.

Machine-readable results: `docs/phase-5-qa-results.json`. Local full-page screenshots and audit files are in ignored `output/phase-5/`. The initial axe run found two bronze labels on the darker collection surface; a darker contextual bronze resolved both. One browser assertion was corrected to wait for the asynchronous clipboard operation rather than checking too early.

This is evidence from a local production build on Microsoft Edge, not an assertion of universal WCAG compliance or field performance. Physical iOS/Android devices, screen-reader use and a public deployment are not covered by this phase.

The first mobile Lighthouse run measured Performance 90, Accessibility 100, Best Practices 100 and SEO 66, with FCP 1.3 s, LCP 3.0 s, total blocking time 180 ms and CLS 0. SEO is intentionally limited by noindex/robots. The LCP target of 2.5 s was not met in that run; the final refinement raises hero-image fetch priority and reduces its quality from 85 to 75. Accessible names were also adjusted to include visible label text after a non-scoring Lighthouse finding. A final Lighthouse record is in `docs/phase-5-lighthouse.json`; local HTML reports remain in ignored output.

## Four review perspectives

**Creative:** the rendered desktop and mobile compositions were reviewed. Warm surfaces, large editorial typography and asymmetrical imagery carry the visual system. The hero preserves the supplied portrait composition; no invented wide interior or fake project photography was introduced. The workshop source is used as a detail study, not a fabricated manufacturing history.

**UX:** every visible action leads to a real homepage section or a working local interaction. Dialogs use native modality; keyboard focus returns to the opening control. Collection categories and descriptive colour studies do not imply a verified catalogue.

**Engineering:** content records, server page composition, shared UI and client interaction components are separated. The original design board and application share CSS tokens. Images reserve layout space and use responsive optimization; local fonts total approximately 61 KB. No animation or 3D dependency is loaded.

**Commercial:** multiple paths carry intent into a clear project brief. A production inquiry destination remains a release prerequisite, because the official email/WhatsApp and backend have not been supplied. Saved drafts are never reported as received leads.

## Release boundary

Source is ready for repository review and future deployment. Public indexing remains deliberately disabled in metadata and robots. Canonical/absolute share URLs and business schema await the real domain/details. Original image provenance and public-use rights still need confirmation. The typographic wordmark is a design treatment, not an approved replacement for the original vector logo.

Next phase: collection/product experience (Phase 6). Phase 5 does not silently expand into later pages or backend work.
