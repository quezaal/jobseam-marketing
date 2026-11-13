> Blog handoff update, November 13, 2026: use [the quezaal-blog publishing package](../../../../quezaal-blog/internal-docs/jobseam-launch/00-START-HERE.md) for the article. It contains the copy-ready body, editor fields and blog-hosted images/flyer. Its New article → Save draft → Preview → Approve & publish instructions supersede the blog asset-hosting steps in this guide. The social post and flyer instructions below remain available.

# JobSeam launch: your execution guide

**Start here. This is the single checklist for the campaign.**

Prepared November 12, 2026. Nothing has been posted, emailed, scheduled or published by this workflow. All dates below are proposed.

## 1. Pick the starting time

**Recommendation: Friday, November 13, 2026 at 10:00 AM Central Standard Time.** Publish the blog first, then the company post. Keep 30 to 45 minutes free to respond to questions. This response window is an operating choice, not a promise about the algorithm.

If the assets, blog or contact mailbox are not ready, use **Monday, November 16 at 10:00 AM CST** instead. Do not rush to meet a time slot. Use `America/Chicago` in your scheduler. These November dates are UTC minus 6. Use the local Central time zone in later seasons so daylight saving is handled correctly.

Why Friday rather than Monday? Adobe's 2025 survey of business owners and marketers reported stronger Friday engagement. Buffer's 2026 analysis also ranked Friday above Monday overall, but its strongest slots were later in the day. Neither study proves that Friday at 10:00 AM will outperform Monday at 10:00 AM for JobSeam. This is a first test for a U.S. business audience, not a guaranteed best time.

