# India Location SEO Plan

## Recommended first five states

This is a practical marketing priority list, not an official ranking. It balances Auto Craft's Uttar Pradesh base, established technology hubs, startup density, business demand, and the opportunity to sell SaaS, AI automation, and web development.

### Uttar Pradesh

Ghaziabad, Noida, Lucknow, Kanpur, Agra, Varanasi, Prayagraj, Meerut, Bareilly, Gorakhpur.

### Maharashtra

Mumbai, Pune, Nagpur, Nashik, Thane, Navi Mumbai, Chhatrapati Sambhajinagar, Kolhapur, Solapur, Amravati.

### Karnataka

Bengaluru, Mysuru, Mangaluru, Hubballi, Belagavi, Shivamogga, Tumakuru, Davanagere, Kalaburagi, Udupi.

### Telangana

Hyderabad, Warangal, Nizamabad, Karimnagar, Khammam, Ramagundam, Mahbubnagar, Nalgonda, Adilabad, Suryapet.

### Tamil Nadu

Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tiruppur, Erode, Vellore, Thoothukudi, Tirunelveli.

Delhi is a Union Territory rather than a state. It remains important for the NCR market and should be handled as a separate Delhi/NCR expansion after the first 50 pages have real performance data.

## Competitor SERP research

The reviewed results repeatedly use these patterns:

- Exact location + service language in the title and H1, such as “IT Services in Delhi” or “Software Development Companies in Ghaziabad.”
- A clear opening paragraph explaining the local technology/business ecosystem.
- Service categories broken into scannable sections: custom software, web development, AI, cloud, cybersecurity, consulting, and automation.
- Trust signals: verified reviews, ratings, client lists, team size, budget ranges, case studies, awards, and years of experience.
- Strong commercial calls to action such as consultation, project enquiry, or comparison.
- Internal links between location pages, service pages, and contact pages.

Examples reviewed include [Clutch's Mumbai IT services results](https://clutch.co/in/it-services/mumbai), [GoodFirms' Delhi IT services results](https://www.goodfirms.co/it-services/delhi), [GoodFirms' Ghaziabad software development results](https://www.goodfirms.co/directory/city/top-software-development-companies/ghaziabad), [CA IT Solutions' Delhi positioning](https://www.caitsolutions.in/), and [SegueIT's Ghaziabad services page](https://www.segueit.com/our-services).

These patterns informed the structure of Auto Craft's pages. Competitor copy, claims, reviews, addresses, and rankings must not be copied or implied.

## Page rules

Every city page must:

- Use `/state-slug/city-slug` as its canonical URL.
- Have a unique title, description, H1, and local market paragraph.
- State that Auto Craft serves the city remotely unless a real local office exists.
- Use only factual city/industry context; do not invent local clients, reviews, awards, or offices.
- Explain the three actual offers: SaaS products, AI automations, and web development.
- Link to the contact page, the location directory, and related cities.
- Use `Service` and `BreadcrumbList` structured data only where the claims are accurate.
- Be included in the sitemap only after it renders successfully.

## Route implementation

- Source data: `src/data/location-pages.json`.
- Dynamic route: `src/app/[state]/[city]/page.tsx`.
- All 50 combinations are returned from `generateStaticParams()`.
- `dynamicParams = false` ensures unlisted city URLs return 404 instead of generating arbitrary thin pages.
- Directory page: `/locations`.
- All location routes are included in `src/app/sitemap.ts`.

## Before publishing more locations

Wait for at least one Search Console recrawl cycle, then compare city pages by impressions, CTR, average position, and enquiries. Expand only where a city page gains impressions or has a credible local business case. Do not create hundreds of near-identical pages or add city names without meaningful local information.
