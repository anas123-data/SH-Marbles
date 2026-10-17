import type { Metadata } from 'next';
import { catalogueMetadata } from '@/content/metadata';
import Image from 'next/image';
import Link from 'next/link';
import { catalogue } from '@/content/catalogue';
import { Arrow, SectionHeading } from '@/components/ui';
import { Breadcrumbs, StudyNotice } from '@/components/catalogue-ui';
import { ProductBrowser } from '@/components/product-browser';
import { ProjectInvitation } from '@/components/site-footer';
import { ProjectButton } from '@/components/project-dialog';

export const metadata: Metadata = catalogueMetadata({ title: 'The Collections', description: 'Explore marble table, basin and decorative object studies. Discover a form, consider the material and begin a personal project with SH MARBLES.' }, { path: '/collections' });

export default async function CollectionsPage() {
  const [collections, products] = await Promise.all([catalogue.listCollections(), catalogue.listProducts()]);
  return <main id="main"><div className="shell"><Breadcrumbs items={[{ label: 'Collections' }]} /><header className="catalogue-heading"><p className="eyebrow">The collections / 01—03</p><div><h1>Forms to<br /><em>live with.</em></h1><p>For the centre of a room. For its quiet corners.<br />Discover the many expressions of stone.</p></div></header><div className="collection-editorial">{collections.map((collection, index) => <Link href={`/collections/${collection.id}`} className={`editorial-collection editorial-${collection.id}`} key={collection.id}><div className="editorial-collection-image"><Image src={collection.image.src} alt={collection.image.alt} fill sizes="(max-width: 767px) 90vw, 31vw" preload={index === 0} style={{ objectPosition: collection.image.position }} /><span className="eyebrow">0{index + 1} / The collection</span></div><div className="editorial-collection-name"><h2>{collection.title}</h2><Arrow /></div><p>{collection.subtitle}</p></Link>)}</div><section className="catalogue-pieces section-space" aria-labelledby="pieces-title"><SectionHeading number="01" label="The form studies" title={<>A closer look.</>} id="pieces-title"><p>Find a silhouette that speaks to your space. Each study is a starting point for a more personal piece.</p></SectionHeading><StudyNotice /><ProductBrowser products={products} showCategories /></section><section className="bespoke-ribbon"><div><p className="eyebrow">Beyond the collection</p><h2>A form of your own.</h2></div><div><p>Have a different proportion in mind? Bring a sketch, a reference or the dimensions of your space.</p><ProjectButton className="text-link">Begin a bespoke brief</ProjectButton></div></section></div><ProjectInvitation /></main>;
}
