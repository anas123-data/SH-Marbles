import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './catalogue.css';
import './bespoke.css';
import './cinema.css';
import './studio.css';
import './concierge.css';
import { ConciergeProvider } from '@/features/concierge/provider';
import { JourneyProvider } from '@/features/bespoke/journey-provider';
import { ProjectProvider } from '@/components/project-dialog';
import { Header } from '@/components/header';
import { Footer } from '@/components/site-footer';
import { catalogueMetadata } from '@/content/metadata';
import { site } from '@/content/site-config';
import { brandGraph } from '@/content/structured-data';
import { StructuredData } from '@/components/structured-data';

const editorial = localFont({ src: '../../design-system/assets/cormorant-garamond.woff2', variable: '--font-editorial', weight: '300 700', display: 'swap' });
const sans = localFont({ src: '../../design-system/assets/manrope.woff2', variable: '--font-interface', weight: '200 800', display: 'swap' });

export const metadata: Metadata = {
  ...catalogueMetadata({title:'Stone, given purpose.',description:'Explore marble tables, sculptural basins, stone objects and bespoke ideas from SH MARBLES. A considered approach to form, material and everyday living.'},{path:'/'}),
  ...(site.origin?{metadataBase:new URL(site.origin)}:{}),
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${editorial.variable} ${sans.variable}`}><body><StructuredData data={brandGraph(site.origin)}/><JourneyProvider><ConciergeProvider><ProjectProvider><a href="#main" className="skip-link">Skip to content</a><div id="top"><Header /></div>{children}<Footer /></ProjectProvider></ConciergeProvider></JourneyProvider></body></html>;
}
