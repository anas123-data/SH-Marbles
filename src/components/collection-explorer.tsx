'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { collections, studies, type CollectionId } from '@/content/home';
import { Arrow, TextLink } from './ui';
import { ProjectButton } from './project-dialog';

const interests: Record<CollectionId, string> = { tables: 'A marble table', basins: 'A marble basin', objects: 'A stone object' };

export function CollectionExplorer() {
  const [selected, setSelected] = useState<CollectionId>('tables');
  const [detail, setDetail] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const study = studies[selected];
  function choose(id: CollectionId) { setSelected(id); setDetail(false); }
  function tabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % collections.length;
    else if (event.key === 'ArrowLeft') next = (index + collections.length - 1) % collections.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = collections.length - 1;
    else return;
    event.preventDefault(); choose(collections[next].id); tabs.current[next]?.focus();
  }
  return <>
    <div className="collection-grid">{collections.map(collection => <button type="button" key={collection.id} className={`collection-card collection-${collection.id}`} onClick={() => { choose(collection.id); panel.current?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' }); tabs.current[collections.findIndex(item => item.id === collection.id)]?.focus({ preventScroll: true }); }}>
      <div className="collection-image"><Image src={collection.image} alt={collection.alt} fill sizes={collection.id === 'tables' ? '(max-width: 767px) 90vw, 44vw' : '(max-width: 767px) 43vw, 23vw'} quality={75} /></div>
      <div className="collection-meta"><span className="eyebrow">{collection.number} / The collection</span><div><h3>{collection.title}</h3><Arrow /></div><p>{collection.subtitle}</p></div>
    </button>)}</div>
    <div id="piece-study" ref={panel} className="piece-study">
      <div className="study-heading"><p className="eyebrow">A closer look</p><div className="study-tabs" role="tablist" aria-label="Explore a collection">{collections.map((item, index) => <button key={item.id} ref={node => { tabs.current[index] = node; }} type="button" role="tab" id={`tab-${item.id}`} aria-selected={selected === item.id} aria-controls={`panel-${item.id}`} tabIndex={selected === item.id ? 0 : -1} onKeyDown={event => tabKey(event, index)} onClick={() => choose(item.id)}>{item.title}</button>)}</div></div>
      {collections.map(item => <div key={item.id} role="tabpanel" id={`panel-${item.id}`} aria-labelledby={`tab-${item.id}`} hidden={selected !== item.id} tabIndex={0}>{selected === item.id ? <div className="study-grid">
        <div className="study-picture"><Image src={detail ? study.detail : study.image} alt={detail ? `Additional supplied view of ${study.form.toLowerCase()}` : study.alt} fill sizes="(max-width: 767px) 90vw, 48vw" quality={75} /><button type="button" className="image-switch" aria-pressed={detail} onClick={() => setDetail(!detail)}>{detail ? 'Main view' : 'Another perspective'}<span aria-hidden="true">↗</span></button></div>
        <div className="study-copy"><span className="eyebrow">Form / Material / Presence</span><h3>{study.title}</h3><p className="muted">{study.text}</p><dl><div><dt>Form</dt><dd>{study.form}</dd></div><div><dt>Character</dt><dd>{study.character}</dd></div><div><dt>Made personal</dt><dd>Bring your size, stone and finish preferences.</dd></div></dl><div className="study-route"><TextLink href={`/collections/${selected}`}>Explore the collection</TextLink></div><ProjectButton interest={interests[selected]} className="text-link">Plan a piece like this</ProjectButton><p className="fine-print">A visual study from supplied imagery. Stone identity, dimensions and available options require confirmation.</p></div>
      </div> : null}</div>)}
    </div>
  </>;
}
