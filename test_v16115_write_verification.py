import contextlib, io, json
from test_v16114_cloud_run_job import Fake, TODAY, DATES
from cloud_run_national_job import run

class Rounded(Fake):
    def _national_supabase_write(self,d,batch,rows):
        for r in rows:
            m = r['_cache_meta'].copy()
            m['generated_ts'] -= 0.5
            self.rows[(d,r['name'])] = dict(r, _cache_meta=m)
        return True

class Lost(Fake):
    def _national_supabase_write(self,d,batch,rows):
        # Simulate successful HTTP acknowledgement but absent read-back.
        return True

for cls, expected_rc in [(Rounded,0),(Lost,1)]:
    api=cls(); out=io.StringIO()
    with contextlib.redirect_stdout(out): rc=run(api,today=TODAY)
    report=json.loads(out.getvalue().splitlines()[-1])
    assert rc==expected_rc, report
    if cls is Rounded:
        assert report['fresh']==700 and report['confirmed']==700 and report['timestampMismatch']==700
        assert report['state']=='complete' and not report['errors']
    else:
        assert report['confirmed']==0 and report['state']=='failed' and report['errors']

# Budget exhaustion after a real saved batch is successful partial progress,
# not full coverage, and not a false error.
import cloud_run_national_job as job
from unittest.mock import patch
api=Fake(); out=io.StringIO()
# Simulate the soft deadline becoming due after the first batch.
vals=iter([0, 0, 1, 400])
with patch.object(job.time, 'monotonic', side_effect=lambda: next(vals,400)):
    with contextlib.redirect_stdout(out): rc=run(api,budget=420,today=TODAY)
report=json.loads(out.getvalue().splitlines()[-1])
assert rc==0 and report['state']=='partial-progress' and not report['complete'] and report['fresh']==10, report
print('V1.6.115 coverage verification, missing write and partial-progress tests: PASS')
