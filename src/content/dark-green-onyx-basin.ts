import type { Product } from './catalogue-models';

/** Owner-supplied product, three diameter prices and three images, 18 October 2026. */
export const darkGreenOnyxBasin: Product = {
  id: 'dark-green-onyx-vessel-sink', slug: 'dark-green-onyx-vessel-sink',
  title: 'Dark Green Onyx Vessel Sink',
  fullTitle: 'Dark Green Onyx Vessel Sink 16” Round – Luxury Marble Bathroom Sink, Natural Stone Wash Basin, Modern Vanity Sink, Handmade Onyx Sink',
  category: 'basins', collection: 'basins', subcategory: 'Vessel sinks',
  variants: [
    { id: '12-inch', dimensions: { diameter: 12, height: 5.5, unit: 'in' }, price: { amount: 24000, currency: 'PKR' } },
    { id: '14-inch', dimensions: { diameter: 14, height: 5.5, unit: 'in' }, price: { amount: 30000, currency: 'PKR' } },
    { id: '16-inch', dimensions: { diameter: 16, height: 5.5, unit: 'in' }, price: { amount: 38000, currency: 'PKR' } },
  ],
  stone: '100% Natural Dark Green Onyx', materialStudyId: null,
  finish: 'Polished', dimensions: null, weightKg: null,
  description: 'Upgrade your bathroom with this stunning handcrafted Dark Green Onyx vessel sink, designed to bring luxury and elegance to any modern or classic space. Each sink is carved from natural onyx stone, showcasing unique green tones with beautiful earthy veining—making every piece truly one of a kind.',
  detailStory: 'Perfect for luxury bathrooms, modern vanities, or farmhouse-inspired interiors, this round sink adds a premium look with its smooth polished finish and durable structure. This sink is ideal for homeowners, interior designers, and architects looking to create a high-end, spa-like bathroom experience.',
  form: 'Round vessel sink', character: 'Green tones · earthy natural veining',
  installation: 'Countertop / vessel', style: 'Modern / Classic / Farmhouse-inspired',
  features: ['Unique natural stone patterns — no two pieces are the same', 'Premium craftsmanship & durable material', 'Perfect for luxury and modern interiors', 'Easy to clean and maintain'],
  variationNote: 'Due to the natural stone, slight variations in color and pattern make your sink exclusive and unique.',
  images: [
    { src: '/products/dark-green-onyx/bathroom.jpeg', alt: 'Round dark green onyx vessel sink with earthy veining beneath a circular bathroom mirror', caption: 'Bathroom setting', position: '50% 62%' },
    { src: '/products/dark-green-onyx/front.jpeg', alt: 'Front view of the polished green onyx round basin showing layered natural stone patterns', caption: 'Front view', position: '50% 60%' },
    { src: '/products/dark-green-onyx/vanity.jpeg', alt: 'Dark green onyx vessel sink on a bathroom vanity beneath brass taps and a rectangular mirror', caption: 'Vanity setting', position: '50% 62%' },
  ],
  featured: true, customizable: null,
  customizationNotes: 'Choose a 12-inch, 14-inch or 16-inch diameter, all 5.5 inches high. Other dimensions or finishes require studio confirmation.',
  leadTime: null, shippingInformation: null,
  craftsmanship: 'Handcrafted and carved from 100% natural dark green onyx, with a smooth polished finish and unique earthy veining.',
  applications: ['Luxury bathrooms', 'Modern vanities', 'Farmhouse-inspired interiors', 'Spa-like bathrooms'],
  availability: 'unconfirmed', contentStatus: 'verified',
  seo: { title: 'Dark Green Onyx Vessel Sink — 12, 14 & 16 Inches', description: 'Handmade polished dark green onyx round basin, 5.5 inches high. Choose 12 inches at PKR 24,000, 14 at PKR 30,000 or 16 at PKR 38,000.' },
};
