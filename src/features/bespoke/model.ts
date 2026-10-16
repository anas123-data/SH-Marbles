export type PieceType = 'dining-table' | 'coffee-table' | 'side-table' | 'console' | 'basin';
export type Shape = 'rectangle' | 'round' | 'oval' | 'organic';
export type Edge = 'straight' | 'bevel' | 'bullnose' | 'waterfall';

export interface Configuration {
  version: 1;
  type: PieceType;
  shape: Shape;
  edge: Edge;
  materialId: string | null;
  width: number | null;
  depth: number | null;
  height: number | null;
  unit: 'mm';
  feasibility: 'unreviewed';
}

export const pieceOptions: { id: PieceType; title: string; description: string; shapes: Shape[]; defaults: [number, number, number] }[] = [
  { id: 'dining-table', title: 'Dining table', description: 'A place to gather.', shapes: ['rectangle', 'round', 'oval'], defaults: [1800, 900, 750] },
  { id: 'coffee-table', title: 'Coffee table', description: 'The centre of a room.', shapes: ['rectangle', 'round', 'oval', 'organic'], defaults: [1100, 600, 400] },
  { id: 'side-table', title: 'Side table', description: 'A considered companion.', shapes: ['rectangle', 'round', 'oval'], defaults: [450, 450, 500] },
  { id: 'console', title: 'Console', description: 'A quiet architectural line.', shapes: ['rectangle', 'oval'], defaults: [1200, 350, 800] },
  { id: 'basin', title: 'Basin', description: 'A different daily ritual.', shapes: ['rectangle', 'round', 'oval'], defaults: [500, 400, 150] },
];

export const shapeLabels: Record<Shape, string> = { rectangle: 'Rectangle', round: 'Round', oval: 'Oval', organic: 'Organic' };
export const edgeLabels: Record<Edge, string> = { straight: 'Straight', bevel: 'Bevel', bullnose: 'Bullnose', waterfall: 'Waterfall' };

export function defaultConfiguration(type: PieceType = 'dining-table'): Configuration {
  const option = pieceOptions.find(item => item.id === type) ?? pieceOptions[0];
  const [width, depth, height] = option.defaults;
  return { version: 1, type: option.id, shape: 'rectangle', edge: 'straight', materialId: null, width, depth, height, unit: 'mm', feasibility: 'unreviewed' };
}

/** Builder choices only; these are not fabrication approvals. */
export function allowedEdges(type: PieceType, shape: Shape): Edge[] {
  if (type === 'basin') return ['straight', 'bullnose'];
  return type === 'console' && shape === 'rectangle' ? ['straight', 'bevel', 'bullnose', 'waterfall'] : ['straight', 'bevel', 'bullnose'];
}

export function changeType(config: Configuration, type: PieceType): Configuration {
  return { ...defaultConfiguration(type), materialId: config.materialId };
}

export function changeShape(config: Configuration, shape: Shape): Configuration {
  const permitted = pieceOptions.find(item => item.id === config.type)?.shapes ?? [];
  if (!permitted.includes(shape)) return config;
  return { ...config, shape, depth: shape === 'round' ? config.width : config.depth, edge: allowedEdges(config.type, shape).includes(config.edge) ? config.edge : 'straight' };
}

