from pathlib import Path
from bs4 import BeautifulSoup

def offline_html(root):
 """Render original release HTML/CSS/JS without external networking or saved state."""
 root=Path(root)
 soup=BeautifulSoup((root/'index.html').read_text(), 'html.parser')
 for link in list(soup.select('link[rel="stylesheet"]')):
  source=root / link.get('href','').split('?')[0]
  if source.is_file():
   node=soup.new_tag('style');node['data-test-source']=source.name;node.string=source.read_text();link.replace_with(node)
 for script in soup.select('script[src]'):
  source=root / script['src'].split('?')[0]
  if source.is_file():
   del script['src'];script.attrs.pop('defer',None)
   script['data-test-source']=source.name
   script.string=source.read_text().replace('</script','<\\/script')
 support=soup.new_tag('script')
 support.string='''(()=>{const makeStore=()=>{const m=new Map();return {getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k),clear:()=>m.clear(),key:i=>[...m.keys()][i]||null,get length(){return m.size}}};Object.defineProperty(window,'localStorage',{value:makeStore(),configurable:true});Object.defineProperty(window,'sessionStorage',{value:makeStore(),configurable:true});window.fetch=async()=>({ok:false,status:503,json:async()=>({ok:false,error:'offline UI test'}),text:async()=>''});})();'''
 soup.head.insert(0,support)
 return str(soup)
