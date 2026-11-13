"""Create numbered launch files. Does not publish, email, schedule or alter release history."""
from pathlib import Path
import json,shutil,urllib.parse,html
R=Path(__file__).resolve().parents[1];E=R/'execution';E.mkdir(exist_ok=True)
C=json.loads((R/'launch-config.json').read_text());base=C['blog_url']
def link(content):return base+'?'+urllib.parse.urlencode({'utm_source':'linkedin','utm_medium':'organic_social','utm_campaign':'jobseam_connected_recruiting','utm_content':content})
def write(name,text):(E/name).write_text(text.strip()+'\n')
kit=R.parents[1]/'collateral/product-overview'
for src,dst in [(kit/'one-page.pdf','01-one-page-overview.pdf'),(kit/'two-page-flyer.pdf','02-two-page-product-flyer.pdf'),(R/'screenshot-flyer.pdf','03-two-page-screenshot-flyer.pdf'),(R/'blog-ready.md','04-blog-body.md'),(R/'editor-fields.txt','04-blog-fields.txt'),(R/'assets/placement-connection.png','05-company-post-image.png'),(R/'assets/placement-pipeline-light.png','06-founder-post-image.png')]:shutil.copy2(src,E/dst)
company=f'''A resume on one side. A role on the other.

The consulting team does the work between them.

Questions. Approvals. Submissions. Interviews. Documents. Follow up.

JobSeam gives that work a shared home. Teams can review matches, follow the placement pipeline and keep records connected to the person. Roles and document permissions help control access.

Here is a closer look, with product screens and sample data:
{link('company_intro')}

The right person. The right opportunity. Every step connected.'''
founder=f'''Finding a promising match is only the beginning.

What happens next needs just as much care.

Has the consultant agreed to a submission? Is the interview arranged? Who can access the documents? What changed since the last conversation?

That is the work we are building JobSeam to support.

Here is a look at the workflow and the product:
{link('founder_followup')}'''
carousel=f'''The candidate. The opportunity. The work between them.

Take a look inside JobSeam.

A shared consultant workspace. Opportunity matching. A placement pipeline. Document access and recorded history.

Five slides show how the pieces connect. Product screens use synthetic sample data. Scores are illustrative, not hiring predictions.

Read the full story:
{link('product_carousel')}'''
short=f'''Who can see this document?

It is a simple question. Your team should be able to find the answer.

JobSeam brings document permissions and recorded access history into the consultant workspace. Access depends on roles and configuration.

See the workflow:
{link('document_access_followup')}'''
write('05-linkedin-company-post.txt',company);write('06-linkedin-founder-post.txt',founder);write('07-linkedin-carousel-post.txt',carousel);write('08-linkedin-access-followup.txt',short)
write('05-image-alt-text.txt','Illustration of a candidate and an opportunity connecting through placement. JobSeam supports the consulting team with intake, matching, records and access controls. This is a conceptual workflow, not a live screenshot.')
write('06-image-alt-text.txt','The actual JobSeam placement pipeline in light mode with synthetic sample submissions at different stages. These are sample records, not customer outcomes.')
shutil.copy2(R/'assets/document-access-light.png',E/'08-access-followup-image.png')
write('08-image-alt-text.txt','The actual JobSeam document access and history dialog in light mode, with a synthetic document owner, administrator and download event. This is sample data, not a security audit.')
slides=[('The connection your team builds.','A candidate on one side. An opportunity on the other. The consulting team brings them together.','placement-connection.png','Illustrative workflow. No placement outcome is guaranteed.'),('Know the person. Keep the context.','Profile details and related work belong together. Staff and consultants can each contribute through their permitted access.','consultant-workspace-light.png','Actual interface. Synthetic sample data.'),('Find a fit. Read the evidence.','Review saved opportunity matches. A score is a starting point. People make the decision.','match-review-light.png','Illustrative sample scores. Not hiring predictions.'),('Make the next step visible.','Follow submissions through review, interviews, offers and placement.','placement-pipeline-light.png','Synthetic submissions. Not customer placement results.'),('Be clear about access.','Review who can access a document and its recorded access history.','document-access-light.png','Actual access dialog with synthetic sample data. Not a security certification.')]
slidehtml=''.join(f'<article class="slide"><header>JOBSEAM <span>A QUEZAAL INC. PRODUCT</span></header><p class="eyebrow">THE CONNECTED RECRUITING WORKSPACE</p><h1>{html.escape(title)}</h1><p class="intro">{html.escape(text)}</p><div class="image"><img src="../assets/{name}" alt="{html.escape(caption)}"></div><p class="caption">{html.escape(caption)}</p><footer><span>jobseam.com · Features depend on configuration and provider access.</span><span>{i} / 5</span></footer></article>' for i,(title,text,name,caption) in enumerate(slides,1))
write('07-linkedin-carousel.html','''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>JobSeam | Five-slide product introduction</title><style>*{box-sizing:border-box}body{margin:0;background:#eef3f6;color:#17334c;font-family:Arial,Helvetica,sans-serif}.slide{width:210mm;height:262.5mm;padding:14mm;margin:20px auto;background:#fff;display:flex;flex-direction:column;break-after:page}.slide:last-child{break-after:auto}header{font-size:25px;font-weight:800;color:#547c2e;border-bottom:3px solid #7d9f45;padding-bottom:12px;display:flex;justify-content:space-between;align-items:center}header span{font-size:9px;letter-spacing:1px;color:#526b7f}.eyebrow{font-size:10px;color:#678b39;letter-spacing:1.4px;font-weight:700;margin:28px 0 10px}h1{font-size:34px;line-height:1.12;letter-spacing:-.7px;margin:0 0 15px}.intro{font-size:18px;line-height:1.5;margin:0 0 20px}.image{flex:1;min-height:0;display:flex;align-items:center;justify-content:center;background:#f5f8fa;border:1px solid #d7e2ea;border-radius:10px;overflow:hidden}.image img{max-width:100%;max-height:100%;object-fit:contain;display:block}.caption{font-size:11px;color:#526b7f;line-height:1.4;margin:12px 0 20px}footer{display:flex;justify-content:space-between;gap:16px;border-top:1px solid #d7e2ea;padding-top:12px;font-size:9px;color:#526b7f}@page{size:210mm 262.5mm;margin:0}@media print{body{background:white}.slide{margin:0}}@media screen and (max-width:800px){.slide{width:100%;height:auto;min-height:800px;margin:0;padding:24px}h1{font-size:28px}.image{min-height:260px}}</style></head><body>'''+slidehtml+'</body></html>')
# Guide links are relative to execution/ so the entire folder remains portable.
guide=f'''# JobSeam launch: your execution guide

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
2. The current contact address is **{C['contact_email']}**. The suggested replacement is **{C['proposed_contact_email']}**, but it has not been verified here. Keep the current address unless you create and test the replacement. A guide edit alone will not update addresses embedded in the flyers.
3. Deploy the marketing assets before publishing the blog. A local file or Git push alone does not prove a deployment happened.
4. Open the image and PDF links used by file 04 in a signed-out browser. Images must load and PDFs must download.
5. Keep the visible sample-data labels. The people, match scores and placement cards are examples, not customer results.
6. The blog link below is the expected address. **It has not been verified as published.** If the editor gives you another URL, update launch-config.json and regenerate the numbered files before posting.

Expected blog URL:

{base}

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
{company}
```

## 6. Monday: the founder follow-up

**Time:** November 16, 10:00 AM CST. **Platform:** your personal LinkedIn profile.

Upload **06-founder-post-image.png**. Paste the copy below. Add the alt text from **06-image-alt-text.txt** where available. This is a separate personal perspective, not a second identical company announcement.

### Copy for post 06

```text
{founder}
```

## 7. Wednesday: show the workflow

**Time:** November 18, 10:00 AM CST. **Platform:** the same company LinkedIn Page.

Start a document post. Upload **07-linkedin-carousel.pdf**. Suggested document title: **JobSeam: keep the work connected**. Paste the caption below. Preview all five pages, then post. LinkedIn's exact composer labels may vary; choose the option that uploads a document rather than simply pasting a PDF URL.

### Copy for post 07

```text
{carousel}
```

## 8. The following Friday: one useful detail

**Time:** November 20, 10:00 AM CST. **Platform:** the same company LinkedIn Page.

Use **08-access-followup-image.png**, **08-image-alt-text.txt** and the text below. This post focuses on one question rather than repeating the full introduction.

### Copy for post 08

```text
{short}
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
'''
guide += '\n' + (R/'pilot-journey.md').read_text()
write('00-EXECUTION-GUIDE.md',guide)
print('Prepared numbered PDFs, blog, post copy, images, carousel source and one execution guide. No posting or sending performed.')
