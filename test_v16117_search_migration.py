from pathlib import Path
from html.parser import HTMLParser
import ast, json, os, types, xml.etree.ElementTree as ET
BASE='https://traten-1075463785472.asia-northeast1.run.app'
OLD='https://otenki.onrender.com'
TOKEN='wUPULFfXXbWQZJLb4U9T1Mt6RXoMon9IFYlC2X9mZMI'
class Page(HTMLParser):
    def __init__(self, source):
        super().__init__(); self.head=False; self.canon=[]; self.tokens=[]; self.feed(source)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if tag=='head': self.head=True
        if self.head and tag=='link' and a.get('rel')=='canonical': self.canon.append(a.get('href'))
        if self.head and tag=='meta' and a.get('name')=='google-site-verification': self.tokens.append(a.get('content'))
    def handle_endtag(self, tag):
        if tag=='head': self.head=False
paths=['/','/guide.html','/live-cameras.html','/water-sources.html','/trailheads.html','/huts.html']
for path in paths:
    html=Path('index.html' if path=='/' else path[1:]).read_text()
    page=Page(html)
    assert page.canon==[BASE+path], (path,page.canon)
    assert OLD not in html
    if path=='/': assert page.tokens==[TOKEN]
assert [x.text for x in ET.parse('sitemap.xml').findall('.//{*}loc')]==[BASE+p for p in paths]
assert 'Sitemap: '+BASE+'/sitemap.xml' in Path('robots.txt').read_text()
server=ast.parse(Path('server.py').read_text())
hook=next(n for n in server.body if isinstance(n,ast.FunctionDef) and n.name=='_redirect_legacy_public_pages')
hook.decorator_list=[]
request=types.SimpleNamespace(host='otenki.onrender.com',method='GET',path='/',query_string=b'')
ns={'os':os,'request':request,'redirect':lambda target,code:(target,code)}
exec(compile(ast.Module(body=[hook],type_ignores=[]),'<redirect hook>','exec'),ns)
f=ns[hook.name]
old_env=os.environ.get('TRATEN_LEGACY_REDIRECT')
try:
    os.environ['TRATEN_LEGACY_REDIRECT']='0'; assert f() is None
    os.environ['TRATEN_LEGACY_REDIRECT']='1'
    for path in paths+['/trailhead-access.html','/index.html']:
        request.path=path; assert f()==(BASE+('/' if path=='/index.html' else path),301)
    request.path='/guide.html'; request.query_string=b'a=1&b=2'; assert f()==(BASE+'/guide.html?a=1&b=2',301)
    request.query_string=b''
    for path in ['/api/health','/api/national-outlook/refresh-cache','/google5a7b3dfd79ff97f0.html','/robots.txt','/sitemap.xml','/app.js']:
        request.path=path; assert f() is None
    request.path='/'; request.host=BASE.removeprefix('https://'); assert f() is None
    request.host='otenki.onrender.com'; request.method='POST'; assert f() is None
finally:
    if old_env is None: os.environ.pop('TRATEN_LEGACY_REDIRECT',None)
    else: os.environ['TRATEN_LEGACY_REDIRECT']=old_env
print('V1.6.117 search metadata and redirect hook unit checks: PASS')
