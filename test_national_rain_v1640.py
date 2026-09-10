"""Offline V1.6.40 daily-rating tests. Standard library only; no API calls.
Run: python test_national_rain_v1640.py [--previous /path/to/V1.6.39/server.py]
Production functions are compiled directly from their AST, not copied/reimplemented.
This is NOT a Flask/Render/network integration test.
"""
from __future__ import annotations
import argparse, ast, copy, json, math, os, random, re, tempfile, time, unittest
from pathlib import Path
from datetime import datetime, timezone, timedelta
from types import SimpleNamespace

ROOT=Path(__file__).resolve().parent
NAMES={'_finite','_national_grade','_national_grade_rank','_national_bc_caution_hours',
       '_national_result_from_metno','_national_gfs_results','_meteoblue_time_jst',
       '_national_result_from_meteoblue','_national_merge_two_models','_national_result_from_forecast'}
P={'name':'Fixture Mountain','lat':35.36,'lon':138.73,'elevation':3776}
DAY='2026-09-11'
JST=timezone(timedelta(hours=9))

def load(path):
    tree=ast.parse(Path(path).read_text(encoding='utf-8'))
    nodes=[ast.ImportFrom(module='__future__',names=[ast.alias(name='annotations')],level=0)]
    for n in tree.body:
        if isinstance(n,ast.FunctionDef) and n.name in NAMES: nodes.append(n)
        elif isinstance(n,ast.Assign) and any(isinstance(t,ast.Name) and t.id=='NATIONAL_DAILY_RAIN_C_MM_H' for t in n.targets):nodes.append(n)
    env=dict(re=re,math=math,datetime=datetime,timezone=timezone,timedelta=timedelta,os=os,tempfile=tempfile,time=time,json=json,Any=object)
    exec(compile(ast.fix_missing_locations(ast.Module(body=nodes,type_ignores=[])),str(path),'exec'),env)
    return SimpleNamespace(**{k:v for k,v in env.items() if k in NAMES},env=env)

def slots(rain=0.0,wind=2.0,gust=3.0,temp=8.0):
    def seq(v):return v if isinstance(v,list) else [v]*10
    return [dict(hour=i+6,rain=r,wind=w,gust=g,temp=t) for i,(r,w,g,t) in enumerate(zip(seq(rain),seq(wind),seq(gust),seq(temp)))]

def model(rows,kind='metno'):
    def maximum(k):
        a=[r[k] for r in rows if isinstance(r.get(k),(int,float)) and math.isfinite(r[k])]
        return max(a) if a else None
    return dict(name=P['name'],source=kind,grade='B',_series=copy.deepcopy(rows),series=copy.deepcopy(rows),maxWind=maximum('wind'),maxGust=maximum('gust'),maxRain=maximum('rain'),minTemp=8)

def merged(mod,rows,gfs=None,mb=None):
    return mod._national_merge_two_models(P,model(rows),model(gfs,'gfs') if gfs is not None else None,model(mb,'meteoblue') if mb is not None else None)

def met_payload(rows):
    out=[]
    for r in rows:
        d={'instant':{'details':{'air_temperature':r.get('temp'),'wind_speed':r.get('wind'),'wind_speed_of_gust':r.get('gust')}}}
        if r.get('rain') is not None:d['next_1_hours']={'details':{'precipitation_amount':r['rain']}}
        out.append({'time':f'{DAY}T{r["hour"]:02d}:00:00+09:00','data':d})
    return {'properties':{'timeseries':out}}

def mb_payload(rows):
    return {'data_1h':{'time':[f'{DAY} {r["hour"]:02d}:00' for r in rows],
                      'windspeed':[r['wind'] for r in rows], 'gust':[r['gust'] for r in rows],
                      'temperature':[r['temp'] for r in rows], 'precipitationamount':[r['rain'] for r in rows]}}

def gfs_fixture(mod,rows):
    # Return synthetic bytes from cache, then mock only the GRIB decoding boundary.
    env=mod.env; saved=env.copy()
    env.update(_noaa_cycle_candidates=lambda _: [datetime(2026,9,10,tzinfo=timezone.utc)],
               _noaa_forecast_hour=lambda cycle,dt: dt.astimezone(JST).hour,
               _noaa_filter_url_region=lambda cycle,h,ps: f'https://fixture.invalid/{h}',
               _cache_get=lambda key:(200,'fixture',json.dumps(rows[int(key.rsplit('/',1)[1])-6]).encode()),
               _parse_noaa_grib_points=lambda path,ps: {P['name']:json.loads(Path(path).read_text())})
    try:return mod._national_gfs_results(DAY,[P],include_series=True)[P['name']]
    finally:env.clear();env.update(saved)

