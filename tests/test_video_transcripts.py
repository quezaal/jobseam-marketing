import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('worker', Path(__file__).resolve().parents[1]/'scripts/process-video-transcripts.py')
worker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(worker)

class TranscriptTests(unittest.TestCase):
    def test_vtt_timestamps_markup_and_entities(self):
        data = worker.parse_vtt('WEBVTT\n\n1\n00:01:02.500 --> 00:01:06.000 align:start\n<c>Agency &amp; company</c>\n\n')
        self.assertEqual(data, [{'start':62.5,'end':66.0,'text':'Agency & company'}])

    def test_discovery_only_accepts_approved_government_pages(self):
        with patch.object(worker,'read_url',return_value='<a href="/videos/visa-update/">Visa update</a><a href="https://evil.test/videos/visa">Visa</a>'):
            found = worker.discover({'items':[]})
        self.assertEqual(len(found),1)
        self.assertTrue(worker.approved(found[0]['url']))
        self.assertFalse(worker.approved('http://www.whitehouse.gov/videos/test'))
        self.assertFalse(worker.approved('https://www.whitehouse.gov.evil.test/videos/test'))

    def test_worker_publishes_and_caches_success_without_changing_company_status(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp); (root/'assets').mkdir()
            url='https://www.whitehouse.gov/videos/test/'
            record={'url':url,'title':'Visa announcement','source':'White House','companies':[]}
            registry=root/'assets/government-records.json';registry.write_text(json.dumps({'items':[record]}))
            with patch.object(worker,'ROOT',root),patch.object(worker,'OUT',root/'assets/transcripts'),patch('sys.argv',['worker','--registered-only']),patch.object(worker,'process',return_value=({'webpage_url':url},'machine-captions',[{'start':0,'end':1,'text':'Example'}])) as process:
                worker.main();worker.main()
                self.assertEqual(process.call_count,1)
            index=json.loads((root/'assets/transcripts/index.json').read_text())
            self.assertEqual(index['videos'][url]['status'],'available')
            self.assertEqual(json.loads(registry.read_text())['items'][0]['companies'],[])

    def test_unavailable_sources_do_not_publish_made_up_text(self):
        with tempfile.TemporaryDirectory() as tmp:
            root=Path(tmp);(root/'assets').mkdir();url='https://www.whitehouse.gov/videos/test/'
            (root/'assets/government-records.json').write_text(json.dumps({'items':[{'url':url,'title':'Visa video','source':'White House'}]}))
            with patch.object(worker,'ROOT',root),patch.object(worker,'OUT',root/'assets/transcripts'),patch('sys.argv',['worker','--registered-only']),patch.object(worker,'process',side_effect=RuntimeError('transcription_not_configured')):
                worker.main()
            entry=json.loads((root/'assets/transcripts/index.json').read_text())['videos'][url]
            self.assertEqual(entry['status'],'unavailable');self.assertNotIn('path',entry)
