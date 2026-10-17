import type { Product } from './catalogue-models';

/** Owner-supplied product details, price and images, 18 October 2026. */
export const luxuryOnyxBasin: Product = {
  id: 'luxury-onyx-vessel-sink', slug: 'luxury-onyx-vessel-sink',
  title: 'Luxury Onyx Vessel Sink',
  fullTitle: 'Luxury Onyx Vessel Sink 18”x14” Handmade Bathroom Sink | Natural Stone Wash Basin | Modern Vanity Bowl | Unique Marble Sink',
  category: 'basins', collection: 'basins', subcategory: 'Vessel sinks',
  price: { amount: 50000, currency: 'PKR' },
  stone: 'Natural Onyx Stone', materialStudyId: null,
  finish: 'Hand-carved and polished',
  dimensions: { length: 18, width: 14, height: 5, unit: 'in' }, weightKg: null,
  description: 'Upgrade your space with this stunning handmade onyx vessel sink, crafted from premium natural stone. Each piece features unique natural patterns in warm cream and golden tones, making every sink truly one of a kind.',
  detailStory: 'Perfect for modern bathrooms, powder rooms, or luxury interiors, this sink adds an elegant and timeless touch to any vanity. This elegant sink is perfect for homeowners, interior designers, or anyone looking to create a luxurious and modern bathroom look.',
  form: 'Vessel sink', character: 'Warm cream and golden tones · unique natural patterns',
  installation: 'Countertop / vessel style',
  installationNotes: 'Compatible with standard drain fittings.',
  careInstructions: ['Clean with mild soap and a soft cloth.', 'Avoid harsh chemicals to maintain shine.'],
  features: ['100% natural onyx stone', 'Hand-carved and polished finish', 'Unique color variations — no two pieces are the same', 'Smooth inner surface for easy cleaning', 'Durable and long-lasting'],
  variationNote: 'Each natural onyx sink has unique color variations and patterns. No two pieces are the same.',
  images: [
    { src: '/products/luxury-onyx/bathroom.jpeg', alt: 'Polished cream and golden onyx vessel sink beneath a black wall-mounted tap', caption: 'Bathroom setting', position: '50% 60%' },
    { src: '/products/luxury-onyx/interior.jpeg', alt: 'Interior view of the handmade onyx vessel sink showing warm golden natural patterns', caption: 'Bowl and polished interior', position: '50% 55%' },
    { src: '/products/luxury-onyx/overhead.jpeg', alt: 'Overhead view of the cream onyx wash basin with its smooth bowl and drain opening', caption: 'View from above', position: '50% 50%' },
  ],
  featured: true, customizable: null,
  customizationNotes: 'For other dimensions or finishes, include your requirements in a project brief for studio confirmation.',
  leadTime: null, shippingInformation: null,
  craftsmanship: 'Hand-carved from 100% natural onyx stone and polished, with a smooth inner surface for easy cleaning.',
  applications: ['Modern bathrooms', 'Powder rooms', 'Luxury interiors', 'Bathroom vanities'],
  availability: 'unconfirmed', contentStatus: 'verified',
  seo: { title: 'Luxury Onyx Vessel Sink — 18 × 14 × 5 Inches', description: 'Handmade natural onyx vessel sink in warm cream and golden tones. Hand-carved and polished, 18 × 14 × 5 inches. PKR 50,000 from SH MARBLES.' },
};
