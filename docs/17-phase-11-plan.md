# Phase 11 — SEO, performance and accessibility

## Scope
Audit the production build, add accurate route metadata and structured data, improve measured loading behaviour, and verify responsive/accessibility regressions. The owner also requested public access during this phase; inspect the connected host and deploy the tested result when available. Use the host-provided address until a custom domain is confirmed.

## Search architecture
One validated canonical origin, unique page canonicals, complete social cards, WebSite/Organization identity and breadcrumb data. Visual product studies use CreativeWork rather than inventing Product offers or reviews. Verified products may use factual Product schema without fake prices. Generate the sitemap from the same repository as the pages; exclude APIs and private briefing tools. Do not add hreflang entries for untranslated/nonexistent regional pages. Support a future domain through configuration.

## Release controls
Public availability and search indexing are separate. Keep preview deployments noindex. Enable indexing only on an explicitly configured production build with a real canonical origin and approved release flag. The public website must continue to disclose draft inquiries, unconnected AI and visual-study content. Do not invent contact information to complete schema.

## Measurement
Capture Lighthouse before and after on representative page types, inspect render-blocking resources, image requests, layout shift and main-thread cost. Implement only evidenced improvements and avoid dependency churn. Re-run browser accessibility and affected interactions. Distinguish local lab scores from field Core Web Vitals; do not claim a measured INP from Lighthouse TBT.
