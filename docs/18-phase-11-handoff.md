# Phase 11 — Search foundations and measured loading improvements

## Implemented

- Route-specific canonical URLs, Open Graph URLs/images, Twitter cards and index/follow policy through one typed metadata helper.
- A validated production origin: explicit `SITE_URL`, or Vercel's actual `VERCEL_PROJECT_PRODUCTION_URL`. No guessed domain, contact address, phone, geological identity or company history.
- `SITE_INDEXABLE` is a separate build-time release switch. Local builds and Vercel previews remain noindex; production requires both a public HTTPS origin and the explicit switch.
- Repository-driven sitemap for 32 public editorial/catalogue routes. APIs and three interactive briefing tools are excluded. No fabricated modification dates or nonexistent regional hreflang routes.
- Organization/WebSite JSON-LD and semantic BreadcrumbList microdata. Visual product records use CreativeWork; only records explicitly marked verified emit Product data. No offers, prices, ratings or reviews are invented. JSON-LD serialization escapes markup delimiters.
- A 1200 × 630 branded social card rendered locally from the approved basin photograph. Its JPEG source is an unchanged copy of `IMG-20261011-WA0030.jpg`, used because the social-image renderer did not display the WebP source correctly.
- Corrected responsive collection image sizes, reduced unnecessary quality overhead, immediate mobile hero visibility and shorter desktop text entrances.
- Full gallery images mount only when the visitor opens the image dialog.
- No application dependency additions or upgrades. Production dependency audit reported zero known vulnerabilities.

## Verification

- Production build and fresh TypeScript check passed.
- 16 unit tests passed across SEO, bespoke and concierge contracts. SEO tests cover invalid domains, accidental preview indexing, production canonical/image output, private-tool noindex, markup injection and truthful schema.
- All 35 reachable page routes passed metadata, status, heading and structured-data checks. Preview robots and sitemap policy, missing-product 404, gallery opening/closing and social-card dimensions were checked.
- 12 representative mobile/desktop axe states: zero violations. Homepage regression also passed seven widths, four axe states, menu/dialog controls, copy/download, reduced motion and no-JavaScript content.
- Evidence: `phase-11-seo-qa.json`, `phase-11-homepage-regression.json`, `phase-11-performance.json`, `phase-11-dependency-audit.json`. Full Lighthouse reports and screenshots stay in ignored `output/`.

## Performance limits — do not overstate

Local mobile Lighthouse results are lab simulations, not field measurements:

| Page | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Homepage baseline | 82 | 100 | 100 | 66 |
| Homepage final | 83 | 100 | 100 | 66 |
| Stone Library | 85 | 100 | 100 | 66 |
| Product page | 90 | 100 | 100 | 66 |

Homepage LCP improved from 4.0 s to 2.5 s; measured CLS stayed zero. Main-thread blocking varied across runs, including an intermediate performance score of 75, which is retained in the report. The homepage and Stone Library have **not** met the 90 performance target. The SEO score is intentionally limited by preview noindex and robots policy, not solved by removing preview safeguards. Re-measure on the public host and prioritize remaining main-thread cost during final QA. No INP result is claimed; Lighthouse TBT is not a field INP measurement.

## Public deployment requested; currently pending access

The user authorized making the site publicly accessible with a hosting-provided URL. A Vercel project was created:

- Project: `sh-marbles` / `prj_kWBNJJgkt9W8urtiwYrlnxDgRvHG`
- Account: `team_5pTAbRBumfYafsx1QFR5xiqT` / `anaskhan56157-6412s-projects`
- Framework: Next.js; Node.js 24.x.

There is no successful deployment or verified public URL yet. GitHub linking reported a missing Login Connection. A later project read explicitly returned 403 Forbidden for the target account; the user is reconnecting Vercel. No CLI credentials/tool are installed to provide an authenticated fallback. Do not bypass this denial or deploy under another account without user direction.

When access is restored, deploy this tested source to the same project. `scripts/prepare-deployment.py` builds an allowlisted direct-upload payload and SHA-256 manifest under ignored `output/deployment/`; it excludes environment files, `.git`, installed packages, build output and unused original photographs. Keep preview protection; make the production address accessible as the user requested. Verify the resulting public URL without credentials, image optimization, catalogue routes, the concierge API, canonical URLs and sitemap before reporting the website as live.

Inquiry delivery and external AI remain unconnected and are labelled in the website. Public hosting does not turn downloaded briefs into submitted inquiries.

## Configuration

Copy `.env.example` to `.env.local` only when configuring a real origin. All settings are optional for local work:

| Variable | Meaning |
| --- | --- |
| `SITE_URL` | Real public HTTPS origin, no path/credentials/port/query. Overrides the hosting-provided origin. |
| `SITE_INDEXABLE` | Exact `true` enables eligible production content for indexing after rebuild. Default false. |
| `VERCEL_PROJECT_PRODUCTION_URL` | Hosting-provided fallback; not a value to invent manually. |

Rebuild after changes. The three tools (`/bespoke/inquiry`, `/bespoke/configure`, `/concierge`) remain noindex even on a released production build. No API keys belong in public environment variables.

## Reference documentation

- [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js sitemap convention](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap)
- [Next.js JSON-LD guidance](https://nextjs.org/docs/app/guides/json-ld)
- [Google Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product-snippet)
- [Vercel deployment API](https://vercel.com/docs/rest-api/deployments/create-a-new-deployment)
