"""Create internal review derivatives; preserve every supplied original."""
from pathlib import Path
import json
import urllib.request
import urllib.parse
import re
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'design-system' / 'assets'
DEST.mkdir(parents=True, exist_ok=True)

for source, name, width in [
    ('IMG-20261011-WA0008.jpg', 'table-reference', 1000),
    ('IMG-20261011-WA0037.jpg', 'basin-reference', 1000),
    ('IMG-20261011-WA0030.jpg', 'fluted-reference', 700),
    ('IMG-20261011-WA0038.jpg', 'object-reference', 700),
]:
    with Image.open(ROOT / source) as original:
        img = ImageOps.exif_transpose(original).convert('RGB')
        img.thumbnail((width, 1500))
        img.save(DEST / f'{name}.webp', 'WEBP', quality=86)

fonts = [
    ('cormorantgaramond', 'CormorantGaramond[wght].ttf', 'cormorant-garamond'),
    ('manrope', 'Manrope[wght].ttf', 'manrope'),
]
manifest = []
for folder, filename, local in fonts:
    base = f'https://raw.githubusercontent.com/google/fonts/main/ofl/{folder}/'
    url = base + urllib.parse.quote(filename)
    urllib.request.urlretrieve(base + 'OFL.txt', DEST / f'{local}-OFL.txt')
    family = 'Cormorant+Garamond:wght@300..700' if folder == 'cormorantgaramond' else 'Manrope:wght@200..800'
    css_url = f'https://fonts.googleapis.com/css2?family={family}&display=swap'
    request = urllib.request.Request(css_url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'})
    stylesheet = urllib.request.urlopen(request, timeout=30).read().decode()
    urls = re.findall(r'url\((https://[^)]+\.woff2)\)', stylesheet)
    if not urls:
        raise RuntimeError('No WOFF2 font returned; preserve existing local font files.')
    font_url = urls[-1] # Google Fonts emits the Latin subset last.
    urllib.request.urlretrieve(font_url, DEST / f'{local}.woff2')
    manifest.append({'family': local, 'source': url, 'download': font_url, 'license': 'SIL Open Font License 1.1', 'use': 'self-hosted Latin variable WOFF2; additional subsets needed for future languages'})
(DEST / 'font-sources.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
print('Prepared review images and licensed local fonts.')
