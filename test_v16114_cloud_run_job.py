from datetime import date, timedelta
import contextlib
import io
import json
import time
from cloud_run_national_job import run, ttl_seconds, date_priority

TODAY = date(2026, 11, 26)
DATES = [(TODAY+timedelta(days=i)).isoformat() for i in range(1,8)]
class Fake:
    NATIONAL_OUTLOOK_CACHE_TTL = 14400
    def __init__(self):
        self.points = [{'name':str(i),'lat':45-i/10,'lon':140} for i in range(100)]
        self.rows = {}
        self.calls = []
    def _national_supabase_enabled(self): return True
    def _national_supabase_fallback_active(self): return False
    def _national_load_prefetch_points(self): return self.points
    def _national_supabase_read_meta(self,d,pts,*,restrict_keys=False):
        names={p['name'] for p in pts}; rows={n:r['_cache_meta'] for (dd,n),r in self.rows.items() if dd==d and n in names}
        return {n for n,m in rows.items() if m['fresh_until']>time.time()}, {n for n,m in rows.items() if m['fresh_until']<=time.time()}, rows
    def _national_supabase_read(self,d,pts,*,restrict_keys=False):
        assert restrict_keys
        f,s,m=self._national_supabase_read_meta(d,pts)
        return {n:self.rows[(d,n)] for n in f},{n:self.rows[(d,n)] for n in s},m
    def _national_fetch_shared(self,d,batch,*,force_fetch,deadline):
        assert force_fetch and [p['lat'] for p in batch] == sorted(p['lat'] for p in batch)
        self.calls.append((d,self.NATIONAL_OUTLOOK_CACHE_TTL,[p['name'] for p in batch]))
        at=time.time()
        return [{'name':p['name'],'grade':'B','_cache_meta':{'generated_ts':at,'fresh_until':at+self.NATIONAL_OUTLOOK_CACHE_TTL,'stale_until':at+86400}} for p in batch],True,False,None
    def _national_valid_results(self,batch,received,*,fetched_at): return {r['name']:r for r in received}
    def _weatherapi_guard_carry_forward(self,row,previous,target): return row
    def _national_supabase_write(self,d,batch,rows):
        for r in rows: self.rows[(d,r['name'])]=r
        return True

api=Fake()
assert [ttl_seconds(d,TODAY)//3600 for d in DATES]==[6,8,8,12,12,12,12]
# Two dates already fresh; must only fetch the missing dates.
now=time.time()
for d in (DATES[0],DATES[3]):
    for p in api.points:
        api.rows[(d,p['name'])]={'name':p['name'],'grade':'B','_cache_meta':{'generated_ts':now,'fresh_until':now+3600,'stale_until':now+86400}}
out=io.StringIO()
with contextlib.redirect_stdout(out): rc=run(api,budget=420,today=TODAY)
assert rc==0 and len(api.rows)==700
assert {c[0] for c in api.calls}==set(DATES)-{DATES[0],DATES[3]}
assert all(c[1]==ttl_seconds(c[0],TODAY) for c in api.calls)
assert api.NATIONAL_OUTLOOK_CACHE_TTL==14400
report=json.loads(out.getvalue().splitlines()[-1]); assert report['fresh']==700 and report['confirmed']==500 and report['complete']
api.calls.clear()
with contextlib.redirect_stdout(io.StringIO()): assert run(api,today=TODAY)==0
assert not api.calls
# Status-only performs no acquisitions even when there are missing rows.
api.rows.clear()
with contextlib.redirect_stdout(io.StringIO()): assert run(api,today=TODAY,status_only=True)==0
assert not api.calls
print('V1.6.115 Cloud Run Job mock tests: PASS')
