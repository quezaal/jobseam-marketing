# JobSeam one-pager: source review notes

Reviewed November 12, 2026. Internal editorial reference for this product overview kit. Shorter copy and original system diagram added November 12, 2026. The initial longer overview is preserved in archive/. No live credentials, production customer data, external transactions or legal requirements were inspected. This is a source review, not end-to-end certification of every module.

## Evidence checked

| Capability summarized | Implementation evidence |
|---|---|
| Visible product organization | frontend/js/app.js route map, navigation, feature and role gates; frontend/js/pages/settings.js |
| Job collection, enrichment and analytics | service/ats_catalog.py, service/poc.py, service/config.yaml, service/enricher.py, frontend/js/pages/jobs.js and dashboard.js |
| Mailbox sources and requirements review | api/email_ingest.py source configuration, IMAP probe, folder, polling, review/accept/discard and requirements routes |
| Resume, ZIP, roster and direct entry | frontend/js/pages/talent.js; candidate-form, resume-upload-modal and roster-import-modal; service/resume_intake.py; api/talent_workspace.py |
| Consultant workspace and self-service | frontend/js/pages/consultant-workspace.js, consultant-portal.js, talent-onboarding.js; api/talent_workspace.py workspace, portal, application, employment, review and invitation routes |
| University catalog | api/talent_workspace.py catalog schema, country scope, list and administration routes; api/data/universities.json |
| WhatsApp intake and provenance | api/talent_workspace.py source and webhook handlers; service/talent_media.py; docs/talent-workspace.md. Group-owned inbound configuration, not outbound WhatsApp messaging. |
| Matching and controlled AI usage | frontend/js/pages/match.js, candidate_match.js; api/main.py match sessions and explicit deep-analysis endpoints; resume_intake opt-ins |
| Placement and portals | frontend/js/pages/placement_pipeline.js; api/main.py RTR, submissions, stage changes, funnel, client/consulting/candidate portal and interview routes |
| Outreach | frontend/js/pages/outreach.js; api/main.py outreach templates, campaign and recipient routes. Provider acceptance is not proof of inbox delivery. |
| Timesheets/invoicing | frontend/js/pages/invoices.js; api/main.py /api/timesheets and /api/invoices handlers. No claim of payroll processing, tax computation, money movement or accounting integration. |
| Screening/VMS | frontend/js/pages/bgcheck.js; api/main.py background-check handlers; api/vms_integration.py and fieldglass_connector.py. Per-provider setup, permissions and validation remain prerequisites. |
| Authorization, OPT and immigration | AuthorizationHub in talent-intake.js; consultant workspace; api/talent_workspace.py; api/opt_records.py; frontend/js/pages/opt_tracker.js. No automatic legal eligibility or filing guarantee. |
| LCA and PAF | api/employer_lcas.py, lca_compliance.py, lca_form_pdf.py, paf_templates.py, paf_defaults.py, paf_public.py; frontend/js/pages/lcas.js. Twelve preparation templates are not twelve universally mandatory documents. |
| Document permissions/history | api/talent_workspace.py document access/grant tables, private routes and review workflow. No blanket claim of independently audited security or universal encryption. |
| Invitation/email visibility | api/talent_email.py preview, template, history and send-attempt persistence; frontend/js/pages/talent-email.js. Accepted status is not recipient delivery. |
| Administration and deployment | frontend/js/pages/admin.js, settings.js, runs.js, coverage.js, admin_audit.js; Docker Compose architecture; feature configuration in api/main.py |

## Sources treated cautiously

README.md and PRODUCT_OVERVIEW.md include older broad claims. docs/CURRENT_FEATURES.md and docs/PRODUCTION_READINESS_GRID.md qualify them and were read alongside current code. docs/talent-workspace.md contains rollout history, so navigation and current API implementation take precedence where they differ.

The one-pager deliberately excludes precise portal/market counts, performance guarantees, pricing/entitlements, placement success rates, automatic legal monitoring, promised reminder delivery, global job coverage, government endorsement and live provider certification. Those require evidence beyond this source review.

Historical readiness items are not asserted to remain unresolved in every current handler. Conversely, the presence of a route does not establish that it is authorized, configured and proven in production. No existing product documentation or historical plans were replaced.

## Presentation validation

The PDF is produced from the standalone HTML with Chromium print-to-PDF at A4 size. Verify exactly one page after generation. The Markdown is the editable text equivalent. Source review notes stay outside the customer-facing page.


## Current kit presentation

The SVG is an original editorial map of implemented workflow groups. It is explicitly labeled as an illustration, not a live screenshot. It includes no customer records or performance metrics. The one-page PDF includes the overview image and eight short capability summaries. The two-page flyer adds benefit-led context and workflow detail. No source capabilities were expanded by the wording changes.
