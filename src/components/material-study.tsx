'use client';

import Image from 'next/image';
import { useState } from 'react';
import { materialStudies } from '@/content/home';
import { TextLink } from './ui';

export function MaterialStudy() {
  const [selected, setSelected] = useState(0);
  const stone = materialStudies[selected];
  return <div className="material-grid">
    <div className="material-image"><Image src={stone.image} alt={stone.alt} fill sizes="(max-width: 767px) 100vw, 52vw" style={{ objectPosition: stone.position }} quality={85} /><span className="image-caption">Material study / 0{selected + 1}</span></div>
    <div className="material-copy"><p className="eyebrow">03 / The material</p><h2>Nature never<br />repeats itself.</h2><p className="material-description">A vein, a shade, a subtle shift in pattern. The character of stone is where every design begins.</p>
      <fieldset className="material-options"><legend>Explore a colour direction</legend>{materialStudies.map((item, index) => <label key={item.id} className={index === selected ? 'material-option is-selected' : 'material-option'}><input type="radio" name="material-tone" checked={selected === index} onChange={() => setSelected(index)} /><span>{item.label}</span><span className="selection-mark" aria-hidden="true">{index === selected ? '↗' : '+'}</span></label>)}</fieldset>
      <p className="material-feedback" role="status">{stone.text}</p><TextLink href="/stone-library">Explore the Stone Library</TextLink><p className="fine-print">Colour studies, not a stock list. A specific stone and its suitability are confirmed with your project.</p>
    </div>
  </div>;
}
