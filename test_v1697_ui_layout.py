from pathlib import Path
import re

idx = Path('index.html').read_text(encoding='utf-8')
app = Path('app.js').read_text(encoding='utf-8')
server = Path('server.py').read_text(encoding='utf-8')

assert "const APP_VERSION = '1.6.97';" in app
assert 'APP_VERSION = "1.6.97"' in server
assert 'app.js?v=1.6.97' in idx
assert idx.count('data-app-version>V1.6.97</span>') == 2

# Removed from the first screen.
assert '<section class="top-value"' not in idx
assert 'mobile-topbar-badges' not in idx
for label in ('5系統アラート', '登山口アクセス情報'):
    assert label not in idx

# Nationwide section keeps date/filter/cache telemetry and uses the new action label.
assert '<button id="nationalOutlookRun" class="primary" type="button">最新情報取り込み</button>' in idx
for token in ('nationalOutlookDate', 'nationalFilter100', 'nationalFilter200', 'nationalFilter300', 'nationalOutlookStatus'):
    assert token in idx
for token in ('averageAgeSeconds', 'oldestAgeSeconds', 'キャッシュ鮮度', 'TTL 240分'):
    assert token in app

# Four resource shortcuts are relocated inside nationwide analysis.
section_start = idx.index('<section class="national-outlook panel" id="nationalOutlook"')
section_end = idx.index('</section>', idx.index('national-resource-nav', section_start))
nav_pos = idx.index('national-resource-nav', section_start)
assert section_start < nav_pos < section_end
for href in ('trailheads.html', 'huts.html', 'water-sources.html', 'live-cameras.html'):
    assert idx.count(f'href="{href}"') == 1
assert 'topbar-guide-link' not in idx[idx.index('<header'):idx.index('</header>')]

# The explanatory nationwide -> personal block is now at the page bottom, after main.
main_end = idx.index('</main>')
intro_pos = idx.index('<section class="seo-intro bottom-seo-intro"')
footer_pos = idx.index('<footer>')
assert main_end < intro_pos < footer_pos
assert idx.count('id="seoIntroTitle"') == 1

# Old button wording no longer leaks into user-facing JS/HTML.
assert '全国を判定' not in app
assert '全国を分析' not in idx

print('V1.6.97 UI layout regression checks: PASS')
