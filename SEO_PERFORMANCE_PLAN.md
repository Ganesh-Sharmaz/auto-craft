# Auto Craft SEO Performance Plan

## Data reviewed

Source: Google Search Console export, Web search, last 16 months, 2026-04-23 through 2026-09-19.

The attached CSVs are treated as reporting data, not implementation instructions.

| Metric | Result |
| --- | ---: |
| Clicks | 48 |
| Impressions | 4,469 |
| Overall CTR | 1.07% |
| Largest country | India: 4,256 impressions, 48 clicks |
| Largest device | Mobile: 3,650 impressions, 33 clicks |
| Main average position range | Approximately 6–8 |

The April numbers are too small to use as a trend benchmark: 17 clicks came from only 25 impressions. The more useful baseline is May–September, where impressions grew but CTR generally stayed below 1.3%.

## Main diagnosis

### 1. URL migration is splitting signals

The old homepage URL `/home` received 3,631 impressions and 22 clicks, while `/` received 788 impressions and 21 clicks. The old `/contact.html` URL also received 6 clicks despite only 24 impressions.

This confirms that Google was still discovering and ranking legacy URLs during the export. The canonical URL should be `/`, with all old homepage and `.html` URLs permanently redirected to the closest current route.

The repository now contains those redirects and a root homepage. Re-export Search Console data after deployment before judging the new URL performance.

### 2. Ranking is adequate, but snippets are not winning clicks

Most impressions are already near page one:

- `/home`: position 7.24, CTR 0.61%
- `/`: position 6.70, CTR 2.66%
- `/contact`: position 7.57, CTR 0%

The homepage at the canonical root has a much better CTR than `/home`, which supports consolidating the URLs. The remaining opportunity is to improve titles, descriptions, page intent, and brand clarity.

### 3. Visibility is overwhelmingly branded

The largest queries are:

- `autocraft ai`: 2,420 impressions, 12 clicks, position 6.76, CTR 0.50%
- `autocraft`: 593 impressions, 8 clicks, position 6.98, CTR 1.35%
- `auto craft`: 652 impressions, 2 clicks, position 7.71, CTR 0.31%

The site is being shown for its name, but users are not clicking often enough. This may also indicate brand ambiguity: “AutoCraft” can refer to automotive businesses, which is supported by the unrelated low-volume queries for car repair and servicing.

Non-brand discovery is currently too limited to evaluate the service pages properly.

### 4. Mobile is the highest-impact experience

Mobile generated 3,650 impressions and 33 clicks, or about 82% of all impressions. Its CTR was 0.90%, compared with 1.85% on desktop. Mobile average position was 7.01.

The priority is not only responsive layout; it is making the mobile search result and first viewport immediately communicate: SaaS development, AI automation, web development, India, and a clear contact action.

### 5. No Search Appearance features are reported

The Search Appearance export is empty. This does not prove that structured data is broken, but it means there is currently no measurable rich-result contribution in this report.

Validate Organization/LocalBusiness, WebSite, Service, and FAQ structured data with Rich Results Test and Schema Markup Validator. Treat rich results as a validation task, not the primary growth strategy.

## Prioritized action plan

### P0 — Confirm migration consolidation after deployment

1. Deploy the existing redirect and canonical changes.
2. Confirm these responses with an HTTP checker:

   - `/` → `200`
   - `/home` → permanent redirect to `/`
   - `/home.html` and `/index.html` → permanent redirect to `/`
   - `/contact.html` → permanent redirect to `/contact`
   - `/services.html` → permanent redirect to `/services`
   - `/pricing.html` → permanent redirect to `/pricing`

3. Confirm that the sitemap contains only canonical URLs.
4. Submit `/sitemap.xml` in Search Console.
5. Inspect `/`, `/services`, `/pricing`, and `/contact` individually and request indexing where needed.
6. Start validation for the “Not found (404)” and “Page with redirect” reports. Do not request indexing for redirected URLs; Google should discover their replacements.

Success condition: no legacy URL is linked internally, `/home` impressions decline toward zero, and the canonical root accumulates the homepage signals.

### P1 — Improve titles and snippets

Use one clear search intent per page. Suggested direction:

