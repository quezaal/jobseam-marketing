from pathlib import Path
import json,hashlib,datetime
R=Path(__file__).resolve().parents[1];p=R/'release-manifest.json';old=json.loads(p.read_text()) if p.exists() else {}
files=[R/x for x in ['blog-body.md','blog-ready.md','blog-preview.html','screenshot-flyer.html','screenshot-flyer.pdf','social-posts.md']]+sorted((R/'assets').glob('*'))
items=[{'file':str(f.relative_to(R)),'sha256':hashlib.sha256(f.read_bytes()).hexdigest()} for f in files if f.is_file()]
revision=hashlib.sha256(json.dumps(items,sort_keys=True).encode()).hexdigest()
result={'campaign':'2026-11-connected-recruiting','working_revision_sha256':revision,'generated_at_utc':datetime.datetime.now(datetime.timezone.utc).isoformat(),'preparation_status':'ready_for_owner_review','approval':old.get('approval') if old.get('working_revision_sha256')==revision else None,'publication_records':old.get('publication_records',[]),'distribution_log':'distribution-log.csv','screenshot_provenance':'Actual JobSeam frontend, synthetic browser-test fixtures, light theme. No live customer data.','assets':items}
p.write_text(json.dumps(result,indent=2)+'\n');print('Updated artifact manifest; no publication or distribution recorded automatically.')
