import type { Product } from './catalogue-models';

/** Owner-supplied product, prices and imagery. Height remains 5 / 6 inches without size mapping. */
export const roundTravertineBasin: Product = {
  id: 'round-travertine-vessel-sink', slug: 'round-travertine-vessel-sink',
  title: 'Round Travertine Vessel Sink',
  fullTitle: '16” Round Travertine Vessel Sink | Natural Stone Bathroom Sink | Handmade Marble Basin | 6” Height Modern Countertop Sink | Luxury Vanity Bowl',
  category: 'basins', collection: 'basins', subcategory: 'Vessel sinks',
  variants: [
    { id: '12-inch', dimensions: { diameter: 12, unit: 'in' }, price: { amount: 22000, currency: 'PKR' } },
    { id: '14-inch', dimensions: { diameter: 14, unit: 'in' }, price: { amount: 26000, currency: 'PKR' } },
    { id: '16-inch', dimensions: { diameter: 16, unit: 'in' }, price: { amount: 30000, currency: 'PKR' } },
  ],
  dimensionNotes: 'Height: 5 / 6 inches. Confirm the height for your chosen diameter with the studio.',
  stone: 'Natural Travertine Stone', materialStudyId: null,
  finish: 'Smooth, polished interior with natural exterior texture', dimensions: null, weightKg: null,
  description: 'Upgrade your space with this beautifully handcrafted travertine vessel sink, designed to bring a natural and luxurious touch to your bathroom or kitchen. Made from premium quality natural stone, each piece features unique textures and warm earthy tones that make every sink one of a kind.',
  detailStory: 'This elegant stone sink is perfect for modern, farmhouse, or minimalist interiors. Its durable construction ensures long-lasting performance while adding a timeless aesthetic to your vanity space. Perfect for homeowners, interior designers, or anyone looking to add a high-end natural stone feature to their home.',
  form: 'Round vessel sink', character: 'Warm earthy tones · natural exterior texture',
  installation: 'Countertop / vessel style', style: 'Modern / Farmhouse / Minimalist',
  variationNote: 'Each natural stone sink features unique textures and warm earthy tones, making every piece one of a kind.',
  images: [
    { src: '/products/round-travertine/bathroom.jpeg', alt: 'Round warm-toned travertine vessel sink on a white bathroom vanity with a brass tap', caption: 'Bathroom setting', position: '50% 60%' },
    { src: '/products/round-travertine/front.jpeg', alt: 'Front view of the round travertine bowl showing its natural textured exterior', caption: 'Front view', position: '50% 60%' },
    { src: '/products/round-travertine/countertop.jpeg', alt: 'Round travertine vessel basin in a bright kitchen countertop setting', caption: 'Countertop setting', position: '50% 60%' },
  ],
  featured: true, customizable: null,
  customizationNotes: 'Choose a 12-inch, 14-inch or 16-inch diameter. Height is listed as 5 / 6 inches; confirm the height for your chosen diameter with the studio.',
  leadTime: null, shippingInformation: null,
  craftsmanship: 'Handcrafted from natural travertine stone, with a smooth polished interior and a naturally textured exterior.',
  applications: ['Bathrooms', 'Kitchens', 'Vanity spaces', 'Modern interiors', 'Farmhouse interiors', 'Minimalist interiors'],
  availability: 'unconfirmed', contentStatus: 'verified',
  seo: { title: 'Round Travertine Vessel Sink — 12, 14 & 16 Inches', description: 'Handmade natural travertine vessel bowl with a polished interior and textured exterior. 12-inch PKR 22,000, 14-inch PKR 26,000, 16-inch PKR 30,000.' },
};
