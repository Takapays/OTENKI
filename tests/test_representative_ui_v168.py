import json, argparse, os
from pathlib import Path
from playwright.sync_api import sync_playwright
from browser_support_v168 import offline_html
parser=argparse.ArgumentParser()
parser.add_argument('--out',type=Path,default=Path('/tmp/traten-ui-v168'))
args=parser.parse_args()
ROOT=Path(__file__).resolve().parents[1]
OUT=args.out
OUT.mkdir(parents=True,exist_ok=True)
results=[]

def check(name,ok,details=None):
 results.append({'test':name,'passed':bool(ok),'details':details})
 assert ok,(name,details)

def choose(page,mountain):
 area=page.evaluate('(m)=>mountainUiArea(m)',mountain)
 page.select_option('#mountainArea',area)
 page.select_option('#mountainPreset',mountain)
 page.wait_for_timeout(130)

def geometry(page):
 return page.evaluate('''()=>{const root=document.getElementById('mobileRepresentativeCourses'),btn=document.getElementById('representativeCourseBtn');return {title:{text:root.firstElementChild?.textContent,size:root.firstElementChild?getComputedStyle(root.firstElementChild).fontSize:null},box:root.getBoundingClientRect().toJSON(),button:btn.getBoundingClientRect().toJSON(),cards:[...root.querySelectorAll('button')].map(e=>({rect:e.getBoundingClientRect().toJSON(),titleSize:getComputedStyle(e.querySelector('b')).fontSize,pathSize:getComputedStyle(e.querySelector('span')).fontSize,label:e.querySelector('b').textContent,path:e.querySelector('span').textContent,selected:e.getAttribute('aria-pressed')})),side:[...document.querySelectorAll('#representativeCourseSummaryAlways,#representativeCourseSummaryFixed,#representativeCoursePreview,#representativeCourseChoices')].filter(e=>e.getBoundingClientRect().width>0&&e.getBoundingClientRect().height>0).map(e=>e.id)}}''')

with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':1440,'height':1100},device_scale_factor=1)
 page.set_default_timeout(8000)
 page.route('**/*',lambda r:r.abort())
 page.on('dialog',lambda d:d.accept())
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.set_content(offline_html(ROOT),wait_until='domcontentloaded')
 check('initial selector hidden',not page.locator('#mobileRepresentativeCourses').is_visible())
 check('initial area highlighted',page.locator('#mountainArea').evaluate("e=>e.classList.contains('is-next-step')"))
 for width in [1024,1280,1440,1920]:
  page.set_viewport_size({'width':width,'height':1100})
  for mountain in ['\u9727\u30f6\u5cf0\uff08\u8eca\u5c71\uff09','\u5927\u5c71\uff08\u9ce5\u53d6\uff09','\u5510\u677e\u5cb3','\u5ca9\u6728\u5c71']:
   choose(page,mountain)
   g=geometry(page)
   check(f'{width}/{mountain}: one upper list',len(g['cards'])>0 and not g['side'] and g['box']['bottom']<=g['button']['top']+1,g)
   check(f'{width}/{mountain}: compact cards',all(x['titleSize']=='12px' and x['pathSize']=='11px' and x['rect']['width']>=g['box']['width']-1 and x['rect']['height']<110 for x in g['cards']))
   top=page.locator('#mobileRepresentativeCourses').inner_html()
   page.hover('#representativeCourseBtn')
   page.locator('#representativeCourseBtn').focus()
   check(f'{width}/{mountain}: no hover/focus side panel',page.locator('#mobileRepresentativeCourses').inner_html()==top and not geometry(page)['side'] and page.locator('.representative-course-summary-option').count()==0)
   if width==1440:
    slug={'\u9727\u30f6\u5cf0\uff08\u8eca\u5c71\uff09':'kirigamine','\u5927\u5c71\uff08\u9ce5\u53d6\uff09':'daisen','\u5510\u677e\u5cb3':'karamatsu','\u5ca9\u6728\u5c71':'iwaki'}[mountain]
    page.evaluate('document.activeElement?.blur()')
    page.mouse.move(900,50)
    page.locator('.mountain-row').screenshot(path=str(OUT/f'after_{slug}_desktop.png'))
    if slug=='kirigamine':
     from PIL import Image
     im=Image.open(OUT/f'after_{slug}_desktop.png')
     crop_y=page.evaluate("document.getElementById('mobileRepresentativeCourses').getBoundingClientRect().top-document.querySelector('.mountain-row').getBoundingClientRect().top")
     im.crop((0,max(0,round(crop_y)-8),im.width,im.height)).save(OUT/'PC_preview.png')
 page.set_viewport_size({'width':1440,'height':1100})
 choose(page,'\u9727\u30f6\u5cf0\uff08\u8eca\u5c71\uff09')
 page.click('#representativeCourseBtn')
 page.wait_for_function("document.getElementById('representativeCourseBtn').classList.contains('is-loaded')")
 check('load button applies route',page.locator('#points > *').count()>2)
 check('manual button disabled after load',page.locator('#loadPoiBtn').is_disabled())
 check('manual button white after load',page.locator('#loadPoiBtn').evaluate("e=>getComputedStyle(e).backgroundColor")=='rgb(255, 255, 255)')
 page.locator('.mountain-row').screenshot(path=str(OUT/'after_loaded_desktop.png'))
 page.hover('#representativeCourseBtn')
 check('loaded hover still no duplicates',not geometry(page)['side'] and page.locator('.representative-course-summary-option').count()==0)
 page.locator('#mobileRepresentativeCourses button').nth(1).click()
 check('course change restores load state',not page.locator('#loadPoiBtn').is_disabled() and page.locator('#representativeCourseBtn').evaluate("e=>!e.classList.contains('is-loaded')"))
 check('course change selects correct index',page.locator('#representativeCourseSelect').input_value()=='1')
 page.click('#representativeCourseBtn')
 page.wait_for_function("document.getElementById('representativeCourseBtn').classList.contains('is-loaded')")
 check('second course loads with CT',page.locator('#points > *').count()>2 and page.evaluate("[...document.querySelectorAll('#points > *')].slice(1).every(e=>Number(e.dataset.segmentCtMinutes)>0)"))
 choose(page,'\u5927\u5c71\uff08\u9ce5\u53d6\uff09')
 check('mountain change unlocks manual',not page.locator('#loadPoiBtn').is_disabled())
 for width,size in [(760,'14px'),(761,'12px'),(390,'14px'),(1440,'12px')]:
  page.set_viewport_size({'width':width,'height':1100})
  g=geometry(page)
  check(f'resize {width}: responsive single list',all(c['titleSize']==size for c in g['cards']) and not g['side'],g)
  if width==390:page.locator('.mountain-row').screenshot(path=str(OUT/'after_mobile.png'))
 page.click('#plannerClearBtn')
 check('clear hides selectors and points',not page.locator('#mobileRepresentativeCourses').is_visible() and not page.locator('#routePointsSection').is_visible())
 check('zero JavaScript page errors',not errors,errors)
 browser.close()
OUT.joinpath('ui_verification.json').write_text(json.dumps({'mode':'Chromium: actual release HTML/CSS/JS inlined for offline rendering; storage/API isolated; no production HTTP', 'passed':len(results),'checks':results},ensure_ascii=False,indent=2))
print(json.dumps({'passed':len(results),'page_errors':errors},ensure_ascii=False))
