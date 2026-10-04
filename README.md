# JobSeam marketing

Static website for jobseam.com. No build step. Preview from this directory with `python3 -m http.server 8080`, then open http://localhost:8080.

## Current sales pages

- `index.html`: IT staffing / bench sales landing page, product screenshot, walkthrough link, workflow and founding offer.
- `faq.html`: dedicated workflow questions and answers.
- `how-it-works.html`: dedicated step-by-step workflow and product walkthrough.
- `features.html`: capability overview linking to the detailed feature reference.
- `pricing.html`: Founding $199, Starter $299, Growth $699 and Enterprise inquiry. Core two-way matching in every plan.
- `demo.html`: existing Quezaal 20-minute Calendly booking, with a direct-link fallback. Sales-page demo links open the same Calendly popup as the original site when the widget is available; they navigate to this page if it is unavailable.
- `jobseam-onepager.html`: concise product overview replacing unvalidated outcome claims.
- `assets/marketing.css` and `assets/marketing.js`: shared responsive styles and booking integration.

The existing detailed feature guide remains available for evaluation. `index_v1.html`, older decks, launch guides, video presentation and PDFs are historical material; they were not regenerated and may contain old pricing or claims. New sales pages do not link those PDFs. Use the new overview's browser print function for an updated printout.

## Before paid traffic

1. Confirm availability of the first-five-company founding offer and the capacity/feature entitlements in the actual application. These changes affect marketing only, not billing or product authorization. The founding offer is $199/month for 12 months, 5 users, 100 consultants, 1 mailbox and US market, with no setup fee and cancellation anytime. Profitability has not been established: verify infrastructure, AI, data, email and support costs before enrollment. There is no fabricated remaining-spots counter.
2. In the existing Calendly event, configure work email, company, optional phone, and team/consultant count as appropriate. Confirm scheduling availability and invitation delivery. Resume sharing is coordinated after booking; this site does not upload resumes.
3. Connect the correct JobSeam GTM/GA4 account using your approved analytics/consent setup. No account ID was available, so no tracking ID or third-party analytics loader was invented.
4. Map the `jobseam_demo_booked` data-layer event to the demo-booked conversion. Only a `calendly.event_scheduled` message from the embedded or popup calendar's window and exact Calendly origin, with a scheduled-event URI, can emit it. Duplicates in the same page are ignored. The URI and contact details are not sent to the data layer. Calendar views, page views, CTA clicks and form starts do not emit this event.
5. Verify one test booking in Calendly, its delivered invitation, and the analytics debugger before making the conversion Primary in Google Ads. Remove the earlier generic Form event from Primary optimization in the relevant campaign. Account settings are not changed by this repository.
6. Bookings through the direct external fallback link need Calendly-side integration or webhook confirmation; this page cannot observe them. UTM attribution is retained in session storage where available and passed to the calendar. Do not put personal data in campaign parameters.

The event integration follows Calendly's documentation: https://developer.calendly.com/api-docs/overview/embedding/notifying-the-parent-window and https://calendly.com/help/advanced-calendly-embed-for-developers.

Send product ads to jobseam.com. Quezaal remains the parent-company credibility site at https://quezaal.com/jobseam. Its repository has not been modified here. No changes have been deployed.

## Verification

Run `node --test tests/booking.test.cjs` for booking conversion checks. These tests simulate the third-party callback; they do not book real appointments or verify external service delivery.
