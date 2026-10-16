import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './catalogue.css';
import './bespoke.css';
import './cinema.css';
import { JourneyProvider } from '@/features/bespoke/journey-provider';
import { ProjectProvider } from '@/components/project-dialog';
import { Header } from '@/components/header';
import { Footer } from '@/components/site-footer';

const editorial = localFont({ src: '../../design-system/assets/cormorant-garamond.woff2', variable: '--font-editorial', weight: '300 700', display: 'swap' });
const sans = localFont({ src: '../../design-system/assets/manrope.woff2', variable: '--font-interface', weight: '200 800', display: 'swap' });

export const metadata: Metadata = {
  title: 'SH MARBLES — Stone, given purpose.',
  description: 'Explore marble tables, sculptural basins, stone objects and bespoke ideas from SH MARBLES. A considered approach to form, material and everyday living.',
  robots: { index: false, follow: false },
  openGraph: { title: 'SH MARBLES — Stone, given purpose.', description: 'Marble tables, basins and objects. Shaped for the way you live.', type: 'website', locale: 'en', siteName: 'SH MARBLES' },
  twitter: { card: 'summary_large_image', title: 'SH MARBLES — Stone, given purpose.' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${editorial.variable} ${sans.variable}`}><body><JourneyProvider><ProjectProvider><a href="#main" className="skip-link">Skip to content</a><div id="top"><Header /></div>{children}<Footer /></ProjectProvider></JourneyProvider></body></html>;
}
