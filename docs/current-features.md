# JobSeam current features and workflow scope

Reviewed against the application source on October 30, 2026. This describes implemented code, not a production deployment certification. Availability depends on deployment version, group feature configuration, role, supported market, and configured providers. Historical plans are not a feature contract.

## Supported audiences

| Audience | Relevant workflows | Scope |
| --- | --- | --- |
| Employers and HR teams | Talent, opportunities, placements, LCA, PAF, worker records | Employer facts and decisions remain with authorized reviewers. |
| Recruiting, staffing and consulting teams | Resume/roster intake, requirements, matching, RTR, submissions, pipeline, portals, timesheets and invoicing | Software access is separate from providing recruiting representation. |
| Career services, universities and training programs | Cohorts, configurable member labels, profile completion, matching and placement tracking | Confirm institutional access and capacity during onboarding. |
| International-student advisors and employer coordinators | OPT/STEM OPT records, I-983 status, dates and attachments | Coordination tools; no DSO replacement, SEVIS submission or eligibility determination. |
| Job seekers and workers | Enabled profile, submission and candidate portal workflows | No public candidate pool; team subscription pricing does not imply individual self-service registration. |

## Core product

Job-market ingestion and analytics, supported source/market selection, resume and roster import, AI enrichment and two-way matching, requirements ingestion, recruiter analysis, submission/RTR tracking, placement pipeline, team and pod administration, configurable terminology, portals, invoicing and timesheets are available according to configuration. External data sources, email delivery, AI providers and background-check integrations require their own configuration and may incur provider charges. A configured integration is not evidence that production credentials or government approvals are active.

## Immigration → LCA: employer first

1. Create an employer LCA manually or import a draft/certified ETA-9035/9035E PDF. A candidate is not required; an opportunity/requirement reference is optional.
2. Extract and review the PDF values, including sections B (job), C (employer), D (contact), and F (employment/worksites). Structured extraction runs first. Optional configured OCR/model assistance supports incomplete or unreadable documents; no extraction method guarantees complete or correct values.
3. Review the A–K preparation fields, employer, SOC, dates, wages and worksites. Save the record. A filled official-template preparation PDF can be exported; it is not a filed or certified LCA.
4. Add candidate links later and keep employee receipt and worker-specific H-1B information separate from shared employer terms.
5. Maintain notice/posting, public-file supporting information, document evidence and activity. Record status is separate from DOL LCA status; an archived or incorrect record is not a government withdrawal.

Official submission remains in [DOL FLAG](https://flag.dol.gov/programs/lca). The integrated ETA template carries OMB 1205-0310 and expiration October 31, 2027; template expiration is not the employment validity period of an individual LCA. Check the official form before filing.

## PAF supporting information and defaults

Use Settings → LCA for display/inspection locations, representatives, document time zone and document defaults. The resolution order is system starter text → group defaults → LCA-specific overrides. Review and confirm inherited employer-policy wording; changing it requires renewed confirmation. Benefits and actual-wage policy are employer-supplied facts, not facts inferred from a wage level or SOC code.

Each worksite keeps its notice method, posting/delivery dates, affected audience, display locations and evidence. Physical posting supports two distinct location entries and additional rows. Other notice methods have different review needs. Save the worksite/supporting section after edits. Review messages link to missing fields and highlight them; date or completeness checks do not certify compliance.

O*NET lookup can suggest SOC-related duties with source and retrieval metadata; retain employer-specific responsibilities and confirm suggestions. Wage records preserve source, series, area, level, retrieval details and entered values. Built-in historical estimates and comparisons are review aids, not independently verified live FLAG rates. Attach the actual applicable wage-source evidence.

## PAF document generation

PDF is the default. Generate one document or Generate All as a ZIP; editable Word and combined outputs are available. The 12 reference templates are:

1. Cover page and checklist.
2. Rate of pay.
3. Prevailing-wage source and methodology.
4. Notice of filing.
5. Posting acknowledgment and evidence record.
6. Benefits summary.
7. Successor employer statement, when applicable.
8. Single-employer entities statement, when applicable.
9. Exempt-worker list, when applicable.
10. Recruitment summary, when applicable.
11. Actual-wage methodology.
12. Roles and responsibilities, optional supporting material.

This is a template set, not a claim that all 12 documents are mandatory for every employer. Generated files are unsigned review drafts. Missing facts remain review items; JobSeam does not fabricate posting evidence, policy facts or signatures. Attach the certified LCA, executed notices and original wage evidence separately. Employee receipt of the certified LCA is a separate private worker document, not an item automatically included in the public pack.

Uploads and drafts stay private. An authorized company administrator must review and explicitly publish an eligible PDF to the public inspection page; access can be withdrawn. Candidate profiles, payroll and petitions are not public-file content. Online publication does not remove employer inspection and retention obligations.

## Immigration → OPT & STEM OPT

The current tracker supports worker/student and DSO contacts, SEVIS ID, school, authorization dates, employer/EIN/E-Verify identifier, SOC/job/worksite/compensation, supervisor, I-983 workflow status and handoff dates, reporting/evaluation due dates and statuses, unemployment periods and notes. Attach I-983, I-20, EAD, evaluation and offer documents to a record. Dashboard review filters include STEM records, overdue recorded checkpoints and authorization ending within 60 days.

Recorded unemployment totals depend on entered periods/day counts; review open periods and do not treat the display as a verified continuous eligibility counter. Six-month validations are distinct from 12-month and final self-evaluations. Use official guidance and the DSO for applicable reporting requirements.

**Not implemented by this tracker:** generating/filling I-983 PDFs, executing signatures, automated email reminders, filing with USCIS/SEVIS, automatic cap-gap or eligibility determinations. The current UI has legacy guidance text around I-983 parts, evaluation delivery and deadlines that needs a separate product correction; this guide does not endorse those statements. Do not use that text as an authoritative filing instruction.

## H-1B, I-9 and E-Verify

The worker compliance workspace records petition references, I-9/E-Verify statuses, review dates, supporting documents and activity. Provider-backed operations require applicable credentials and enablement. Status tracking does not establish an approved petition, completed verification, compliant electronic I-9 system or government endorsement. Verify integration activation independently before promising submission services.

## Pricing and entitlement boundary

Published marketing prices remain Founding $199/month or $1,990/year; Starter $299/month or $2,990/year; Growth $699/month or $6,990/year. Annual prepayment covers 12 months for the cost of 10 monthly payments. Founding is limited to the first five companies. Current capacities are 5 users/100 talent profiles/1 mailbox/US; 5 users/200 profiles/1 mailbox/US; and 15 users/1,000 profiles/5 mailboxes/5 supported markets, respectively.

Marketing includes core workflows across team plans; plan capacity, module enablement, US market access and external provider prerequisites still apply. Education/institutional scope, larger capacity, private hosting, custom integration and migration services require scoping. Marketing changes do not implement subscription enforcement, billing or a contractual entitlement change.

## Official references

- [DOL LCA process](https://flag.dol.gov/programs/lca)
- [DHS I-983 instructions](https://www.ice.gov/doclib/sevis/pdf/i983Instructions.pdf)

Source review: October 30, 2026. Feature availability depends on configuration and deployment version.
