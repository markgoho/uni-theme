import json,html
opts=json.load(open('options.json'))
E=html.escape
cards=''.join(f'''
<a class="card {'card--push' if o['tier']=='push' else ''}" href="{o['file']}" id="opt-{o['key'].lower()}">
  <img class="card__thumb" src="thumbs/{o['file'][:-5]}.jpg" alt="Home page of option {o['key']}, {E(o['name'])}" width="720" height="450" loading="lazy">
  <div class="card__body">
    <div class="card__kicker"><span class="key">{o['key']}</span><span>{'Boundary pusher' if o['tier']=='push' else 'Core option'}</span></div>
    <h3>{E(o['name'])}</h3>
    <p class="thesis">{E(o['thesis'])}</p>
    <p class="look">{E(o['look'])}</p>
    <span class="card__cta">Open all five pages →</span>
  </div>
</a>''' for o in opts)
axes=[('nav','Navigation model'),('modes','How “Do one of the following” reads'),('reqs','Requirement list form'),('guide','Guide page chrome'),('search','Search result grouping'),('home','Landing page'),('award','Award landing page')]
rows=''.join(f'<tr><th scope="row">{E(label)}</th>'+''.join(f'<td><a href="{o["file"]}#{ {"home":"home","award":"award","nav":"award","modes":"requirements","reqs":"requirements","guide":"guide","search":"search"}[k] }">{E(o["axes"].get(k) or o[k])}</a></td>' for o in opts)+'</tr>' for k,label in axes)
head=''.join(f'<th scope="col"><span class="key">{o["key"]}</span> {E(o["name"])}</th>' for o in opts)
body=f'''<title>Uni Theme Redesign Options</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Public+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
/* Gallery: 7 options × 5 pages × 2 sites. Tokens: bone ground, graphite ink, olive accent, gold key. Type: Fraunces display, Public Sans body. */
:root{{--bg:oklch(0.975 0.006 86);--bg2:oklch(0.945 0.01 86);--fg:oklch(0.23 0.02 150);--fg2:oklch(0.45 0.02 140);--line:oklch(0.86 0.015 86);--accent:oklch(0.42 0.08 150);--key:oklch(0.78 0.13 85);--keyfg:oklch(0.25 0.05 80);--display:"Fraunces",Georgia,serif;--body:"Public Sans",system-ui,sans-serif;color-scheme:light}}
@media (prefers-color-scheme:dark){{:root:not([data-theme="light"]){{--bg:oklch(0.19 0.012 150);--bg2:oklch(0.24 0.014 150);--fg:oklch(0.94 0.01 86);--fg2:oklch(0.74 0.012 86);--line:oklch(0.34 0.015 150);--accent:oklch(0.78 0.1 150);--key:oklch(0.80 0.12 85);--keyfg:oklch(0.22 0.05 80);color-scheme:dark}}}}
:root[data-theme="dark"]{{--bg:oklch(0.19 0.012 150);--bg2:oklch(0.24 0.014 150);--fg:oklch(0.94 0.01 86);--fg2:oklch(0.74 0.012 86);--line:oklch(0.34 0.015 150);--accent:oklch(0.78 0.1 150);--key:oklch(0.80 0.12 85);--keyfg:oklch(0.22 0.05 80);color-scheme:dark}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--fg);font:400 1rem/1.55 var(--body);padding-block:2rem 4rem;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px))}}
.wrap{{max-width:80rem;margin-inline:auto}}
h1,h2,h3{{font-family:var(--display);font-weight:600;line-height:1.1;margin:0;text-wrap:balance}}
h1{{font-size:clamp(2.2rem,5vw,3.6rem)}}
.lead{{max-width:62ch;color:var(--fg2);font-size:1.1rem;margin-block:1rem 0}}
.meta{{display:flex;gap:1.5rem;flex-wrap:wrap;margin-block:1.25rem 0;font-size:.9rem;color:var(--fg2)}}
.meta b{{color:var(--fg);font-variant-numeric:tabular-nums}}
.key{{display:inline-grid;place-items:center;min-width:1.6em;height:1.6em;padding-inline:.3em;border-radius:4px;background:var(--key);color:var(--keyfg);font:700 .8em/1 var(--body)}}
section{{margin-block-start:3rem}}
section>h2{{font-size:1.6rem;border-block-end:1px solid var(--line);padding-block-end:.5rem;margin-block-end:1.25rem}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr));gap:1.25rem}}
.card{{display:grid;grid-template-rows:auto 1fr;border:1px solid var(--line);border-radius:10px;overflow:hidden;background:var(--bg2);color:inherit;text-decoration:none;min-width:0;transition:translate .15s,box-shadow .15s}}
.card:hover,.card:focus-visible{{translate:0 -2px;box-shadow:0 10px 30px oklch(0 0 0/.12);outline:none}}
.card:focus-visible{{box-shadow:0 0 0 3px var(--accent)}}
.card--push{{border-color:var(--key)}}
.card__thumb{{width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:top;border-block-end:1px solid var(--line);background:var(--bg)}}
.card__body{{padding:1rem 1.1rem 1.2rem;display:grid;gap:.5rem;align-content:start}}
.card__kicker{{display:flex;gap:.6rem;align-items:center;font:600 .72rem/1 var(--body);letter-spacing:.1em;text-transform:uppercase;color:var(--fg2)}}
.card h3{{font-size:1.5rem}}
.thesis{{margin:0}}
.look{{margin:0;color:var(--fg2);font-size:.92rem}}
.card__cta{{margin-block-start:.4rem;color:var(--accent);font-weight:600;font-size:.92rem}}
.howto{{display:grid;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr));gap:1rem 2rem;color:var(--fg2)}}
.howto p{{margin:0}} .howto b{{color:var(--fg)}}
kbd{{font:600 .8em/1 var(--body);border:1px solid var(--line);border-radius:4px;padding:.15em .4em;background:var(--bg)}}
.tablewrap{{overflow-x:auto;border:1px solid var(--line);border-radius:10px}}
table{{border-collapse:collapse;min-width:72rem;width:100%;font-size:.86rem}}
th,td{{text-align:start;vertical-align:top;padding:.7rem .8rem;border-block-end:1px solid var(--line);min-width:11rem}}
thead th{{background:var(--bg2);position:sticky;top:0;font-weight:700}}
tbody th{{font-weight:600;background:var(--bg2);position:sticky;left:0;min-width:11rem;max-width:14rem}}
td a{{color:inherit;text-decoration:none;display:block}} td a:hover{{color:var(--accent);text-decoration:underline}}
.note{{border-inline-start:3px solid var(--key);padding:.6rem 1rem;background:var(--bg2);border-radius:0 8px 8px 0;color:var(--fg2);margin-block-start:1.5rem}}
.note p{{margin:0}}
</style>
<div class="wrap">
<header>
  <p class="card__kicker" style="margin:0 0 .6rem">Prototype · uni-theme · Merit Badge University + Scouting University</p>
  <h1>Uni Theme Redesign Options</h1>
  <p class="lead">Seven cohesive redesigns, each rendering the same five pages for both sites from one template and the real data: landing page, award (merit badge / rank) landing page, requirements page, Digital Resource Guide page and search results. Five core options, plus two that push what modern CSS and the web platform can do.</p>
  <div class="meta"><span><b>7</b> options</span><span><b>5</b> pages each</span><span><b>2</b> sites (Camping · Tenderfoot)</span><span><b>Light + dark</b> for every page</span><span><b>400px</b> and up</span></div>
</header>
<section aria-labelledby="h-opts"><h2 id="h-opts">The options</h2>
<div class="grid">{cards}</div>
<div class="note"><p>Inside an option, the floating bar at the bottom switches page (<kbd>1</kbd>–<kbd>5</kbd>), site (<kbd>S</kbd>), theme (<kbd>D</kbd>) and option (<kbd>←</kbd> <kbd>→</kbd>); <kbd>H</kbd> hides the bar. Links inside the mock pages route to the matching mocked page; anything not mocked shows a small notice.</p></div>
</section>
<section aria-labelledby="h-matrix"><h2 id="h-matrix">Side by side</h2>
<p class="lead" style="margin-block-end:1rem">Each row is one structural decision. The options were deliberately made to disagree on these, so you can mix: “B’s header with E’s requirements” is a real answer. Each cell links to the page where that choice is visible.</p>
<div class="tablewrap"><table><thead><tr><th scope="col">Decision</th>{head}</tr></thead><tbody>{rows}</tbody></table></div>
</section>
<section aria-labelledby="h-how"><h2 id="h-how">What is held constant</h2>
<div class="howto">
<p><b>Content.</b> Real data from both repos: all 10 Camping requirements with children, modes and resources; all 11 Tenderfoot groups (27 requirements) with the fitness lists and the official notes; the Camping Hazards and Square Knot guide pages; the live “knots” / “knot” search results.</p>
<p><b>Rules.</b> Official requirement text appears verbatim at body size and is set apart from curated titles without a third typeface. Requirement paths, completion modes, Eagle-required and rank level are treated as data with a designed home on every option.</p>
<p><b>Platform.</b> Static HTML and CSS, Google Fonts only, no iframes (videos are poster cards that link out), responsive to phone width, light and dark themes, reduced-motion safe. Everything shown maps onto Hugo partials in uni-theme.</p>
</div>
</section>
</div>
'''
open('index-body.html','w').write(body)
open('index.html','w').write('<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'+body.replace('</style>','img{max-width:100%}</style></head><body>',1)+'</body></html>\n')
print('built')
