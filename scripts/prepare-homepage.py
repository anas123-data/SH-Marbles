"""Derive web images from supplied originals. No retouching or invented imagery."""
from pathlib import Path
from PIL import Image, ImageOps
import json

root = Path(__file__).resolve().parents[1]
dest = root / 'public' / 'media'
dest.mkdir(parents=True, exist_ok=True)
sources = [
    ('IMG-20261011-WA0008.jpg', 'table-bedroom', 1200),
    ('IMG-20261011-WA0007.jpg', 'table-detail', 900),
    ('IMG-20261011-WA0037.jpg', 'fluted-basin', 1400),
    ('IMG-20261011-WA0030.jpg', 'black-basin', 1000),
    ('IMG-20261011-WA0015.jpg', 'warm-basin', 1000),
    ('IMG-20261011-WA0038.jpg', 'stone-objects', 1000),
    ('IMG-20261011-WA0041.jpg', 'objects-detail', 900),
    ('IMG-20261011-WA0005.jpg', 'workshop-basin', 1200),
]
manifest = []
for original, name, width in sources:
    with Image.open(root / original) as img:
        img = ImageOps.exif_transpose(img).convert('RGB')
        img.thumbnail((width, 1800))
        target = dest / f'{name}.webp'
        img.save(target, 'WEBP', quality=85)
        manifest.append({'source': original, 'file': target.name, 'width': img.width, 'height': img.height, 'bytes': target.stat().st_size, 'rights': 'review-only', 'provenance': 'unconfirmed'})
(root / 'docs' / 'phase-5-assets.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')

# One shared token source serves both the original board and the application.
tokens = root / 'design-system' / 'tokens.css'
text = tokens.read_text(encoding='utf-8')
if ':root{' in text:
    start = text.index(':root{')
    (tokens.parent / 'theme.css').write_text(text[start:], encoding='utf-8')
    tokens.write_text('@import url("theme.css");\n' + text[:start], encoding='utf-8')
print('Homepage derivatives and shared design tokens prepared.')
