import type { Product } from './catalogue-models';

/** Owner-supplied thirteenth basin, size prices and imagery, 18 October 2026. */
export const blackMarbleBasin: Product = {
  id: 'black-marble-vessel-sink', slug: 'black-marble-vessel-sink',
  title: 'Black Marble Vessel Sink',
  fullTitle: 'Black Marble Vessel Sink – Round Bathroom Vanity Basin – Deep Handcrafted Natural Stone Wash Basin – Luxury Modern Countertop Sink',
  category: 'basins', collection: 'basins', subcategory: 'Vessel sinks',
  variants: [
    { id: '12-inch', dimensions: { diameter: 12, depth: 5.5, unit: 'in' }, price: { amount: 25000, currency: 'PKR' } },
    { id: '14-inch', dimensions: { diameter: 14, depth: 5.5, unit: 'in' }, price: { amount: 33000, currency: 'PKR' } },
    { id: '16-inch', dimensions: { diameter: 16, depth: 5.5, unit: 'in' }, price: { amount: 40000, currency: 'PKR' } },
  ],
  stone: '100% Natural Marble', materialStudyId: null,
  finish: 'Polished', dimensions: null, weightKg: null,
  description: 'Upgrade your bathroom with this stunning round black marble vessel sink, beautifully handcrafted from premium natural stone. Featuring striking white and warm gold veining, each piece is truly one of a kind.',
  detailStory: 'Its smooth polished finish and 5.5-inch depth provide both elegance and practicality, making it perfect for modern, luxury, or contemporary bathrooms. Available in 12, 14 and 16-inch diameters.',
  form: 'Round vessel sink', character: 'Black marble · white and warm gold veining',
  installation: 'Countertop / vessel style', installationNotes: 'Standard-size drain hole.',
  style: 'Modern / Luxury / Contemporary',
  features: ['Handcrafted from premium natural stone', 'Unique white and warm gold veining', 'Smooth polished finish', '5.5-inch deep bowl'],
  variationNote: 'Because this sink is carved from natural marble, every piece has unique veining patterns — no two sinks are exactly alike.',
  images: [
    { src: '/products/black-marble/bathroom.jpeg', alt: 'Round black marble vessel sink with white and gold veining beneath a round bathroom mirror', caption: 'Bathroom setting', position: '50% 62%' },
    { src: '/products/black-marble/interior.jpeg', alt: 'Polished black marble basin showing its deep round bowl and natural white and gold veins', caption: 'Bowl and interior', position: '50% 62%' },
    { src: '/products/black-marble/countertop.jpeg', alt: 'Handcrafted black marble vessel basin on a light stone countertop in a rustic interior', caption: 'Countertop setting', position: '50% 62%' },
  ],
  featured: true, customizable: true,
  customizationNotes: 'Choose a 12, 14 or 16-inch diameter basin, each 5.5 inches deep. Contact the studio for bulk orders or custom sizes.',
  leadTime: null, shippingInformation: 'We carefully pack and ship to ensure safe delivery.',
  craftsmanship: 'Beautifully handcrafted and carved from premium natural marble with a polished finish.',
  applications: ['Modern bathrooms', 'Luxury vanities', 'Powder rooms', 'Hotel interiors', 'Spa-style interiors'],
  availability: 'unconfirmed', contentStatus: 'verified',
  seo: { title: 'Black Marble Vessel Sink — 12, 14 & 16 Inches', description: 'Handcrafted round black marble vessel basin with white and gold veins, 5.5 inches deep. 12-inch PKR 25,000, 14-inch PKR 33,000, 16-inch PKR 40,000.' },
};