export function configurationErrors(value: unknown, materialIds: readonly string[]): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { configuration: 'Choose a piece to begin.' };
  const config = value as Record<string, unknown>;
  const errors: Record<string, string> = {};
  const option = pieceOptions.find(item => item.id === config.type);
  if (!option) errors.type = 'Choose a listed piece type.';
  if (!option?.shapes.includes(config.shape as Shape)) errors.shape = 'Choose a shape available in this brief builder.';
  if (!option || !allowedEdges(option.id, config.shape as Shape).includes(config.edge as Edge)) errors.edge = 'Choose an edge available for this form.';
  if (config.materialId !== null && (typeof config.materialId !== 'string' || !materialIds.includes(config.materialId))) errors.materialId = 'Choose a listed colour study or leave it undecided.';
  for (const name of ['width', 'depth', 'height'] as const) {
    const amount = config[name];
    const min = name === 'height' ? 50 : 100;
    const max = name === 'height' ? 2000 : 5000;
    if (typeof amount !== 'number' || !Number.isInteger(amount) || amount < min || amount > max) errors[name] = `Enter a whole number from ${min} to ${max} mm.`;
  }
  if (config.shape === 'round' && config.width !== config.depth) errors.depth = 'A round form uses the same diameter in both directions.';
  if (config.version !== 1 || config.unit !== 'mm' || config.feasibility !== 'unreviewed') errors.configuration = 'This configuration needs to be reviewed in the builder.';
  return errors;
}

export function configurationLines(config: Configuration, materialTitle: string) {
  return [
    `Piece type: ${pieceOptions.find(item => item.id === config.type)?.title ?? 'To discuss'}`,
    `Shape: ${shapeLabels[config.shape]}`,
    `Edge direction: ${edgeLabels[config.edge]}`,
    `Material direction: ${materialTitle}`,
    config.shape === 'round' ? `Diameter × height: ${config.width ?? '?'} × ${config.height ?? '?'} mm` : `Width × depth × height: ${config.width ?? '?'} × ${config.depth ?? '?'} × ${config.height ?? '?'} mm`,
    'Indicative brief only. Feasibility, stone, construction and all specifications require studio confirmation.',
  ];
}

export interface BriefReference { piece?: string; material?: string; intent?: string }
export interface InquiryFields {
  name: string; company: string; country: string; email: string; phone: string;
  interest: string; sector: string; dimensions: string; quantity: string;
  material: string; budget: string; currency: string; timeline: string;
  destination: string; message: string; website: string; consent: boolean;
}
export type InquiryErrors = Partial<Record<keyof InquiryFields | 'configuration' | 'references', string>>;
export const interests = ['A bespoke piece', 'A marble table', 'A marble basin', 'A stone object', 'An architectural / trade project'] as const;
export const sectors = ['Not decided', 'Residential', 'Hospitality', 'Commercial', 'Other'] as const;
export const budgets = ['Not decided', 'Under 1,000', '1,000–5,000', '5,000–15,000', '15,000–50,000', 'Over 50,000', 'Prefer to discuss'] as const;
export const currencies = ['USD', 'PKR', 'AED', 'SAR', 'QAR', 'GBP', 'EUR'] as const;
export const timelines = ['Not decided', 'Within 3 months', '3–6 months', '6–12 months', 'More than 12 months'] as const;
export function emptyInquiry(): InquiryFields {
  return { name: '', company: '', country: '', email: '', phone: '', interest: 'A bespoke piece', sector: 'Not decided', dimensions: '', quantity: '1', material: '', budget: 'Not decided', currency: 'USD', timeline: 'Not decided', destination: '', message: '', website: '', consent: false };
}

