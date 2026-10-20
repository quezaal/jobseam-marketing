"""Discover approved government videos; captions first, optional audio transcription."""
import argparse
import hashlib
import html
import json
import os
import re
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/transcripts'
HOSTS = {'www.whitehouse.gov', 'www.dol.gov', 'oig.dol.gov', 'www.oig.dol.gov', 'www.uscis.gov', 'www.dhs.gov'}
TOPICS = re.compile(r'visa|h-?1b|\bperm\b|immigration|foreign labor', re.I)

class Links(HTMLParser):
    def __init__(self):
        super().__init__(); self.links = []; self.current = None
    def handle_starttag(self, tag, attrs):
        if tag == 'a': self.current = [dict(attrs).get('href', ''), '']
    def handle_data(self, text):
        if self.current is not None: self.current[1] += text
    def handle_endtag(self, tag):
        if tag == 'a' and self.current is not None:
            self.links.append(self.current); self.current = None

def approved(url):
    parsed = urlsplit(url)
    return parsed.scheme == 'https' and parsed.hostname in HOSTS

def read_url(url):
    request = Request(url, headers={'User-Agent':'JobSeam transcript processor'})
    with urlopen(request, timeout=30) as response:
        return response.read(8_000_000).decode('utf-8')

def discover(registry):
    records = [item for item in registry['items'] if item.get('video') or '/videos/' in item['url']]
    try:
        parser = Links(); parser.feed(read_url('https://www.whitehouse.gov/videos/'))
        for href, title in parser.links:
            url = urljoin('https://www.whitehouse.gov/videos/', href)
            if approved(url) and '/videos/' in url and TOPICS.search(title):
                records.append({'url':url, 'title':' '.join(title.split()), 'source':'White House', 'video':True})
    except Exception:
        print('Video discovery unavailable; retaining registered videos.', file=sys.stderr)
    return list({item['url']:item for item in records if approved(item['url'])}.values())

def seconds(value):
    parts = value.replace(',', '.').split(':')
    return sum(float(part) * 60**i for i, part in enumerate(reversed(parts)))

def parse_vtt(text):
    segments = []
    for block in re.split(r'\n\s*\n', text.replace('\r', '')):
        lines = block.splitlines()
        for i, line in enumerate(lines):
            if '-->' not in line: continue
            start, end = line.split('-->', 1)
            content = html.unescape(re.sub(r'<[^>]*>', '', ' '.join(lines[i+1:]))).strip()
            if content:
                segments.append({'start':seconds(start.strip()), 'end':seconds(end.strip().split()[0]), 'text':content})
            break
    return segments

def atomically(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    temp = path.with_suffix('.tmp'); temp.write_text(json.dumps(data, indent=2)+'\n'); temp.replace(path)

def process(url, directory):
    import yt_dlp
    options = {'quiet':True, 'no_warnings':True, 'noplaylist':True, 'socket_timeout':25, 'retries':1}
    with yt_dlp.YoutubeDL(options) as downloader:
        info = downloader.extract_info(url, download=False)
        if info.get('entries'):
            entries = [item for item in info['entries'] if item]
            if len(entries) != 1: raise RuntimeError('ambiguous_video')
            info = entries[0]
        for key, method in [('subtitles', 'publisher-captions'), ('automatic_captions', 'machine-captions')]:
            tracks = info.get(key) or {}
            for language in sorted(tracks, key=lambda lang:lang != 'en'):
                if not re.match(r'^en(?:-|$)', language): continue
                for track in tracks[language]:
                    if track.get('ext') != 'vtt': continue
                    segments = parse_vtt(downloader.urlopen(track['url']).read().decode('utf-8'))
                    if segments: return info, method, segments
        if not os.environ.get('OPENAI_API_KEY'): raise RuntimeError('transcription_not_configured')
        duration = info.get('duration')
        if not duration or duration > 5400: raise RuntimeError('duration_limit')
        audio_options = {**options, 'format':'bestaudio/best', 'outtmpl':str(directory/'audio.%(ext)s'), 'max_filesize':300_000_000}
        with yt_dlp.YoutubeDL(audio_options) as audio_downloader:
            downloaded = audio_downloader.extract_info(info.get('webpage_url') or url, download=True)
            audio = Path(audio_downloader.prepare_filename(downloaded))
        subprocess.run(['ffmpeg','-nostdin','-loglevel','error','-i',str(audio),'-vn','-ac','1','-ar','16000','-b:a','48k','-f','segment','-segment_time','600',str(directory/'chunk-%03d.mp3')],check=True,timeout=600)
        from openai import OpenAI
        client = OpenAI(max_retries=1, timeout=180)
        segments = []
        for i, chunk in enumerate(sorted(directory.glob('chunk-*.mp3'))):
            with chunk.open('rb') as handle:
                result = client.audio.transcriptions.create(model='whisper-1', file=handle, response_format='verbose_json', timestamp_granularities=['segment'], language='en')
            for segment in result.segments or []:
                segments.append({'start':segment.start+i*600,'end':segment.end+i*600,'text':segment.text.strip()})
        if not segments: raise RuntimeError('empty_transcript')
        return info, 'machine-transcription', segments

def main():
    parser = argparse.ArgumentParser(); parser.add_argument('--limit',type=int,default=5); parser.add_argument('--registered-only',action='store_true'); parser.add_argument('--retry',action='store_true'); args = parser.parse_args()
    registry = json.loads((ROOT/'assets/government-records.json').read_text())
    records = [item for item in registry['items'] if item.get('video') or '/videos/' in item['url']] if args.registered_only else discover(registry)
    index_path = OUT/'index.json'; index = json.loads(index_path.read_text()) if index_path.exists() else {'videos':{}}
    pending = [item for item in records if args.retry or index['videos'].get(item['url'], {}).get('status') != 'available']
    for item in pending[:max(0,args.limit)]:
        url = item['url']
        if not approved(url): continue
        prior = index['videos'].get(url, {})
        if prior.get('status') == 'available' and not args.retry: continue
        checked = datetime.now(timezone.utc).isoformat()
        try:
            with tempfile.TemporaryDirectory() as folder:
                info, method, segments = process(url, Path(folder))
            media_url = info.get('webpage_url') or url
            if urlsplit(media_url).scheme != 'https': media_url = url
            key = hashlib.sha256(url.encode()).hexdigest()[:20]
            atomically(OUT/(key+'.json'), {'source_url':url,'video_url':media_url,'method':method,'generated_at':checked,'language':'en','segments':segments})
            index['videos'][url] = {'status':'available','path':'/assets/transcripts/'+key+'.json','title':item['title'],'source':item['source'],'method':method,'checked_at':checked}
            print('Transcript saved: '+item['title'])
        except Exception as error:
            # Preserve an earlier successful transcript; do not publish raw provider errors.
            if prior.get('status') != 'available':
                reason = str(error) if str(error) in {'transcription_not_configured','duration_limit','ambiguous_video','empty_transcript'} else 'source_unavailable'
                index['videos'][url] = {'status':'unavailable','reason':reason,'title':item['title'],'source':item['source'],'checked_at':checked}
            print('Transcript unavailable: '+item['title'], file=sys.stderr)
        atomically(index_path, index)
    if not index_path.exists(): atomically(index_path,index)

if __name__ == '__main__': main()
