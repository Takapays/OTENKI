"""V1.6.1 regression acceptance. All upstream/DB/social traffic is mocked.
Run normally with Flask installed: python -m unittest discover -s tests -p 'test_nonroute_v161.py' -v
Without Flask, a deliberately weaker direct-handler run is available only by explicit opt-in:
TRATEN_ALLOW_FRAMEWORK_STUB=1 python -m unittest discover -s tests -p 'test_nonroute_v161.py' -v
"""
import os,sys,json,time,tempfile,unittest,types,contextlib,threading,importlib,subprocess,gzip,ast
from pathlib import Path
from datetime import datetime,timezone,timedelta
from unittest.mock import patch
ROOT=Path(__file__).resolve().parents[1]
SANDBOX=tempfile.TemporaryDirectory(prefix='traten-nr231-')
os.environ['NATIONAL_OUTLOOK_AUTO_REFRESH']='0'
os.environ['INSTAGRAM_AUTO_POST']='0'
os.environ['INSTAGRAM_PERSIST_DIR']=str(Path(SANDBOX.name)/'social')
os.environ['NATIONAL_OUTLOOK_CACHE_DIR']=str(Path(SANDBOX.name)/'cache')
# No production environment credentials are read or used by this suite.
os.environ['SUPABASE_URL']='';os.environ['SUPABASE_SERVICE_ROLE_KEY']=''
os.environ['INSTAGRAM_ACCESS_TOKEN']='';os.environ['INSTAGRAM_USER_ID']=''
os.environ['NATIONAL_PREFETCH_COUNT']='300'
os.environ['NATIONAL_OUTLOOK_CHUNK_SIZE']='25'
os.environ['NATIONAL_100_ROLLING_DAYS']='7'
os.environ['NATIONAL_100_ROLLING_DATES_PER_CYCLE']='1'
sys.path.insert(0,str(ROOT))
FRAMEWORK='flask'
try:
    import flask
except ModuleNotFoundError:
    if os.environ.get('TRATEN_ALLOW_FRAMEWORK_STUB')!='1':
        raise RuntimeError('Flask is required for integration acceptance; install project dependencies. No implicit fake pass.')
    import framework_stub as flask
    sys.modules['flask']=flask
    FRAMEWORK='framework-double (NOT real Flask or HTTP)'
import server as s
s.app.config['TESTING']=True
print('TEST_FRAMEWORK:',FRAMEWORK,flush=True)
DAY=(datetime.now(timezone.utc)+timedelta(days=1,hours=9)).date().isoformat()
def point(i):return {'name':f'p{i:03}','lat':35+i*0.0001,'lon':135,'elevation':1000}
def rows(points,age=0,grade='B'):
    gt=time.time()-age
    return [dict(name=p['name'],grade=grade,source='metno',_cache_meta={'generated_ts':gt,'fresh_until':gt+14400,'stale_until':gt+86400}) for p in points]
class FakeDB:
    def __init__(self,fail=False,limit=None):self.data={};self.fail=fail;self.limit=limit;self.calls=[];self.writes=[]
    def read(self,date,ps):
        out={p['name']:self.data[(date,p['name'])] for p in ps if (date,p['name']) in self.data}
        fresh={n:r for n,r in out.items() if r['_cache_meta']['fresh_until']>time.time()}
        stale={n:r for n,r in out.items() if r['_cache_meta']['fresh_until']<=time.time()<r['_cache_meta']['stale_until']}
        return fresh,stale,{n:r['_cache_meta'] for n,r in out.items()}
    def write(self,date,ps,rs):
        self.writes.append(len(rs))
        if self.fail:return False
        self.data.update({(date,r['name']):r for r in rs});return True
    def fetch(self,date,ps):
        self.calls.append(len(ps))
        good=[p for p in ps if self.limit is None or int(p['name'][1:])<self.limit]
        rs=rows(good)
        return rs,len(rs)==len(ps),False,None
    @contextlib.contextmanager
    def mocked(self):
        with patch.object(s,'_national_supabase_enabled',return_value=True),patch.object(s,'_national_supabase_read',side_effect=self.read),patch.object(s,'_national_supabase_write',side_effect=self.write),patch.object(s,'_national_fetch_shared',side_effect=self.fetch):yield self
