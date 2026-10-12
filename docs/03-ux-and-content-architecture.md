# SH MARBLES — UX, conversion & content architecture

## Primary user tasks

Homeowner: understand what can be made → inspect a relevant piece → understand size/material choices → share a project brief.

Architect/designer: assess aesthetic fit → inspect materials/specifications → understand trade collaboration → submit a project with drawings and quantities.

International buyer: inspect products → find confirmed shipping/packing information → supply destination and quantity → request a quotation. Never imply delivery coverage until verified.

## Sitemap and page roles

| Route | Job | Primary conversion / content |
|---|---|---|
| `/` | Establish material, product and craft identity | Explore collection; commission a piece |
| `/collections` | Browse four editorial categories | Tables, basins, objects, bespoke |
| `/collections/tables` | Browse table types | Product detail / size inquiry |
| `/collections/basins` | Browse basin types | Product detail / technical inquiry |
| `/collections/objects` | Discover smaller stone objects | Product inquiry |
| `/products/[slug]` | Inspect one piece | Request price; customize this piece |
| `/stone-library` | Browse verified materials | Material detail / carry choice to inquiry |
| `/stone-library/[slug]` | Understand one stone | Applications, origin if verified, sample request |
| `/bespoke` | Explain commission journey | Start bespoke project |
| `/bespoke/configure` | Collect a visual starting brief | Configuration → inquiry summary |
| `/projects` | Browse approved installed work | Residential / hospitality / commercial filters |
| `/projects/[slug]` | Prove a real collaboration | Related products / discuss similar project |
| `/craftsmanship` | Demonstrate the making process | Inquire about a piece |
| `/about` | Explain people, workshop and philosophy | Contact / craft story |
| `/trade` | Support professional specification | Trade inquiry, sample request |
| `/contact` | Submit a useful project brief | Inquiry / verified WhatsApp / email |
| `/privacy`, `/terms`, `/care` | Explain policies and care | Approved factual guidance |

Page paths are planned only. Do not expose empty project/category routes or fabricated portfolios. Rename display labels without changing established slugs later. Basins navigation may display “Marble sinks” for clarity while retaining one canonical route.

## Navigation

Desktop at 1280 px+: wordmark, Collections, Stone Library, Bespoke, Projects, Craftsmanship, About, Trade, Contact; distinct “Start a Project” CTA. At narrower sizes use a labelled Menu button before links collide. Mobile: native dialog or equivalent accessible drawer; focus containment, Escape, return focus to trigger, active-page indication, body-scroll restoration. Within Collections show Tables / Basins / Objects / Bespoke, accessible by click and keyboard, never hover alone.

Footer groups Explore / The atelier / Connect, plus approved social/contact links. Do not render inactive social icons or fake contact details. Country and shipping language waits for confirmation.

## Homepage wireframe specification (Phase 5, not built)

| Sequence | Composition | Purpose / next step |
|---|---|---|
| 01 Hero | Wide architectural product image; short headline, two actions | Identify product immediately; explore or commission |
| 02 Material story | Quiet statement with one macro / process image | Explain why material and making matter |
| 03 Collections | Alternating portrait and landscape image blocks | Route to tables, basins, objects and bespoke |
| 04 Signature pieces | Two or three large product studies | Introduce verified pieces with material and size |
| 05 Stone Library | Tactile sample/whole-slab pair | Explore verified materials |
| 06 Bespoke | Seven-step summary, two-step entry CTA | Lower uncertainty about commissioning |
| 07 Craft / trade | Real making evidence + professional route | Support confidence and larger projects |
| 08 Final inquiry | “Have a piece in mind?” and restrained footer | Make next action unmistakable |

Do not show a section whose substantive content is missing just to match this outline. On mobile use image → title → concise description → CTA, 24 px gutters and 64–80 px section spacing. Show the object in the initial viewport where practical. No autoplay video or carousels at launch.

## Product and material experiences

Product: editorial hero, descriptive title/story, gallery, specification table, customization, verified making/lead-time/shipping information, related materials, inquiry. Unknown values read “Confirm with the studio” in drafts; production publication requires an approved minimum record. A single stable inquiry CTA remains available without covering content. Hover images enhance rather than reveal essential information.

