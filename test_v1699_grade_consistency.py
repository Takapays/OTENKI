import ast
from pathlib import Path
from typing import Any

source=Path('server.py').read_text(encoding='utf-8')
tree=ast.parse(source)
fn=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='_national_reconcile_cached_row')
module=ast.Module(body=[fn],type_ignores=[])
ast.fix_missing_locations(module)

rank=lambda g:{'A':1,'B':2,'C':3,'D':4,'E':5}.get(g,0)
def daily(series):
    if not isinstance(series,list) or not series:
        return None
    grade=series[0].get('_testGrade')
    if grade not in {'A','B','C','D','E'}:
        return None
    return {'shadowGrade':grade,'cautionHours':0,'bcCautionHours':0,'severeHours':0,'extremeHours':0,'series':series}

env={
    'Any':Any,
    '_national_grade_rank':rank,
    '_national_jma_daily_from_series':daily,
    '_national_ridge_wind_only_daily':daily,
}
exec(compile(module,'server.py','exec'),env)
reconcile=env['_national_reconcile_cached_row']

# Saved deterministic-GFS D evidence must be reflected before first paint.
row={
    'name':'synthetic',
    'grade':'A',
    'preRidgeGrade':'A',
    'gfsRidgeValues':{'series':[{'_testGrade':'D'}]},
}
out=reconcile(row)
assert out['grade']=='D',out
assert out['gfsRidgeGrade']=='D',out
assert out['gfsRidgeWorstOfApplied'] is True,out

# Read reconciliation never improves an already-worse cached grade.
row2={
    'name':'synthetic2',
    'grade':'D',
    'preRidgeGrade':'A',
    'gfsRidgeValues':{'series':[{'_testGrade':'A'}]},
}
out2=reconcile(row2)
assert out2['grade']=='D',out2

# GEFS-only calm evidence cannot certify A.
row3={
    'name':'synthetic3',
    'grade':'A',
    'preRidgeGrade':'A',
    'ridgeDecisionStatus':'gefs-ensemble-mean',
    'gefsRidgeValues':{'series':[{'_testGrade':'A'}]},
}
out3=reconcile(row3)
assert out3['grade']=='B',out3
assert out3['ridgeConfidenceCapApplied'] is True,out3

# JMA behavior from the old reconciliation remains safety-side.
row4={
    'name':'synthetic4',
    'grade':'B',
    'preRidgeGrade':'B',
    'jmaValues':{'series':[{'_testGrade':'E'}]},
}
out4=reconcile(row4)
assert out4['grade']=='E',out4
assert out4['jmaGrade']=='E',out4

print('V1.6.99 grade consistency checks: PASS')
