"""Real localhost HTTP/Flask smoke tests, never silently replaced by framework doubles."""
import os,sys,unittest,threading,urllib.request,urllib.error,contextlib,json
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parent))
import test_nonroute_v161 as unit
s=unit.s
@unittest.skipUnless(unit.FRAMEWORK=='flask','Real Flask/Werkzeug unavailable; HTTP acceptance NOT performed')
class RealHTTP(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        from werkzeug.serving import make_server
        cls.http=make_server('127.0.0.1',0,s.app);cls.base='http://127.0.0.1:'+str(cls.http.server_port)
        cls.thread=threading.Thread(target=cls.http.serve_forever,daemon=True);cls.thread.start()
    @classmethod
    def tearDownClass(cls):cls.http.shutdown();cls.thread.join(5);cls.http.server_close()
    def get(self,path):return urllib.request.urlopen(self.base+path,timeout=10)
    def test_http_01_health(self):
        with self.get('/api/health') as r:
            data=json.loads(r.read());self.assertEqual(data['version'],'1.6.1');self.assertFalse(data['national_auto_refresh_enabled'])
    def test_http_02_js_css_and_pages(self):
        for path,kind in [('/app.js?v=1.6.1','javascript'),('/ui-v1.4.254.css?v=1.6.1','css'),('/water-sources.html','text/html'),('/huts.html','text/html')]:
            with self.get(path) as r:self.assertIn(kind,r.headers['Content-Type']);self.assertGreater(len(r.read()),100)
    def test_http_03_unknown_js_is404(self):
        with self.assertRaises(urllib.error.HTTPError) as ctx:self.get('/missing.js')
        self.assertEqual(ctx.exception.code,404)
    def test_http_04_cache_only_empty_no_upstream(self):
        body=json.dumps({'date':unit.DAY,'points':[unit.point(900)],'cacheOnly':True}).encode()
        req=urllib.request.Request(self.base+'/api/national-outlook',body,headers={'Content-Type':'application/json'},method='POST')
        with urllib.request.urlopen(req,timeout=10) as r:
            data=json.loads(r.read());self.assertEqual(data['cache']['newlyFetchedCount'],0)
    def test_http_05_unknown_api_is404(self):
        with self.assertRaises(urllib.error.HTTPError) as ctx:self.get('/api/unknown')
        self.assertEqual(ctx.exception.code,404)
    def test_http_06_public_html_cache_bust(self):
        with self.get('/water-sources.html') as r:
            data=r.read().decode();self.assertIn('v=1.6.1',data);self.assertIn('no-store',r.headers['Cache-Control'])
