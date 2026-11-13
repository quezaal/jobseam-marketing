# JobSeam product overview kit

Canonical home for the November 12, 2026 product overview. Short copy, original system artwork, one-page overview and two-page flyer live together here. Older versions are kept in archive/ for reference, not for distribution.

## Start here

Open `index.html` for a local library of both flyers and downloads.

| File | Purpose |
|---|---|
| one-page.pdf | Short, shareable A4 overview, exactly one page |
| two-page-flyer.pdf | Story and system visual on page one; capability detail on page two |
| one-page.html / two-page-flyer.html | Responsive HTML and print layout |
| one-page.md / two-page-flyer.md | Editable text equivalents |
| blog-ready.md | Markdown body to paste into Quezaal Blog |
| assets/system-overview.svg / .png | Original vector illustration and high-resolution raster export |
| previews/ | Flyer preview images |
| content.json | Shared copy source; edit this first |
| SOURCE_NOTES.md | Internal evidence and limitations; excluded from site build |
| tools/ | Reproducible local generation; excluded from site build |

## Copy and image use

The headline is “Find the fit. Keep the context. Move the work forward.” Short capability headings make the workflow easy to scan. The system illustration is an editorial diagram, not a screenshot or proof of a particular deployed configuration. No real customer data is used.

Keep availability qualifications with distributed copies. Provider access and AI quality are not guaranteed. The government-filing and legal-determination exclusions remain explicit.

## Refresh the kit

From the jobseam-marketing repository root:

```sh
python3 collateral/product-overview/tools/build.py
PLAYWRIGHT_MODULE=/path/to/playwright node collateral/product-overview/tools/export.mjs
python3 build.py
```

The export requires an installed Playwright package and Chromium. `PLAYWRIGHT_MODULE` can name an installed package path; if omitted, the tool tries `playwright` in the normal Node module resolution path. PDF generation checks page count and mobile overflow.

The static build copies only public kit files, images and previews into `_site/collateral/product-overview/`. It excludes this README, SOURCE_NOTES.md, content.json, tools/ and archive/. The existing legacy marketing one-pager is not overwritten.

## Reuse in Quezaal Blog

1. Publish/deploy this kit with jobseam-marketing first. Verify the public PNG and both PDF URLs return successfully.
2. In Blog Admin, create a draft. Suggested title: “Meet JobSeam: keep your recruiting work connected.” Category: Insights, if available.
3. Paste `blog-ready.md` as the body. It has no YAML frontmatter.
4. The blog-ready copy already uses the full marketing image URL and includes download links for both PDFs. Verify those three public links after deploying the marketing kit.
5. If you prefer to host the image in the blog itself, deploy it with the blog image assets and update that one URL before publishing.
6. Save draft, preview and publish through the production blog editor. A Git push or static build does not import an article into the blog database.

No deployment, Git push or article publication is performed by these generators. Internal source notes are based on code inspection, not production certification.
