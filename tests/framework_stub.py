"""Test-only framework double. Not Flask, not a real HTTP/WSGI integration test.
Enabled only by TRATEN_ALLOW_FRAMEWORK_STUB=1 when Flask is unavailable.
Never imported by the application or installed as a runtime dependency.
"""
import json,logging,mimetypes,types
from pathlib import Path
class HTTPError(Exception):
    def __init__(self,code):self.code=code
class Headers(dict):
    pass
class Vary:
    def __init__(self,response):self.response=response
    def add(self,key):
        old=self.response.headers.get('Vary','')
        if key not in old:self.response.headers['Vary']=(old+', '+key).strip(', ')
class Response:
    def __init__(self,body=b'',status=200,content_type='text/html; charset=utf-8',**kw):
        self.body=body.encode() if isinstance(body,str) else body;self.status_code=status
        self.content_type=content_type;self.headers=Headers();self.direct_passthrough=False;self.is_streamed=False;self.vary=Vary(self)
    @property
    def data(self):return self.body
    @property
    def content_length(self):return len(self.body)
    def get_data(self,as_text=False):return self.body.decode() if as_text else self.body
    def set_data(self,data):self.body=data.encode() if isinstance(data,str) else data
    def get_json(self):return json.loads(self.body)
    def set_etag(self,etag):self.headers['ETag']='"'+etag+'"'
class Encodings:
    def __getitem__(self,key):
        raw=request.headers.get('Accept-Encoding','').lower()
        for part in raw.split(','):
            bits=part.strip().split(';')
            if bits[0] in (key,'*'):
                return float(bits[1].split('=')[1]) if len(bits)>1 else 1
        return 0
request=types.SimpleNamespace(path='/',method='GET',args={},headers={},accept_encodings=Encodings(),get_json=lambda silent=True:None)
def jsonify(*args,**kwargs):
    return Response(json.dumps(args[0] if args else kwargs,ensure_ascii=False).encode(),content_type='application/json')
def abort(code):raise HTTPError(code)
def send_from_directory(directory,path,**kwargs):
    file=Path(directory)/path
    if not file.is_file():abort(404)
    return Response(file.read_bytes(),content_type=kwargs.get('mimetype') or mimetypes.guess_type(path)[0] or 'application/octet-stream')
def send_file(path,**kwargs):return send_from_directory(str(Path(path).parent),Path(path).name,**kwargs)
class Flask:
    def __init__(self,*a,**kw):self.config={};self.routes={};self.before=[];self.after=[];self.logger=logging.getLogger('framework-double')
    def route(self,path,methods=['GET']):
        def deco(f):
            for method in methods:self.routes[(method,path)]=f
            return f
        return deco
    def get(self,path):return self.route(path,['GET'])
    def post(self,path):return self.route(path,['POST'])
    def before_request(self,f):self.before.append(f);return f
    def after_request(self,f):self.after.append(f);return f
    def test_client(self):return Client(self)
class Client:
    def __init__(self,app):self.app=app
    def __enter__(self):return self
    def __exit__(self,*args):pass
    def get(self,url,**kw):return self.open(url,'GET',**kw)
    def post(self,url,**kw):return self.open(url,'POST',**kw)
    def open(self,url,method='GET',json=None,headers=None,**kw):
        from urllib.parse import urlsplit,parse_qsl
        u=urlsplit(url);request.path=u.path;request.method=method;request.args=dict(parse_qsl(u.query));request.headers=headers or {}
        request.get_json=lambda silent=True:json
        try:
            for f in self.app.before:f()
            f=self.app.routes.get((method,u.path))
            response=f() if f else self.app.routes[('GET','/<path:path>')](u.path.lstrip('/')) if method=='GET' else abort(404)
        except HTTPError as exc:response=Response(b'error',exc.code)
        if isinstance(response,tuple):response,code=response;response.status_code=code
        for f in self.app.after:response=f(response)
        return response
