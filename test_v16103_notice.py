from pathlib import Path

app = Path('app.js').read_text(encoding='utf-8')
idx = Path('index.html').read_text(encoding='utf-8')
server = Path('server.py').read_text(encoding='utf-8')

assert "const APP_VERSION = '1.6.103';" in app
assert 'APP_VERSION = "1.6.103"' in server
assert 'app.js?v=1.6.103' in idx
assert idx.count('data-app-version>V1.6.103</span>') == 2
assert "title.textContent='お知らせ';" in app
assert "11/7まで全国分析キャッシュはメンテ中です。最新情報を取得で分析は可能です。" in app
assert "if(jst>'2026-11-07')return;" in app
assert "document.body.insertBefore(notice,document.body.firstChild);" in app
print('V1.6.103 maintenance notice checks: PASS')