Stone: colour/vein filters plus names, result count, reset and useful empty state. Filter controls use labelled native inputs. Material record includes image, verified trade name, origin evidence, variation note, finishes and approved applications. Do not infer outdoor/wet-area suitability or stain resistance from appearance.

Projects: filters update a list in place and announce the count. Only approved real installations count as projects. Supplied styled scenes may become a separately labelled “Ideas” editorial feature, not the portfolio.

## Bespoke and configurator specification

Seven steps: share inspiration → select stone → establish dimensions → refine design → fabricate → inspect → arrange delivery/installation where available. Describe this as a proposed process until the business confirms it.

Configuration is a request brief, not a structural or price calculator. Collect product type, allowed shape, stone ID, allowed edge and millimetre dimensions. Use product-specific option matrices; never offer every edge on every object. A 2D diagram with an honest “indicative preview” label is sufficient. Unknown combinations go to manual review. No apparent photographic material swap using an unrelated surface. Summary can be edited, copied and carried into inquiry; verified WhatsApp destination only. Do not claim an order is placed.

## Inquiry architecture and conversion

Progressive form: (1) project (product, dimensions, quantity, marble, timeline, residential/commercial), (2) destination and optional budget, (3) name/contact and references. One-page accessible fallback; users can go back without losing values. Required initially: name, email or phone, country/delivery area, product/project interest and a brief. Company, dimensions, budget and files can be optional to avoid blocking early-stage buyers. Labels specify units; “Not decided” is valid for stone and budget.

Include phone/WhatsApp, company, country, email, product, dimensions, quantity, preferred stone, budget range and currency, delivery location, message and reference files. Inline errors plus focusable summary; submitting state prevents duplication; network failure retains values. Success only after server persistence. Unconfigured backend must say it cannot submit and offer a verified alternative, never fake success. No invented response-time promise.

WhatsApp is a quiet labelled contact control, respectful of safe areas and accessible at 44 px+. Prepopulate product/configuration only, let the visitor send it themselves. Do not transmit email, budget or file links without an explicit user action.

## Lead qualification and analytics plan

Use transparent routing metadata, not opaque assumptions about nationality or wealth. Proposed scoring: +2 explicit project/type; +2 dimensions; +2 quantity above one; +2 stated timeline; +1 budget shared; +1 drawing attached. Commercial/residential and destination select the appropriate workflow without inherently reducing priority. Unknown values score zero, not rejection. Store score rules/version and preserve the original brief. Business must calibrate before use.

Events: `whatsapp_clicked`, `inquiry_started`, `inquiry_submitted`, `product_viewed`, `marble_selected`, `bespoke_clicked`, `trade_inquiry`, `configurator_completed`. Properties limited to IDs, route, source, category and configuration step; never names, contact details, message text, exact address or uploaded filenames. Consent-aware analytics adapter with a no-op default. A submission event requires confirmed persistence and is deduplicated by a non-personal event ID.

## SEO and international structure

Home targets handcrafted marble furniture; tables target custom/luxury marble tables; basins target marble sinks/wash basins; bespoke targets custom marble furniture; trade targets manufacturer/export enquiries only when capability is verified. Use one descriptive H1, unique title/description, readable slugs and real internal links. No thin keyword-location pages.

Implement Next metadata, canonical URLs, Open Graph/Twitter images, generated sitemap/robots and breadcrumbs in later phases. Product JSON-LD contains only published factual fields; omit offers, reviews, availability and prices unless real. Organization schema uses verified identity/contact data only. Staging and this board remain `noindex`. No production canonical can be set until domain ownership is known.

Start in English with centralized content and locale-aware URL helpers. Reserve `/pk`, `/ae`, `/sa`, `/us`, `/uk` for genuinely localized content later; add self/reciprocal hreflang only when real alternates exist. Avoid launching duplicate country pages. Preserve an RTL-capable layout using logical CSS properties.

## Later acceptance criteria

Every main route and CTA works; filters have empty states; configured values survive inquiry handoff; consent is clear; keyboard users can complete each path; no fabricated facts. Test 375, 390, 430, 768, 1024, 1440 and 1920 px plus 200% zoom, reduced motion, failed submission and slow network. Phase 5 must pass its homepage review before further page implementation.
