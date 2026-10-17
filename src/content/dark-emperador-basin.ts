import type { Product } from './catalogue-models';

/** Owner-supplied product, size-specific prices and three images, 18 October 2026. */
export const darkEmperadorBasin: Product = {
  id: 'dark-emperador-marble-sink',
  slug: 'dark-emperador-marble-sink',
  title: 'Dark Emperador Marble Sink',
  fullTitle: 'Dark Emperador Marble Sink – Fluted Stone Vessel Sink – Handmade Modern Bathroom Vanity Sink – Brown Marble Wash Basin – 16x12x5.5 Inch',
  category: 'basins', collection: 'basins', subcategory: 'Vessel sinks',
  variants: [
    { id: '16x12', dimensions: { length: 16, width: 12, height: 5.5, unit: 'in' }, price: { amount: 38000, currency: 'PKR' } },
    { id: '18x14', dimensions: { length: 18, width: 14, height: 5.5, unit: 'in' }, price: { amount: 50000, currency: 'PKR' } },
  ],
  stone: 'Natural Dark Emperador Marble', materialStudyId: null,
  finish: 'Polished interior & hand-carved fluted exterior',
  dimensions: null, weightKg: null,
  description: 'Bring a luxury spa-style look to your bathroom with this handcrafted Dark Emperador marble sink. Featuring a unique fluted exterior design and rich brown marble veining, this natural stone vessel sink adds warmth and elegance to any modern bathroom interior.',
  detailStory: 'Each sink is handmade from genuine Dark Emperador marble, making every piece one of a kind with natural variations in texture and veining. The modern fluted design brings the character of brown marble to bathroom vanity spaces, luxury interiors and spa-inspired rooms.',
  form: 'Rectangular vessel sink', character: 'Rich brown marble · natural veining · fluted exterior',
  installation: 'Countertop vessel sink', style: 'Modern / Luxury / Minimalist',
  features: ['Handmade stone sink', 'Premium luxury marble', 'Modern fluted design', 'Durable and long-lasting', 'Perfect for bathroom vanity spaces', 'Unique natural marble patterns'],
  variationNote: 'Because this sink is made from natural marble, each piece will have unique veining and color variations, making every sink truly one of a kind.',
  images: [
    { src: '/products/dark-emperador/bathroom.jpeg', alt: 'Dark Emperador rectangular marble sink with a hand-carved fluted exterior beneath a bathroom mirror', caption: 'Bathroom setting', position: '50% 65%' },
    { src: '/products/dark-emperador/front.jpeg', alt: 'Front view of the dark brown fluted marble vessel sink with fine natural veins', caption: 'Front view', position: '50% 65%' },
    { src: '/products/dark-emperador/countertop.jpeg', alt: 'Dark Emperador marble vessel sink shown on a stone countertop beside a black tap', caption: 'Countertop setting', position: '50% 65%' },
  ],
  featured: true, customizable: null,
  customizationNotes: 'Choose from the two listed sizes. For other dimensions or finishes, include your requirements in a project brief for studio confirmation.',
  leadTime: null, shippingInformation: null,
  craftsmanship: 'Handmade from natural Dark Emperador marble, with a polished interior and hand-carved fluted exterior. A durable, long-lasting stone sink with unique natural marble patterns.',
  applications: ['Modern bathrooms', 'Luxury interiors', 'Spa-inspired spaces', 'Hotel vanities', 'Powder rooms', 'Designer homes'],
  availability: 'unconfirmed', contentStatus: 'verified',
  seo: { title: 'Dark Emperador Marble Sink — Two Sizes', description: 'Handmade fluted Dark Emperador marble vessel sink. 16 × 12 × 5.5 inches for PKR 38,000 or 18 × 14 × 5.5 inches for PKR 50,000.' },
};