const limits: Record<Exclude<keyof InquiryFields, 'consent'>, number> = {
  name: 120, company: 160, country: 100, email: 254, phone: 40, interest: 80,
  sector: 40, dimensions: 160, quantity: 5, material: 240, budget: 80, currency: 3,
  timeline: 80, destination: 240, message: 2500, website: 160,
};
export function validateInquiry(value: unknown): { fields: InquiryFields; errors: InquiryErrors } {
  const fields = emptyInquiry();
  const errors: InquiryErrors = {};
  const raw = value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
  for (const key of Object.keys(limits) as (keyof typeof limits)[]) {
    if (typeof raw[key] !== 'string') { errors[key] = 'Enter a valid text value.'; continue; }
    const text = (raw[key] as string).trim();
    fields[key] = text;
    if (text.length > limits[key] || /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(text)) errors[key] = `Use at most ${limits[key]} characters without control characters.`;
  }
  fields.consent = raw.consent === true;
  if (!fields.name) errors.name = 'Enter your name.';
  if (!fields.country) errors.country = 'Enter the project country.';
  if (!fields.destination) errors.destination = 'Enter the delivery city or area.';
  if (!fields.email && !fields.phone) errors.email = 'Enter an email address or phone / WhatsApp number.';
  if (fields.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Enter a valid email address.';
  if (fields.phone && (!/^[+\d\s().-]+$/.test(fields.phone) || fields.phone.replace(/\D/g, '').length < 7 || fields.phone.replace(/\D/g, '').length > 15)) errors.phone = 'Use 7–15 digits, including the country code where possible.';
  if (!/^\d+$/.test(fields.quantity) || Number(fields.quantity) < 1 || Number(fields.quantity) > 10000) errors.quantity = 'Enter a quantity from 1 to 10,000.';
  if (fields.message.length < 10) errors.message = 'Add at least 10 characters about your project.';
  const enums = { interest: interests, sector: sectors, budget: budgets, currency: currencies, timeline: timelines };
  for (const key of Object.keys(enums) as (keyof typeof enums)[]) if (!(enums[key] as readonly string[]).includes(fields[key])) errors[key] = 'Choose a listed option.';
  if (!fields.consent) errors.consent = 'Confirm that you understand how this draft is handled.';
  if (fields.website) errors.website = 'This request could not be accepted.';
  return { fields, errors };
}

export function buildInquiryText(fields: InquiryFields, config: Configuration | null, materialTitle: string, reference: BriefReference, filenames: string[]): string {
  const entries = [
    'SH MARBLES — Bespoke project inquiry', '',
    `Interest: ${fields.interest}`, `Project: ${fields.sector}`, `Quantity: ${fields.quantity}`,
    `Dimensions / additional requirements: ${fields.dimensions || 'To discuss'}`,
    `Preferred material: ${fields.material || 'Not decided'}`,
    `Budget preference: ${fields.budget}${!['Not decided', 'Prefer to discuss'].includes(fields.budget) ? ` ${fields.currency}` : ''}`,
    `Requested timeline: ${fields.timeline} (not a delivery promise)`,
    `Project country: ${fields.country}`, `Delivery location: ${fields.destination}`,
    '', `Name: ${fields.name}`, `Company: ${fields.company || '—'}`, `Email: ${fields.email || '—'}`, `Phone / WhatsApp: ${fields.phone || '—'}`,
    '', `Project notes: ${fields.message}`,
  ];
  if (reference.piece || reference.material || reference.intent) entries.push('', 'REFERENCE', `Piece: ${reference.piece || 'Not selected'}`, `Material direction: ${reference.material || 'Not selected'}`, `Purpose: ${reference.intent || 'To discuss'}`);
  if (config) entries.push('', 'STARTING CONFIGURATION', ...configurationLines(config, materialTitle));
  entries.push('', 'REFERENCE FILES', filenames.length ? filenames.join('\n') : 'None selected', 'Selected files are not embedded in this text file. Attach the original files separately.', '', 'This brief has not been sent to SH MARBLES. No order has been placed. Pricing, sourcing, specifications and delivery require confirmation.');
  return entries.join('\n');
}

export function qualifyInquiry(fields: InquiryFields, configured: boolean) {
  const reasons: string[] = [];
  let score = 0;
  if (fields.interest !== 'A bespoke piece') { score += 2; reasons.push('Specific product interest'); }
  if (fields.dimensions || configured) { score += 2; reasons.push('Dimensions supplied'); }
  if (Number(fields.quantity) > 1) { score += 2; reasons.push('Multiple pieces'); }
  if (fields.timeline !== 'Not decided') { score += 2; reasons.push('Timeline supplied'); }
  if (!['Not decided', 'Prefer to discuss'].includes(fields.budget)) { score += 1; reasons.push('Budget supplied'); }
  return { score, reasons, rulesVersion: 'brief-v1', sector: fields.sector };
}
