# Commercial packaging implementation checklist

The public pages describe current workspace price points and direct customers to Sales for options. The items below define what must exist before publishing new rates or enabling self-service subscription changes.

## Core plan, staff seats, and represented consultants

- [ ] Confirm the base workspace price, included staff seats, price per additional staff seat, and when an upgrade is cheaper. Admins and recruiters consume staff seats. Consultant portal accounts and represented records use a separate policy. Decide what counts as an active seat and handle pending invitations, suspended accounts and reactivation.
- [ ] Define active vs archived consultant limits. Document how duplicates, multiple resumes and bulk imports count. Decide whether paid consultant capacity is an upgrade or a pack. Keep existing plan terms until migration and renewal rules are approved.
- [ ] Enforce workspace limits consistently in UI, API, CSV intake, email promotion and agent workers. Test concurrent requests at the boundary and ensure retries do not charge or create records twice. Preserve historical data and export access when usage falls outside a downgraded plan.
- [ ] Model storage (resume versions and documents), background jobs, indexing, polling and model usage. Set included volumes and thresholds, show current usage, and alert admins before a limit. Agree how to pause safely and resume work.

## One SeamBud agent included

- [ ] Include one workspace-scoped background agent in every base recruiting plan. Define supported queues, review gates, schedules, limits, and how the agent picks up work after staff sign out.
- [ ] Price within a measurable envelope. Track monthly run counts, model and storage costs, wait times, retries, and successful outcomes. Establish organization isolation and predictable controls for bursts and trial usage.
- [ ] Confirm what can be described as 24/7 once worker monitoring and the service commitment are approved. Establish downtime recovery and escalation. Customer pricing needs an explicit definition of what additional processing capacity buys.

## Optional modules

- [ ] Define three independently selectable packages. LCA/PAF records and document drafts, I-9/E-Verify tracking, and OPT/STEM OPT tracking. Include a capability matrix and dependencies such as shared identity, document permissions and U.S. market eligibility.
- [ ] Map backend entitlements and UI visibility. Test that turning a module off blocks new actions and jobs while preserving appropriate history and exports. Define handling for scheduled alerts, publication links, billing changes, and re-enabling. Protect employer recordkeeping obligations.
- [ ] Set add-on prices after measuring usage and testing buyer demand. Document approval, proration, renewal, cancellation, grace periods and existing customer treatment before enabling self-service.

## Bring and take your data

- [ ] Make the roster template, column mappings, sample import, duplicate handling and import results easy to find. Add a repeatable migration path from supported incumbent CSVs and define how resumes and email attachments are transferred.
- [ ] Inventory portable datasets. Define scoped exports for roster, resume versions, opportunities, submissions, notes, approvals and eligible attachments, with file manifests and field definitions. Define which audit and provider-held records require separate handling.
- [ ] Test role and tenant boundaries, exports after downgrade, link expiry, retention, transfer verification and offboarding. Define delivery timeline and assisted migration pricing.

## Trial and launch validation

- [ ] Verify the public 14-day trial request, activation and expiry with a synthetic workspace. Keep the no-card/no-bank requirement through onboarding and define post-expiry access and trial usage caps.
- [ ] Update the price table, FAQ, order form, demo and sales materials together when commercial terms are approved.
- [ ] Capture light-theme screenshots from the app with synthetic data. Verify every image actually used on the public Features route after replacing assets.