Sources: [Adobe research](https://www.adobe.com/express/learn/blog/best-time-to-post-on-linkedin), [Buffer's 2026 analysis](https://buffer.com/resources/best-time-to-post-on-linkedin/), and [LinkedIn's guidance to test with your own audience](https://www.linkedin.com/business/marketing/blog/linkedin-ads/whats-the-best-time-to-post-on-linkedin).

## 2. The numbered files and where each belongs

| Number | File | Platform and use |
|---|---|---|
| 01 | [One-page overview](01-one-page-overview.pdf) | Send when someone asks for a quick introduction. Attach to a personal reply or bring to a meeting. |
| 02 | [Two-page product flyer](02-two-page-product-flyer.pdf) | Use when a prospect wants broader capability detail. Also suitable for a website download. |
| 03 | [Two-page screenshot flyer](03-two-page-screenshot-flyer.pdf) | Use when someone asks to see the product. This is the preferred demo follow-up attachment. |
| 04 | [Blog body](04-blog-body.md) and [editor fields](04-blog-fields.txt) | Paste into the production Quezaal Blog editor. This is the main article linked from posts. |
| 05 | [Company post](05-linkedin-company-post.txt) and [image](05-company-post-image.png) | Publish one image post from the JobSeam Page, if active. Otherwise use the Quezaal Inc. Page. Pick one Page for the initial launch. |
| 06 | [Founder post](06-linkedin-founder-post.txt) and [image](06-founder-post-image.png) | Post from your personal LinkedIn profile with a different angle. |
| 07 | [Five-page carousel PDF](07-linkedin-carousel.pdf) and [caption](07-linkedin-carousel-post.txt) | Upload as a LinkedIn document post, not as a link to the PDF. Use on the company Page after the introduction. |
| 08 | [Access follow-up](08-linkedin-access-followup.txt) and [image](08-access-followup-image.png) | A later company Page post about one specific workflow. |

The original editable flyers remain in `collateral/product-overview/` and the campaign folder. The numbered copies are the launch set. Do not share archived PDFs, internal source notes, release manifests or this execution guide as customer collateral.

## 3. Before you post anything

1. Open PDFs 01, 02 and 03. Confirm you are comfortable with their wording and product views.
2. The current contact address is **connect@quezaal.com**. The suggested replacement is **hello@jobseam.com**, but it has not been verified here. Keep the current address unless you create and test the replacement. A guide edit alone will not update addresses embedded in the flyers.
3. Deploy the marketing assets before publishing the blog. A local file or Git push alone does not prove a deployment happened.
4. Open the image and PDF links used by file 04 in a signed-out browser. Images must load and PDFs must download.
5. Keep the visible sample-data labels. The people, match scores and placement cards are examples, not customer results.
6. The blog link below is the expected address. **It has not been verified as published.** If the editor gives you another URL, update launch-config.json and regenerate the numbered files before posting.

Expected blog URL:

https://quezaal.com/blog/jobseam-candidates-opportunities-placements

## 4. Publish the blog first

Proposed time: Friday, November 13, 9:30 AM CST. If you choose the Monday start instead, publish the blog by Monday 9:30 AM.

1. Open https://quezaal.com/blog/manage . Confirm the address does not say staging.
2. Sign in as Admin using the production password.
3. Create a new article, or open this article if it already exists. Do not overwrite the STEM OPT article.
4. Enter these fields:

   Title: The right person. The right opportunity. The work in between.

   Summary: How JobSeam helps consulting teams connect candidates and opportunities, with shared records, visible next steps and controlled access.

   Category: Insights

   URL name: jobseam-candidates-opportunities-placements

5. Open **04-blog-body.md** in your editor. Select all, copy, and paste into **Article · Markdown**. It contains the full body and no YAML frontmatter.
6. Choose an available cover. To use the new placement diagram as the cover, it must first be deployed into the blog image assets and added to the editor's cover choices. The inline diagram is already linked in the body.
7. Click Save draft, then Preview. Check all images and the screenshot-flyer download.
8. Click Approve & publish only when the preview is correct.
9. Open the public article while signed out. Copy the actual public URL. Confirm it matches the URL in the numbered social files.
10. Record the article URL, time and released file hash in distribution-log.csv. Do not mark it published just because a draft was saved.

## 5. Friday: the company introduction

**Time:** November 13, 10:00 AM CST. **Platform:** one company LinkedIn Page.

1. Switch to the correct Page's posting identity.
2. Start a post and upload **05-company-post-image.png**.
3. Copy **05-linkedin-company-post.txt** into the post body. The exact copy is below.
4. If LinkedIn offers an image alt-text field, use **05-image-alt-text.txt**.
5. Check the blog link and image. Publish, or schedule in America/Chicago.
6. Respond to real questions. Do not manufacture comments or post the same copy from multiple accounts at once.
7. Record the actual post URL and time in distribution-log.csv.

### Copy for post 05

```text
A resume on one side. A role on the other.

The consulting team does the work between them.

Questions. Approvals. Submissions. Interviews. Documents. Follow up.

JobSeam gives that work a shared home. Teams can review matches, follow the placement pipeline and keep records connected to the person. Roles and document permissions help control access.

Here is a closer look, with product screens and sample data:
https://quezaal.com/blog/jobseam-candidates-opportunities-placements?utm_source=linkedin&utm_medium=organic_social&utm_campaign=jobseam_connected_recruiting&utm_content=company_intro

The right person. The right opportunity. Every step connected.
```

## 6. Monday: the founder follow-up

**Time:** November 16, 10:00 AM CST. **Platform:** your personal LinkedIn profile.

Upload **06-founder-post-image.png**. Paste the copy below. Add the alt text from **06-image-alt-text.txt** where available. This is a separate personal perspective, not a second identical company announcement.

### Copy for post 06

```text
Finding a promising match is only the beginning.

What happens next needs just as much care.

Has the consultant agreed to a submission? Is the interview arranged? Who can access the documents? What changed since the last conversation?

That is the work we are building JobSeam to support.

Here is a look at the workflow and the product:
https://quezaal.com/blog/jobseam-candidates-opportunities-placements?utm_source=linkedin&utm_medium=organic_social&utm_campaign=jobseam_connected_recruiting&utm_content=founder_followup
```

## 7. Wednesday: show the workflow

**Time:** November 18, 10:00 AM CST. **Platform:** the same company LinkedIn Page.

Start a document post. Upload **07-linkedin-carousel.pdf**. Suggested document title: **JobSeam: keep the work connected**. Paste the caption below. Preview all five pages, then post. LinkedIn's exact composer labels may vary; choose the option that uploads a document rather than simply pasting a PDF URL.

### Copy for post 07

```text
The candidate. The opportunity. The work between them.

Take a look inside JobSeam.

A shared consultant workspace. Opportunity matching. A placement pipeline. Document access and recorded history.

Five slides show how the pieces connect. Product screens use synthetic sample data. Scores are illustrative, not hiring predictions.

Read the full story:
https://quezaal.com/blog/jobseam-candidates-opportunities-placements?utm_source=linkedin&utm_medium=organic_social&utm_campaign=jobseam_connected_recruiting&utm_content=product_carousel
```

## 8. The following Friday: one useful detail

**Time:** November 20, 10:00 AM CST. **Platform:** the same company LinkedIn Page.

Use **08-access-followup-image.png**, **08-image-alt-text.txt** and the text below. This post focuses on one question rather than repeating the full introduction.

### Copy for post 08

```text
Who can see this document?

It is a simple question. Your team should be able to find the answer.

JobSeam brings document permissions and recorded access history into the consultant workspace. Access depends on roles and configuration.

See the workflow:
https://quezaal.com/blog/jobseam-candidates-opportunities-placements?utm_source=linkedin&utm_medium=organic_social&utm_campaign=jobseam_connected_recruiting&utm_content=document_access_followup
```

## 9. Which flyer to send when someone replies

Choose one attachment based on the conversation. Do not send all three by default.

| They ask | Send |
|---|---|
| What is JobSeam? | 01, the one-page overview |
| What else does it cover? | 02, the product flyer |
| Can I see the actual system? | 03, the screenshot flyer |
| Can you explain the workflow? | The published blog link |

Optional personal reply, only when it fits the conversation:

```text
Thanks for taking a look.

I have attached a short JobSeam overview. It shows how candidate details, opportunities and placement work connect.

Which part of that workflow takes the most effort for your team today?
```

Attach just the selected PDF. Do not treat this plan as permission to send bulk unsolicited messages. Nothing has been sent from this workspace.

## 10. Keep one record of what went out

Use the existing **distribution-log.csv** in the parent campaign folder. Add a row for each actual publication or send. Keep earlier rows when revising. Record the artifact, channel, approval, revision SHA-256, public URL, local time and UTC offset. For private replies, keep recipient details in your normal access-controlled customer system rather than a public repository.

The numbered set has its own **execution-manifest.json** with file hashes. The source campaign has **release-manifest.json**. Both describe files, not proof of publication.

After 24 hours and again after seven days, record impressions, comments, saves, link clicks where available, and relevant inquiries. Compare the same measurement window. A Friday company image post and a Monday personal post differ in more than timing, so their results alone cannot prove the better day.

For a timing test, later compare similar posts from the same Page on Friday and Monday at 10:00 AM. Change one variable at a time. Keep the time that brings useful conversations, not just the most reactions.

## 11. If you choose a Monday launch instead

Use this fallback sequence. Do not run both launch schedules.

| Action | Proposed date and time, CST |
|---|---|
| Blog live and checked | Monday, November 16, 9:30 AM |
| Company introduction, file 05 | Monday, November 16, 10:00 AM |
| Founder follow-up, file 06 | Wednesday, November 18, 10:00 AM |
| Document carousel, file 07 | Friday, November 20, 10:00 AM |
| Access follow-up, file 08 | Monday, November 23, 10:00 AM |

Nothing is scheduled automatically. If these dates pass, choose a new set of dates before using this checklist. Do not interpret the timetable as an existing scheduler configuration.

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
