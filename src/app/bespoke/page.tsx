import Image from 'next/image';
import Link from 'next/link';
import { catalogueMetadata } from '@/content/metadata';
import { Arrow } from '@/components/ui';
import { Breadcrumbs } from '@/components/catalogue-ui';

export const metadata = catalogueMetadata({ title: 'Bespoke — Made for Your Space', description: 'Begin a bespoke marble furniture or basin project with SH MARBLES. Explore form, colour and proportions, then prepare a personal project brief.' }, { path: '/bespoke' });
const process = [
  ['The idea', 'Bring a sketch, a photograph or simply the dimensions of your space.'],
  ['The stone', 'Explore colour and character. Request confirmation of stone identity, sourcing and a physical sample.'],
  ['The proportions', 'Review measurements, intended use and the relationship to the surrounding space.'],
  ['The design', 'Agree on drawings, edge profiles, construction and the scope before proceeding.'],
  ['The making', 'Confirm fabrication methods, finishing requirements and the production schedule with the studio.'],
  ['The review', 'Agree on the inspection criteria and review the finished piece against the confirmed brief.'],
  ['The destination', 'Discuss packing, delivery access and any installation needs for your location.'],
];
export default function BespokePage() {
  return <main id="main"><div className="shell"><Breadcrumbs items={[{ label: 'Bespoke' }]} /><section className="bespoke-hero"><div><p className="eyebrow">Bespoke / A more personal expression</p><h1>Made for<br /><em>your space.</em></h1><p>A particular corner. A daily ritual. An idea that doesn’t fit a catalogue. Give it a form of its own.</p><Link className="button" href="/bespoke/configure">Begin with a form<Arrow /></Link><Link className="text-link" href="/bespoke/inquiry">Already have an idea? Start a brief<Arrow /></Link></div><figure><Image src="/media/table-bedroom.webp" alt="Sculptural dark veined stone side table in a softly lit bedroom" fill sizes="(max-width: 767px) 90vw, 50vw" preload /><figcaption>Form reference / From the supplied collection imagery</figcaption></figure></section>
      <section className="bespoke-introduction section-space"><p className="eyebrow">The starting point is yours</p><h2>Not every idea<br />begins with <em>a drawing.</em></h2><p>Start with the feeling of a room, the colour of a surface, or the way you want to use a piece. Our brief builder brings those thoughts together, ready for a considered conversation.</p></section>
      <section className="process-section" aria-labelledby="process-title"><div><p className="eyebrow">From a thought to a brief</p><h2 id="process-title">A shared<br /><em>process.</em></h2><p>A proposed path for your project. Scope, material, feasibility, timing and delivery are agreed individually with the studio.</p></div><ol className="process-timeline">{process.map(([title, description], index) => <li key={title}><span className="eyebrow">0{index + 1}</span><div><h3>{title}</h3><p>{description}</p></div></li>)}</ol></section>
      <section className="design-table-callout"><div><p className="eyebrow">The design table</p><h2>Try a shape.<br />Find a proportion.</h2></div><div><p>A lightweight drawing tool for a first conversation. Explore tables, consoles and basins with colour directions from the Stone Library.</p><Link href="/bespoke/configure" className="button">Open the configurator<Arrow /></Link><p className="fine-print">Indicative outlines only. Every specification remains subject to review.</p></div></section>
      <section className="bespoke-faq section-space" aria-labelledby="before-title"><p className="eyebrow">Before you begin</p><h2 id="before-title">Room for questions.</h2>{[['What should I prepare?', 'A rough size, the intended setting, a delivery city and any inspiration you would like to share. An unfinished idea is a useful beginning.'], ['Can I choose a particular stone?', 'You can record a preferred stone or select a colour study. The visual studies are not verified stone specifications or stock records. Confirm the actual material and sample with SH MARBLES.'], ['Will the builder provide a price?', 'No. Dimensions and design choices create a starting brief. Pricing, feasibility and delivery require an individual review.'], ['How do I send my project?', 'Online delivery is not connected in this preview. You can prepare, copy and download your brief. No inquiry is sent and no order is placed.']].map(([title, body]) => <details key={title}><summary>{title}<span aria-hidden="true">+</span></summary><p>{body}</p></details>)}</section></div></main>;
}
