/* PROTOTYPE HARNESS — renders window.OPTION pages from window.DATA and owns the floating bar.
   Contract: OPTION = { key, name, thesis, render:{home,award,requirements,guide,search}, mount?(ctx) }.
   Each render(site, ctx) returns the FULL page HTML (header, breadcrumb, main, footer). */
(function(){
  const OPTIONS = [
    {key:'A',file:'option-a.html',name:'Handbook'},
    {key:'B',file:'option-b.html',name:'Trailhead'},
    {key:'C',file:'option-c.html',name:'Ledger'},
    {key:'E',file:'option-e.html',name:'Night Watch'},
    {key:'F',file:'option-f.html',name:'Expedition'},
    {key:'G',file:'option-g.html',name:'Atlas'},
  ];
  const PAGES = [['home','Home'],['award','Award'],['requirements','Requirements'],['guide','Guide'],['search','Search']];
  const store = {
    get(k,d){ try{ return localStorage.getItem('proto:'+k) ?? d }catch(e){ return d } },
    set(k,v){ try{ localStorage.setItem('proto:'+k,v) }catch(e){} }
  };
  const state = {
    page: (location.hash.replace('#','') || store.get('page','home')),
    site: store.get('site','mbu'),
    theme: store.get('theme','auto'),
  };
  if (!PAGES.some(p=>p[0]===state.page)) state.page='home';
  const root = document.documentElement;
  const app = document.getElementById('app');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function applyTheme(){
    if (state.theme==='auto') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', state.theme);
    root.dataset.site = state.site;
    root.dataset.page = state.page;
  }
  function isDark(){ return state.theme==='dark' || (state.theme==='auto' && matchMedia('(prefers-color-scheme: dark)').matches); }
  function ctx(){ return { page: state.page, siteKey: state.site, dark: isDark(), site: window.DATA[state.site] }; }
  function render(){
    applyTheme();
    const site = window.DATA[state.site];
    const fn = window.OPTION.render[state.page];
    app.innerHTML = fn ? fn(site, ctx()) : '<p style="padding:2rem">No renderer for '+state.page+'</p>';
    document.title = window.OPTION.name + ' — ' + site.name + ' — ' + state.page;
    if (window.OPTION.mount) window.OPTION.mount(ctx(), app);
    drawBar();
  }
  function go(patch){
    Object.assign(state, patch);
    store.set('page',state.page); store.set('site',state.site); store.set('theme',state.theme);
    if (patch.page) history.replaceState(null,'','#'+state.page);
    const run = ()=>{
      render();
      if (patch.page) window.scrollTo({top:0,behavior:'instant'});
      // Deep link: scroll to the requirement/heading the link pointed at, if the option rendered it.
      if (patch.anchor) {
        const el = document.getElementById(patch.anchor) || document.querySelector('[data-anchor="'+patch.anchor+'"]');
        if (el && el.getClientRects().length) requestAnimationFrame(()=> el.scrollIntoView({block:'start',behavior:'instant'}));
        state.anchor = null;
      }
    };
    if (document.startViewTransition && !reduced) document.startViewTransition(run); else run();
  }
  // Route internal links back into the prototype.
  app.addEventListener('click', e=>{
    const a = e.target.closest('a[href]'); if(!a) return;
    const href = a.getAttribute('href');
    if (/^https?:/.test(href)) { a.target='_blank'; a.rel='noopener'; return; }
    if (href.startsWith('#')) return;
    e.preventDefault();
    const anchor = href.includes('#') ? decodeURIComponent(href.split('#')[1]) : null;
    let page = null;
    if (href==='/' ) page='home';
    else if (/\/search\//.test(href)) page='search';
    else if (/\/guide\//.test(href)) page='guide';
    else if (/\/requirements\//.test(href)) page='requirements';
    else if (/\/(merit-badges\/camping|ranks\/tenderfoot)\/$/.test(href)) page='award';
    if (page) go({page, anchor}); else { toast('Prototype: “'+(a.textContent.trim()||href)+'” is not mocked.'); }
  });
  let toastEl;
  function toast(msg){
    if(!toastEl){ toastEl=document.createElement('div'); Object.assign(toastEl.style,{position:'fixed',insetBlockEnd:'64px',insetInlineStart:'50%',translate:'-50% 0',background:'#111318',color:'#fff',padding:'8px 14px',borderRadius:'999px',font:'500 12px system-ui,sans-serif',zIndex:2147483000,opacity:0,transition:'opacity .2s'}); document.body.appendChild(toastEl);} 
    toastEl.textContent=msg; toastEl.style.opacity=1; clearTimeout(toastEl._t); toastEl._t=setTimeout(()=>toastEl.style.opacity=0,1800);
  }
  // Bar
  let bar;
  function drawBar(){
    if(!bar){ bar=document.createElement('nav'); bar.className='proto-bar'; bar.setAttribute('aria-label','Prototype controls'); document.body.appendChild(bar); }
    const i = OPTIONS.findIndex(o=>o.key===window.OPTION.key);
    const prev = OPTIONS[(i-1+OPTIONS.length)%OPTIONS.length], next = OPTIONS[(i+1)%OPTIONS.length];
    bar.innerHTML = `
      <a class="proto-bar__nav" href="${prev.file}" title="Previous option: ${prev.name} (←)">←</a>
      <a class="proto-bar__name" href="index.html" title="Back to all options"><span>${window.OPTION.key} · ${window.OPTION.name}</span><small>${window.OPTION.thesis||''}</small></a>
      <a class="proto-bar__nav" href="${next.file}" title="Next option: ${next.name} (→)">→</a>
      <span class="proto-bar__group" role="tablist" aria-label="Page">${PAGES.map((p,n)=>`<button data-page="${p[0]}" aria-pressed="${state.page===p[0]}">${p[1]}<kbd>${n+1}</kbd></button>`).join('')}</span>
      <span class="proto-bar__group" aria-label="Site"><button data-site="mbu" aria-pressed="${state.site==='mbu'}">MBU</button><button data-site="su" aria-pressed="${state.site==='su'}">Scouting U</button></span>
      <span class="proto-bar__group" aria-label="Theme"><button data-theme="light" aria-pressed="${state.theme==='light'}">Light</button><button data-theme="auto" aria-pressed="${state.theme==='auto'}">Auto</button><button data-theme="dark" aria-pressed="${state.theme==='dark'}">Dark</button></span>
      <button class="proto-bar__hide" title="Hide/show bar (H)">hide</button>`;
  }
  document.addEventListener('click', e=>{
    const b = e.target.closest('.proto-bar button'); if(!b) return;
    if (b.dataset.page) go({page:b.dataset.page});
    else if (b.dataset.site) go({site:b.dataset.site});
    else if (b.dataset.theme) go({theme:b.dataset.theme});
    else if (b.classList.contains('proto-bar__hide')) { bar.classList.toggle('proto-bar--hidden'); b.textContent = bar.classList.contains('proto-bar--hidden')?'show':'hide'; }
  });
  document.addEventListener('keydown', e=>{
    if (e.target.closest('input,textarea,select,[contenteditable]') || e.metaKey || e.ctrlKey || e.altKey) return;
    const n = parseInt(e.key,10);
    if (n>=1 && n<=5) go({page:PAGES[n-1][0]});
    else if (e.key==='s' || e.key==='S') go({site: state.site==='mbu'?'su':'mbu'});
    else if (e.key==='d' || e.key==='D') go({theme: isDark()?'light':'dark'});
    else if (e.key==='h' || e.key==='H') bar.querySelector('.proto-bar__hide').click();
    else if (e.key==='ArrowLeft') bar.querySelector('.proto-bar__nav').click();
    else if (e.key==='ArrowRight') bar.querySelectorAll('.proto-bar__nav')[1].click();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', ()=>{ if(state.theme==='auto') render(); });
  window.addEventListener('hashchange', ()=>{ const p=location.hash.replace('#',''); if (PAGES.some(x=>x[0]===p) && p!==state.page) go({page:p}); });
  window.PROTO = { state, go, ctx, render };
  render();
})();
