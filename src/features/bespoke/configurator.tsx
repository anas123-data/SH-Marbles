'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Material } from '@/content/catalogue-models';
import { Arrow } from '@/components/ui';
import { useJourney } from './journey-provider';
import { trackBespoke } from './analytics';
import { ConfigurationDiagram as Diagram } from './diagram';
import { allowedEdges, changeShape, changeType, configurationErrors, configurationLines, defaultConfiguration, edgeLabels, pieceOptions, shapeLabels, type Configuration } from './model';

export function Configurator({ materials }: { materials: readonly Material[] }) {
  const journey = useJourney();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const heading = useRef<HTMLHeadingElement>(null);
  const config = journey.configuration ?? defaultConfiguration();
  const selected = materials.find(item => item.id === config.materialId);
  const piece = pieceOptions.find(item => item.id === config.type)!;
  function update(next: Configuration) { journey.setConfiguration(next); setErrors({}); }
  function navigate(next: number) { setStep(next); setErrors({}); requestAnimationFrame(() => heading.current?.focus()); }
  function continueBrief() {
    const found = configurationErrors(config, materials.map(item => item.id));
    setErrors(found);
    if (Object.keys(found).length) return;
    journey.setConfiguration(config);
    trackBespoke({ name: 'configurator_completed', pieceType: config.type, materialId: config.materialId });
    journey.setFields(previous => ({ ...previous, interest: config.type === 'basin' ? 'A marble basin' : 'A marble table', material: selected ? `${selected.title} — visual study` : '' }));
    router.push('/bespoke/inquiry');
  }
  return <div className="builder-grid">
    <section className="drawing-panel" aria-label="Your indicative design"><div className="drawing-caption"><span className="eyebrow">SH / Form study</span><span>01 — Your proportions</span></div><Diagram config={config} colour={selected?.palette[0] ?? '#b9ad9c'} /><div className="drawing-meta"><h2>{piece.title}</h2><p>{selected?.title ?? 'Material to be explored'}</p></div><p className="fine-print">A 2D outline and approximate colour, not a stone rendering. Veining, thickness, supports and construction are not specified.</p></section>
    <section className="builder-controls" aria-label="Configure your piece">
      <ol className="journey-steps">{['Form', 'Material', 'Proportion'].map((label, index) => <li key={label}><button type="button" aria-current={step === index ? 'step' : undefined} onClick={() => navigate(index)}><span>0{index + 1}</span>{label}</button></li>)}</ol>
      <h2 ref={heading} tabIndex={-1}>{['Begin with a form.', 'Find your colour.', 'Make room for it.'][step]}</h2>
      {step === 0 && <><p className="muted">Choose a starting point. Every detail remains open to a conversation.</p><fieldset className="choice-fieldset"><legend>The piece</legend><div className="piece-choices">{pieceOptions.map(option => <label className="choice-tile" key={option.id}><input type="radio" name="piece" checked={config.type === option.id} onChange={() => update(changeType(config, option.id))} /><span><strong>{option.title}</strong><small>{option.description}</small></span></label>)}</div></fieldset><fieldset className="choice-fieldset"><legend>The silhouette</legend><div className="choice-row">{piece.shapes.map(shape => <label className="choice-chip" key={shape}><input type="radio" name="shape" checked={config.shape === shape} onChange={() => update(changeShape(config, shape))} /><span>{shapeLabels[shape]}</span></label>)}</div></fieldset></>}
      {step === 1 && <><p className="muted">Colour directions drawn from the collection imagery. Stone identity, origin and availability require confirmation.</p><fieldset className="choice-fieldset"><legend>Material direction</legend><div className="material-choices"><label className="choice-tile"><input type="radio" name="material" checked={config.materialId === null} onChange={() => update({ ...config, materialId: null })} /><span>Explore with the studio</span></label>{materials.map(material => <label className="choice-tile" key={material.id}><input type="radio" name="material" checked={config.materialId === material.id} onChange={() => update({ ...config, materialId: material.id })} /><span><span className="mini-palette" aria-hidden="true">{material.palette.map(colour => <i key={colour} style={{ background: colour }} />)}</span><strong>{material.title}</strong></span></label>)}</div></fieldset>{selected && <figure className="material-reference"><div><Image src={selected.image.src} alt={selected.image.alt} fill sizes="(max-width: 767px) 85vw, 30vw" style={{ objectPosition: selected.image.position }} /></div><figcaption>Photographic colour reference · <Link href={`/stone-library/${selected.slug}`}>Explore {selected.title}</Link></figcaption></figure>}</>}
      {step === 2 && <><p className="muted">Starting dimensions are illustrative. Enter your preferred size in millimetres; the studio must review feasibility.</p><fieldset className="choice-fieldset"><legend>Approximate dimensions</legend><div className="dimension-fields">{(['width', ...(config.shape === 'round' ? [] : ['depth']), 'height'] as ('width' | 'depth' | 'height')[]).map(key => <div className="field" key={key}><label htmlFor={`config-${key}`}>{key === 'width' && config.shape === 'round' ? 'Diameter' : key.charAt(0).toUpperCase() + key.slice(1)} <span>mm</span></label><input id={`config-${key}`} type="number" inputMode="numeric" min={key === 'height' ? 50 : 100} max={key === 'height' ? 2000 : 5000} step="1" value={config[key] ?? ''} aria-invalid={!!errors[key]} aria-describedby={errors[key] ? `error-${key}` : undefined} onChange={event => { const value = event.target.value === '' ? null : Number(event.target.value); update({ ...config, [key]: value, ...(key === 'width' && config.shape === 'round' ? { depth: value } : {}) }); }} />{errors[key] && <p className="field-error" id={`error-${key}`}>{errors[key]}</p>}</div>)}</div></fieldset><fieldset className="choice-fieldset"><legend>Edge direction</legend><div className="choice-row">{allowedEdges(config.type, config.shape).map(edge => <label className="choice-chip" key={edge}><input type="radio" name="edge" checked={config.edge === edge} onChange={() => update({ ...config, edge })} /><span>{edgeLabels[edge]}</span></label>)}</div><p className="fine-print">An edge preference only. Profiles and construction details are confirmed during design review.</p></fieldset><div className="configuration-summary"><p className="eyebrow">Your starting point</p>{configurationLines(config, selected?.title ?? 'To discuss').slice(0, -1).map(line => <p key={line}>{line}</p>)}</div>{Object.keys(errors).length > 0 && <p role="alert" className="field-error">Please check your dimensions before continuing.</p>}</>}
      <div className="builder-actions">{step > 0 && <button type="button" className="text-link" onClick={() => navigate(step - 1)}>← Back</button>}{step < 2 ? <button type="button" className="button" onClick={() => navigate(step + 1)}>Continue<Arrow /></button> : <button type="button" className="button" onClick={continueBrief}>Add to project brief<Arrow /></button>}</div><p className="fine-print">Your choices stay in this tab as you browse. Reloading clears them. No price or order is generated.</p>
    </section>
  </div>;
}
