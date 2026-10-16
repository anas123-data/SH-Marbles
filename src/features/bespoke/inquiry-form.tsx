'use client';

import Link from 'next/link';
import { useRef, useState, type FormEvent } from 'react';
import { Arrow } from '@/components/ui';
import { useJourney } from './journey-provider';
import { budgets, buildInquiryText, configurationErrors, configurationLines, currencies, interests, sectors, timelines, validateInquiry, type InquiryErrors, type InquiryFields } from './model';
import { validateReferenceFiles } from './files';
import { trackBespoke } from './analytics';

type TextKey = Exclude<keyof InquiryFields, 'consent'>;
const projectKeys = ['interest', 'sector', 'dimensions', 'quantity', 'material', 'budget', 'currency', 'timeline', 'message'] as const;
export function InquiryForm({ materials }: { materials: { id: string; title: string }[] }) {
  const journey = useJourney();
  const { fields, files, configuration, reference } = journey;
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [fileError, setFileError] = useState('');
  const [checking, setChecking] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [confirmReset, setConfirmReset] = useState(false);
  const checkId = useRef(0);
  const started = useRef(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const errorBox = useRef<HTMLDivElement>(null);
  const materialTitle = materials.find(item => item.id === configuration?.materialId)?.title ?? 'To discuss';
  function setField(key: TextKey, value: string) {
    if (!started.current) { started.current = true; trackBespoke({ name: 'inquiry_started', source: configuration ? 'configurator' : 'direct' }); }
    journey.setFields(previous => ({ ...previous, [key]: value })); setErrors(previous => ({ ...previous, [key]: undefined }));
  }
  function move(next: number) { setStep(next); setErrors({}); setFeedback(''); requestAnimationFrame(() => heading.current?.focus()); }
  function validate(next: number) {
    const result = validateInquiry(fields);
    const found = next === 1 ? Object.fromEntries(Object.entries(result.errors).filter(([key]) => (projectKeys as readonly string[]).includes(key))) : result.errors;
    if (configuration && Object.keys(configurationErrors(configuration, materials.map(item => item.id))).length) found.configuration = 'Please revisit the configurator to check your dimensions.';
    if (Object.values(found).some(Boolean)) { setErrors(found); requestAnimationFrame(() => errorBox.current?.focus()); return; }
    journey.setFields(result.fields); move(next);
  }
  function submit(event: FormEvent) { event.preventDefault(); if (step < 2) validate(step + 1); }
  const text = () => buildInquiryText(fields, configuration, materialTitle, reference, files.map(file => file.name));
  async function copy() {
    try { await navigator.clipboard.writeText(text()); trackBespoke({ name: 'brief_exported', method: 'copy' }); setFeedback('Copied to your clipboard. Your inquiry has not been sent.'); }
    catch { setFeedback('Clipboard access is unavailable. Download your brief instead.'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([text()], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'SH-MARBLES-bespoke-inquiry.txt'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    trackBespoke({ name: 'brief_exported', method: 'download' });
    setFeedback('Brief downloaded. It has not been sent. Attach the original reference files separately when sharing.');
  }
  async function selectFiles(selected: File[]) {
    const requestId = ++checkId.current; setChecking(true); setFileError('');
    try { const error = await validateReferenceFiles(selected); if (requestId !== checkId.current) return; if (error) setFileError(error); else journey.setFiles(selected); }
    catch { if (requestId === checkId.current) setFileError('This file could not be read. Please choose it again.'); }
    finally { if (requestId === checkId.current) setChecking(false); }
  }
  function field(key: TextKey, label: string, options?: readonly string[], type = 'text', required = false, maxLength = 160) {
    const props = { id: `inquiry-${key}`, name: key, value: fields[key], required, 'aria-invalid': !!errors[key], 'aria-describedby': errors[key] ? `inquiry-error-${key}` : undefined, onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setField(key, event.target.value) };
    return <div className={`field field-${key}`} key={key}><label htmlFor={props.id}>{label}{required ? ' *' : <span> · optional</span>}</label>{options ? <select {...props}>{options.map(option => <option key={option}>{option}</option>)}</select> : key === 'message' ? <textarea {...props} rows={5} maxLength={2500} /> : <input {...props} type={type} maxLength={maxLength} inputMode={key === 'quantity' ? 'numeric' : undefined} autoComplete={({ name: 'name', company: 'organization', email: 'email', phone: 'tel', country: 'country-name', destination: 'address-level2' } as Record<string, string>)[key] ?? 'off'} />}{errors[key] && <p className="field-error" id={`inquiry-error-${key}`}>{errors[key]}</p>}</div>;
  }
  return <div className="inquiry-layout"><aside className="inquiry-aside"><p className="eyebrow">A considered beginning</p><h2>A few details.<br /><em>A clearer vision.</em></h2><p>Begin with what you know. A drawing, a colour, a room that needs one final piece.</p><div className="draft-notice"><strong>Draft mode</strong><p>Online sending is not connected. Prepare and download a brief to keep. SH MARBLES will not receive it through this preview.</p></div>{configuration ? <div className="configuration-summary"><p className="eyebrow">From the design table</p>{configurationLines(configuration, materialTitle).slice(0, -1).map(line => <p key={line}>{line}</p>)}<Link className="text-link" href="/bespoke/configure">Edit configuration <Arrow /></Link><button type="button" className="quiet-button" onClick={() => journey.setConfiguration(null)}>Remove configuration</button></div> : <Link href="/bespoke/configure" className="text-link">Try the configurator<Arrow /></Link>}{Object.values(reference).some(Boolean) && <div className="configuration-summary"><p className="eyebrow">Your collection reference</p>{Object.entries(reference).map(([key, value]) => value && <p key={key}>{value}</p>)}<button type="button" className="quiet-button" onClick={() => journey.setReference({})}>Remove reference</button></div>}<p className="fine-print">Your draft and selected files stay in this tab’s memory. Reloading or closing the tab clears them. They are not saved to a server.</p></aside>
    <form className="inquiry-form" noValidate onSubmit={submit}><ol className="journey-steps">{['Project', 'Contact', 'Review'].map((label, index) => <li aria-current={step === index ? 'step' : undefined} key={label}><span>0{index + 1}</span>{label}</li>)}</ol><h2 ref={heading} tabIndex={-1}>{['Tell us about the piece.', 'Place it in context.', 'Your brief, gathered.'][step]}</h2><p className="muted">{step === 2 ? 'Review your preferences before keeping a copy.' : 'Fields marked * are required to prepare your brief.'}</p>
      {Object.values(errors).some(Boolean) && <div ref={errorBox} tabIndex={-1} className="error-summary" role="alert"><strong>Please check these details.</strong><ul>{Object.entries(errors).filter(([, value]) => value).map(([key, value]) => <li key={key}>{key === 'configuration' ? <Link href="/bespoke/configure">{value}</Link> : <a href={`#inquiry-${key}`}>{value}</a>}</li>)}</ul></div>}
      {step === 0 && <><div className="form-grid">{field('interest', 'Product interest', interests, 'text', true)}{field('sector', 'Project setting', sectors)}{field('quantity', 'Quantity', undefined, 'text', true, 5)}{field('dimensions', 'Dimensions / additional requirements')}{field('material', 'Preferred material', undefined, 'text', false, 240)}{field('timeline', 'Desired project timeline', timelines)}{field('budget', 'Budget preference', budgets)}{field('currency', 'Budget currency', currencies)}</div><p className="fine-print">Budget and timeline are your preferences, not a quote or delivery promise.</p>{field('message', 'Your idea', undefined, 'text', true)}<div className="reference-picker"><label htmlFor="reference-files">Reference images or drawings <span>· optional</span></label><p id="reference-help" className="fine-print">Up to 3 JPEG, PNG, WebP or PDF files. 5 MB each, 10 MB total. Files are selected locally and are not uploaded. Selecting again replaces this list.</p><input id="reference-files" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" multiple aria-describedby="reference-help reference-feedback" aria-invalid={!!fileError} onChange={event => { const selected = Array.from(event.target.files ?? []); event.target.value = ''; void selectFiles(selected); }} /><p id="reference-feedback" role="status" className={fileError ? 'field-error' : 'fine-print'}>{checking ? 'Checking files…' : fileError}</p><ul className="reference-list">{files.map((file, index) => <li key={`${file.name}-${index}`}><span>{file.name}<small>{Math.max(1, Math.round(file.size / 1024))} KB · selected locally</small></span><button type="button" aria-label={`Remove ${file.name}`} onClick={() => journey.setFiles(previous => previous.filter((_, i) => i !== index))}>Remove</button></li>)}</ul></div></>}
      {step === 1 && <><div className="form-grid">{field('name', 'Name', undefined, 'text', true, 120)}{field('company', 'Company')}{field('country', 'Project country', undefined, 'text', true, 100)}{field('destination', 'Delivery city / area', undefined, 'text', true, 240)}</div><p className="contact-hint">Provide at least one contact method for your exported brief.</p><div className="form-grid">{field('email', 'Email', undefined, 'email', false, 254)}{field('phone', 'Phone / WhatsApp', undefined, 'tel', false, 40)}</div><div className="honeypot" aria-hidden="true"><label htmlFor="inquiry-website">Website</label><input id="inquiry-website" tabIndex={-1} autoComplete="off" value={fields.website} onChange={event => setField('website', event.target.value)} /></div><label className="consent-field"><input id="inquiry-consent" type="checkbox" checked={fields.consent} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} onChange={event => { journey.setFields(previous => ({ ...previous, consent: event.target.checked })); setErrors(previous => ({ ...previous, consent: undefined })); }} /><span>I understand that this is a local draft. Downloading or copying it includes my contact details and does not send an inquiry.</span></label>{errors.consent && <p id="consent-error" className="field-error">{errors.consent}</p>}</>}
      {step === 2 && <><div className="brief-review"><section><h3>The project</h3><dl>{[['Interest', fields.interest], ['Setting', fields.sector], ['Quantity', fields.quantity], ['Dimensions / requirements', fields.dimensions || 'To discuss'], ['Material direction', fields.material || 'To discuss'], ['Budget preference', `${fields.budget}${!['Not decided', 'Prefer to discuss'].includes(fields.budget) ? ` ${fields.currency}` : ''}`], ['Desired timeline', fields.timeline]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section><section><h3>Contact &amp; destination</h3><dl>{[['Name', fields.name], ['Company', fields.company || '—'], ['Email', fields.email || '—'], ['Phone / WhatsApp', fields.phone || '—'], ['Country', fields.country], ['Delivery city / area', fields.destination]].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section><section><h3>Your notes</h3><p className="review-notes">{fields.message}</p></section>{configuration && <section><h3>The form study</h3>{configurationLines(configuration, materialTitle).map(line => <p key={line}>{line}</p>)}</section>}<section><h3>References</h3>{Object.entries(reference).map(([key, value]) => value && <p key={key}>{value}</p>)}{files.length ? <ul>{files.map((file, index) => <li key={index}>{file.name}</li>)}</ul> : <p>No files selected.</p>}<p className="fine-print">Reference files are not embedded in the download. Attach the originals separately.</p></section><p className="fine-print">This brief has not been sent. No order has been placed. Pricing, materials, feasibility and delivery require confirmation.</p></div><div className="draft-notice"><strong>Ready to keep. Not yet sent.</strong><p>Your download contains the written brief and reference filenames. Original images and drawings must be attached separately when you share it.</p></div><div className="button-row"><button className="button" type="button" onClick={download}>Download my brief<Arrow /></button><button className="button button-outline" type="button" onClick={copy}>Copy brief</button></div><p role="status" className="brief-status">{feedback}</p></>}
      <div className="builder-actions">{step > 0 && <button className="text-link" type="button" onClick={() => move(step - 1)}>← {step === 2 ? 'Edit contact details' : 'Back to project'}</button>}{step < 2 && <button className="button" type="submit" disabled={checking}>{step === 0 ? 'Continue to contact' : 'Review my brief'}<Arrow /></button>}{step === 2 && <button className="text-link" type="button" onClick={() => move(0)}>Edit project</button>}</div>
      <div className="reset-draft">{!confirmReset ? <button type="button" className="quiet-button" onClick={() => setConfirmReset(true)}>Clear this draft</button> : <><p>Clear all fields, configuration and selected files?</p><button className="quiet-button" type="button" onClick={() => { checkId.current++; journey.reset(); setChecking(false); setFileError(''); setConfirmReset(false); move(0); }}>Yes, clear draft</button><button className="quiet-button" type="button" onClick={() => setConfirmReset(false)}>Keep editing</button></>}</div>
    </form></div>;
}
