"""Optimize supplied catalogue images; preserve originals and record provenance."""
from pathlib import Path
from PIL import Image, ImageOps
import json

root = Path(__file__).resolve().parents[1]
sources = [
    ('IMG-20261011-WA0032.jpg', 'fluted-basin-kitchen'),
    ('IMG-20261011-WA0017.jpg', 'warm-basin-kitchen'),
    ('IMG-20261011-WA0018.jpg', 'rose-basin'),
    ('IMG-20261011-WA0019.jpg', 'rose-basin-kitchen'),
    ('IMG-20261011-WA0023.jpg', 'amber-basin'),
    ('IMG-20261011-WA0040.jpg', 'objects-case'),
]
records = []
for source, name in sources:
    with Image.open(root / source) as original:
        image = ImageOps.exif_transpose(original).convert('RGB')
        image.thumbnail((1400, 1600))
        dest = root / 'public' / 'media' / f'{name}.webp'
        image.save(dest, 'WEBP', quality=85)
        records.append(dict(source=source, file=dest.name, width=image.width,
                            height=image.height, bytes=dest.stat().st_size,
                            provenance='unconfirmed', use='owner-approved supplied imagery'))
(root / 'docs' / 'phase-6-7-assets.json').write_text(json.dumps(records, indent=2), encoding='utf-8')
print(f'Prepared {len(records)} catalogue images.')
