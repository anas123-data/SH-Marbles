import Link from 'next/link';
import { Wordmark } from './ui';
import { ProjectButton } from './project-dialog';

export function ProjectInvitation() {
  return <section id="project" className="project-section shell" aria-labelledby="project-title"><p className="eyebrow">Have a piece in mind?</p><h2 id="project-title">Let’s shape it<br /><em>in stone.</em></h2><ProjectButton className="project-link">Start a conversation</ProjectButton><p className="project-note">Begin with a project brief. Keep your ideas in one place.</p></section>;
}

export function Footer() {
  return <footer className="site-footer shell"><div className="footer-top"><Link href="/" className="brand-link"><Wordmark /></Link><p>Natural character.<br />Considered form.<br />Everyday living.</p><nav aria-label="Footer collection links"><p className="eyebrow">Explore</p><Link href="/collections">Collections</Link><Link href="/collections/tables">Tables</Link><Link href="/collections/basins">Basins</Link><Link href="/collections/objects">Objects</Link><Link href="/stone-library">Stone Library</Link></nav><nav aria-label="Footer studio links"><p className="eyebrow">The atelier</p><Link href="/bespoke">Bespoke</Link><Link href="/concierge">Stone Concierge</Link><Link href="/projects">Projects / Lookbook</Link><Link href="/craftsmanship">Craftsmanship</Link><Link href="/about">About SH MARBLES</Link><Link href="/trade">Architects &amp; designers</Link><Link href="/contact">Contact</Link><Link href="/bespoke/inquiry">Start a project</Link></nav></div><div className="footer-bottom"><p>© SH MARBLES</p><a href="#top">Back to top ↑</a><span>Stone, given purpose.</span></div><p className="preview-note">Collection preview · Descriptive studies from supplied imagery. Official product names, stone identity, specifications and availability await confirmation. Briefs are kept by you and are not submitted online.</p></footer>;
}
