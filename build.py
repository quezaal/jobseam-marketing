"""Build directory routes for static hosts: publish _site/."""
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parent
OUT = ROOT / '_site'
OUT.mkdir(exist_ok=True)
for folder in ('assets', 'screenshots', 'ads'):
    shutil.copytree(ROOT / folder, OUT / folder, dirs_exist_ok=True)
for source in ROOT.iterdir():
    if not source.is_file() or source.name.startswith('.'):
        continue
    if source.suffix == '.html':
        target = OUT / ('index.html' if source.stem == 'index' else source.stem + '/index.html')
        target.parent.mkdir(exist_ok=True)
        shutil.copy2(source, target)
    elif source.suffix.lower() in ('.png', '.jpg', '.pdf', '.pptx', '.xml', '.txt') or source.name == 'CNAME':
        shutil.copy2(source, OUT / source.name)
print(f'Built clean routes in {OUT}')
