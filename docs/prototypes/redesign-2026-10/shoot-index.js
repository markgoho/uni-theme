const { chromium } = require('playwright'); const path=require('path');
(async()=>{
  const b = await chromium.launch({ executablePath: '/Users/mgoho/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell' });
  for (const [w,name] of [[1280,'index-desktop.png'],[400,'index-mobile.png']]) {
    const p = await b.newPage({viewport:{width:w,height:900}}); const errs=[]; p.on('pageerror',e=>errs.push(e.message));
    await p.goto('file://'+path.join(__dirname,'index.html'),{waitUntil:'networkidle'});
    const over = await p.evaluate(()=>document.documentElement.scrollWidth>document.documentElement.clientWidth);
    await p.screenshot({path:path.join(__dirname,'shots',name),fullPage:true}); console.log(name, over?'OVERFLOW':'', errs.join('|'));
    await p.close();
  }
  await b.close();
})();
