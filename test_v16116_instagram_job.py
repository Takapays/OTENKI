from cloud_run_instagram_job import run
from datetime import date, timedelta
import contextlib
import io

SITE='https://example.run.app'
class Bot:
    CAROUSEL_PAGE_COUNT=9
    def carousel_image_urls(self,d):
        return [f'{SITE}/api/instagram/carousel-static/{d}/{p}?sig=example' for p in range(1,10)]
class Fake:
    instagram_bot=Bot()
    def __init__(self):
        self.probe_ok=True; self.posted=0; self.result={'ok':True}; self.rows=100
    def _national_supabase_enabled(self): return True
    def _national_nextday_date_text(self): return '2026-11-27'
    def _instagram_direct_account_probe(self): return {'ok':self.probe_ok,'httpStatus':200,'username':'test'}
    def _instagram_load_week_100_results(self,d): return {(date.fromisoformat(d)+timedelta(days=i)).isoformat():[{}]*self.rows for i in range(7)}
    def _instagram_carousel_result_loader(self,d,w): return lambda x:w[x]
    def _instagram_post_with_lock(self,d,rows,*,force,load_carousel_results):
        assert not force and len(rows)==100 and len(load_carousel_results(d))==100
        self.posted+=1; return self.result

a=Fake(); checked=[]
def probe(url,site): checked.append((url,site))
with contextlib.redirect_stdout(io.StringIO()):
    assert run(a,site=SITE,probe=probe)==0 and a.posted==0 and len(checked)==1
    assert run(a,site=SITE,probe=probe,publish=True)==0 and a.posted==1
    a.rows=99; assert run(a,site=SITE,probe=probe,publish=True)==1 and a.posted==1
    a.rows=100; a.probe_ok=False; assert run(a,site=SITE,probe=probe,publish=True)==1 and a.posted==1
    a.probe_ok=True; assert run(a,site='https://wrong.example',probe=probe,publish=True)==1 and a.posted==1
    a.result={'ok':True,'skipped':True,'reason':'auto-post-disabled'}; assert run(a,site=SITE,probe=probe,publish=True)==1
    a.result={'ok':False}; assert run(a,site=SITE,probe=probe,publish=True)==1
print('V1.6.116 Instagram Job mock tests: PASS')
