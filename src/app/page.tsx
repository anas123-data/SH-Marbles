import Image from 'next/image';
import { Header } from '@/components/header';
import { Arrow, SectionHeading, TextLink, Wordmark } from '@/components/ui';
import { ProjectButton, ProjectProvider } from '@/components/project-dialog';
import { CollectionExplorer } from '@/components/collection-explorer';
import { MaterialStudy } from '@/components/material-study';

export default function Home() {
  return <ProjectProvider>
    <a href="#main" className="skip-link">Skip to content</a>
    <div id="home"><Header /></div>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow hero-kicker">Natural character. Considered form.</p><h1 id="hero-title">Stone,<br /><span>given purpose.</span></h1><p className="hero-description">Marble tables, basins and objects.<br />Shaped for the way you live.</p><div className="hero-actions"><a className="button" href="#collections">Explore the collection<Arrow /></a><ProjectButton className="hero-secondary">Commission a piece</ProjectButton></div><div className="hero-index"><span>01 — The art of everyday living</span><a href="#perspective" aria-label="Scroll to our perspective">Scroll to discover<span aria-hidden="true">↓</span></a></div></div>
        <div className="hero-visual"><Image src="/media/table-bedroom.webp" alt="A dark veined marble side table in a warm, light-filled bedroom" fill sizes="(max-width: 767px) 100vw, 53vw" quality={75} preload fetchPriority="high" /><div className="hero-photo-label"><span>SH / FORM STUDIES</span><span>The side table</span></div><div className="hero-vertical" aria-hidden="true">The Stone Atelier</div></div>
      </section>
      <div className="category-strip shell" aria-label="Our focus"><span>Made to be lived with.</span><p>Tables <i /> Basins <i /> Objects <i /> Bespoke</p></div>

      <section id="perspective" className="perspective shell section-space" aria-labelledby="perspective-title"><p className="eyebrow"><span className="section-number">01</span>Our perspective</p><div><h2 id="perspective-title">Not simply an object.<br />A little more <em>character.</em><br />A different way to live.</h2><div className="perspective-bottom"><span className="tiny-mark" aria-hidden="true">SH</span><p>Stone brings its own story to a room. We see possibility in its contrasts: weight and lightness, quiet forms and expressive surfaces. Pieces that feel as considered as the spaces around them.</p></div></div></section>

      <section id="collections" className="collections shell section-space" aria-labelledby="collections-title"><SectionHeading number="02" label="The collection" title={<>For the spaces<br />you make your own.</>} id="collections-title"><p>From the centre of a room to its smallest detail. Explore three expressions of stone.</p><TextLink href="#piece-study">Take a closer look</TextLink></SectionHeading><CollectionExplorer /></section>

      <section id="material" className="material-section" aria-label="Explore the character of stone"><MaterialStudy /></section>

      <section id="bespoke" className="bespoke shell section-space" aria-labelledby="bespoke-title"><div className="bespoke-intro"><p className="eyebrow"><span className="section-number">04</span>A personal commission</p><h2 id="bespoke-title">Some ideas<br />need their <em>own form.</em></h2><p className="muted">A particular proportion. A place that calls for something different. Begin with the space, and let the piece take shape around it.</p><ProjectButton>Start a bespoke project</ProjectButton></div><div className="bespoke-right"><div className="bespoke-image"><Image src="/media/warm-basin.webp" alt="Warm pale stone basin with softly rounded proportions" fill sizes="(max-width: 767px) 90vw, 42vw" quality={85} /><span className="image-caption">An idea, shaped around you.</span></div><ol className="bespoke-steps"><li><span>01</span><div><h3>Bring the idea.</h3><p>A sketch, a reference, or simply a feeling.</p></div></li><li><span>02</span><div><h3>Consider the details.</h3><p>Stone, dimensions, finish and the way it will be used.</p></div></li><li><span>03</span><div><h3>Define the piece.</h3><p>A clear brief to discuss with the studio.</p></div></li></ol></div></section>

      <section id="craft" className="craft-section" aria-labelledby="craft-title"><div className="craft-picture"><Image src="/media/workshop-basin.webp" alt="Supplied workshop photograph of a green stone basin with a fluted edge" fill sizes="(max-width: 767px) 100vw, 54vw" quality={85} /></div><div className="craft-copy"><p className="eyebrow">05 / From material to form</p><h2 id="craft-title">The difference<br />is in <em>the detail.</em></h2><p>Follow the line of an edge. The meeting of two surfaces. The way light finds a curve. These are the details that give an object its presence.</p><div className="craft-values"><span>Form</span><span>Surface</span><span>Finish</span></div><ProjectButton className="text-link">Discuss your piece</ProjectButton></div></section>

      <section id="trade" className="trade-section shell" aria-labelledby="trade-title"><p className="eyebrow">For architects &amp; designers</p><h2 id="trade-title">A shared eye<br />for the considered space.</h2><div><p className="muted">Bring your project drawings, material direction and quantities. Give your vision a clear starting point.</p><ProjectButton className="text-link" interest="An architectural / trade project">Plan a project together</ProjectButton></div></section>

      <section id="project" className="project-section shell" aria-labelledby="project-title"><p className="eyebrow">Have a piece in mind?</p><h2 id="project-title">Let’s shape it<br /><em>in stone.</em></h2><ProjectButton className="project-link">Start a conversation</ProjectButton><p className="project-note">Begin with a project brief. Keep your ideas in one place.</p></section>
    </main>
    <footer className="site-footer shell"><div className="footer-top"><a href="#home" className="brand-link"><Wordmark /></a><p>Natural character.<br />Considered form.<br />Everyday living.</p><nav aria-label="Footer collection links"><p className="eyebrow">Explore</p><a href="#collections">The collection</a><a href="#material">The material</a><a href="#bespoke">Bespoke</a></nav><nav aria-label="Footer studio links"><p className="eyebrow">The atelier</p><a href="#perspective">Our perspective</a><a href="#craft">The details</a><a href="#trade">Architects &amp; designers</a><a href="#project">Start a project</a></nav></div><div className="footer-bottom"><p>© SH MARBLES</p><a href="#home">Back to top ↑</a><span>Stone, given purpose.</span></div><p className="preview-note">Homepage preview · Supplied imagery is under review. Product specifications, image provenance and contact details are awaiting confirmation. Project briefs are saved by you, not submitted online.</p></footer>
  </ProjectProvider>;
}
