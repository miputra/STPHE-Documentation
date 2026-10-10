"""Check generated documentation links, screenshots and search with standard Python."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json
import re
import struct
import argparse

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs'
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--program-root', type=Path, help='Optional STPHE checkout for implementation-source checks')
args = parser.parse_args()
if args.program_root and not (args.program_root / 'manifest.json').is_file():
    parser.error('--program-root must point to the STPHE extension checkout')

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.ids, self.links, self.images, self.headings = [], [], [], []
        self.feed(path.read_text(encoding='utf-8'))

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        if tag in ('a', 'link', 'script'):
            self.links.append(attrs.get('href', attrs.get('src', '')))
        if tag == 'img':
            self.images.append(attrs)
            self.links.append(attrs['src'])
        if tag == 'h2':
            self.headings.append(attrs.get('id'))

pages = {p.name: Page(p) for p in DOCS.glob('*.html') if not p.name.startswith('_')}
errors = []
for name, page in pages.items():
    if len(page.ids) != len(set(page.ids)):
        errors.append(f'{name}: duplicate IDs')
    for href in page.links:
        url = urlsplit(href)
        if url.scheme or url.netloc:
            continue
        target = (DOCS / unquote(url.path)).resolve() if url.path else DOCS / name
        if not target.exists():
            errors.append(f'{name}: missing {href}')
        if url.fragment and target.suffix == '.html' and target.name in pages:
            if unquote(url.fragment) not in pages[target.name].ids:
                errors.append(f'{name}: missing anchor {href}')
    for image in page.images:
        if 'alt' not in image:
            errors.append(f'{name}: image without alt text')

content = json.loads((DOCS / 'guide-content.json').read_text(encoding='utf-8'))
search = json.loads((DOCS / 'search-index.json').read_text(encoding='utf-8'))
search_urls = [entry['url'] for entry in search]
assert len(search_urls) == len(set(search_urls)), 'Duplicate search entries'
count = 0
for guide in content:
    page = pages[guide['slug'] + '.html']
    for old, target in guide.get('aliases', {}).items():
        if old not in page.ids or target not in page.headings:
            errors.append(f'{guide["slug"]}: invalid historical alias {old} -> {target}')
    for section in guide['sections']:
        count += 1
        url = guide['slug'] + '.html#' + section['id']
        if url not in search_urls:
            errors.append(f'{url}: not indexed')
        if section['id'] not in page.headings:
            errors.append(f'{url}: missing section heading')
        shot = section.get('screenshot')
        if not shot or len(shot) != 4:
            errors.append(f'{url}: missing screenshot metadata')
            continue
        name, caption, width, height = shot
        image = 'assets/' + name
        if not name.endswith('.png') or not caption.strip():
            errors.append(f'{url}: expected a captioned PNG screenshot')
        asset = DOCS / image
        if asset.is_file():
            data = asset.read_bytes()
            if data[:8] != b'\x89PNG\r\n\x1a\n' or struct.unpack('>II', data[16:24]) != (width, height):
                errors.append(f'{url}: invalid PNG or incorrect dimensions')
        section_html = re.search(r'<section aria-labelledby="' + re.escape(section['id']) + r'">(.*?)</section>', (DOCS / (guide['slug'] + '.html')).read_text(encoding='utf-8'), re.S)
        if not section_html or f'src="{image}"' not in section_html[1]:
            errors.append(f'{url}: screenshot missing from its own section')
        if section_html and '.svg' in section_html[1]:
            errors.append(f'{url}: illustration remains in feature section')
        for source in guide['source'].split('; '):
            if args.program_root and not (args.program_root / source).exists():
                errors.append(f'{url}: missing audit source {source}')
for query in ['XML parameters', 'import tags', 'before send', 'read-only', 'exclusions', 'regex values']:
    terms = re.findall(r'\w+', query.lower())
    if not any(all(term in (entry['title']+' '+entry['text']).lower() for term in terms) for entry in search):
        errors.append(f'No search coverage: {query}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'OK: {len(pages)} pages, {count} feature sections/images, {len(search)} search entries, local links and anchors.')
