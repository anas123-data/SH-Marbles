import type { Product } from './catalogue-models';

/** Owner-supplied product, three diameter prices and three images, 18 October 2026. */
export const travertineBasin: Product = {
  id: 'travertine-stone-vessel-sink', slug: 'travertine-stone-vessel-sink',
  title: 'Travertine Stone Vessel Sink',
  fullTitle: '16 Inch Round Travertine Stone Vessel Sink | Handmade Natural Travertine Bathroom Vanity Bowl | Modern Luxury Wash Basin',
  category: 'basins', collection: 'basins', subcategory: 'Vessel sinks',
  variants: [
    { id: '12-inch', dimensions: { diameter: 12, unit: 'in' }, price: { amount: 26000, currency: 'PKR' } },
    { id: '14-inch', dimensions: { diameter: 14, unit: 'in' }, price: { amount: 30000, currency: 'PKR' } },
    { id: '16-inch', dimensions: { diameter: 16, unit: 'in' }, price: { amount: 34000, currency: 'PKR' } },
  ],
  stone: 'Natural Travertine', materialStudyId: null,
  finish: 'Polished interior, natural stone exterior', dimensions: null, weightKg: null,
  description: 'Bring timeless elegance to your bathroom or vanity space with this handcrafted Travertine stone vessel sink. Made from 100% natural travertine, each piece features unique veining and soft earthy tones, making every sink truly one of a kind.',
  detailStory: 'Designed in a modern round shape, this sink blends perfectly with contemporary, minimalist, and luxury washroom interiors. Its smooth polished interior ensures easy cleaning, while the natural stone exterior adds a warm, organic touch.',
  form: 'Round vessel sink', character: 'Soft earthy tones · unique natural veining',
  installation: 'Countertop / vanity top', style: 'Modern / Minimalist / Luxury Bathroom',
  features: ['Handmade by skilled artisans', 'Durable & long-lasting natural stone', 'Unique color & veining — no two pieces are the same', 'Perfect for modern bathrooms, powder rooms & luxury vanities'],
  variationNote: 'As this is a natural stone product, slight variations in color, texture, and pattern are normal and part of its beauty.',
  images: [
    { src: '/products/travertine/bathroom.jpeg', alt: 'Round natural travertine vessel sink on a light bathroom vanity beneath a circular mirror', caption: 'Bathroom setting', position: '50% 60%' },
    { src: '/products/travertine/front.jpeg', alt: 'Front view of the round travertine stone basin showing its angled exterior and earthy tones', caption: 'Front view', position: '50% 60%' },
    { src: '/products/travertine/interior.jpeg', alt: 'Angled view of the travertine wash basin showing the smooth interior and drain opening', caption: 'Bowl and interior', position: '50% 55%' },
  ],
  featured: true, customizable: null,
  customizationNotes: 'Choose a 12-inch, 14-inch or 16-inch diameter. Confirm height and any other dimensions or finish requests with the studio.',
  leadTime: null, shippingInformation: null,
  craftsmanship: 'Handmade by skilled artisans from 100% natural travertine, with a smooth polished interior and natural stone exterior.',
  applications: ['Modern bathrooms', 'Powder rooms', 'Luxury vanities', 'Contemporary interiors', 'Minimalist interiors'],
  availability: 'unconfirmed', contentStatus: 'verified',
  seo: { title: 'Travertine Stone Vessel Sink — 12, 14 & 16 Inches', description: 'Handmade natural travertine round vessel sink. Choose 12 inches at PKR 26,000, 14 at PKR 30,000 or 16 at PKR 34,000. Polished interior.' },
};
