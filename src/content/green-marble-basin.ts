import type { Product } from './catalogue-models';

/** Owner-supplied product details, price and three images, 18 October 2026. */
export const greenMarbleBasin: Product = {
  id: 'green-marble-vessel-sink', slug: 'green-marble-vessel-sink',
  title: 'Green Marble Vessel Sink',
  fullTitle: 'Green Marble Vessel Sink 18"x14" | Hand Carved Stone Basin | Luxury Farmhouse Bathroom Vanity Bowl | 5.5" Deep',
  category: 'basins', collection: 'basins', subcategory: 'Vessel sinks',
  price: { amount: 48000, currency: 'PKR' },
  stone: 'Natural Green Marble', materialStudyId: null, finish: 'Hand-polished',
  dimensions: { length: 18, width: 14, depth: 5.5, unit: 'in' }, weightKg: null,
  description: 'Bring natural luxury into your bathroom or powder room with this stunning handcrafted green marble vessel sink. Each basin is carved from solid natural stone, showcasing unique veining and rich green tones—no two pieces are ever the same.',
  detailStory: 'Perfect for modern, farmhouse, or luxury interiors, this sink becomes the centerpiece of any vanity. Its smooth polished finish and deep bowl design make it both beautiful and practical for everyday use.',
  form: 'Vessel basin', character: 'Rich green tones · unique natural veining',
  installation: 'Vessel / above counter', installationNotes: 'Drain hole: standard size.',
  style: 'Modern / Farmhouse / Luxury',
  variationNote: 'Each basin is carved from natural stone with unique veining and rich green tones. No two pieces are ever the same.',
  images: [
    { src: '/products/green-marble/bathroom.jpeg', alt: 'Hand-carved green marble vessel sink beneath a rectangular mirror in a modern bathroom', caption: 'Bathroom setting', position: '50% 62%' },
    { src: '/products/green-marble/farmhouse.jpeg', alt: 'Green marble basin with natural veining on a farmhouse-style bathroom vanity', caption: 'Farmhouse vanity setting', position: '50% 60%' },
    { src: '/products/green-marble/interior.jpeg', alt: 'Angled view of the green marble vessel basin showing its hand-polished bowl and drain opening', caption: 'Bowl and interior', position: '50% 60%' },
  ],
  featured: true, customizable: null,
  customizationNotes: 'For different dimensions or finishes, include your requirements in a project brief for studio confirmation.',
  leadTime: null,
  shippingInformation: 'Every sink is carefully packed for safe international shipping. You will receive the exact quality as shown in the pictures.',
  craftsmanship: 'Hand-carved from solid natural green marble with a smooth hand-polished finish.',
  applications: ['Bathrooms', 'Powder rooms', 'Bathroom vanities', 'Modern interiors', 'Farmhouse interiors', 'Luxury interiors'],
  availability: 'unconfirmed', contentStatus: 'verified',
  seo: { title: 'Green Marble Vessel Sink — 18 × 14 Inches', description: 'Hand-carved natural green marble vessel sink, 18 inches long, 14 inches wide and 5.5 inches deep. Hand-polished finish. PKR 48,000.' },
};
