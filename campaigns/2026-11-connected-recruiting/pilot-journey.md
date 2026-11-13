## 12. The journey from laptop demo to a customer service

**Recommended next step: an always-on, invite-only pilot.** Keep the laptop for development. Start marketing with guided demos while preparing a separate hosted environment for real customer use.

Current position, based on the owner's description: JobSeam runs on a local laptop and is reachable at demo.jobseam.com. There are no customers yet. This guide does not establish the current host configuration, availability or production readiness. A public domain does not remove the application's dependence on the machine running it.

The product has enough implemented workflows to demonstrate. The next commercial question is which workflow a customer will use and pay for. The next operational question is whether that workflow can be delivered reliably with appropriate access controls.

### The four stages

| Stage | What to do | Evidence to move forward |
|---|---|---|
| 1. Guided demos | Use sample data. Speak with staffing and consulting teams. Show the workflow that addresses their problem. | A few teams identify a specific problem and want to try the relevant workflow. |
| 2. Hosted private pilot | Invite one or two companies. Use isolated organizations, named accounts and personal onboarding. Enable a narrow set of features. | Participants can finish the agreed workflow, return to use it and explain its value. Operational and access checks pass for that scope. |
| 3. Paid early access | Agree the scope, price, support and pilot expectations. Improve the features these customers use. Billing can follow the agreed process; automated subscription enforcement is not assumed. | Customers choose to continue paying, and the team can support the service reliably. |
| 4. Broader release | Expand access, capacity and integrations as demand and operating capacity grow. | Support, recovery, security and performance evidence cover the enabled workflows. |

