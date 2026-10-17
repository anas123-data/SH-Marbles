import type { Metadata } from 'next';
import { catalogueMetadata } from '@/content/metadata';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { catalogue } from '@/content/catalogue';
import { Breadcrumbs, StudyNotice } from '@/components/catalogue-ui';
import { ProductBrowser } from '@/components/product-browser';
import { ProjectButton } from '@/components/project-dialog';
import { ProjectInvitation } from '@/components/site-footer';

type Props = { params: Promise<{ category: string }> };
export async function generateStaticParams() { return (await catalogue.listCollections()).map(item => ({ category: item.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { const collection = await catalogue.getCollection((await params).category); return collection ? catalogueMetadata(collection.seo, { path: `/collections/${collection.id}`, image: collection.image.src, imageAlt: collection.image.alt }) : {}; }

export default async function CollectionPage({ params }: Props) {
  const collection = await catalogue.getCollection((await params).category);
  if (!collection) notFound();
  const [products, collections] = await Promise.all([catalogue.listProducts(collection.id), catalogue.listCollections()]);
  return <main id="main"><div className="shell"><Breadcrumbs items={[{ label: 'Collections', href: '/collections' }, { label: collection.title }]} /></div><section className="category-hero"><div className="category-hero-copy"><p className="eyebrow">The collection / {collection.title}</p><h1>{collection.title}<span>{collection.subtitle}</span></h1><p>{collection.description}</p><a href="#pieces" className="text-link">Explore the pieces <span aria-hidden="true">↓</span></a></div><div className="category-hero-image"><Image src={collection.image.src} alt={collection.image.alt} fill preload sizes="(max-width: 767px) 100vw, 55vw" style={{ objectPosition: collection.image.position }} /><span className="image-caption">The collection / {collection.title}</span></div></section><div className="shell"><nav className="category-nav" aria-label="Collections"><Link href="/collections">All collections</Link>{collections.map(item => <Link key={item.id} href={`/collections/${item.id}`} aria-current={item.id === collection.id ? 'page' : undefined}>{item.title}</Link>)}</nav><section className="category-intro"><p className="eyebrow">Form. Material. Presence.</p><h2>{collection.introduction}</h2></section><section id="pieces" className="category-pieces" aria-label={`${collection.title} pieces`}><StudyNotice>Product listings include the details supplied by the studio. Pieces labelled “Form study” are visual references with specifications still to be confirmed.</StudyNotice><ProductBrowser products={products} /></section><section className="bespoke-ribbon"><div><p className="eyebrow">A personal direction</p><h2>Considered for<br />your space.</h2></div><div><p>Use a study as a reference, then add your preferred dimensions, material direction and the way the piece will be used.</p><ProjectButton interest={collection.interest} className="text-link">Discuss a {collection.id === 'tables' ? 'table' : collection.id === 'basins' ? 'basin' : 'stone object'}</ProjectButton></div></section></div><ProjectInvitation /></main>;
}
