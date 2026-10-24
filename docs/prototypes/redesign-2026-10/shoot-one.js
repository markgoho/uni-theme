const { chromium } = require('playwright'); const path=require('path');
const [file, site, page, theme, out] = process.argv.slice(2);
(async()=>{
  const b = await chromium.launch({ executablePath: '/Users/mgoho/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
  const ctx = await b.newContext({ viewport:{width:1280,height:800}, colorScheme: theme });
  const p = await ctx.newPage(); await p.goto('file://'+path.join(__dirname,file)+'#'+page,{waitUntil:'load'});
  await p.evaluate(({site,theme})=>{ localStorage.setItem('proto:site',site); localStorage.setItem('proto:theme',theme); }, {site,theme});
  await p.reload({waitUntil:'networkidle'}); await p.waitForTimeout(700);
  await p.evaluate(()=>document.querySelector('.proto-bar')?.remove());
  await p.screenshot({ path: out }); await b.close();
})();