There are no promised dates or customer outcomes in this progression. Start small and expand based on evidence. The limited-user approach follows the general pattern described in [GOV.UK's private-beta guidance](https://www.gov.uk/service-manual/agile-delivery/how-the-beta-phase-works); its government assessment process is not a requirement for JobSeam.

## 13. What to offer first

Lead with one clear promise:

**Bring in your consultants. Find relevant opportunities. Track the submission.**

Start the pilot with resume and roster intake, consultant profiles and review, opportunity matching, applications, placement tracking, notes and activity history. Pick the actual subset with the pilot customer.

Show other implemented capabilities during discovery when relevant. Enable sensitive identity documents, immigration workflows and external integrations only after validating the access controls, configuration and operating requirements for those features.

### Discovery questions for the first conversations

1. Where does candidate information arrive today?
2. How do you decide which requirements fit a consultant?
3. What gets lost between the recruiter, consultant and client?
4. How do you track submissions and the next follow-up?
5. Which records are sensitive, and who should have access?
6. Which one workflow would make a pilot worthwhile?

Record actual answers in your private customer system. Do not store resumes, identity documents, passwords or customer contact lists in this marketing repository.

### Suggested initial goals

Aim for **five discovery conversations, two serious pilot candidates and one paid pilot**. These are working goals, not forecasts, conversion benchmarks or evidence of existing demand.

Look for repeated use, completed workflows and a willingness to pay. Treat feature requests as evidence to evaluate, not promises to build everything before the first pilot.

## 14. Before accepting real customer data

An invite-only pilot still handles real responsibilities. Complete the checks for the features being enabled before accepting customer records. Keep a dated result and an owner for each check.

| Area | What must be demonstrated | Current evidence in this journey |
|---|---|---|
| Company isolation | One organization's users cannot access another organization's profiles, files, matches or activity without explicit authorization. | Not assessed for the hosted pilot. |
| Roles and permissions | Staff, administrator and consultant access behave correctly. Direct API calls enforce the same limits as the interface. | Not assessed for the hosted pilot. |
| Authentication and configuration | Working invitations, account recovery, session controls and production secrets; development credentials are not used. | Not assessed for the hosted pilot. |
| File handling | Upload, download, document permissions, storage and deletion follow the agreed scope. Private files are not publicly served. | Not assessed for the hosted pilot. |
| Backup and recovery | Database and uploaded files are backed up together. A restore has been demonstrated in isolation. Acceptable recovery time and data loss are agreed. | Not assessed for the hosted pilot. |
| Operations | Health monitoring, useful alerts, restart recovery, deployment records and rollback are exercised. A person owns support. | Not assessed for the hosted pilot. |
| Communication | Invitations and required email flows are tested. Failures are visible. The support/contact mailbox is working. Provider acceptance is not presented as confirmed delivery. | Not assessed for the hosted pilot. |
| AI and background work | Representative inputs are tested. Job failures are visible. Costs and concurrency are bounded. AI output is reviewed by people. | Not assessed for the hosted pilot. |
| Data handling | The customer understands storage, access, retention and deletion. The agreed service scope and privacy information are available. | Not assessed for the hosted pilot. |
| User workflow | A pilot user can complete the selected workflow with their permitted account and recover from an ordinary error. | Not assessed for the hosted pilot. |

Use the application's `docs/PRODUCTION_READINESS_GRID.md` as a starting gap register. It contains historical findings and must be reconciled with the current code and deployment. Passing browser fixtures or having a route in the code does not establish production readiness.

[OWASP ASVS](https://asvs.owasp.org/) provides a framework for verification of application security controls. Referencing it is not a claim that JobSeam has completed an ASVS assessment or received certification.

## 15. Keep the first hosted setup simple

Use the existing Docker stack as the starting point for evaluation. Do not treat the demo configuration as an approved production configuration. Choose server capacity after measuring a realistic pilot workload.

| Environment | Proposed purpose | Data |
|---|---|---|
| Local laptop | Development and testing | Development fixtures and permitted test data. |
| demo.jobseam.com | Guided demonstrations | Resettable sample data. |
| app.jobseam.com | Invited pilot customers | Customer records only after the agreed readiness checks. |

These are proposed environment roles, not confirmation that those hosts are configured. Keep demo and customer databases, uploaded files, credentials and outbound integrations separate. If environments share a host, assess the resource and isolation implications explicitly.

Use durable storage for the database and uploaded files. Keep database and queue services private. Set up backups, monitoring and recoverable deployments. Keep expensive AI work bounded and measure its resource use before committing to capacity or response-time promises. Local models remain an option, not a requirement to buy a large GPU server before demand is established.

A hosting provider and exact monthly budget should be selected after workload measurements and the pilot scope are clear. No infrastructure purchase, migration, DNS change or deployment is authorized or performed by this document.

## 16. The public message during this stage

**Primary call to action: Book a guided demo.** This is more appropriate for the current stage than inviting visitors to rely on an unattended service that has not been validated.

Use the blog, posts and flyers already numbered in this guide. Continue to label screenshots as sample data. Describe enabled capabilities accurately. Do not imply that every integration is active, that the service is independently security certified, or that a match score guarantees a placement.

Copy-ready reply when someone expresses interest:

```text
Thanks for your interest in JobSeam.

We are offering guided demos and speaking with a small number of staffing and consulting teams about an early pilot.

Which part of your workflow would you most like to improve: bringing in talent, finding opportunities, or tracking submissions?

Once I understand that, we can arrange a walkthrough around your team's needs.
```

Use a tested booking link if one is available. Otherwise arrange the conversation through the verified contact mailbox. Do not substitute an unverified hello@jobseam.com alias for the address embedded in the current materials.

This wording is a proposed response, not a message already sent or an agreement that a pilot is available immediately. Share pilot access only after its scope and readiness are confirmed.

## 17. Keep commercial progress separate from readiness evidence

Use **distribution-log.csv** for the content that actually goes out. Keep discovery notes and customer contact details in your private customer system. Keep deployment, access-control and recovery evidence with the application's internal operational records.

For each pilot, record the agreed workflow, enabled modules, access roles, success measures, support owner, review date and next decision. Track useful outcomes such as completed intake, reviewed matches, recorded submissions, user-reported issues and repeat use. Do not turn fixture scores or activity counts into marketing claims about effectiveness.

Before a broad public launch, review the pilot evidence and unresolved gaps. Expand when the service can support the promised scope. Keep improving the marketing as you learn which problems customers actually value.

**Next practical move:** run guided demos now, identify the first useful pilot workflow, and prepare its hosted environment with the checks above. No automatic scheduling, deployment or customer onboarding is performed by this guide.
