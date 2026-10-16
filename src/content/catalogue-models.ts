export type CategoryId = 'tables' | 'basins' | 'objects';
export type Tone = 'dark' | 'warm' | 'coloured';
export type Pattern = 'veined' | 'clouded' | 'mottled';

export interface CatalogueImage {
  src: string;
  alt: string;
  caption: string;
  position?: string;
  detail?: boolean;
}

export interface SeoRecord { title: string; description: string }

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: CategoryId;
  collection: CategoryId;
  stone: string | null;
  materialStudyId: string;
  finish: string | null;
  dimensions: { width: number; depth: number; height: number; unit: 'mm' } | null;
  weightKg: number | null;
  description: string;
  detailStory: string;
  form: string;
  character: string;
  images: CatalogueImage[];
  featured: boolean;
  customizable: boolean | null;
  customizationNotes: string;
  leadTime: string | null;
  shippingInformation: string | null;
  craftsmanship: string | null;
  applications: string[];
  availability: 'unconfirmed' | 'on-inquiry' | 'made-to-order';
  contentStatus: 'visual-study' | 'verified';
  seo: SeoRecord;
}

export interface Collection {
  id: CategoryId;
  title: string;
  subtitle: string;
  description: string;
  introduction: string;
  image: CatalogueImage;
  interest: string;
  seo: SeoRecord;
}

export interface Material {
  id: string;
  slug: string;
  title: string;
  tradeName: string | null;
  origin: { country: string; region: string | null; evidence: string } | null;
  stoneFamily: string | null;
  description: string;
  visualCharacteristics: string;
  veinStyle: string;
  tone: Tone;
  pattern: Pattern;
  palette: string[];
  image: CatalogueImage;
  finishes: string[];
  recommendedApplications: string[];
  applicationNote: string;
  variationNote: string;
  availability: 'unconfirmed' | 'on-inquiry';
  contentStatus: 'visual-study' | 'verified';
  seo: SeoRecord;
}

/** Replace this read boundary when approved CMS records become available. */
export interface CatalogueRepository {
  listCollections(): Promise<readonly Collection[]>;
  getCollection(id: string): Promise<Collection | undefined>;
  listProducts(category?: CategoryId): Promise<readonly Product[]>;
  getProduct(slug: string): Promise<Product | undefined>;
  listMaterials(): Promise<readonly Material[]>;
  getMaterial(slug: string): Promise<Material | undefined>;
}
