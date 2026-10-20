"""Refresh the static immigration feed from FederalRegister.gov agency publications."""
import json
import re
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode
from urllib.request import Request, urlopen

AGENCIES = ['u-s-citizenship-and-immigration-services', 'employment-and-training-administration']
RULES = {'H-1B':['h-1b','h1b','specialty occupation'], 'PERM':['perm','labor certification','labor condition','foreign labor'], 'Wages':['wage','salary'], 'I-9':['i-9','e-verify','employment eligibility'], 'Enforcement':['enforcement','audit','investigation'], 'OPT/STEM':['optional practical','stem','f-1','cap-gap']}

def main():
    items = []
    for agency in AGENCIES:
        query = urlencode({'per_page':50, 'order':'newest', 'conditions[agencies][]':agency})
        url = 'https://www.federalregister.gov/api/v1/documents.json?' + query
        with urlopen(Request(url, headers={'User-Agent':'JobSeam public feed reader'}), timeout=30) as response:
            documents = json.load(response)['results']
        for doc in documents:
            text = (doc['title']+' '+(doc.get('abstract') or '')).lower()
            tags = [tag for tag, words in RULES.items() if any(re.search(r'\b' + re.escape(word) + r'\b', text) for word in words)]
            if agency == 'employment-and-training-administration' and not tags:
                continue
            items.append({'title':doc['title'], 'url':doc['html_url'], 'source':'USCIS' if agency.startswith('u-s-citizenship') else 'DOL/ETA', 'published_at':doc['publication_date'], 'tags':tags})
    items = sorted({item['url']:item for item in items}.values(), key=lambda item:item['published_at'], reverse=True)[:60]
    if not items:
        raise RuntimeError('No publications received; preserving the existing snapshot')
    path = Path(__file__).resolve().parents[1] / 'assets/immigration-news.json'
    payload = {'updated_at':datetime.now(timezone.utc).isoformat(), 'source':'FederalRegister.gov agency publications', 'items':items}
    temporary = path.with_suffix('.tmp')
    temporary.write_text(json.dumps(payload, indent=2)+'\n')
    temporary.replace(path)
    print(f'Saved {len(items)} agency publications to {path}')

if __name__ == '__main__':
    main()
