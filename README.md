# JobSeam marketing

Static website for jobseam.com. No build step. Preview from this directory with `python3 -m http.server 8080`, then open http://localhost:8080.

## Current sales pages

- `index.html`: Job market intelligence landing page with staffing, placement, and individual use cases, product screenshot, walkthrough link, workflow and founding offer.
- `faq.html`: dedicated workflow questions and answers.
- `how-it-works.html`: dedicated step-by-step workflow and product walkthrough.
- `features.html`: capability overview linking to the detailed feature reference.
- `pricing.html`: Founding $199, Starter $299, Growth $699 and Enterprise inquiry. Core two-way matching in every plan.
- `demo.html`: existing Quezaal 20-minute Calendly booking, with a direct-link fallback. Sales-page demo links open the same Calendly popup as the original site when the widget is available; they navigate to this page if it is unavailable.
- `jobseam-onepager.html`: concise product overview replacing unvalidated outcome claims.
- `assets/marketing.css` and `assets/marketing.js`: shared responsive styles and booking integration.

The existing detailed feature guide remains available for evaluation. `index_v1.html`, older decks, launch guides, video presentation and deck and go-to-market PDFs are historical material; they were not regenerated and may contain old pricing or claims. New sales pages do not link those PDFs. The one-pager PDF has been regenerated from the current overview. Archived HTML pages carry a historical-content notice and noindex. robots.txt allows crawling so crawlers can read noindex.

## Before paid traffic

1. Confirm availability of the first-five-company founding offer and the capacity/feature entitlements in the actual application. These changes affect marketing only, not billing or product authorization. The founding offer is $199/month for 12 months, 5 users, 100 consultants, 1 mailbox and US market, with no setup fee and cancellation anytime. Profitability has not been established: verify infrastructure, AI, data, email and support costs before enrollment. There is no fabricated remaining-spots counter.
2. In the existing Calendly event, configure work email, company, optional phone, and team/consultant count as appropriate. Confirm scheduling availability and invitation delivery. Resume sharing is coordinated after booking; this site does not upload resumes.
3. Connect the correct JobSeam GTM/GA4 account using your approved analytics/consent setup. Set exactly one owner-approved destination in `assets/analytics-config.js`: `ga4MeasurementId` OR `gtmContainerId`. Both are empty until the owner selects an account. The shared loader supports either mode, and refuses to load when both are set. Direct GA4 maps the confirmed booking signal to `jobseam_demo_booked`; GTM uses the existing data-layer event. Apply your approved consent settings before enabling. Do not install a second loader or count both GA4-imported and direct Ads conversions as Primary.
4. Map the `jobseam_demo_booked` data-layer event to the demo-booked conversion. Only a `calendly.event_scheduled` message from the embedded or popup calendar's window and exact Calendly origin, with a scheduled-event URI, can emit it. Duplicates in the same page are ignored. The URI and contact details are not sent to the data layer. Calendar views, page views, CTA clicks and form starts do not emit this event.
5. Verify one test booking in Calendly, its delivered invitation, and the analytics debugger before making the conversion Primary in Google Ads. Remove the earlier generic Form event from Primary optimization in the relevant campaign. Account settings are not changed by this repository.
6. Bookings through the direct external fallback link need Calendly-side integration or webhook confirmation; this page cannot observe them. UTM attribution is retained in session storage where available and passed to the calendar. Do not put personal data in campaign parameters.

The event integration follows Calendly's documentation: https://developer.calendly.com/api-docs/overview/embedding/notifying-the-parent-window and https://calendly.com/help/advanced-calendly-embed-for-developers.

Send product ads to jobseam.com. Quezaal remains the parent-company credibility site at https://quezaal.com/jobseam. Its product, portfolio, and services pages share the job market intelligence positioning. This review has not been deployed.

## Verification

Run `node --test tests/*.test.cjs` for booking conversion checks. These tests simulate the third-party callback; they do not book real appointments or verify external service delivery.

## Remaining external launch checks

- Owner must supply the JobSeam GA4 or GTM destination; the separate Quezaal website uses G-KYD60Z1SYW, but it has not been reused without a choice of property.
- In GA4/GTM and Ads, configure the confirmed booking conversion, verify a real test booking and invitation, and remove the generic Form conversion from Primary bidding. No appointment or message was sent by this review.
- Submit sitemap.xml using the verified Search Console property. Search Console access and campaign configuration are not available in this repository.
- Older deck PDF/PPTX and go-to-market PDF still contain historical material. They are not linked from the updated sales funnel. Remove them from the published artifact or configure host-level X-Robots-Tag: noindex before considering the legacy-asset cleanup complete. HTML meta tags and robots.txt do not deindex PDFs. GitHub Pages does not gain custom response headers merely by adding a _headers file; configure the actual host/CDN. Keep original files in private version history if retiring them.
- Product subscription enforcement, load testing, invoices, and the YouTube ad itself were not modified. Public prices remain $199 Founding / $299 Starter / $699 Growth.

SEO references: https://developers.google.com/search/docs/crawling-indexing/block-indexing and https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap.
