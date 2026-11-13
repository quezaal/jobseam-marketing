"""Exercise the static build with the directories available in a clean checkout."""
from pathlib import Path
import shutil
import subprocess
import sys
import tempfile
import unittest


class StaticBuildTests(unittest.TestCase):
    def test_build_with_and_without_optional_ads(self):
        for include_ads in (False, True):
            with self.subTest(include_ads=include_ads), tempfile.TemporaryDirectory() as tmp:
                root = Path(tmp)
                shutil.copy2(Path(__file__).resolve().parents[1] / 'build.py', root)
                folders = ['assets', 'screenshots'] + (['ads'] if include_ads else [])
                for folder in folders:
                    (root / folder).mkdir()
                    (root / folder / 'example.txt').write_text(folder)
                (root / 'index.html').write_text('home')
                (root / 'talent.html').write_text('talent')
                result = subprocess.run(
                    [sys.executable, str(root / 'build.py')],
                    capture_output=True, text=True,
                )
                self.assertEqual(result.returncode, 0, result.stderr)
                self.assertEqual((root / '_site/index.html').read_text(), 'home')
                self.assertEqual((root / '_site/talent/index.html').read_text(), 'talent')
                for folder in folders:
                    self.assertEqual((root / '_site' / folder / 'example.txt').read_text(), folder)
                if not include_ads:
                    self.assertFalse((root / '_site/ads').exists())


    def test_product_kit_publishes_downloads_without_internal_material(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            shutil.copy2(Path(__file__).resolve().parents[1] / 'build.py', root)
            for name in ['assets', 'screenshots']:
                (root / name).mkdir()
            kit = root / 'collateral/product-overview'
            kit.mkdir(parents=True)
            public = ['index.html', 'one-page.html', 'two-page-flyer.html', 'one-page.pdf', 'two-page-flyer.pdf', 'one-page.md', 'two-page-flyer.md', 'blog-ready.md']
            for name in public + ['SOURCE_NOTES.md', 'README.md', 'content.json']:
                (kit / name).write_text(name)
            for name in ['assets', 'previews', 'tools', 'archive']:
                (kit / name).mkdir()
                (kit / name / 'example.txt').write_text(name)
            result = subprocess.run([sys.executable, str(root / 'build.py')], capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            out = root / '_site/collateral/product-overview'
            for name in public:
                self.assertTrue((out / name).exists(), name)
            for name in ['assets', 'previews']:
                self.assertTrue((out / name / 'example.txt').exists())
            for name in ['SOURCE_NOTES.md', 'README.md', 'content.json', 'tools', 'archive']:
                self.assertFalse((out / name).exists(), name)


    def test_campaign_build_excludes_review_and_distribution_records(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            shutil.copy2(Path(__file__).resolve().parents[1] / 'build.py', root)
            for folder in ['assets', 'screenshots']:
                (root / folder).mkdir()
            campaign = root / 'campaigns/2026-11-connected-recruiting'
            campaign.mkdir(parents=True)
            public = ['index.html', 'blog-preview.html', 'blog-body.md', 'blog-ready.md', 'screenshot-flyer.html', 'screenshot-flyer.pdf']
            private = ['README.md', 'REVIEW_NOTES.md', 'distribution-log.csv', 'release-manifest.json', 'social-posts.md', 'blog-metadata.json', 'editor-fields.txt']
            for name in public + private:
                (campaign / name).write_text(name)
            for name in ['assets', 'previews', 'tools']:
                (campaign / name).mkdir()
                (campaign / name / 'example.txt').write_text(name)
            result = subprocess.run([sys.executable, str(root / 'build.py')], capture_output=True, text=True)
            self.assertEqual(result.returncode, 0, result.stderr)
            out = root / '_site/campaigns/2026-11-connected-recruiting'
            for name in public:
                self.assertTrue((out / name).exists(), name)
            for name in private + ['tools']:
                self.assertFalse((out / name).exists(), name)
            self.assertTrue((out / 'assets/example.txt').exists())


if __name__ == '__main__':
    unittest.main()
