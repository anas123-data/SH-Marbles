import type { Metadata } from 'next';
import type { SeoRecord } from './catalogue-models';

/** Absolute canonicals/social-image URLs await the confirmed production domain. */
export function catalogueMetadata(seo: SeoRecord): Metadata {
  const title = `${seo.title} — SH MARBLES`;
  return { title, description: seo.description,
    openGraph: { title, description: seo.description, siteName: 'SH MARBLES', type: 'website' },
    twitter: { title, description: seo.description, card: 'summary_large_image' },
  };
}
