'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Arrow } from './ui';
import { useRouter } from 'next/navigation';
import { useJourney } from '@/features/bespoke/journey-provider';

export interface BriefContext { piece?: string; material?: string; intent?: string }
const ProjectContext = createContext<(interest?: string, context?: BriefContext) => void>(() => {});

export function ProjectButton({ children = 'Start a project', interest = 'A bespoke piece', className = 'button', context }: { children?: ReactNode; interest?: string; className?: string; context?: BriefContext }) {
  const open = useContext(ProjectContext);
  return <button type="button" className={className} onClick={() => open(interest, context)}>{children}<Arrow /></button>;
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const journey = useJourney();
  const router = useRouter();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [interest, setInterest] = useState('A bespoke piece');
  const [space, setSpace] = useState('');
  const [details, setDetails] = useState('');
  const [feedback, setFeedback] = useState('');
  const [briefContext, setBriefContext] = useState<BriefContext>({});
  const openProject = useCallback((value = 'A bespoke piece', context: BriefContext = {}) => {
    trigger.current = document.activeElement as HTMLElement;
    setInterest(value); setBriefContext(context); setFeedback(''); setOpen(true);
    dialog.current?.showModal();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const close = () => dialog.current?.close();
  function continueInquiry() {
    journey.setReference(briefContext);
    journey.setFields(previous => ({ ...previous, interest, ...(space.trim() ? { destination: space.trim() } : {}), ...(details.trim() ? { message: details.trim() } : {}), ...(briefContext.material ? { material: briefContext.material } : {}) }));
    close();
    router.push('/bespoke/inquiry');
  }
  const summary = () => `SH MARBLES — Project brief\n\nPiece: ${interest}\n${briefContext.piece ? `Reference piece: ${briefContext.piece}\n` : ''}${briefContext.material ? `Material direction: ${briefContext.material}\n` : ''}${briefContext.intent ? `Purpose: ${briefContext.intent}\n` : ''}Space / destination: ${space.trim() || 'To discuss'}\nDetails: ${details.trim() || 'To discuss'}\n\nA starting brief only. Materials, specifications, pricing and delivery require confirmation.\nThis brief has not been submitted.`;
  async function copy() {
    try { await navigator.clipboard.writeText(summary()); setFeedback('Brief copied. It has not been sent to SH MARBLES.'); }
    catch { setFeedback('Copy is unavailable in this browser. Use Download brief instead.'); }
  }
  function download() {
    const url = URL.createObjectURL(new Blob([summary()], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'SH-MARBLES-project-brief.txt'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback('Brief downloaded. It has not been sent to SH MARBLES.');
  }
  return <ProjectContext.Provider value={openProject}>{children}
    <dialog ref={dialog} className="project-dialog" aria-labelledby="project-dialog-title" aria-describedby="project-dialog-description" onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={event => { if (event.target === dialog.current) close(); }}>
      <div className="dialog-content">
        <div className="dialog-top"><p className="eyebrow">A conversation starts here</p><button type="button" className="icon-button" onClick={close} aria-label="Close project brief">×</button></div>
        <h2 id="project-dialog-title">Your space.<br />Your starting point.</h2>
        <p id="project-dialog-description" className="muted">Gather a few thoughts for your piece. In this preview, you can keep a copy of your brief. Online inquiries are not connected yet.</p>
        <form onSubmit={event => { event.preventDefault(); download(); }} className="brief-form">
          {(briefContext.piece || briefContext.material || briefContext.intent) && <div className="brief-context"><p className="eyebrow">Your reference</p>{briefContext.piece && <p>{briefContext.piece}</p>}{briefContext.material && <p>Material direction: {briefContext.material}</p>}{briefContext.intent && <p>{briefContext.intent}</p>}<button type="button" onClick={() => setBriefContext({})}>Remove reference</button></div>}
          <div className="field"><label htmlFor="brief-interest">What do you have in mind?</label><select id="brief-interest" value={interest} onChange={event => setInterest(event.target.value)}><option>A bespoke piece</option><option>A marble table</option><option>A marble basin</option><option>A stone object</option><option>An architectural / trade project</option></select></div>
          <div className="field"><label htmlFor="brief-space">The space or destination <span>(optional)</span></label><input id="brief-space" value={space} onChange={event => setSpace(event.target.value)} placeholder="A living room in Lahore, a hotel in Dubai…" maxLength={180} autoComplete="off" /></div>
          <div className="field"><label htmlFor="brief-details">A few details <span>(optional)</span></label><textarea id="brief-details" value={details} onChange={event => setDetails(event.target.value)} placeholder="Dimensions, colours, quantity, or an idea you would like to explore." maxLength={1500} rows={4} /></div>
          <p className="fine-print">No contact details are needed here. Your text stays in this page unless you copy or download it; it is cleared when you reload.</p>
          <div className="button-row"><button type="submit" className="button">Download brief<Arrow /></button><button type="button" onClick={copy} className="button button-outline">Copy brief</button></div>
          <p className="brief-status" role="status">{feedback}</p>
          <button type="button" className="text-link" onClick={continueInquiry}>Continue to detailed brief<Arrow /></button>
        </form>
      </div>
    </dialog>
  </ProjectContext.Provider>;
}
