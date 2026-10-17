import type { Product } from './catalogue-models';

/** Owner-supplied basin details, two diameter prices and four images, 18 October 2026. */
export const ziaratWhiteBasin: Product = {
  id: 'ziarat-white-marble-vessel-sink', slug: 'ziarat-white-marble-vessel-sink',
  title: 'Ziarat White Marble Vessel Sink',
  fullTitle: 'Ziarat White Marble Vessel Sink – 16” Round Handmade Stone Basin – Luxury Bathroom Vanity Sink – Modern Washroom Bowl Sink',
  category: 'basins', collection: 'basins', subcategory: 'Vessel sinks',
  variants: [
    { id: '14-inch', dimensions: { diameter: 14, height: 4, unit: 'in' }, price: { amount: 32000, currency: 'PKR' } },
    { id: '16-inch', dimensions: { diameter: 16, height: 4, unit: 'in' }, price: { amount: 38000, currency: 'PKR' } },
  ],
  stone: 'Ziarat White Marble', materialStudyId: null, finish: 'Smooth polished', dimensions: null, weightKg: null,
  description: 'Bring timeless elegance to your space with this handcrafted Ziarat White Marble Vessel Sink. Carefully carved from natural stone, this round basin showcases beautiful soft white tones with subtle natural veining, making each piece truly one of a kind.',
  detailStory: 'Perfect for modern and luxury interiors, this sink adds a premium feel to any bathroom vanity. Its smooth polished finish and minimalist round shape make it ideal for contemporary, farmhouse, or spa-style designs. Each sink is handmade by skilled artisans, ensuring durability, uniqueness, and high-quality craftsmanship.',
  form: 'Round vessel sink', character: 'Soft white tones · subtle natural veining',
  installation: 'Countertop (vessel style)', style: 'Contemporary / Farmhouse / Spa-style',
  features: ['100% natural stone', 'Handmade & unique design', 'Durable & long lasting', 'Perfect for modern bathrooms', 'Luxury look at an affordable price'],
  variationNote: 'Due to natural stone, slight variations in color and veining make every piece unique.',
  images: [
    { src: '/products/ziarat-white/bathroom.jpeg', alt: 'Round Ziarat white marble vessel sink on a bathroom vanity below a circular mirror', caption: 'Bathroom setting', position: '50% 60%' },
    { src: '/products/ziarat-white/angle.jpeg', alt: 'Angled view of the round white marble wash basin showing its polished interior and soft veining', caption: 'Angled view', position: '50% 60%' },
    { src: '/products/ziarat-white/front.jpeg', alt: 'Front view of the Ziarat white marble vessel sink on a stone countertop', caption: 'Front view', position: '50% 65%' },
    { src: '/products/ziarat-white/styled.jpeg', alt: 'Ziarat white marble basin shown on a black stone pedestal in a styled setting', caption: 'Styled setting · pedestal not specified in this listing', position: '50% 55%' },
  ],
  featured: true, customizable: null,
  customizationNotes: 'Choose a 14-inch or 16-inch diameter, both 4 inches high. Other dimensions or finishes require studio confirmation.',
  leadTime: null, shippingInformation: null,
  craftsmanship: 'Handmade by skilled artisans and carefully carved from natural Ziarat White Marble, with a smooth polished finish.',
  applications: ['Bathroom vanities', 'Modern bathrooms', 'Luxury interiors', 'Contemporary interiors', 'Farmhouse interiors', 'Spa-style spaces'],
  availability: 'unconfirmed', contentStatus: 'verified',
  seo: { title: 'Ziarat White Marble Vessel Sink — 14 & 16 Inches', description: 'Handmade polished Ziarat white marble round basin, 4 inches high. 14-inch diameter for PKR 32,000 or 16-inch diameter for PKR 38,000.' },
};
