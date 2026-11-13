# Campaign: the candidate, the opportunity and the work between them

Dedicated source folder for the blog, light theme screenshots, placement illustration, screenshot flyer and draft posts. Start with index.html for a visual library. Nothing has been published or sent by these tools.

## Execute the launch

Start with [execution/00-EXECUTION-GUIDE.html](execution/00-EXECUTION-GUIDE.html), [Markdown](execution/00-EXECUTION-GUIDE.md), or [printable PDF](execution/00-EXECUTION-GUIDE.pdf). It numbers the three flyers, blog and LinkedIn posts, includes copy-ready text, and proposes Friday/Monday schedules. The guide also covers the laptop demo, hosted private pilot, paid early access and broader release journey, with readiness checks and copy-ready demo responses. Its journey source is pilot-journey.md. The execution folder, pilot-journey.md and launch-config.json are internal and are not copied into the public website build. The five-slide LinkedIn PDF is prepared, not posted.

## Files

| File | Use |
|---|---|
| blog-body.md | Canonical blog text with local image links |
| blog-ready.md | Paste-ready body with full marketing asset URLs |
| blog-preview.html | Local reading preview; not the production blog |
| blog-metadata.json / editor-fields.txt | Suggested title, summary, category and URL name |
| assets/placement-connection.svg / .png | Original candidate and opportunity diagram |
| assets/*-light.png | Actual product screens with synthetic sample data |
| screenshot-flyer.html / .pdf | Two-page flyer with the diagram and light product views |
| social-posts.md | Draft posts and a carousel plan |
| distribution-log.csv | Record approval, released hashes, dates and actual public URLs |
| release-manifest.json | Artifact checksums and preparation status |
| REVIEW_NOTES.md | Internal claim checks, screenshot provenance and release limits |
| tools/ | Repeatable capture, generation, export and manifest scripts |

## Rebuild

From jobseam-marketing:

```sh
JOBSEAM_SOURCE=/path/to/jobseam PLAYWRIGHT_MODULE=/path/to/playwright node campaigns/2026-11-connected-recruiting/tools/capture-system.cjs
python3 campaigns/2026-11-connected-recruiting/tools/build.py
PLAYWRIGHT_MODULE=/path/to/playwright node campaigns/2026-11-connected-recruiting/tools/export.mjs
python3 campaigns/2026-11-connected-recruiting/tools/refresh-manifest.py
python3 campaigns/2026-11-connected-recruiting/tools/prepare-execution.py
PLAYWRIGHT_MODULE=/path/to/playwright node campaigns/2026-11-connected-recruiting/tools/export-execution.mjs
python3 build.py
```

The capture requires the sibling application's current browser fixture and Python 3. The screenshot API is mocked locally; no running production system or real account is needed. The browser harness checks its normal workflow assertions before completing the screenshots. Source changes can require updating the capture anchors.

## Blog handoff now lives in quezaal-blog

Use [the blog publishing package](../../../quezaal-blog/internal-docs/jobseam-launch/00-START-HERE.md) for New article → Save draft → Preview → Approve & publish. It includes editor fields, the body, blog-hosted screenshots/illustration and the flyer. The body no longer requires marketing campaign assets to be deployed separately. This supersedes the older blog steps below. Original source files remain here for campaign generation and tracking.

## Publish on Quezaal Blog (legacy process)

1. Review the preview and screenshots locally.
2. Deploy the marketing campaign assets with the normal marketing release process.
3. Verify the public PNG, screenshot and PDF URLs under https://jobseam.com/campaigns/2026-11-connected-recruiting/ . They are expected paths, not evidence they are already live.
4. In the production blog editor, create a draft. Use editor-fields.txt for title, summary, category and URL name.
5. Paste the entire blog-ready.md into Article · Markdown. It has no YAML metadata.
6. Choose an existing cover. If the new diagram should be the cover, deploy it into the blog's own images directory and add it to the editor's cover choices first. That separate deployment is not performed here.
7. Save, preview, and publish only after owner review.
8. Record the released revision hash, actual public URL, approval and publication date in distribution-log.csv. Then replace the placeholder URL in the draft social posts.

## What is public in the static build

Only the campaign index, blog preview/body, paste-ready body, flyer HTML/PDF, assets and previews are copied. Internal review notes, tools, metadata, manifests, social drafts and distribution logs are excluded. Public files remain drafts until the owner elects to deploy them. The static build prepares files; it never publishes a blog article or posts to social accounts.

Do not remove sample-data labels when sharing screenshots. Do not call the conceptual diagram a screenshot. Short product copy still needs accurate qualifications about providers, human review and access configuration.

The execution-guide exporter uses Markdown packages from the sibling quezaal-blog checkout. Set QUEZAAL_BLOG_SOURCE if that checkout is elsewhere. Verify launch-config.json before regenerating: its public blog URL and proposed hello@jobseam.com alias are not verified by the generator. The active flyers still use connect@quezaal.com. Generated numbered files are copies of the reviewed assets; regenerate after changing the source. Publication and distribution logs are never advanced automatically.
