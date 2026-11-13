# Internal campaign review notes

Prepared November 12, 2026. This document, the release manifest, metadata, distribution log, social drafts and capture tools are excluded from the static site build. They are not credentials or customer data.

## Claim basis

Capability statements follow the source inspection recorded in ../../collateral/product-overview/SOURCE_NOTES.md and the JobSeam application. Current screenshots are captured from the actual frontend source with the existing synthetic browser-test fixture. A page render is not production validation of backend delivery, authorization enforcement or provider activation.

The capture wrapper uses tests/talent_workspace.browser.cjs from the sibling application. It retains its assertions, replaces only isolated fixtures needed for sample opportunity rows and pipeline cards, and annotates captures as synthetic sample data. No live customer APIs or government services are used. Mock local credentials belong only to the test harness.

The new SVG is an editorial diagram, not a live system screenshot. It depicts a candidate and an opportunity connecting through placement, with the consulting team making decisions and JobSeam supporting surrounding work. No marriage imagery, success metrics or customer endorsement is implied.

## Claims deliberately avoided

- Guaranteed placement, hiring accuracy, revenue improvement or time saved.
- Fully automated recruiting, legal eligibility or compliance determinations.
- Security certification, zero risk, universal encryption or complete visibility into activity outside JobSeam.
- Treating provider email acceptance as proof of inbox delivery.
- Pretending screenshots show production customers or real placement outcomes.
- Describing the content as human-authored, externally reviewed or independently endorsed without evidence.

## Screenshot captions and use

Names, emails, scores, rows and events are synthetic. Example-domain addresses are not customer details. No document contents, real passports, credential tokens or passwords are shown. Permission screens show the available interface; they are not security audit evidence. Keep the visible sample-data annotation and surrounding captions on shared copies.

The placement pipeline omits sample conversion-rate widgets. Card counts are illustrative fixture counts, not performance results. The match score belongs to a synthetic fixture and is not a prediction or validation metric.

## Before any public release

Owner reviews content and screenshots. Deploy the public campaign assets before using their URLs in the production blog. Paste blog-ready.md into the editor with fields from editor-fields.txt, preview and publish using the normal workflow. Record the actual URL, date, owner approval and released artifact hash in distribution-log.csv. A build or a Git push is not an article publication or a social post.

For a changed article that is already public, retain earlier release records and add a new row. Do not replace the history. Record material factual corrections in the article where appropriate.
