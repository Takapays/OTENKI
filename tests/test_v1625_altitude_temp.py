import ast
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
SERVER=(ROOT/'server.py').read_text(encoding='utf-8')

def extract(name):
    tree=ast.parse(SERVER)
    node=next(n for n in tree.body if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef)) and n.name==name)
    return ast.get_source_segment(SERVER,node)

ns={}
exec(extract('_national_adjust_gfs_temperature'),ns)
adj=ns['_national_adjust_gfs_temperature']

# Lower GFS terrain -> cooler summit temperature.
assert round(adj(20.0,1000,3776),3)==round(20.0-0.0065*2776,3)
# Same terrain -> unchanged.
assert adj(5.0,2500,2500)==5.0
# Higher model terrain -> warmer translation to lower target.
assert round(adj(0.0,3000,2000),1)==6.5

# GFS request must include surface height and parser must retain it.
assert '"var_HGT":"on"' in SERVER
assert 'model_elevation' in SERVER
assert '_national_adjust_gfs_temperature' in SERVER
# MET Norway already receives the registered altitude directly.
assert 'params["altitude"]=str(round(float(p["elevation"])))' in SERVER
# Cache engine must change so pre-fix national temperatures cannot survive.
assert 'metno-gfs-v6-altitude-temp-abcde' in SERVER
print('V1.6.25 altitude temperature tests: PASS')
