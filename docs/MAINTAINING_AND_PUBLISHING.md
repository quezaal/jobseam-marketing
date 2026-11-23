# Maintain and publish the JobSeam marketing site

## Why the build writes to `_site/`

`_site/` is the generated website. The underscore is a directory naming convention. It keeps the files the web host needs separate from source templates, tests, and internal notes. Git ignores the directory, so a fresh checkout must build it.

The build reads each source HTML page and fills in the shared header and footer from the partials and navigation configuration. For the demo page, it also inserts the configured recipient and any public booking link. It then writes deployable HTML and copies the required assets. The build converts `pricing.html` to `_site/pricing/index.html`, which lets a static host serve `/pricing`. The home page becomes `_site/index.html`.

| Change | Edit this |
| --- | --- |
| Page wording, links, or sections | The root source page, such as [pricing.html](../pricing.html) |
| Menu order, labels, and destinations | [partials/navigation.json](../partials/navigation.json) |
| Shared header markup | [partials/header.html](../partials/header.html) |
| Shared footer markup and legal links | [partials/footer.html](../partials/footer.html) |
| Demo email recipient or public Zoho booking URL | [site-config.json](../site-config.json) |
| Shared styles and browser behavior | [assets](../assets/) |
| Product screenshots | [screenshots](../screenshots/) |
| What the build publishes and how it renders HTML | [build.py](../build.py) and [site_render.py](../site_render.py) |

Edit the source files. Changes made directly inside `_site/` are lost when rebuilt. The current build also discovers root-level HTML files, so keep private drafts and archives under `docs/internal/`. The main marketing and help pages share navigation. Standalone collateral and walkthrough layouts have their own menus.

## 1. Make and preview a change

1. Open a terminal in the `jobseam-marketing` checkout. Review `git status --short` so you know which changes were already present. Use a branch for the changes you intend to review and publish.
2. Change the relevant source. For example, to put Compare Platforms before Features in the Product dropdown, move its entry before Features inside the Product group in `partials/navigation.json`. The footer’s Product section uses that order too. For a new public page, add its HTML, add an appropriate navigation entry if needed, and update [sitemap.xml](../sitemap.xml).
3. Start the local preview with `python3 serve.py 9090`. Open `http://localhost:9090/`. Restart an already-running preview after changing Python code. Refresh the browser after editing page content or navigation.
4. For a menu change, open Product on the home page, follow the changed link, and confirm it leads to the intended destination. Scroll to the footer and verify the same label, URL, and order. Check the same flow in a narrow mobile viewport.
5. For a demo change, follow a Pricing trial link. Check the recipient and plan in both draft actions. When a Zoho link is configured, verify it in a signed-out browser. A draft preview does not verify mail delivery or an appointment. [Demo and Zoho configuration](demo-bookings-setup.md)

## 2. Build and verify the publishable files

From the repo root, run:

```sh
git diff --check
node --test tests/booking.test.cjs
python3 -m unittest discover -s tests -p test_build.py
python3 build.py
```

Python 3.9 or later supports the current preview code. Node is used for the JavaScript tests, while the build uses only Python’s standard library.

Build releases from a fresh checkout of the reviewed revision when possible. `build.py` copies and overwrites output files but does not prune old ones. A fresh checkout prevents removed pages from lingering in an older `_site/`. For example, after review and commit, an isolated Git worktree can be created for the release build:

```sh
git worktree add --detach /path/to/unused/release-checkout <reviewed-commit>
cd /path/to/unused/release-checkout
python3 build.py
```

Verify the generated output before publishing:

- Open or inspect `_site/index.html`, `_site/pricing/index.html`, and `_site/demo/index.html`. Check that they contain full navigation, and that include markers or unresolved demo placeholders are absent.
- Confirm expected images and scripts exist under `_site/screenshots/` and `_site/assets/`. Check that internal drafts and source configuration files are absent. The allowlisted `/compare_after_20261122/` archive is a public direct link with a robots no-index directive. Keep it out of the menus and sitemap, and leave it crawlable so search engines can read the directive. Review unexpected root-level files before building.
- To smoke-test the artifact, run `python3 -m http.server 9091 --directory _site`. Check `/`, `/pricing/`, `/features/`, `/compare/`, and `/demo/`. This validates the generated directories separately from the development preview.
- Test the sticky tabs and pricing handoff at desktop and mobile widths.

## 3. Publish and check the live site

1. The JobSeam site uses GitHub Pages with the custom domain `jobseam.com`. Commit and push the reviewed source changes and [Pages workflow](../.github/workflows/pages.yml) to `main`. In the GitHub repository, open **Settings → Pages → Build and deployment → Source**, then select **GitHub Actions**. The branch publishing menu accepts only the repository root or `/docs`. The workflow builds `_site/`, uploads it as the Pages artifact, and deploys it. Keep `_site/` Git-ignored. [GitHub Pages publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

   After switching the source, open **Actions → Publish JobSeam to GitHub Pages → Run workflow**, choose `main`, and run it. Future pushes to `main` trigger it automatically. Verify that **Settings → Pages** still lists `jobseam.com` as the custom domain. This publishing change requires no Cloudflare DNS edits.

2. Record the source commit and the host’s deployment identifier. The repository’s video transcript workflow builds an artifact. Publishing uses a separate hosting step. A maintainer needs the production host and its release access before taking over.
3. On the live hostname, open the homepage, Features, Compare, Pricing, and Demo in a fresh browser session. Confirm the route, navigation, images and trial handoff. If the Zoho appointment flow is enabled, verify invitation delivery and calendar sync through an authorized test appointment.
4. If the release is bad, restore the previous host deployment or redeploy the previous known-good artifact. Fix the source, build a fresh artifact, and verify the affected routes before publishing again.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| The preview shows page content with no navigation | Start it using `serve.py` and restart any old preview process. Serving raw source files will leave the navigation includes unresolved. |
| A menu edit works locally but the live site is unchanged | Confirm the deployed commit and that the host published a fresh `_site/` build. |
| A removed page still loads after a build | Check whether the artifact came from a reused output directory or the hosting upload retained old objects. |
| Zoho booking button is missing | Check `zoho_booking_url` in `site-config.json`. It must be a public HTTPS service link. |
| An email draft opens but no demo is scheduled | The visitor must send the email, and Sales must reply to confirm. Use the configured Zoho link for booking available time slots. |
