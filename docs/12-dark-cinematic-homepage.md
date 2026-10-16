# Homepage direction 02 — Dark cinematic

The owner rejected the earlier beige editorial design and chose dark cinematic luxury. This pass redesigns the homepage first, as agreed in the conversation. Existing collection, stone and bespoke routes retain their implementation for a later visual rollout.

## Art direction

- Near-black and charcoal backgrounds; soft ivory text and a restrained mineral accent.
- Full-height, image-led opening using the supplied black fluted basin photograph. A dark overlay supports readable type; no product or company imagery is fabricated.
- Large uppercase Manrope headline with tighter proportions. Cormorant is reserved for expressive supporting moments instead of every major heading.
- Distinct layouts: full-bleed hero, compact manifesto, three-column collection gallery, material close-up, bespoke diptych and full-width stone detail.
- Motion is a short, once-only image settle and text entrance. Reduced-motion preference disables it. No animation packages, video or WebGL dependency.
- The homepage theme is scoped through `.cinema-home` and `body:has(.cinema-home)`. Homepage navigation, footer, mobile menu and brief dialog follow the dark palette; other routes retain the existing theme.

## Functionality and content

Existing collection tabs, image switching, material radios, project draft, clipboard/download, keyboard navigation and bespoke links remain intact. No new prices, trade names, company facts or delivery claims. Existing imagery stays labelled as studies where appropriate. Contact sending remains in draft mode.

## Verification

Production build, homepage responsive/interaction/accessibility QA and screenshot review. Final evidence is saved separately as `dark-cinematic-qa-results.json`; screenshots are under ignored `output/phase-5/` from the existing QA script. No new Lighthouse score, deployment or push is claimed.

Verified: production build and TypeScript passed; seven responsive widths passed; four Axe states reported zero violations; tabs, material selection, draft export, keyboard controls and mobile navigation passed with no runtime errors.
