"""Local representative smoke check, not a full-library editorial audit."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urljoin,urlsplit,unquote
import json,sys
root=Path(__file__).resolve().parents[1];dist=root/('release-dist' if '--release' in sys.argv else 'dist')
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.refs=[];self.ids=set();self.images=0;self.feed(text)
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if 'id' in a:self.ids.add(a['id'])
  for k in ['href','src']:
   if a.get(k):self.refs.append(a[k])
  if a.get('srcset'):
   for v in a['srcset'].split(','):
    if v.strip():self.refs.append(v.strip().split()[0])
  if tag=='img':self.images+=1
errors=[];count=images=0;cache={}
for f in (root/'content/entries').glob('*.json'):
 e=json.loads(f.read_text(encoding='utf-8'));page=Page((dist/e['output']).read_text(encoding='utf-8'));images+=page.images
 for ref in page.refs:
  url=urlsplit(urljoin('http://review.local'+e['route'],ref))
  if url.hostname!='review.local':continue
  target=dist/unquote(url.path).lstrip('/')
  if url.path=='/':target=dist/'index.html'
  elif not target.suffix and target.with_suffix('.html').is_file():target=target.with_suffix('.html')
  if not target.is_file():errors.append({'route':e['route'],'ref':ref,'error':'missing local file'});continue
  count+=1
  if url.fragment and target.suffix=='.html':
   if target not in cache:cache[target]=Page(target.read_text(encoding='utf-8')).ids
   if unquote(url.fragment) not in cache[target]:errors.append({'route':e['route'],'ref':ref,'error':'missing fragment'})
report={'scope':str(len(list((root/'content/entries').glob('*.json'))))+' structured local-review routes, including relative links and image srcsets','checkedLocalReferences':count,'imageElements':images,'errors':errors,'externalURLs':'Not fetched by this check'}
(root/('reports/release-links-images.json' if '--release' in sys.argv else 'reports/rendered-links-images.json')).write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2))
if errors:raise SystemExit(1)
