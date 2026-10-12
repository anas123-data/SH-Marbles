import type { ReactNode } from 'react';

export function Arrow({ diagonal = true }: { diagonal?: boolean }) {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
export function Wordmark() { return <span className="wordmark">SH MARBLES<span className="wordmark-caption">THE STONE ATELIER</span></span>; }
export function SectionHeading({ number, label, title, children, id }: { number: string; label: string; title: ReactNode; children?: ReactNode; id?: string }) {
  return <div className="section-heading"><div><p className="eyebrow"><span className="section-number">{number}</span>{label}</p><h2 id={id}>{title}</h2></div>{children ? <div className="section-intro">{children}</div> : null}</div>;
}
export function TextLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a href={href} className={`text-link ${className}`}>{children}<Arrow /></a>;
}
