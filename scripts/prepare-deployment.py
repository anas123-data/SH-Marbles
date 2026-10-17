"""Allowlisted source bundle for direct Vercel deployment; excludes secrets and build artifacts."""
from pathlib import Path
import base64
import hashlib
import json

root=Path(__file__).resolve().parents[1]
files=sorted(p for folder in ['src','public'] for p in (root/folder).rglob('*') if p.is_file())
files += [root/p for p in ['package.json','pnpm-lock.yaml','pnpm-workspace.yaml','tsconfig.json','next-env.d.ts','next.config.ts','postcss.config.mjs','design-system/theme.css','design-system/assets/cormorant-garamond.woff2','design-system/assets/manrope.woff2','design-system/assets/cormorant-garamond-OFL.txt','design-system/assets/manrope-OFL.txt']]
payload=[]
manifest=[]
for file in files:
    relative=file.relative_to(root).as_posix()
    if file.is_symlink() or not file.resolve().is_relative_to(root.resolve()):
        raise ValueError('Unexpected file outside the source tree')
    data=file.read_bytes()
    payload.append({'file':relative,'data':base64.b64encode(data).decode('ascii'),'encoding':'base64'})
    manifest.append({'file':relative,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()})
directory=root/'output'/'deployment'
directory.mkdir(parents=True,exist_ok=True)
encoded=json.dumps(payload,separators=(',',':'))
# Bounded stdout reads let the orchestration layer assemble the upload without printing source/assets.
chunks=[encoded[index:index+24000] for index in range(0,len(encoded),24000)]
for index,chunk in enumerate(chunks):
    (directory/f'chunk-{index}.txt').write_text(chunk,encoding='ascii')
(directory/'manifest.json').write_text(json.dumps(manifest,indent=2),encoding='utf-8')
print(json.dumps({'files':len(files),'bytes':sum(item['bytes'] for item in manifest),'chunks':len(chunks),'payloadBytes':len(encoded)}))
