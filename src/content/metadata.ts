import type { Metadata } from 'next';
import type { SeoRecord } from './catalogue-models';
import { absoluteUrl, privatePaths, site } from './site-config';

export function catalogueMetadata(seo: SeoRecord, options:{path:string;image?:string;imageAlt?:string}): Metadata {
  const title = `${seo.title} — SH MARBLES`;
  const canonical=absoluteUrl(options.path);
  const image=absoluteUrl(options.image??'/social/sh-marbles.png');
  const indexable=site.indexable&&!privatePaths.some(path=>path===options.path);
  return { title, description: seo.description, alternates:canonical?{canonical}:{},
    robots:{index:indexable,follow:site.indexable},
    openGraph: { title, description: seo.description, siteName: 'SH MARBLES', type: 'website',locale:'en',url:canonical,images:image?[{url:image,alt:options.imageAlt??'SH MARBLES — Stone, given purpose.'}]:[] },
    twitter: { title, description: seo.description, card: 'summary_large_image',images:image?[{url:image,alt:options.imageAlt??'SH MARBLES — Stone, given purpose.'}]:[] },
  };
}
