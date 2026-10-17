'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { ProjectStudy } from '@/content/studio';
import { StudioFigure } from './studio-ui';
import { Arrow } from './ui';

export function ProjectStudies({ studies }: { studies: readonly ProjectStudy[] }) {
  const [sector, setSector] = useState('All');
  const visible = studies.filter(item => sector === 'All' || item.sector === sector);
  return <><fieldset className="project-filters"><legend>Explore by setting</legend><div>{['All','Residential','Hospitality','Commercial'].map(value => <label key={value}><input type="radio" name="project-sector" checked={sector === value} onChange={() => setSector(value)} /><span>{value}</span></label>)}</div></fieldset><p className="project-result-count" role="status">{visible.length} {visible.length === 1 ? 'study' : 'studies'} · {sector === 'All' ? 'All settings' : sector}</p><div className="project-study-grid">{visible.map(item => <article className="project-study-card" key={item.id}><Link href={`/projects/${item.slug}`}><StudioFigure image={item.image} sizes="(max-width: 767px) 90vw, 44vw" caption="Interior study · not a completed project" /><div className="project-study-meta"><p className="eyebrow">{item.sector} / Application idea</p><h2>{item.title}<Arrow /></h2><p>{item.description}</p></div></Link></article>)}</div>{!visible.length && <div className="studio-empty"><h2>More perspectives to come.</h2><p>There are no studies in this setting yet.</p><button type="button" className="text-link" onClick={() => setSector('All')}>View all studies<Arrow /></button></div>}</>;
}
