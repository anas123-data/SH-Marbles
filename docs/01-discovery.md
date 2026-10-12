# SH MARBLES — Discovery

Status: Phase 1 complete. Brand name confirmed by the owner. All other unknowns below remain open.

## Scope of this delivery

Complete Phases 1–4: discovery, creative direction, UX/technical architecture, and a reusable design-system foundation. No homepage, public product pages, functioning lead service, AI agent, or deployment is included at this stage. The browser review board is an internal design artifact, not a storefront.

## Workspace findings

- 22 supplied JPG files; approximately 3.5 MB total. Originals are preserved unchanged at the workspace root.
- No application, package manifest, Git checkout, AGENTS.md, catalogue spreadsheet, font files, contact sheet, business information document, or existing site URL was present.
- One supplied image contains an SH logo with small “MARBLE” lettering. The owner has confirmed the public name is **SH MARBLES**. Obtain a vector source before making a production logo; the review board uses a proposed typographic wordmark, not a replacement approved identity.
- Node and Python are available through the bundled Codex runtime, although ordinary shell PATH entries are unavailable or incomplete. This stage requires no npm application dependencies.

## Asset audit

See `asset-contact-sheet.jpg` for all images and `asset-inventory.json` for exact dimensions/bytes. Visual observations below are descriptive, not verified product specifications.

| Files (IMG-20261011- prefix) | Observed subject | Proposed use | Caution |
|---|---|---|---|
| WA0005 | Dark green rectangular basin photographed in a work setting | Craft/product evidence after confirmation | Background clutter; not a cinematic hero |
| WA0007, WA0008 | Dark veined side table in an interior | Table collection / product portrait | Similar compositions; establish whether photographs or renders |
| WA0010 | Pale round basin | Product silhouette | Stone identity and finish unknown |
| WA0011, WA0012 | Dark basin with gold-toned veining | Basin collection | Visually near-identical; avoid repeated use |
| WA0013 | Screenshot showing a basin and mobile UI | Reference only | Exclude from public imagery; visible app chrome |
| WA0015, WA0017 | Warm pale basin, different interior settings | Basin details / visual direction | Avoid implying two installed client projects |
| WA0016 | Pale basin with a rough-textured outer wall | Craft contrast | Do not infer finishing technique from appearance |
| WA0018, WA0019, WA0021 | Pink/pale-toned basins | Colour range reference | Geological names unknown |
| WA0020 | Dark oval basin in a bathroom | Collection image | Product and installation provenance unconfirmed |
| WA0023 | Translucent-looking amber/green-toned basin | Material richness reference | Do not label as onyx without confirmation |
| WA0030 | Dark fluted round basin | Signature-detail reference | Dimensions and stone unknown |
| WA0032, WA0037 | Burgundy-toned rectangular fluted basin | Landscape detail / basin collection | Similar object in different settings; not verified projects |
| WA0038, WA0040, WA0041 | Stone noughts-and-crosses sets | Objects collection | Verify catalogue and case/accessory inclusion |
| WA0049 | Small logo within tall black/white canvas | Identity reference | 561 × 1280 overall, much smaller usable mark; request SVG/PDF |

Most interiors are 1024 × 1536 portraits. WA0032 and WA0037 are 1536 × 1024 landscape images; WA0005 is 1600 × 1200. These support a strong portrait-led visual study, but do not substantiate manufacturing capacity or completed commissions.

## Evidence and publication rules

Owner-supplied files can inform this local review. Public-use rights, product authenticity, rendering status, and permission to represent installations as SH MARBLES projects are **not yet confirmed**. Every asset record defaults to `review-only`. Use visual descriptions rather than commercial stone names. Do not publish these files as a portfolio until cleared.

## Missing content, in priority order

1. Image provenance/publication rights; original logo vector; contact email, WhatsApp number, location and domain.
2. Confirmed product list: names, categories, dimensions with units, weight, finishes, customization limits and approved descriptions.
3. Hero photography: a real hero table in an architectural setting, 3000 px+ landscape plus a separately composed portrait; product must remain visible behind headline-safe space.
4. Real craft coverage: people, slab selection, cutting, shaping, polishing, inspection and protective packaging; permission for identifiable people.
5. Actual stone samples: front-lit colour-managed macro and full slab, trade name, source/origin evidence, care and suitable applications.
6. Actual project case studies with client permission, project type and location; approved trade services, technical drawings and samples process.
7. Business policy: quotation process, lead-time wording, shipping/installation coverage, returns, privacy, retention and consent.

None prevents an internal visual foundation. Missing content gates later publication of the affected feature, not design exploration.

## Skills and dependency discovery

Official `openai/skills` curated catalog searched using Skill Installer. Installed only **playwright** (later browser QA) and **security-best-practices** (later lead/API review). Already available: Sites, React best practices, image generation, Figma and Vercel capabilities. No duplicate Figma skills or hosting plugins were installed. No animation, 3D, CMS, analytics, or AI package was added.

Sites guidance is used for presentation structure and local review. The owner's explicit Next.js preference and Phase 1–4 limit take priority over a hosted starter/deployment workflow. Runtime/package choices are recorded in `04-technical-architecture.md`; stable releases and advisories must be checked when Phase 5 installs dependencies.
