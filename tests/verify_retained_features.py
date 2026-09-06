"""Fail closed on unreviewed changes to the currently preserved non-route features."""
import ast,hashlib,json,sys
from pathlib import Path
root=Path(sys.argv[1]).resolve() if len(sys.argv)>1 else Path(__file__).resolve().parents[1]
m=json.loads(Path(__file__).with_name('retained_features_v15230.json').read_text())
s=(root/'server.py').read_text();lines=s.splitlines();tree=ast.parse(s);functions={};duplicates=[]
for n in tree.body:
    if isinstance(n,(ast.FunctionDef,ast.AsyncFunctionDef,ast.ClassDef)):
        if n.name in functions:duplicates.append(n.name)
        start=min([n.lineno]+[d.lineno for d in getattr(n,'decorator_list',[])])
        functions[n.name]=hashlib.sha256('\n'.join(lines[start-1:n.end_lineno]).strip().encode()).hexdigest()
errors=['Duplicate definition: '+x for x in duplicates]
for name,expected in m['protectedServerFunctions'].items():
    if functions.get(name)!=expected:errors.append('Protected function changed/missing: '+name)
for name,expected in m['retainedFileHashes'].items():
    p=root/name
    if not p.is_file() or hashlib.sha256(p.read_bytes()).hexdigest()!=expected:errors.append('Protected dependency differs: '+name+'; inspect this difference without downgrading it')
print(json.dumps({'protectedServerFunctions':len(m['protectedServerFunctions']),'retainedFiles':len(m['retainedFileHashes']),'errors':errors},ensure_ascii=False))
sys.exit(bool(errors))
