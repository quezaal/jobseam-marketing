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


if __name__ == '__main__':
    unittest.main()