class RegressionTests(unittest.TestCase):
    def setUp(self):
        s._national_point_cache.clear();s._national_refresh_stop.clear()
        for p in Path(s.NATIONAL_OUTLOOK_CACHE_DIR).glob('*.json'):p.unlink()
        self.net=patch.object(s.urllib.request,'urlopen',side_effect=AssertionError('External network prohibited in tests'))
        self.net.start();self.addCleanup(self.net.stop)
    def test_01_conservative_grade_six_cases(self):
        cases=[(2,25,0,'C'),(2,2,.2,'B'),(9,9,0,'C'),(2,2,1.5,'C'),([13,13]+[2]*8,[13,13]+[2]*8,0,'C'),([5]+[2]*9,[5]+[2]*9,0,'B')]
        d=datetime.fromisoformat(DAY).replace(hour=6,tzinfo=timezone(timedelta(hours=9)))
        for w,g,r,expected in cases:
            times=[]
            for i in range(10):
                times.append({'time':(d+timedelta(hours=i)).isoformat(),'data':{'instant':{'details':{'air_temperature':10,'wind_speed':w[i] if isinstance(w,list) else w,'wind_speed_of_gust':g[i] if isinstance(g,list) else g}},'next_1_hours':{'details':{'precipitation_amount':r}}}})
            result=s._national_result_from_metno(point(0),DAY,{'properties':{'timeseries':times}})
            self.assertEqual(result['grade'],expected)
    def test_02_gfs_conservative_thresholds_retained(self):
        src=ROOT.joinpath('server.py').read_text();tree=ast.parse(src)
        f=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='_national_gfs_results')
        text=ast.get_source_segment(src,f)
        self.assertIn('>=12',text);self.assertIn('>=18',text);self.assertIn('>=25',text)
        self.assertIn('>=0.1',text)
    def test_03_25_chunks_and_checkpoints(self):
        ps=[point(i) for i in range(300)]
        with FakeDB().mocked() as db:
            _,r=s._national_fetch_and_persist(DAY,ps,ps)
            self.assertTrue(r['ok']);self.assertEqual(db.calls,[25]*12);self.assertEqual(db.writes,[25]*12)
            self.assertEqual(r['pointsUpdated'],300);self.assertEqual(r['remainingDueAfter'],0)
    def test_04_partial_58_is_not_success(self):
        ps=[point(i) for i in range(300)]
        with FakeDB(limit=58).mocked() as db:
            _,r=s._national_fetch_and_persist(DAY,ps,ps)
            self.assertFalse(r['ok']);self.assertEqual(r['pointsUpdated'],58);self.assertEqual(r['remainingDueAfter'],242)
    def test_05_write_failure_does_not_count_as_saved(self):
        ps=[point(i) for i in range(50)]
        with FakeDB(fail=True).mocked() as db:
            snap,r=s._national_fetch_and_persist(DAY,ps,ps)
            self.assertFalse(r['ok']);self.assertEqual(r['pointsUpdated'],0);self.assertEqual(r['persistedCount'],0)
            self.assertEqual(len(snap['results']),50)
    def test_06_write_ack_without_readback_is_not_success(self):
        ps=[point(i) for i in range(25)]
        with FakeDB().mocked(),patch.object(s,'_national_supabase_write',return_value=True):
            _,r=s._national_fetch_and_persist(DAY,ps,ps)
            self.assertFalse(r['ok']);self.assertEqual(r['persistedCount'],0)
    def test_07_cache_only_never_calls_upstream(self):
        with FakeDB().mocked() as db,s.app.test_client() as c:
            data=c.post('/api/national-outlook',json={'date':DAY,'points':[point(0)],'cacheOnly':True}).get_json()
            self.assertEqual(data['cache']['state'],'cache-miss');self.assertEqual(db.calls,[])
    def test_08_cache_age_and_remaining_preserved(self):
        ps=[point(0)];db=FakeDB();db.data[(DAY,'p000')]=rows(ps,12600)[0]
        with db.mocked(),s.app.test_client() as c:
            data=c.post('/api/national-outlook',json={'date':DAY,'points':ps,'cacheOnly':True}).get_json()
            self.assertAlmostEqual(data['cache']['ageSeconds'],12600,delta=2)
            self.assertAlmostEqual(data['cache']['freshRemainingSeconds'],1800,delta=2)
    def test_09_mixed_stale_rows_not_rejuvenated(self):
        ps=[point(0),point(1)]
        old=rows(ps[:1],15000);new=rows(ps[1:])
        snap=s._national_write_disk_cache(DAY,s._national_points_fingerprint(ps),ps,old+new)
        loaded,state=s._national_read_disk_cache(DAY,s._national_points_fingerprint(ps))
        self.assertEqual(state,'stale');self.assertLess(loaded['fresh_until'],time.time())
        self.assertAlmostEqual(time.time()-loaded['generated_ts'],15000,delta=2)
    def test_10_previous_engine_cache_is_rejected(self):
        ps=[point(0)];fp=s._national_points_fingerprint(ps)
        path=Path(s._national_cache_file(DAY,fp));path.write_text(json.dumps({'date':DAY,'fingerprint':fp,'engine':'metno-gfs-v1','points':ps,'results':rows(ps)}))
        data,state=s._national_read_disk_cache(DAY,fp);self.assertIsNone(data);self.assertEqual(state,'incompatible')
    def test_11_empty_database_is_seeded(self):
        ps=[point(i) for i in range(300)]
        with FakeDB().mocked() as db,patch.object(s,'_national_load_prefetch_points',return_value=ps),patch.object(s,'_national_rolling_100_date_texts',return_value=[DAY]):
            r=s._refresh_rolling_100_cache();self.assertTrue(r['ok']);self.assertEqual(r['pointsUpdated'],300);self.assertTrue(r['windowComplete'])
    def test_12_only_missing_rows_refetched(self):
        ps=[point(i) for i in range(300)];db=FakeDB()
        for r in rows(ps[:58]):db.data[(DAY,r['name'])]=r
        with db.mocked(),patch.object(s,'_national_load_prefetch_points',return_value=ps),patch.object(s,'_national_rolling_100_date_texts',return_value=[DAY]):
            report=s._refresh_rolling_100_cache();self.assertTrue(report['ok']);self.assertEqual(sum(db.calls),242)
            self.assertLessEqual(max(db.calls),25)
    def test_13_current_social_scope_and_minimum_preserved(self):
        actual=s._national_load_100_points();self.assertEqual(len(actual),100)
        db=FakeDB()
        for r in rows(actual[:97]):db.data[(DAY,r['name'])]=r
        with db.mocked():self.assertEqual(s._instagram_load_fresh_100_results(DAY),[])
        for r in rows(actual[:98]):db.data[(DAY,r['name'])]=r
        with db.mocked():self.assertEqual(len(s._instagram_load_fresh_100_results(DAY)),98)
    def test_14_auto_post_hook_disabled_is_respected(self):
        with patch.object(s.instagram_bot,'INSTAGRAM_AUTO_POST',False),patch.object(s.instagram_bot,'maybe_post_tomorrow') as post:
            r=s._instagram_maybe_post_after_refresh();self.assertTrue(r['skipped']);post.assert_not_called()
    def test_15_auto_post_hook_uses_existing_bot_gate(self):
        with patch.object(s.instagram_bot,'INSTAGRAM_AUTO_POST',True),patch.object(s.instagram_bot,'maybe_post_tomorrow',return_value={'ok':True,'skipped':True}) as post:
            s._instagram_maybe_post_after_refresh();post.assert_called_once()
            self.assertIs(post.call_args.kwargs['load_results'],s._instagram_load_fresh_100_results)
    def test_16_auto_update_off_starts_nothing(self):
        with patch.object(s,'NATIONAL_OUTLOOK_AUTO_REFRESH',False),patch.object(s.threading,'Thread') as thread:
            s._ensure_national_refresh_worker();thread.assert_not_called()
    def test_17_os_date_lock_rejects_overlapping_point_sets(self):
        self.assertTrue(s._national_try_lock(DAY,'groupA'))
        try:self.assertFalse(s._national_try_lock(DAY,'groupB'))
        finally:s._national_unlock(DAY,'groupA')
        self.assertTrue(s._national_try_lock(DAY,'groupB'));s._national_unlock(DAY,'groupB')
    def test_18_all_html_dependencies_served(self):
        import re
        tested=0
        with s.app.test_client() as c:
            for file in ROOT.glob('*.html'):
                if file.name not in s.PUBLIC_FILES|{'index.html'}:continue
                for url in re.findall(r'(?:src|href)=[\"\']([^\"\']+)',file.read_text(errors='replace')):
                    path=url.split('?')[0].split('#')[0].lstrip('/')
                    if not path or ':' in path or not (ROOT/path).is_file():continue
                    r=c.get('/'+path+'?v=1.6.1');self.assertEqual(r.status_code,200,(file.name,path))
                    if path.endswith('.js'):self.assertIn('javascript',r.content_type,path)
                    if path.endswith('.css'):self.assertIn('css',r.content_type,path)
                    tested+=1
        self.assertGreater(tested,38)
    def test_19_unknown_assets_and_private_paths_are_not_html200(self):
        with s.app.test_client() as c:
            for path in ['/server.py','/missing.js','/.git/config','/api/unknown']:
                self.assertEqual(c.get(path).status_code,404,path)
    def test_20_gzip_and_cache_headers(self):
        with s.app.test_client() as c:
            plain=c.get('/app.js?v=1.6.1')
            packed=c.get('/app.js?v=1.6.1',headers={'Accept-Encoding':'gzip'})
            self.assertEqual(packed.headers.get('Content-Encoding'),'gzip')
            self.assertEqual(gzip.decompress(packed.data),plain.data)
            self.assertIn('immutable',packed.headers['Cache-Control'])
            none=c.get('/app.js',headers={'Accept-Encoding':'gzip;q=0'})
            self.assertNotIn('Content-Encoding',none.headers)
    def test_21_water_index_missing_is_not_zero_success(self):
        with patch.object(s,'_water_mountain_cache_load',return_value={'mountains':{}}),s.app.test_client() as c:
            r=c.get('/api/water-mountain-index');self.assertEqual(r.status_code,503);self.assertFalse(r.get_json()['ok'])
    def test_22_water_availability_uses_fixed_index(self):
        data={'mountains':{'TestMountain':{'checked':True,'sources':[{'name':'fixed'}]}}}
        with patch.object(s,'_water_mountain_cache_load',return_value=data),s.app.test_client() as c:
            r=c.post('/api/route-extras-availability',json={'mountain':'TestMountain','points':[point(0)]}).get_json()
            self.assertTrue(r['water']);self.assertEqual(r['cameraSource'],'client-fixed-catalog')
    def test_23_manual_water_correction_preserved(self):
        name='\u767d\u99ac\u5cb3'
        out=s._apply_water_manual_overrides({'mountains':{name:{'checked':True,'sources':[]}}})
        self.assertTrue(any(r['name']=='\u9280\u5dba\u6c34' for r in out['mountains'][name]['sources']))
    def test_24_all_frontend_event_names_accepted(self):
        import re
        emitted=set(re.findall(r"logEvent\(['\"]([^'\"]+)['\"]",(ROOT/'app.js').read_text()))
        self.assertFalse(emitted-s.ALLOWED_EVENT_NAMES)
        self.assertIn('route_camera',s.ALLOWED_EVENT_NAMES)
        self.assertTrue(s._usage_row({'event_name':'route_camera','session_id':'audit','metadata':{}}))
    def test_25_indexnow_page_contract(self):
        self.assertEqual(len(s.INDEXNOW_PUBLIC_URLS),6)
    def test_26_health_monitoring_restored(self):
        with s.app.test_client() as c:d=c.get('/api/health').get_json()
        for k in ['national_last_refresh_report','national_refresh_runtime','national_100_chunk_size','national_100_rolling_target_rows','startup_optimization']:self.assertIn(k,d)
        self.assertEqual(d['national_100_chunk_size'],25);self.assertEqual(d['national_prefetch_seed_count'],300)
    def test_27_national_backend_never_uses_openmeteo(self):
        s._national_point_cache.clear()
        with patch.object(s,'_national_metno_results',return_value=({},{})),patch.object(s,'_national_gfs_results',return_value={}),patch.object(s,'_request_openmeteo_national_once',side_effect=AssertionError('Open-Meteo called')):
            rs,complete,limited,error=s._national_fetch_shared(DAY,[point(0)]);self.assertFalse(complete)
    def test_28_memory_cache_reuse_preserves_age(self):
        p=point(0);row=rows([p],1000)[0]
        s._national_point_cache_put(DAY,p,row)
        with patch.object(s,'_national_metno_results',side_effect=AssertionError('Unexpected fetch')),patch.object(s,'_national_gfs_results',side_effect=AssertionError('Unexpected fetch')):
            rs,complete,_,_=s._national_fetch_shared(DAY,[p]);self.assertTrue(complete)
            self.assertAlmostEqual(time.time()-rs[0]['_cache_meta']['generated_ts'],1000,delta=2)
    def test_29_input_duplicates_rejected(self):
        with s.app.test_client() as c:
            r=c.post('/api/national-outlook',json={'date':DAY,'points':[point(0),point(0)]});self.assertEqual(r.status_code,400)
    def test_30_current_meteoblue_and_external_routes_preserved(self):
        src=ROOT.joinpath('server.py').read_text()
        for path in ['/api/meteoblue','/api/tenkura-link','/api/weathernews-link','/api/tenkijp-link']:
            self.assertIn(path,src)
    def test_31_rolling_window_incomplete_is_explicit(self):
        ps=[point(i) for i in range(300)]
        later=(datetime.fromisoformat(DAY)+timedelta(days=1)).date().isoformat()
        with FakeDB().mocked(),patch.object(s,'_national_load_prefetch_points',return_value=ps),patch.object(s,'_national_rolling_100_date_texts',return_value=[DAY,later]):
            r=s._refresh_rolling_100_cache();self.assertTrue(r['ok']);self.assertFalse(r['windowComplete']);self.assertEqual(r['remainingDueAfter'],300)
    def test_32_cycle_calls_social_gate_but_never_remote_in_test(self):
        with patch.object(s,'_refresh_rolling_100_cache',return_value={'ok':True,'pointsUpdated':0,'errors':[]}),patch.object(s,'_national_supabase_refresh_candidates',return_value={}),patch.object(s,'_instagram_maybe_post_after_refresh',return_value={'ok':True,'skipped':True}) as social:
            r=s._refresh_national_persistent_cache();self.assertTrue(r['ok']);social.assert_called_once()

    def test_33_all_300_seed_keys_match_runtime(self):
        seed=s._national_load_prefetch_points()
        self.assertEqual(len(seed),300)
        self.assertEqual(len({x['name'] for x in seed}),300)
        runtime=json.loads((ROOT/'national-runtime-points-v161.json').read_text())
        self.assertEqual(seed,runtime)
        social=s._national_load_100_points();by={p['name']:p for p in seed}
        for p in social:self.assertEqual(s._national_supabase_key(DAY,p),s._national_supabase_key(DAY,by[p['name']]))
    def test_34_100_prefetch_setting_is_effective(self):
        with patch.object(s,'NATIONAL_PREFETCH_COUNT',100):
            selected=s._national_load_prefetch_points();self.assertEqual(len(selected),100)
            self.assertEqual({p['name'] for p in selected},{p['name'] for p in s._national_load_100_points()})
    def test_35_social_membership_unchanged(self):
        orig=json.loads((ROOT/'national-100-points.json').read_text())
        self.assertEqual([p['name'] for p in orig],[p['name'] for p in s._national_load_100_points()])
    def test_36_html_local_asset_version_updated_not_external(self):
        with tempfile.TemporaryDirectory() as tmp,patch.object(s,'BASE',tmp):
            Path(tmp,'page.html').write_text('<script src="app.js?v=old"></script><link href="ui.css?v=old"/><script src="https://example.test/v.js?v=old"></script>')
            out=s._serve_public_html('page.html').get_data().decode()
            self.assertIn('app.js?v=1.6.1',out);self.assertIn('ui.css?v=1.6.1',out)
            self.assertIn('https://example.test/v.js?v=old',out)
    def test_37_no_timestamp_reset_in_actual_supabase_write(self):
        ps=[point(0)];rs=rows(ps,12600);at=rs[0]['_cache_meta']['generated_ts']
        class Reply:
            status=201
            def __enter__(self):return self
            def __exit__(self,*args):pass
        with patch.object(s,'SUPABASE_URL','https://database.invalid'),patch.object(s,'_national_supabase_enabled',return_value=True),patch.object(s.urllib.request,'urlopen',return_value=Reply()) as net:
            self.assertTrue(s._national_supabase_write(DAY,ps,rs))
            body=json.loads(net.call_args.args[0].data)
            self.assertEqual(body[0]['generated_ts'],at);self.assertEqual(body[0]['fresh_until'],at+14400)
            self.assertNotIn('_cache_meta',body[0]['result'])
    def test_38_actual_supabase_read_retains_row_age(self):
        ps=[point(0)];r=rows(ps,12600)[0]
        data=[dict(cache_key=s._national_supabase_key(DAY,ps[0]),result={'name':'wrong-name','grade':'B'},**r['_cache_meta'])]
        class Reply:
            def __enter__(self):return self
            def __exit__(self,*args):pass
            def read(self):return json.dumps(data).encode()
        with patch.object(s,'SUPABASE_URL','https://database.invalid'),patch.object(s,'_national_supabase_enabled',return_value=True),patch.object(s.urllib.request,'urlopen',return_value=Reply()):
            fresh,stale,meta=s._national_supabase_read(DAY,ps)
            self.assertEqual(fresh['p000']['name'],'p000');self.assertEqual(meta['p000'],r['_cache_meta']);self.assertFalse(stale)
    def test_39_database_read_failure_is_not_empty_success(self):
        with patch.object(s,'SUPABASE_URL','https://database.invalid'),patch.object(s,'_national_supabase_enabled',return_value=True):
            with self.assertRaises(RuntimeError):s._national_supabase_read(DAY,[point(0)])
    def test_40_cache_only_db_failure_uses_local_with_warning(self):
        ps=[point(0)];fp=s._national_points_fingerprint(ps)
        s._national_write_disk_cache(DAY,fp,ps,rows(ps,1000))
        with patch.object(s,'_national_supabase_read',side_effect=RuntimeError('persistent cache read failed')),s.app.test_client() as c:
            j=c.post('/api/national-outlook',json={'date':DAY,'points':ps,'cacheOnly':True}).get_json()
            self.assertEqual(len(j['results']),1);self.assertIn('readError',j['cache']);self.assertIn('warning',j)
    def test_41_ack_old_row_not_reported_saved(self):
        ps=[point(0)];db=FakeDB();db.data[(DAY,'p000')]=rows(ps,1000)[0]
        with db.mocked(),patch.object(s,'_national_supabase_write',return_value=True):
            _,r=s._national_fetch_and_persist(DAY,ps,ps)
            self.assertFalse(r['ok']);self.assertEqual(r['persistedCount'],0)
    def test_42_one_chunk_exception_keeps_previous_checkpoint(self):
        ps=[point(i) for i in range(50)];db=FakeDB();fetch=db.fetch
        def fail_second(date,batch):
            if batch[0]['name']=='p025':raise TimeoutError('synthetic failure')
            return fetch(date,batch)
        with db.mocked(),patch.object(s,'_national_fetch_shared',side_effect=fail_second):
            _,r=s._national_fetch_and_persist(DAY,ps,ps)
            self.assertFalse(r['ok']);self.assertEqual(r['pointsUpdated'],25)
            saved,_=s._national_read_disk_cache(DAY,s._national_points_fingerprint(ps));self.assertEqual(len(saved['results']),25)
    def test_43_worker_grace_then_cycle_and_stop(self):
        class Stop:
            def __init__(self):self.waits=[];self.set_value=False
            def clear(self):self.set_value=False
            def is_set(self):return self.set_value
            def wait(self,n):self.waits.append(n);return len(self.waits)>1
        class Thread:
            def __init__(self,target,**kw):self.target=target
            def is_alive(self):return False
            def start(self):self.target()
        stop=Stop()
        with patch.object(s,'NATIONAL_OUTLOOK_AUTO_REFRESH',True),patch.object(s,'_national_refresh_worker_thread',None),patch.object(s,'_national_refresh_stop',stop),patch.object(s.threading,'Thread',Thread),patch.object(s,'_run_national_refresh_cycle') as cycle:
            s._ensure_national_refresh_worker();cycle.assert_called_once();self.assertEqual(stop.waits,[s.NATIONAL_OUTLOOK_BOOT_GRACE,max(300,s.NATIONAL_OUTLOOK_REFRESH_INTERVAL)])
    def test_44_os_lock_excludes_another_process(self):
        if os.name=='nt':self.skipTest('POSIX flock test; Windows handler requires separate platform validation')
        key=s._national_open_lock('cross-process-test');self.assertIsNotNone(key)
        try:
            code='import fcntl,sys\nf=open(sys.argv[1],"a+b")\ntry:\n fcntl.flock(f,fcntl.LOCK_EX|fcntl.LOCK_NB)\nexcept BlockingIOError:\n sys.exit(9)\nsys.exit(0)'
            result=subprocess.run([sys.executable,'-c',code,key],capture_output=True,timeout=5)
            self.assertEqual(result.returncode,9,result.stderr)
        finally:s._national_close_lock(key)
    def test_45_no_unrequested_new_old_api_side_effect(self):
        # GET unknown API is JSON 404, not the HTML application shell.
        with s.app.test_client() as c:
            r=c.get('/api/missing');self.assertEqual(r.status_code,404);self.assertIn('json',r.content_type)
    def test_46_no_immutable_mutable_catalog(self):
        with s.app.test_client() as c:
            r=c.get('/national-100-points.json?v=1.6.1');self.assertNotIn('immutable',r.headers['Cache-Control'])

if __name__=='__main__':unittest.main(verbosity=2)

