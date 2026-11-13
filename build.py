"""Build directory routes for static hosts: publish _site/."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent
OUT = ROOT / '_site'
OUT.mkdir(exist_ok=True)
for folder in ('assets', 'screenshots', 'ads'):
    # Advertising exports are optional and may be absent in a clean checkout.
    if folder == 'ads' and not (ROOT / folder).exists():
        print('Skipping optional ads directory (not present)')
        continue
    shutil.copytree(ROOT / folder, OUT / folder, dirs_exist_ok=True)
for source in ROOT.iterdir():
    if not source.is_file() or source.name.startswith('.'):
        continue
    if source.suffix == '.html':
        target = OUT / ('index.html' if source.stem == 'index' else source.stem + '/index.html')
        target.parent.mkdir(exist_ok=True)
        shutil.copy2(source, target)
    elif source.suffix.lower() in ('.ico', '.png', '.jpg', '.pdf', '.pptx', '.xml', '.txt') or source.name == 'CNAME':
        shutil.copy2(source, OUT / source.name)
# Publish only the reviewed public product kit. Internal notes and generators stay local.
kit = ROOT / 'collateral' / 'product-overview'
if kit.exists():
    target = OUT / 'collateral' / 'product-overview'
    target.mkdir(parents=True, exist_ok=True)
    for name in ('index.html', 'one-page.html', 'two-page-flyer.html', 'one-page.pdf', 'two-page-flyer.pdf', 'one-page.md', 'two-page-flyer.md', 'blog-ready.md'):
        shutil.copy2(kit / name, target / name)
    for name in ('assets', 'previews'):
        shutil.copytree(kit / name, target / name, dirs_exist_ok=True)
# Campaign assets are public only when explicitly included here. Review logs stay out.
campaign = ROOT / 'campaigns' / '2026-11-connected-recruiting'
if campaign.exists():
    target = OUT / 'campaigns' / campaign.name
    target.mkdir(parents=True, exist_ok=True)
    for name in ('index.html', 'blog-preview.html', 'blog-body.md', 'blog-ready.md', 'screenshot-flyer.html', 'screenshot-flyer.pdf'):
        shutil.copy2(campaign / name, target / name)
    for name in ('assets', 'previews'):
        shutil.copytree(campaign / name, target / name, dirs_exist_ok=True)
print(f'Built clean routes in {OUT}')
