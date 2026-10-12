# SH MARBLES — Design system v0.1

## Delivered foundation

Open `design-system/index.html` through the local review server. It is deliberately a design-system board rather than a disguised homepage. `tokens.css` defines shared decisions, `components.css` contains reusable UI primitives, `board.css` composes the review artifact, and `board.js` runs local interaction demonstrations. All imagery is labelled as supplied reference material; no submission or tracking occurs.

No React components are claimed as delivered yet. The HTML/CSS specimens establish tested anatomy/states for later typed React components. Component names below specify the intended application API; actual menu, inquiry, filtering, gallery and configurator implementations belong to their later phases.

## Token system

Colour, font family, fluid type size, spacing, page gutters, reading measure, radius, borders, shadow and motion are centralized in `tokens.css`. Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 96, 128, 160 px. Use semantic section/gutter aliases to adapt proportion, rather than scattering breakpoint overrides. Containers max at 1600 px; normal content max 1312 px. Control radius 2 px; editorial imagery/cards 0. Only overlays receive a shadow.

Desktop 12 columns; tablet 8; mobile 4. Responsive boundaries at 768/1024, with production full navigation at 1280+. Main actions minimum 48 px high; descriptive labels stay 16 px inside fields to avoid mobile input zoom. Typography and colour roles are documented in Phase 2.

In Next.js, import the same CSS tokens globally; map them through Tailwind `@theme inline` aliases instead of maintaining a second palette. Migrate `@font-face` to `next/font/local`, preserve fallbacks and account for metric differences. Board-specific layouts do not become production components.

## Component inventory and contracts

| Component | Anatomy / states | Delivered now / later |
|---|---|---|
| Button | Native button for actions; anchor for destinations; primary/secondary/text; focus, hover, disabled, loading | CSS/HTML action specimens; typed React wrapper later |
| SectionHeading | Eyebrow, semantic heading, optional short supporting text; responsive split | Reusable class + multiple specimens |
| ImageReveal | Reserved ratio, alt, focal point; visible before JS; optional small reveal | Image-frame / hover treatment now; reveal only if justified later |
| ProductCard | Single meaningful link, image, title, verified meta; alternate image optional | Object specimen; confirmed product data later |
| CollectionCard | Editorial image and heading; arrow is decorative | Basin specimen; real collection routing later |
| MaterialCard | Actual texture, verified name, textual tone/vein descriptor | Contract only; no actual stone samples supplied |
| ProjectCard | Permission-cleared installed photo, sector and location | Contract only; no verified projects supplied |
| Navbar / MobileMenu | Link list, active page, CTA; drawer Escape/focus/scroll management | Board index with native disclosure; production navigation later |
| Footer | Large final CTA, grouped navigation and verified contact data | Board footer specimen; public footer later |
| InquiryForm | Labels, help, errors, error summary, pending/success/failure; files and privacy | Local field/validation/reset specimens; actual form Phase 8/9 |
| Gallery | Large first image, keyboard-operable thumbnails; dialog accessible if used | Image ratios/spec only; production gallery Phase 6 |
| MarbleSelector | Native radio group, actual sample, selected indicator and clear label | Generic tone radio specimen; actual material selection Phase 7/8 |
| ProcessTimeline | Ordered list, semantic titles, numbered line, mobile stacking | Four-phase reusable specimen; seven making steps later |
| AnimatedText | Plain semantic text visible without JS; one accessible reading order | Motion contract only; no decorative splitting library |
| Disclosure | Native details/summary; state marker, keyboard and focus | Interactive specimen |
| Field | Associated label/help, invalid state, non-colour error | Interactive and static state specimens |

## Interaction behaviour

- Primary specimen focuses the example form; secondary scrolls to image cards. All specimen controls have honest local outcomes.
- Form checks only an example name and never sends data. Empty/whitespace value shows an inline error and focuses the field; valid sample produces an explicit “Nothing was sent or saved” message. Reset clears feedback.
- Tone controls use real radios and announce selection; they do not identify actual marble.
- Mobile index uses native details and closes on navigation or Escape. It is an in-flow/popover-style index, not a modal; it does not trap focus. A later production full-screen dialog must trap/restore focus properly.
- Hover zoom ≤1.025. Focus has an equivalent response. Reduced motion removes transforms/transitions and smooth scrolling. Essential information is never hover-only.
- Focus rings use bronze on pale surfaces. Production dark sections need an explicitly light ring if bronze cannot achieve 3:1 against the adjacent dark colour; the board applies a light override there.

## Foundation release checks

Review every supplied image; preserve originals. Verify the board at all requested widths, check image/font loading, console errors, anchor destinations, native disclosure, radio behaviour, example validation and keyboard focus. Measure actual text/control colour pair contrast. Review screenshots after checks, adjust any awkward headline wrapping/cropping. Document measurements and limitations in `06-review-and-handoff.md`.

No Lighthouse score, end-to-end inquiry reliability, AI correctness or public SEO readiness can be claimed from this foundation alone.
