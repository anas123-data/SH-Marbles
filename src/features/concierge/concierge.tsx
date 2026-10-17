'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Arrow } from '@/components/ui';
import { useJourney } from '@/features/bespoke/journey-provider';
import { useConsultation } from './provider';
import { trackConcierge } from './analytics';
import { budgetOptions, consultationSummary, currencyOptions, emptyPreferences, pieceOptions, settingOptions, styleOptions, toneOptions, type Preferences, type Recommendation } from './model';

function Choices<T extends string>({name,title,values,value,onChange}:{name:string;title:string;values:readonly T[];value:string;onChange:(value:T)=>void}) {
  return <fieldset className="concierge-choices"><legend>{title}</legend><div>{values.map(option=><label key={option}><input type="radio" name={name} value={option} checked={value===option} onChange={()=>onChange(option)} required /><span>{option}</span><span aria-hidden="true" className="choice-mark" /></label>)}</div></fieldset>;
}
const stepTitles=['A place to begin.','Follow your instinct.','A few practical details.'];
const interestFor=(piece:Preferences['piece'])=>piece==='A table'?'A marble table':piece==='A basin'?'A marble basin':piece==='A stone object'?'A stone object':'An architectural / trade project';

export function StoneConcierge() {
  const {preferences,setPreferences,result,setResult,step,setStep}=useConsultation();
  const journey=useJourney(),router=useRouter();
  const [busy,setBusy]=useState(false),[error,setError]=useState(''),[clearing,setClearing]=useState(false);
  const heading=useRef<HTMLHeadingElement>(null),previousStep=useRef(step),request=useRef<AbortController|null>(null),started=useRef(false);
  useEffect(()=>{if(previousStep.current!==step){heading.current?.focus();previousStep.current=step;}},[step]);
  useEffect(()=>()=>request.current?.abort(),[]);
  function update<K extends keyof Preferences>(key:K,value:Preferences[K]){setPreferences(p=>({...p,[key]:value}));setResult(null);setError('');if(!started.current){trackConcierge({name:'concierge_started'});started.current=true;}}
  function changeStep(value:number){setStep(value);setError('');setClearing(false);}
  async function next(event:FormEvent<HTMLFormElement>){
    event.preventDefault();if(busy)return;
    if(step<2){changeStep(step+1);return;}
    setBusy(true);setError('');
    const controller=new AbortController();request.current=controller;
    const timeout=setTimeout(()=>controller.abort(),15000);
    try {
      const response=await fetch('/api/concierge',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(preferences),signal:controller.signal});
      if(!response.ok)throw new Error('Unavailable');
      const recommendation:Recommendation=await response.json();
      setResult(recommendation);changeStep(3);trackConcierge({name:'concierge_completed',mode:recommendation.mode});
    } catch {if(request.current===controller)setError('We couldn’t prepare your references. Your answers are still here. Please try again, or use the project brief below.');}
    finally{clearTimeout(timeout);if(request.current===controller){request.current=null;setBusy(false);}}
  }
  function reset(){setPreferences(emptyPreferences());setResult(null);changeStep(0);started.current=false;trackConcierge({name:'concierge_reset'});heading.current?.focus();}
  function download(){if(!result)return;const url=URL.createObjectURL(new Blob([consultationSummary(preferences,result)],{type:'text/plain;charset=utf-8'}));const link=document.createElement('a');link.href=url;link.download='SH-MARBLES-stone-direction.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  function prepareBrief(){
    if(!result)return;
    const summary=consultationSummary(preferences,result);
    const message=journey.fields.message.includes(summary)?journey.fields.message:[journey.fields.message,summary].filter(Boolean).join('\n\n');
    if(message.length>2500){setError('Your existing project notes are too long to add this direction. Download the direction separately or shorten your notes in the project brief. Your existing notes have been kept.');return;}
    journey.setFields(previous=>({...previous,message,
      interest:previous.interest==='A bespoke piece'?interestFor(preferences.piece):previous.interest,
      dimensions:previous.dimensions||preferences.dimensions,country:previous.country||preferences.country,
      material:previous.material||result.materials.map(item=>item.title).join(', '),
      budget:previous.budget==='Not decided'?preferences.budget:previous.budget,
      currency:previous.budget==='Not decided'?preferences.currency:previous.currency,
    }));
    journey.setReference(previous=>({...previous,intent:previous.intent||'Stone Concierge — visual direction for discussion'}));
    trackConcierge({name:'concierge_brief_prepared'});router.push('/bespoke/inquiry');
  }
  return <>
    <header className="concierge-heading shell"><div><p className="eyebrow">The Stone Concierge</p><h1>Your space.<br /><em>A stone direction.</em></h1></div><div className="concierge-introduction"><p>Begin with a feeling.<br />Find the forms and colours<br />you want to live with.</p><span className="concierge-mode">Guided catalogue mode · AI not connected</span></div></header>
    <section className={`concierge-workspace shell${step===3?' has-results':''}`} aria-label="Stone consultation">
      {step<3 && <aside className="concierge-image"><Image src="/media/fluted-basin.webp" alt="Burgundy-toned fluted basin, with fine pale veins and a sculptural rim" fill sizes="(max-width: 767px) 90vw, 43vw" preload style={{objectPosition:'50% 62%'}}/><div><span className="eyebrow">A study in character</span><p>Colour. Form.<br /><em>Your own point of view.</em></p><span>Supplied imagery · stone identity unconfirmed</span></div></aside>}
      <div className="concierge-panel">
        <nav className="concierge-progress" aria-label="Consultation steps">{['Your space','Your palette','The details'].map((label,index)=><button key={label} type="button" disabled={busy||index>step} aria-current={step===index?'step':undefined} onClick={()=>changeStep(index)}><span>0{index+1}</span>{label}</button>)}</nav>
        <h2 ref={heading} tabIndex={-1} className="concierge-step-title">{step===3?'A direction worth exploring.':stepTitles[step]}</h2>
        {step<3 ? <form onSubmit={next} aria-busy={busy}>
          <fieldset className="concierge-form-fields" disabled={busy}>
            {step===0 && <><p className="concierge-helper">Two small decisions to frame the conversation.</p><Choices name="piece" title="What are you designing?" values={pieceOptions} value={preferences.piece} onChange={value=>update('piece',value)}/><Choices name="setting" title="Where will the piece be used?" values={settingOptions} value={preferences.setting} onChange={value=>update('setting',value)}/></>}
            {step===1 && <><p className="concierge-helper">There is no single right answer. Choose what draws you in.</p><Choices name="style" title="How should the space feel?" values={styleOptions} value={preferences.style} onChange={value=>update('style',value)}/><Choices name="tone" title="Which palette feels like you?" values={toneOptions} value={preferences.tone} onChange={value=>update('tone',value)}/></>}
            {step===2 && <div className="concierge-details"><p className="concierge-helper">These details are optional. They shape your brief, not a price or a promise of suitability.</p><label htmlFor="concierge-dimensions">Approximate dimensions <span>Optional · include units</span></label><input id="concierge-dimensions" value={preferences.dimensions} onChange={event=>update('dimensions',event.target.value)} maxLength={120} pattern="[^<>]*" placeholder="e.g. 800 × 450 × 150 mm"/><div className="concierge-budget"><div><label htmlFor="concierge-budget">Budget range</label><select id="concierge-budget" value={preferences.budget} onChange={event=>update('budget',event.target.value as Preferences['budget'])}>{budgetOptions.map(option=><option key={option}>{option}</option>)}</select></div><div><label htmlFor="concierge-currency">Currency</label><select id="concierge-currency" value={preferences.currency} onChange={event=>update('currency',event.target.value as Preferences['currency'])}>{currencyOptions.map(option=><option key={option}>{option}</option>)}</select></div></div><label htmlFor="concierge-country">Project country <span>Optional</span></label><input id="concierge-country" autoComplete="country-name" value={preferences.country} onChange={event=>update('country',event.target.value)} maxLength={80} pattern="[^<>]*" placeholder="Where is your space?"/><p className="concierge-privacy">Your answers are processed on this site to find catalogue references. They stay in tab memory and clear on refresh. They are not sent to an external AI service or saved as an inquiry.</p></div>}
          </fieldset>
          <div className="concierge-actions">{step>0 && <button className="text-link" type="button" onClick={()=>changeStep(step-1)} disabled={busy}>Back</button>}<button className="cinema-primary" type="submit" disabled={busy}>{busy?'Finding your references…':step===2?'Find my direction':'Continue'}<Arrow/></button></div>
        </form> : result && <div className="concierge-results">
          <p className="concierge-helper">{result.mode==='guided'?'Selected from the catalogue by piece, visible colour and pattern.':'AI-assisted selection, restricted to catalogue references.'} These are visual starting points; they do not confirm a stone specification or a product that fits your dimensions or budget.</p>
          <dl className="concierge-recap"><div><dt>Piece / setting</dt><dd>{preferences.piece} · {preferences.setting}</dd></div><div><dt>Feeling / palette</dt><dd>{preferences.style} · {preferences.tone}</dd></div><div><dt>Dimensions</dt><dd>{preferences.dimensions||'To discuss'}</dd></div><div><dt>Budget / country</dt><dd>{preferences.budget}{!['Not decided','Prefer to discuss'].includes(preferences.budget)&&` ${preferences.currency}`} · {preferences.country||'To discuss'}</dd></div></dl>
          {preferences.setting==='Outdoors' && <p className="concierge-caution">For an outdoor setting, no suitability is confirmed by these images. Ask the studio to review the actual stone, finish, climate, drainage and construction before specifying a piece.</p>}
          <div className="concierge-results-heading"><span className="eyebrow">01 / Form references</span><p>{preferences.piece==='An architectural project'?'Your project begins with a bespoke discussion.':'Explore the pictured form, then discuss the proportions.'}</p></div>
          {result.products.length ? <div className="concierge-reference-grid">{result.products.map(item=><article className="concierge-reference" key={item.id}><Link href={`/products/${item.slug}`}><div className="concierge-reference-image"><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width: 767px) 90vw, 43vw" style={{objectPosition:item.image.position}}/></div><div className="concierge-reference-title"><h3>{item.title}</h3><Arrow/></div></Link><p>{item.reason}</p></article>)}</div> : <p className="concierge-empty">No matching product reference is listed for this request. Bring your drawings or dimensions to a bespoke discussion.</p>}
          <div className="concierge-results-heading"><span className="eyebrow">02 / Material character</span><p>Photographic colour studies. Geological names and origins await confirmation.</p></div>
          {result.materials.length ? <div className="concierge-reference-grid material-references">{result.materials.map(item=><article className="concierge-reference" key={item.id}><Link href={`/stone-library/${item.slug}`}><div className="concierge-reference-image"><Image src={item.image.src} alt={`Colour reference: ${item.image.alt}`} fill sizes="(max-width: 767px) 90vw, 43vw" style={{objectPosition:item.image.position}}/></div><div className="concierge-reference-title"><h3>{item.title}</h3><Arrow/></div></Link><div className="concierge-swatches" aria-hidden="true">{item.palette.map(colour=><span key={colour} style={{backgroundColor:colour}}/>)}</div><p>{item.reason}</p></article>)}</div> : <p className="concierge-empty">The material catalogue has no references to show yet. Record your palette for the studio.</p>}
          <section className="concierge-handoff"><div><p className="eyebrow">A considered next step</p><h3>Make it<br /><em>your starting point.</em></h3><p>Stone identity, finish, wet-area or outdoor suitability, dimensions, price, stock and delivery timing need studio confirmation. A sample or slab review comes before specification.</p></div><div><button className="cinema-primary" type="button" onClick={prepareBrief}>Add direction to my brief<Arrow/></button><button className="text-link" type="button" onClick={download}>Download this direction<Arrow/></button><p>This adds your direction to the local project brief, keeping previous notes and configuration. It does not send an inquiry.</p><button className="text-link" type="button" onClick={()=>changeStep(0)}>Revise my answers</button></div></section>
        </div>}
        {error && <div className="concierge-error" role="alert"><p>{error}</p><Link href="/bespoke/inquiry" className="text-link">Open the project brief<Arrow/></Link></div>}
        <div className="concierge-bottom">{clearing ? <div className="concierge-clear" role="group" aria-label="Confirm clear consultation"><p>Clear these answers and references? Any direction already added to a project brief will stay there.</p><button type="button" onClick={reset}>Clear consultation</button><button type="button" onClick={()=>setClearing(false)}>Keep exploring</button></div> : <button className="text-link" type="button" disabled={busy} onClick={()=>setClearing(true)}>Start again</button>}<span>No prices. No stock or delivery promises.<br />A visual starting point, ready for a real conversation.</span></div>
      </div>
    </section>
    <noscript><p className="shell concierge-no-script">The guided consultation needs JavaScript. You can still <Link href="/collections">browse the collection</Link> and <Link href="/stone-library">explore the Stone Library</Link>.</p></noscript>
  </>;
}
