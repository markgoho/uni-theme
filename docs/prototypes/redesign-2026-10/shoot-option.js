// Usage: NODE_PATH=/Users/mgoho/github/mbu/node_modules node shoot-option.js option-a.html
// Writes shots/<option>/<site>-<page>-<theme>[-mobile].png for review.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const file = process.argv[2]; if(!file){ console.error('need option file'); process.exit(1); }
const dir = __dirname; const key = path.basename(file,'.html');
const out = path.join(dir,'shots',key); fs.mkdirSync(out,{recursive:true});
const url = 'file://' + path.join(dir,file);
const pages = ['home','award','requirements','guide','search'];
(async()=>{
  const b = await chromium.launch({ executablePath: '/Users/mgoho/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
  const shots = [];
  for (const site of ['mbu','su']) for (const page of pages) shots.push({site,page,theme:'light',w:1280});
  shots.push({site:'mbu',page:'requirements',theme:'dark',w:1280},{site:'su',page:'award',theme:'dark',w:1280});
  shots.push({site:'mbu',page:'home',theme:'light',w:400},{site:'mbu',page:'requirements',theme:'light',w:400},{site:'su',page:'guide',theme:'light',w:400});
  for (const s of shots){
    const ctx = await b.newContext({ viewport:{width:s.w,height:900}, colorScheme: s.theme });
    const p = await ctx.newPage();
    const errors=[]; p.on('pageerror',e=>errors.push(e.message)); p.on('console',m=>{ if(m.type()==='error') errors.push(m.text()); });
    await p.goto(url+'#'+s.page, { waitUntil:'load' });
    await p.evaluate(({site,theme})=>{ localStorage.setItem('proto:site',site); localStorage.setItem('proto:theme',theme); }, s);
    await p.reload({ waitUntil:'networkidle' });
    await p.waitForTimeout(600);
    const overflow = await p.evaluate(()=>document.documentElement.scrollWidth > document.documentElement.clientWidth);
    const name = `${s.site}-${s.page}-${s.theme}${s.w<600?'-mobile':''}.png`;
    await p.screenshot({ path: path.join(out,name), fullPage: true });
    console.log(name, overflow?'HORIZONTAL-OVERFLOW!':'', errors.length?('ERRORS: '+errors.slice(0,3).join(' | ')):'');
    await ctx.close();
  }
  await b.close();
})();
