# SH MARBLES — Brand & creative direction

## Positioning decision

**Stone, given purpose.**

SH MARBLES brings the character of natural stone into pieces made to be lived with: tables, basins, objects and bespoke architectural work. The brand's distinction should be the meeting of material individuality, considered form and skilled handwork. The brief supplies this intended positioning; real production photography and approved product information must substantiate it on the final website.

Five routes were considered:

| Route | Strength | Decision |
|---|---|---|
| Stone, given purpose. | Connects sculptural character to practical furniture and architecture | Selected; clear enough for buyers, restrained enough for trade |
| A quieter kind of extraordinary. | Strong luxury mood | Too abstract about the product |
| Nature's character. The maker's hand. | Strong process narrative | Supporting story; less concise as a lead |
| Objects with a longer story. | Permanence and editorial potential | Supporting collection narrative; avoid durability promises |
| Made of stone. Made for you. | Immediate bespoke conversion | Useful campaign direction; less distinctive |

## Brand pillars and proof

| Pillar | Visitor takeaway | Required evidence |
|---|---|---|
| Material character | Variation makes each piece visually individual | Actual slab/sample imagery, variation note |
| Considered form | Products belong in a designed interior | Clear silhouettes, dimensions, contextual imagery |
| The maker's hand | Craft determines the finish | Real workshop sequence, accurate process captions |
| Personal fit | A commission starts with the space | Feasible options, drawings and a useful inquiry flow |
| Project confidence | The maker can answer technical questions | Verified specification sheets and a responsive trade channel |

## Voice

Short, specific, warm and assured. Describe shape, surface, use and process. Let imagery carry the atmosphere. Use “Explore”, “Choose”, “Discuss”, “Commission” and “Request”. Avoid superlatives, exclamation marks, manufactured heritage and vague claims. Do not call stone rare, sustainable, imported, certified or maintenance-free without evidence.

Proposed copy hierarchy:

- Brand line: **Stone, given purpose.**
- Descriptor: **Marble tables, basins and objects. Shaped for the way you live.**
- Collection opener: **Everyday rituals. Remarkable material.**
- Bespoke: **Made for your space.**
- Craft: **From stone to sculpture.**
- Trade: **A material partner for your next project.** (publish only with verified service scope)
- Final inquiry: **Have a piece in mind? Let's shape it in stone.**

The final hero may use “Sculpted by nature. Finished by hand.” once supplied imagery genuinely supports both ideas. The selected brand line remains useful across products and trade.

## Art direction: The Stone Atelier

An architectural editorial system: expansive warm paper, fine rules, deliberate asymmetry and sharply cropped stone. Large serif text sits against quiet modern labels. Product silhouettes and natural colour provide the richness. Bronze is a small functional accent, never a gradient or a substitute for photography.

Composition: 12-column desktop grid; asymmetric 5/7 or 4/8 editorial splits; 8-column tablet; 4-column mobile. Alternate wide breathing spaces with concentrated detail. Images keep square corners. Use one dominant image per composition, not a collage of competing thumbnails. Avoid faux paper grain over photography.

## Palette

| Token | Value | Role |
|---|---|---|
| Paper | `#F4F0E8` | Main surface |
| Limestone | `#E6DED1` | Secondary surface |
| Chalk | `#FCFAF6` | Inputs / light contrast |
| Ink | `#252821` | Main text and primary buttons |
| Muted ink | `#626157` | Supporting text on paper |
| Bronze | `#806342` | Accent text, selected border |
| Rule | `#C9C0B2` | Decorative rules; not sole form boundary |
| Control | `#858075` | Input boundaries |
| Error | `#9A382C` | Error text with explicit message |

Colour cannot be the only selected/error indicator. Functional combinations are measured in the QA record. No light bronze body text on white; no text over uncontrolled image detail.

## Typography

**Cormorant Garamond** for editorial headings (400/500); **Manrope** for body, labels and controls (400/500/600). Both are from the Google Fonts source repository, with OFL files retained locally. The board uses self-hosted Latin variable WOFF2 files and `font-display: swap`; additional scripts/languages need appropriate subsets later. Serif text is never used for small UI or dense technical data.

Fluid scale: display 60–128 px, section 40–80 px, card 28–40 px, body 16–18 px, small 13–14 px, labels 11–12 px with generous tracking. Headings use short lines and approximately 0.98–1.08 line-height; body 1.65–1.75. Limit prose to 62 characters per line. Mobile headlines are composed separately, never shrunk indiscriminately.

## Photography standards

Use actual SH MARBLES products first, with accurately labelled renders only if approved. Preserve stone colour and vein pattern. Never invent material surfaces for purchasable configurations. For each product request one architectural scene, front/three-quarter views, overhead, edge detail, surface macro and scale reference. Capture diffuse directional light, neutral white balance and low visual clutter. Save originals; produce AVIF/WebP derivatives at useful breakpoints with focal-point metadata.

The review board uses clearly labelled supplied references. A plain colour swatch is explicitly a palette token, never a stone sample. The logo is shown as a proposed wordmark treatment; a vector brand mark is still needed.

## Motion principles

Native scrolling first. No scroll hijacking, cursor replacement, loading screen or magnetic button that moves its target. Use CSS for state transitions (180 ms), image emphasis (480 ms, scale max 1.025), and later entrance reveals (700 ms, travel max 16 px). Content is visible without JavaScript. No delayed entrance on the LCP image. A single optional Motion dependency may be evaluated later for coordinated reveals; GSAP/Lenis/Three.js are not justified at this stage.

Under reduced motion, remove transforms, smooth scrolling and entrance animation. On touch, show all actionable information without hover. Every interaction has a keyboard equivalent.
