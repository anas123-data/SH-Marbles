import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import type { CatalogueImage } from '@/content/catalogue-models';
import { Breadcrumbs } from './catalogue-ui';
import { Arrow } from './ui';

export function StudioShell({ children, title, parent }: { children: ReactNode; title: string; parent?: { label: string; href: string } }) {
  return <main id="main" className="studio-page"><div className="shell"><Breadcrumbs items={[...(parent ? [parent] : []), { label: title }]} /></div>{children}</main>;
}
export function StudioFigure({ image, className = '', priority = false, caption, sizes = '(max-width: 767px) 90vw, 48vw' }: { image: Omit<CatalogueImage, 'caption'> & { caption?: string }; className?: string; priority?: boolean; caption?: string; sizes?: string }) {
  return <figure className={`studio-figure ${className}`}><Image src={image.src} alt={image.alt} fill sizes={sizes} preload={priority} style={{ objectPosition: image.position }} />{(caption || image.caption) && <figcaption>{caption ?? image.caption}</figcaption>}</figure>;
}
export function StudioClosing({ eyebrow = 'A starting point, made personal.', title = <>Give your idea<br /><em>a place in stone.</em></>, href = '/bespoke/inquiry', label = 'Prepare a project brief' }: { eyebrow?: string; title?: ReactNode; href?: string; label?: string }) {
  return <section className="studio-closing shell"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><Link href={href} className="cinema-primary">{label}<Arrow /></Link></section>;
}
