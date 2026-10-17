import Image from 'next/image';
import Link from 'next/link';
import type { Material, Product } from '@/content/catalogue-models';
import { Arrow } from './ui';

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb"><ol itemScope itemType="https://schema.org/BreadcrumbList">{[{label:'Home',href:'/'},...items].map((item,index)=><li key={`${item.label}-${index}`} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">{item.href?<Link href={item.href} itemProp="item"><span itemProp="name">{item.label}</span></Link>:<span itemProp="name" aria-current="page">{item.label}</span>}<meta itemProp="position" content={String(index+1)}/></li>)}</ol></nav>;
}

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return <article className="product-card"><Link href={`/products/${product.slug}`} className="product-card-link"><div className="product-card-image"><Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="(max-width: 599px) 90vw, (max-width: 1023px) 44vw, 29vw" style={{ objectPosition: product.images[0].position }} /><span className="card-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><span className="card-open" aria-hidden="true"><Arrow /></span></div><div className="product-card-copy"><p className="eyebrow">{product.category} / Form study</p><h3>{product.title}</h3><p>{product.character}</p></div></Link></article>;
}

export function SurfaceImage({ material, priority = false, sizes = '(max-width: 599px) 180vw, (max-width: 1023px) 88vw, 58vw' }: { material: Material; priority?: boolean; sizes?: string }) {
  return <div className={`surface-image surface-${material.slug}`}><Image src={material.image.src} alt={`Photographic surface study for ${material.title.toLowerCase()}: ${material.visualCharacteristics}`} fill sizes={sizes} quality={85} style={{ objectPosition: material.image.position }} preload={priority} /><span className="surface-caption">Photographic detail</span></div>;
}

export function Palette({ material }: { material: Material }) {
  return <span className="palette" role="img" aria-label={`Approximate colour palette for ${material.title}`}>{material.palette.map(colour => <span key={colour} style={{ background: colour }} />)}</span>;
}

export function StudyNotice({ children }: { children?: React.ReactNode }) {
  return <p className="study-notice"><span className="eyebrow">A starting point</span>{children ?? 'These are descriptive studies from supplied imagery. Exact stone, dimensions, finish and availability will be confirmed with the studio.'}</p>;
}
