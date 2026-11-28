"""Offline TTL checks against actual source functions; no network or DB."""
import ast, math, time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from cloud_run_national_job import ttl_seconds
src=Path('server.py').read_text()
tree=ast.parse(src)
names={'_national_policy_ttl','_national_meta','_national_valid_results','_national_response','_national_public_result'}
now=datetime(2026,11,28,0,5,tzinfo=timezone(timedelta(hours=9))).timestamp()
class Clock:
    @staticmethod
    def time(): return now
class Response:
    def __init__(self,payload): self.payload=payload; self.headers={}
ns=dict(datetime=datetime,timedelta=timedelta,timezone=timezone,time=Clock,math=math,
    _national_date_ttl_seconds=ttl_seconds,NATIONAL_OUTLOOK_CACHE_TTL=14400,NATIONAL_OUTLOOK_STALE_TTL=86400,
    NATIONAL_OUTLOOK_ENGINE='v20',APP_VERSION='1.6.124',jsonify=Response,
    _national_supabase_fallback_active=lambda:False,_national_supabase_enabled=lambda:True)
exec(compile(ast.Module(body=[n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name in names],type_ignores=[]),'<ttl>','exec'),ns)
meta=ns['_national_meta']; policy=ns['_national_policy_ttl']; valid=ns['_national_valid_results']
for offset,h in enumerate([6,6,8,8,12,12,12,12]):
    d=(datetime.fromtimestamp(now,timezone(timedelta(hours=9))).date()+timedelta(days=offset)).isoformat()
    m=meta({},fetched_at=now,date_text=d)
    assert policy(d,now)==h*3600==m['fresh_until']-m['generated_ts']
    assert m['stale_until']-m['generated_ts']==86400
    r=valid([{'name':'a'}],[{'name':'a','grade':'D'}],fetched_at=now,date_text=d)['a']
    assert r['_cache_meta']==m
# JST midnight boundary, not UTC midnight.
assert policy('2026-11-30',now)==28800
assert policy('2026-11-30',now-600)==28800
assert policy('2026-12-02',now)==43200
assert policy('2026-12-01',now)==28800
assert policy('2026-12-01',now-600)==43200
old={'generated_ts':now-15000,'fresh_until':now-600,'stale_until':now-15000+86400}
new=meta({},fetched_at=now,date_text='2026-12-03')
assert meta({'_cache_meta':old},fetched_at=now,date_text='2026-12-03')==old
rows=[{'name':'a','grade':'D','_cache_meta':old},{'name':'b','grade':'E','_cache_meta':new}]
r=ns['_national_response']({'date':'2026-12-03','points':[{'name':'a'},{'name':'b'}],'results':rows},'stale').payload['cache']
assert r['policyTtlSeconds']==43200 and r['freshTtlSeconds']==14400 and r['storedTtlMaxSeconds']==43200
assert r['freshCount']==1 and r['staleCount']==1
# All production paths that create fresh shared records pass the date.
for node in ast.walk(tree):
    if isinstance(node,ast.Call) and isinstance(node.func,ast.Name) and node.func.id=='_national_meta' and any(k.arg=='fetched_at' for k in node.keywords):
        assert any(k.arg=='date_text' for k in node.keywords),node.lineno
print('V1.6.124 TTL policy, JST boundary, legacy preservation, mixed TTL and freshness: PASS')