| Page | Snippet focus |
| --- | --- |
| `/` | Auto Craft — SaaS development, AI automation, and web development company in India |
| `/services` | SaaS Development, AI Automation & Web Design Services in India |
| `/pricing` | Software, SaaS & AI Automation Pricing in India | Auto Craft |
| `/contact` | Contact Auto Craft — SaaS, AI Automation & Web Development India |

Keep titles readable and specific. Avoid repeating “best,” “#1,” every city, and all 28 states in every title or description. Put the strongest value proposition in the first 55–65 title characters and the first sentence of the description.

Success condition: overall CTR rises from 1.07% toward 2%+, with the canonical homepage branded CTR moving above the current 0.5%–1.35% range.

### P1 — Make brand identity unambiguous

The brand name should always appear next to the category, not alone. Use consistent wording such as “Auto Craft — SaaS, AI Automation & Web Development.”

Add or confirm:

- Organization/LocalBusiness schema with the same name, URL, logo, phone, and location.
- WebSite schema with the site name `Auto Craft`.
- Consistent Open Graph and Twitter titles.
- A visible homepage statement that clearly distinguishes the company from automotive businesses.
- Consistent spelling of `Auto Craft` across title, headings, schema, footer, and social profiles.

Do not create pages for irrelevant automotive queries. The few car-repair impressions are noise, not a content opportunity.

### P2 — Expand non-brand search coverage through real service content

The current report does not show meaningful non-brand queries for `/services` or `/pricing`. Strengthen the existing pages before creating many location pages:

- Add clear, crawlable H1/H2 sections for SaaS product development, AI workflow automation, and web development.
- Explain deliverables, technologies, process, timelines, and who each service is for.
- Add internal links from the homepage to the relevant service sections and from service content to contact/pricing.
- Add concise FAQ content based on real sales questions, not keyword variations.
- Use specific, natural phrases such as “SaaS development company in India” and “AI workflow automation for businesses.”

Only create city or state landing pages if each page has genuinely unique local proof, offers, and useful content. Avoid thin location-page duplication.

Success condition: non-brand impressions begin appearing for service queries, not only variations of `autocraft`.

### P2 — Optimize the mobile first viewport

Because mobile supplies most impressions:

- Make the H1 and first supporting sentence readable without excessive scrolling.
- Keep the primary CTA visible and tappable.
- Check hero animation, custom cursor code, fonts, and modal behavior on low-end mobile devices.
- Verify image dimensions, lazy loading, and no layout shifts.
- Test Core Web Vitals on representative mobile pages.
- Check that navigation links do not first pass through legacy redirects.

Success condition: mobile CTR moves above 1.5% while positions remain stable or improve.

### P3 — Improve authority and click confidence

The site has impressions but limited clicks and almost no non-brand reach. Build trust signals:

- Add substantive project/case-study pages when real examples are available.
- Link the site from consistent, legitimate company profiles.
- Keep founder and company information consistent across LinkedIn, GitHub, and the website.
- Earn relevant Indian technology/business mentions rather than buying broad backlinks.

Avoid low-quality directory links, spun articles, and exaggerated claims such as “India’s #1” unless independently substantiated.

## Measurement schedule

### After deployment

- Verify status codes, canonicals, robots, and sitemap.
- Request indexing for the four canonical pages.
- Record a new baseline after Google recrawls the migration.

### After 28 days

Export the same Search Console reports and compare:

- Canonical root clicks/impressions versus `/home`.
- 404 examples and redirect examples.
- CTR by page and device.
- Branded versus non-branded queries.
- Indexing status of `/services`, `/pricing`, and `/contact`.

### Initial targets

| Target | Baseline | First target |
| --- | ---: | ---: |
| Overall CTR | 1.07% | 2%+ |
| Mobile CTR | 0.90% | 1.5%+ |
| Homepage canonical CTR | 2.66% on `/` | 3%+ after consolidation |
| `/home` impressions | 3,631 | Near zero after recrawl |
| Non-brand query share | Very low | Measurable growth month over month |
| Indexed canonical pages | 2 reported at export | 4 primary pages |

These are directional targets, not guarantees; Search Console performance is affected by query demand, competition, and the migration recrawl schedule.
