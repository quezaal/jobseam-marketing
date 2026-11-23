# JobSeam feature parity and package plan

Internal working register. Compare actual workflows at the edition and connector level. JobSeam has two market-facing strengths: IT staffing and bench operations, and U.S. immigration and HR compliance records. Buyers can price a combined package against their own invoices or current quote. Save the vendor source, date, plan, billing unit, limits and evidence of any savings claim.

## Current coverage and product priorities

| Workflow | JobSeam coverage | Priority comparison or gap |
| --- | --- | --- |
| Jobs and market intelligence | Source and market dashboards, saved filters, job details, original posting references, enrichment, skill and rate insights where available. | TrackerRMS and Lightcast for coverage and freshness. Measure supported data rather than comparing panel count. |
| Requisition intake | Separate Jobs mailbox and review, historical rescan, grouping and provenance. | Ceipal VMS and Oorwin Job Grabber serve related use cases. Verify automation and exact source. |
| Consultant bench and documents | Scoped roster, pod assignment, CSV migration path, Talent mailbox, résumé parsing and versions with primary selection. | Oorwin and Conrep. Validate duplicate behavior and migration of attachments and relationships. |
| Two-way matching and submissions | Consultant-to-job and requirement-to-consultant matching, explanations, review, candidate decisions, RTR and placement stages. | Ceipal and Oorwin advertise matching. Test review and evidence with a real buyer workflow. |
| VMS | Canonical import and Fieldglass Connector API paths (job posting download and job seeker upload). | Ceipal VMS breadth. Confirm customer access, program mapping, idempotency, receipts, data permissions and live acceptance for production. No universal sync claim. |
| LCA and worksite | Employer record, PDF import, structured review, worksite notices and draft export. | OnBlick documents LCA upload and worker link. Validate that each product supports the exact buyer steps. |
| PAF and wage | Employer defaults, draft pack, administrator-reviewed PDF release, wage comparisons, and source records. | OnBlick offers PAF automation and SOC/wage assistance. Official wage determination and direct FLAG filing are outside current scope. |
| Immigration and worker authorization | Cases, authorization history, private documents, OPT/STEM OPT tracking and I-983 milestones. | OnBlick advertises petition preparation and I-129 filing. JobSeam priorities include fuller I-983 export/signature, deeper case-specific document handoffs, and deadline automation. |
| I-9 and E-Verify | Local completion, reverification and case tracking. | OnBlick advertises electronic I-9 and E-Verify Web Services. Prioritize live provider enrollment and case lifecycle validation before claiming parity. |
| Staffing operations | Client/partner access paths, scheduling, time approvals, invoicing, configured provider workflows. | Compare Ceipal and Oorwin workforce operations. Scope payroll, HRIS and vendor portal requirements before quoting. |
| Reporting, access and audit | Pods and role scope, consultant data exports, agent task details, authorized recorded actor activity. | Validate cross-tenant boundaries, scoped CSV and portability. Export of all data and history requires separate scope. |
| SeamBud | Included Basic agent with workspace, configured review tasks, feedback, approvals and history. | Separate candidate-level review and supported tool actions from general claims of autonomy. Compare Ceipal Ora and Oorwin Ira with the same buyer scenario and disclosed usage limits. |

The full [151-entry role inventory](../../jobseam/docs/user-doc/FEATURE_INVENTORY_BY_ROLE.md) and [verification register](../../jobseam/docs/internal-doc/FEATURE_VERIFICATION_REGISTER.md) describe JobSeam scope and test evidence. See [Fieldglass code](../../jobseam/api/fieldglass_connector.py), [immigration status](../../jobseam/docs/internal-doc/IMMIGRATION_IMPLEMENTATION.md), [competitor feature index](competitor-feature-index.md), and [pricing and entitlements](competitor-pricing-and-entitlements.md).

## Commercial implementation

- Keep published workspace prices current. Include Basic with one agent at no separate charge. Set a defensible usage boundary based on successful tasks, model cost, queue turnaround, storage and working-set size. Document what happens at capacity and how a customer can upgrade.
- Quote additional SeamBud processing as an extra capacity package until rate, entitlement, metering and billing are approved. Quantify costs across model providers and deployment options. Test limits, retries, disabled modules, and downgrade/export behavior.
- Price optional compliance by workflow with employer, worker, attachment and support capacity. Price a VMS connection from the buyer’s requested program, provider permissions, migration and integration effort.
- Use the estimator for buyer-supplied scenarios. A blank rate is unresolved. Compare documented all-in costs over the same billing period, including implementation, provider fees and any tools the buyer retains.
- Prioritize next-build work from customer evidence. Lead with configured Fieldglass acceptance, provider-backed I-9/E-Verify, I-983 document handoffs, clear price/usage limits, and portable records. Confirm demand and dependencies before committing availability or dates.

Primary vendor references: [OnBlick case management](https://www.onblick.com/immigration-case-management) · [OnBlick E-Verify](https://www.onblick.com/electronic-form-i-9) · [Oorwin modules](https://oorwin.ai/pricing/) · [Ceipal](https://www.ceipal.com/)
