/** Content contracts for later application implementation; not runtime validation. */
export type Id = string;
export type Category = 'tables' | 'basins' | 'objects' | 'architectural';
export type PublicationState = 'draft' | 'verified' | 'published';
export type Availability = 'unknown' | 'on-inquiry' | 'made-to-order' | 'in-stock' | 'unavailable';
export type Application = 'indoor' | 'outdoor' | 'wet-area';

export interface ImageAsset {
  id: Id;
  src: string;
  width: number;
  height: number;
  alt: string;
  focalPoint: { x: number; y: number }; // normalized 0..1
  origin: 'photograph' | 'render' | 'unknown';
  rights: 'review-only' | 'cleared';
  sourceFile: string;
  caption?: string;
}
export interface Seo {
  title: string;
  description: string;
  ogImageId: Id | null;
  indexable: boolean;
}
export interface Dimensions {
  unit: 'mm';
  length: number | null;
  width: number | null;
  height: number | null;
  diameter: number | null;
}
export interface Product {
  id: Id;
  slug: string;
  title: string;
  category: Category;
  collection: Id;
  stone: Id[];
  finish: string[];
  dimensions: Dimensions | null;
  weightKg: number | null;
  description: string;
  images: ImageAsset[];
  featured: boolean;
  customizable: boolean | null;
  configurationRuleId: Id | null;
  leadTime: string | null; // approved wording, never inferred
  shippingInformation: string | null;
  craftsmanship: string | null;
  applications: Application[];
  availability: Availability;
  publicationState: PublicationState;
  seo: Seo;
}
export interface Collection {
  id: Id;
  slug: string;
  title: string;
  description: string;
  productIds: Id[];
  image: ImageAsset | null;
  publicationState: PublicationState;
  seo: Seo;
}
export interface Material {
  id: Id;
  slug: string;
  tradeName: string;
  stoneFamily: string | null;
  origin: {country: string; region: string | null; evidence: string} | null;
  visualCharacteristics: string;
  veinStyle: string | null;
  tone: 'light' | 'warm' | 'dark' | 'coloured';
  images: ImageAsset[];
  finishes: string[];
  approvedApplications: Application[];
  applicationEvidence: string | null;
  variationNote: string;
  care: string | null;
  availability: Availability;
  publicationState: PublicationState;
  seo: Seo;
}
export interface Project {
  id: Id;
  slug: string;
  title: string;
  sector: 'residential' | 'hospitality' | 'commercial';
  location: string | null;
  story: string;
  productIds: Id[];
  materialIds: Id[];
  images: ImageAsset[];
  installationVerified: boolean;
  clientPermission: boolean;
  publicationState: PublicationState;
  seo: Seo;
}
export type ProductType = 'dining-table' | 'coffee-table' | 'console' | 'sink';
export type Shape = 'rectangle' | 'round' | 'oval' | 'organic';
export type Edge = 'straight' | 'bevel' | 'bullnose' | 'waterfall';
export interface ConfigurationRule {
  id: Id;
  productType: ProductType;
  allowedCombinations: {shape: Shape; edges: Edge[]; materialIds: Id[]}[];
  limits: Partial<Record<keyof Omit<Dimensions, 'unit'>, {min: number; max: number}>>;
  approvedByStudio: boolean;
}
export interface ConfigurationBrief {
  version: 1;
  productType: ProductType;
  productId: Id | null;
  materialId: Id | null;
  shape: Shape | null;
  edge: Edge | null;
  dimensions: Dimensions;
  feasibility: 'unreviewed'; // cannot be promoted by client/model
}
export interface InquiryDraft {
  name: string;
  company: string | null;
  country: string;
  email: string | null;
  phone: string | null;
  productInterest: string;
  projectSector: 'residential' | 'commercial' | 'undecided';
  productId: Id | null;
  dimensions: Dimensions | null;
  quantity: number | null;
  materialId: Id | null;
  budget: {rangeId: string; currency: string} | null;
  timeline: string | null;
  deliveryLocation: string;
  message: string;
  uploadIds: Id[]; // quarantined private storage IDs, never public paths
  configuration: ConfigurationBrief | null;
  privacyNoticeVersion: string;
  marketingOptIn: boolean;
}
export interface Lead extends InquiryDraft {
  id: Id;
  receivedAt: string;
  qualification: {score: number; reasons: string[]; rulesVersion: string};
  notificationState: 'pending' | 'sent' | 'retry';
}
export interface ContentRepository {
  listProducts(category?: Category): Promise<readonly Product[]>;
  getProduct(slug: string): Promise<Product | null>;
  listCollections(): Promise<readonly Collection[]>;
  listMaterials(): Promise<readonly Material[]>;
  getMaterial(slug: string): Promise<Material | null>;
  listProjects(): Promise<readonly Project[]>;
}
export interface LeadRepository {
  create(draft: InquiryDraft, idempotencyKey: string): Promise<{receiptId: Id}>;
}
export type AnalyticsEvent =
  | {name: 'whatsapp_clicked'; route: string; productId?: Id}
  | {name: 'inquiry_started'; source: 'contact' | 'product' | 'bespoke' | 'trade'}
  | {name: 'inquiry_submitted'; eventId: string; source: string}
  | {name: 'product_viewed'; productId: Id; category: Category}
  | {name: 'marble_selected'; materialId: Id; source: string}
  | {name: 'bespoke_clicked'; source: string}
  | {name: 'trade_inquiry'; stage: 'started' | 'submitted'}
  | {name: 'configurator_completed'; productType: ProductType; materialId: Id | null};
export interface AnalyticsAdapter {track(event: AnalyticsEvent): void}
export interface ConciergeBrief {
  intent: string;
  style: string | null;
  colours: string[];
  dimensions: Dimensions | null;
  setting: Application | null;
  budget: InquiryDraft['budget'];
  country: string | null;
}
export interface ConciergeResult {
  mode: 'grounded-suggestions' | 'studio-referral';
  productIds: Id[];
  materialIds: Id[];
  groundedReasons: {recordId: Id; field: string; explanation: string}[];
  questionsForStudio: string[];
  // No freeform price, stock, shipping promise or unsupported specification fields.
}
export interface ConciergeProvider {
  suggest(brief: ConciergeBrief, approvedCatalogue: {products: readonly Product[]; materials: readonly Material[]}): Promise<ConciergeResult>;
}
