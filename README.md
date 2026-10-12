# SH MARBLES

An editorial homepage for a marble furniture and handicraft brand. **Phases 1–5 are implemented; the remaining site is not yet built.**

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

On this Windows workspace, if Node/pnpm are not on PATH, run `./scripts/start-local.ps1`. It uses the available Codex runtime when necessary, otherwise your installed Node/pnpm. No environment variables or external services are required for the current homepage.

## Phase 5 features

- Next.js App Router, React, strict TypeScript and Tailwind CSS.
- Server-rendered editorial homepage with locally hosted fonts and optimized `next/image` assets.
- Responsive navigation with a native modal mobile menu, keyboard focus restoration and Escape support.
- Collection studies with accessible tabs, keyboard navigation and alternate views.
- Material colour studies with native radio controls; no unverified stone names or stock claims.
- Bespoke introduction, craft detail, architect/designer invitation and large closing CTA.
- Project-brief dialog with category context, editable text, clipboard and plain-text download.
- Reduced-motion support, visible focus, semantic headings and image descriptions.
- Homepage metadata, favicon, deliberate noindex and a custom 404 page.

**The project brief does not submit data.** It stays in page memory and can be copied or downloaded by the visitor. No contact details, backend, CRM, analytics provider, database or AI service is configured. Do not represent a downloaded brief as a sent inquiry.

## Project structure

```text
src/app/                 homepage, layout, global CSS, metadata and 404
src/components/          typed navigation, editorial UI and interactive islands
src/content/home.ts      editable homepage studies and navigation
public/media/            optimized derivatives of supplied imagery
design-system/           original review board, shared tokens, fonts and contracts
docs/                    strategy, asset audit, architecture and QA handoff
scripts/                 asset preparation, local launcher and browser QA
```

Edit the shared palette, spacing and motion tokens in `design-system/theme.css`. Next loads the existing fonts with `next/font/local`; the original board retains its own font declarations. `src/app/globals.css` contains homepage composition and responsive rules. `design-system/content-models.ts` defines future product/material/lead contracts; these are not a live catalogue or server validation.

## Content and imagery

Edit titles, studies, images and descriptions in `src/content/home.ts`; editorial sections are in `src/app/page.tsx`. Images are owner-supplied references with unconfirmed provenance/publication rights. Original JPGs are unchanged. `docs/phase-5-assets.json` records source/derivative mappings. Do not describe styled reference imagery as a completed client installation or assign geological names from appearance.

Optional image regeneration: `python scripts/prepare-homepage.py` with Pillow installed. Font source and OFL licenses are in `design-system/assets/`. The logo treatment is typographic; obtain the original vector brand mark before final identity approval.

Future product/material entries should follow the typed contracts, carry rights-cleared images, verified specifications and explicit unknown values. A CMS repository adapter, product routes and a real Stone Library are later phases.

## Checks

```sh
pnpm typecheck
pnpm build
pnpm audit
# Start the production server in another terminal before browser QA:
node scripts/qa-homepage.cjs
```

The browser script defaults to installed Microsoft Edge. Set `QA_BROWSER_CHANNEL=chrome` for Chrome. It exercises seven widths (375–1920 px), native menu/dialog, collection tabs, material radios, copied/downloaded briefs, reduced motion, no-JavaScript content and axe accessibility. Screenshots and detailed reports are saved under ignored `output/phase-5/`. Browser tools and Lighthouse are development-only dependencies.

## Deployment and release boundary

The app can build on a Node-compatible Next.js host; no deployment is performed here. Before public launch: confirm image rights/product claims; supply the domain and real contact channels; implement durable inquiry delivery and privacy policy; configure canonical/share URLs; complete production metadata/schema and the remaining phases. The current metadata and `robots.txt` intentionally prevent indexing. Do not remove those safeguards simply to raise an SEO audit score.

Secrets belong only in server environment variables when real integrations are added. No keys or `.env` files are committed. See `docs/04-technical-architecture.md` for planned server boundaries and `docs/07-phase-5-handoff.md` for current verification results.

## Design foundation

The original Phases 1–4 dossier starts at `docs/README.md`. To view its standalone component board, open `design-system/index.html`; it is separate from the production homepage. Phase 6 collection/product routes and all subsequent phases remain out of scope for this delivery.
