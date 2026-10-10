"""Build the static feature guides, focused screenshots and section search index.

Run: python scripts/build-docs.py
Standard library only. Edit docs/guide-content.json to maintain the guides.
Credits remain hand-authored; their navigation and search entries are refreshed.
"""
from pathlib import Path
import html
import hashlib
import json
import re

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
PAGES = json.loads((DOCS / 'guide-content.json').read_text(encoding='utf-8'))
ESC = html.escape

def plain(value):
    return html.unescape(re.sub(r'<[^>]+>', ' ', value))

NAV = [(p['slug'] + '.html', p['title']) for p in PAGES] + [('credits.html', 'Credits & donations')]

def navigation(current):
    return '<nav aria-label="Documentation">' + ''.join(
        f'<a href="{url}"' + (' aria-current="page"' if url == current else '') + f'>{ESC(title)}</a>'
        for url, title in NAV) + '</nav>'

template = (DOCS / 'credits.html').read_text(encoding='utf-8')
template = re.sub(r'assets/site\.(css|js)(?:\?[^" ]*)?', lambda match:
    f'assets/site.{match[1]}?v=' + hashlib.sha256((DOCS / 'assets' / f'site.{match[1]}').read_bytes()).hexdigest()[:10], template)
prefix = template.split('<main id="main">')[0]
search = []
coverage = ['# Feature documentation coverage', '', 'Audited against the v3.4.0 source on 2026-10-09. Every guide section includes a focused screenshot of the relevant application controls. Screenshots use temporary sample data; captions identify the controls to inspect.', '', 'Edit `guide-content.json`, then run `python scripts/build-docs.py`. Run `python scripts/check-docs.py` to validate local links, anchors, images, coverage, and search entries.', '', '| Feature | Implementation | Guide | Focused image |', '|---|---|---|---|']
for position, page in enumerate(PAGES):
    url = page['slug'] + '.html'
    start = re.sub(r'<title>.*?</title>', f'<title>{ESC(page["title"])} · STPHE</title>', prefix)
    start = re.sub(r'<meta name="description" content="[^"]*">', f'<meta name="description" content="{ESC(page["intro"], quote=True)}">', start)
    start = re.sub(r'<nav aria-label="Documentation">.*?</nav>', navigation(url), start, flags=re.S)
    body = f'<main id="main"><div class="eyebrow">STPHE / User guide</div><h1>{ESC(page["title"])}</h1><p class="lead">{ESC(page["intro"])}</p>'
    toc = []
    for section in page['sections']:
        name, caption, image_width, image_height = section["screenshot"]
        if not name.endswith(".png") or not (DOCS / "assets" / name).is_file():
            raise ValueError(f"Missing application screenshot: {name}")
        for old, target in page.get('aliases', {}).items():
            if target == section['id']:
                body += f'<span class="anchor-alias" id="{old}"></span>'
        body += f'\n<section aria-labelledby="{section["id"]}"><h2 id="{section["id"]}">{ESC(section["title"])}</h2>'
        body += f'<figure><a href="assets/{name}"><img src="assets/{name}" alt="{ESC(caption, quote=True)}" loading="lazy" width="{image_width}" height="{image_height}"></a><figcaption>{ESC(caption)} Open the screenshot to enlarge.</figcaption></figure>{section["body"]}</section>\n'
        toc.append(f'<a href="#{section["id"]}">{ESC(section["title"])}</a>')
        search.append({'url': f'{url}#{section["id"]}', 'title': f'{page["title"]} · {section["title"]}', 'text': plain(section['body']) + ' ' + caption})
        coverage.append(f'| {section["title"]} | `{page["source"]}` | [{page["title"]}](./{url}#{section["id"]}) | [Screenshot](./assets/{name}) |')
    prev = NAV[position-1] if position else None
    nxt = NAV[position+1]
    body += '<div class="page-nav">' + (f'<a href="{prev[0]}">← {ESC(prev[1])}</a>' if prev else '<span></span>') + f'<a href="{nxt[0]}">{ESC(nxt[1])} →</a></div><footer>STPHE v3.4.0 · Documentation reviewed 2026-10-09 · <a href="credits.html">Credits &amp; donations</a></footer></main>'
    body += '<aside class="toc"><p class="nav-label">ON THIS PAGE</p><nav aria-label="On this page">' + ''.join(toc) + '</nav></aside></div></body></html>\n'
    (DOCS / url).write_text(start + body, encoding='utf-8')
credits = re.sub(r'<nav aria-label="Documentation">.*?</nav>', navigation('credits.html'), template, flags=re.S)
(DOCS / 'credits.html').write_text(credits, encoding='utf-8')
search.append({'url': 'credits.html', 'title': 'Credits & donations', 'text': plain(credits.split('<main id="main">')[1].split('</main>')[0])})
(DOCS / 'search-index.json').write_text(json.dumps(search, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
(DOCS / 'feature-coverage.md').write_text('\n'.join(coverage) + '\n', encoding='utf-8')
print(f'Built {len(PAGES)} guides, {len(search)-1} screenshot-backed sections, and {len(search)} search entries.')
