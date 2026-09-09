from pathlib import Path
root=Path(__file__).parent
a=(root/'app.js').read_text(encoding='utf-8')
s=(root/'server.py').read_text(encoding='utf-8')
i=(root/'index.html').read_text(encoding='utf-8')
d=(root/'data-audit.html').read_text(encoding='utf-8')
assert "const APP_VERSION = '1.6.37';" in a
assert 'APP_VERSION = "1.6.37"' in s
assert 'V1.6.37' in i
assert 'app.js?v=1.6.37' in i
assert 'app.js?v=1.6.37' in d
assert '1.6.34' not in i
assert '1.6.34' not in d
print('PASS V1.6.37 version/cache guard')