EXAMPLES=[
 ('dry',slots(), 'A'),
 ('rain 0.1 x 10h',slots(.1), 'B'),
 ('rain 0.2 x 10h',slots(.2), 'B'),
 ('rain 0.4 x 10h',slots(.4), 'B'),
 ('rain 0.5 x 1h',slots([.5]+[0]*9), 'B'),
 ('rain 0.5 x 2h',slots([.5,.5]+[0]*8), 'C'),
 ('rain 1.5 x 1h',slots([1.5]+[0]*9), 'C'),
 ('rain 1.5 x 2h',slots([1.5,1.5]+[0]*8), 'D'),
 ('rain 6 x 1h',slots([6]+[0]*9), 'E'),
 ('wind 5 x 2h + drizzle',slots(.1,[5,5]+[2]*8), 'C'),
 ('gust 18 x 2h',slots(0,2,[18,18]+[3]*8), 'D'),
]

class DailyTests(unittest.TestCase):
    def test_01_examples(self):
        for name,rows,expected in EXAMPLES:
            with self.subTest(name=name):self.assertEqual(merged(NEW,rows)['grade'],expected)
    def test_02_raw_helper_boundaries(self):
        for r,n in [(None,0),(float('nan'),0),(0,0),(.099999,0),(.1,0),(.499999,0),(.5,10),(.500001,10)]:
            with self.subTest(r=r):self.assertEqual(NEW._national_bc_caution_hours(slots(r)),n)
    def test_03_light_rain_keeps_B_not_A(self):
        for r in (.1,.2,.3,.4,.49):
            for n in range(1,11):
                out=merged(NEW,slots([r]*n+[0]*(10-n)))
                self.assertEqual(out['grade'],'B');self.assertEqual(out['cautionHours'],n)
                self.assertEqual(out['bcCautionHours'],0);self.assertEqual(out['lightRainOnlyHours'],n)
    def test_04_caution_hours_need_not_be_consecutive(self):
        out=merged(NEW,slots([.5,0,0,0,0,0,0,0,0,.5]))
        self.assertEqual(out['grade'],'C');self.assertEqual(out['bcCautionHours'],2)
    def test_05_two_conditions_in_one_hour_count_once(self):
        out=merged(NEW,slots([.5]+[0]*9,[5]+[2]*9,[12]+[3]*9))
        self.assertEqual(out['grade'],'B');self.assertEqual(out['bcCautionHours'],1)
    def test_06_mixed_significant_slots(self):
        out=merged(NEW,slots([0,.5]+[.1]*8,[5]+[2]*9))
        self.assertEqual(out['grade'],'C');self.assertEqual(out['bcCautionHours'],2)
    def test_07_rain_missing_is_not_changed_to_zero(self):
        src=slots(None,gust=None);before=copy.deepcopy(src);out=merged(NEW,src)
        self.assertEqual(src,before);self.assertIsNone(out['maxRain']);self.assertIsNone(out['maxGust'])
        self.assertTrue(all(x['rain'] is None and x['gust'] is None for x in out['series']))
        self.assertEqual(out['bcCautionHours'],0)
    def test_08_all_models_absent(self):self.assertIsNone(NEW._national_merge_two_models(P,None,None,None))
    def test_09_met_parser(self):
        for _,rows,g in EXAMPLES:
            out=NEW._national_result_from_metno(P,DAY,met_payload(rows),include_series=True)
            self.assertEqual(out['grade'],g)
    def test_10_mb_parser(self):
        for _,rows,g in EXAMPLES:
            out=NEW._national_result_from_meteoblue(P,DAY,mb_payload(rows))
            self.assertEqual(out['grade'],g)
    def test_11_gfs_aggregation(self):
        for _,rows,g in EXAMPLES:self.assertEqual(gfs_fixture(NEW,rows)['grade'],g)
    def test_12_gfs_temp_and_gust_stay_excluded(self):
        out=NEW._national_merge_two_models(P,model(slots(.1,gust=None,temp=3)),model(slots(.1,gust=40,temp=25),'gfs'),model(slots(.1,gust=8,temp=4),'meteoblue'))
        self.assertEqual(out['minTemp'],3);self.assertEqual(out['maxGust'],8);self.assertEqual(out['grade'],'B')
    def test_13_meteoblue_arbiter_stays_the_same(self):
        out=merged(NEW,slots(0,wind=2,gust=None),slots(2,wind=10),slots(.4,wind=4,gust=8))
        self.assertEqual(out['maxWind'],4);self.assertEqual(out['maxRain'],.4);self.assertEqual(out['maxGust'],8)
        self.assertTrue(out['meteoblueUsed']);self.assertEqual(out['grade'],'D') # retained one-model D floor
    def test_14_severe_model_floors(self):
        for other,expected in [(slots([6]+[0]*9),'E'),(slots([1.5,1.5]+[0]*8),'D'),(slots(wind=[15]+[2]*9),'E'),(slots(wind=[9,9]+[2]*8),'D')]:
            out=merged(NEW,slots(),other,slots())
            self.assertEqual(out['grade'],expected)
    def test_15_legacy_grade_call_unchanged(self):
        self.assertEqual(NEW._national_grade(2,3,.1,0,8,None,caution_hours=2)[0],'C')
    def test_16_wind_gust_no_relaxation(self):
        if OLD is None: self.skipTest('--previous required for differential test')
        for key,values in [('wind',[0,4.9,5,7,8.9,9,14.9,15]),('gust',[None,0,11.9,12,15,17.9,18,24.9,25])]:
            for v in values:
                for n in range(1,11):
                    kw={key:[v]*n+([2] if key=='wind' else [3])*(10-n)}
                    data=slots(**kw)
                    self.assertEqual(merged(OLD,data)['grade'],merged(NEW,data)['grade'])
    def test_17_randomized_same_forecasts(self):
        if OLD is None: self.skipTest('--previous required for differential test')
        rng=random.Random(1640);changes=0
        for i in range(3500):
            if i<1500:
                data=slots([rng.choice([0,.05,.1,.2,.3,.4,.49,.5]) for _ in range(10)])
            else:
                data=slots([rng.choice([None,0,.1,.4,.5,1.5,6]) for _ in range(10)],
                           [rng.choice([0,2,5,7,9,15]) for _ in range(10)],
                           [rng.choice([None,3,12,18,25]) for _ in range(10)])
            before=copy.deepcopy(data);a=merged(OLD,data);b=merged(NEW,data)
            self.assertEqual(before,data)
            for key in ('series','_series','maxWind','maxGust','maxRain','minTemp','cautionHours','severeHours','source','integration','meteoblueUsed','modelValues'):
                self.assertEqual(a[key],b[key],(i,key))
            if a['grade']!=b['grade']:
                changes+=1;self.assertEqual((a['grade'],b['grade']),('C','B'))
                self.assertLess(b['bcCautionHours'],2);self.assertEqual(b['severeHours'],0)
            if a['grade'] in ('A','D','E'): self.assertEqual(a['grade'],b['grade'])
        self.assertGreater(changes,0)
    def test_18_model_parser_raw_values_unchanged(self):
        if OLD is None: self.skipTest('--previous required for differential test')
        for name,rows,_ in EXAMPLES:
            for builder in (lambda m:m._national_result_from_metno(P,DAY,met_payload(rows),include_series=True),lambda m:m._national_result_from_meteoblue(P,DAY,mb_payload(rows)),lambda m:gfs_fixture(m,rows)):
                a,b=builder(OLD),builder(NEW)
                for key in ('series','maxWind','maxGust','maxRain','minTemp','cautionHours','severeHours'):self.assertEqual(a[key],b[key],(name,key))
    def test_19_only_mb_available(self):
        out=NEW._national_merge_two_models(P,None,None,model(slots(.2),'meteoblue'))
        self.assertEqual(out['grade'],'B');self.assertEqual(out['bcCautionHours'],0)
    def test_20_dry_missing_gust_not_invented(self):
        out=merged(NEW,slots(gust=None))
        self.assertIsNone(out['maxGust']);self.assertEqual(out['grade'],'A') # unchanged existing rule

if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--previous');args=p.parse_args()
    NEW=load(ROOT/'server.py');OLD=load(args.previous) if args.previous else None
    suite=unittest.defaultTestLoader.loadTestsFromTestCase(DailyTests)
    result=unittest.TextTestRunner(verbosity=2).run(suite)
    comparisons=[]
    for name,rows,expected in EXAMPLES:
        out=merged(NEW,rows)
        comparisons.append({'case':name,'previous':merged(OLD,rows)['grade'] if OLD else None,'candidate':out['grade'],'expected':expected,'cautionHours':out['cautionHours'],'bcCautionHours':out['bcCautionHours']})
    (ROOT/'daily_rating_comparison_v1640.json').write_text(json.dumps({'dataType':'synthetic, not live weather','testsRun':result.testsRun,'failures':len(result.failures),'errors':len(result.errors),'skipped':len(result.skipped),'cases':comparisons},indent=2),encoding='utf-8')
    raise SystemExit(0 if result.wasSuccessful() else 1)
