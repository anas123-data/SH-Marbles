import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from '@/components/ui';
import { ProjectButton } from '@/components/project-dialog';
import { CollectionExplorer } from '@/components/collection-explorer';
import { MaterialStudy } from '@/components/material-study';

export default function Home() {
  return <main id="main" className="cinema-home">
    <section className="cinema-hero" aria-labelledby="hero-title">
      <div className="cinema-hero-image"><Image src="/media/black-basin.webp" alt="Black stone basin with pale mineral veins and a deeply fluted exterior" fill sizes="(max-width: 767px) 100vw, 78vw" quality={85} preload fetchPriority="high" /></div>
      <div className="cinema-hero-shade" aria-hidden="true" />
      <div className="cinema-hero-copy"><p className="eyebrow">SH MARBLES / Objects of permanence</p><h1 id="hero-title">Stone.<br />With<br /><span>presence.</span></h1><p className="cinema-hero-description">Expressive marble. Sculptural forms.<br />A different kind of everyday.</p><Link href="/collections" className="cinema-primary">Enter the collection<Arrow diagonal={false} /></Link></div>
      <div className="cinema-hero-bottom"><a href="#perspective" className="cinema-scroll"><span aria-hidden="true">↓</span>Discover the atelier</a><Link href="/products/fluted-round-basin" className="cinema-feature-caption"><span className="eyebrow">In focus / 01</span><span>The fluted basin<Arrow /></span></Link></div>
    </section>

    <section id="perspective" className="cinema-manifesto shell" aria-labelledby="perspective-title"><p className="eyebrow">Nature makes no duplicates.</p><div><h2 id="perspective-title">Some things belong<br />in a room. Others<br /><em>define it.</em></h2><div className="cinema-manifesto-foot"><span className="cinema-seal" aria-hidden="true">SH<span>STONE ATELIER</span></span><p>The quiet weight of a table. The curve of a basin. A vein that finds its own way across the surface. Stone brings something to a space that can’t be repeated.</p></div></div></section>

    <section id="collections" className="collections shell section-space" aria-labelledby="collections-title"><div className="cinema-section-top"><div><p className="eyebrow">01 / The collection</p><h2 id="collections-title">Form meets feeling.</h2></div><Link className="text-link" href="/collections">View all pieces<Arrow /></Link></div><CollectionExplorer /></section>

    <section id="material" className="material-section" aria-label="Explore the character of stone"><MaterialStudy /></section>

    <section id="bespoke" className="cinema-bespoke shell" aria-labelledby="bespoke-title"><div className="cinema-bespoke-top"><p className="eyebrow">03 / A personal commission</p><Link className="text-link" href="/bespoke/configure">Try the design table<Arrow /></Link></div><div className="cinema-bespoke-grid"><div className="cinema-bespoke-image"><Image src="/media/table-bedroom.webp" alt="Dark veined side table beside a softly upholstered bed" fill sizes="(max-width: 767px) 90vw, 45vw" quality={85} /><span>Form study / The side table</span></div><div className="cinema-bespoke-copy"><h2>Yours.<br /><em>In every<br />dimension.</em></h2><p>A particular proportion. A colour you keep returning to. A space that calls for something entirely its own.</p><Link href="/bespoke" className="cinema-primary">Begin a bespoke piece<Arrow diagonal={false} /></Link><ol className="cinema-process"><li><span>01</span>Bring your idea</li><li><span>02</span>Explore stone &amp; proportion</li><li><span>03</span>Shape a brief together</li></ol></div></div></section>

    <section id="craft" className="cinema-detail" aria-labelledby="craft-title"><div className="cinema-detail-image"><Image src="/media/fluted-basin.webp" alt="Close view of a burgundy-toned stone basin, showing its veins and carved vertical lines" fill sizes="100vw" quality={85} /></div><div className="cinema-detail-copy"><p className="eyebrow">04 / A closer appreciation</p><h2 id="craft-title">The detail<br />is the <em>difference.</em></h2><p>Follow an edge. Trace a vein. See how the light changes a familiar form.</p><ProjectButton className="text-link">Discuss your piece</ProjectButton></div><span className="cinema-detail-label">Photographic detail / From the collection imagery</span></section>

    <section id="trade" className="cinema-trade shell" aria-labelledby="trade-title"><p className="eyebrow">For architects &amp; designers</p><h2 id="trade-title">A shared vision.<br />A singular space.</h2><div><p>Bring your drawings, material palette and project requirements. Let’s give your ideas a considered starting point.</p><ProjectButton className="text-link" interest="An architectural / trade project">Plan a project together</ProjectButton></div></section>

    <section id="project" className="cinema-invitation shell" aria-labelledby="project-title"><p className="eyebrow">An idea is enough to begin.</p><h2 id="project-title">Let’s make<br /><em>it matter.</em></h2><ProjectButton className="cinema-primary">Start a conversation</ProjectButton><p className="fine-print">Prepare a project brief. Online sending is not connected yet.</p></section>
  </main>;
}
