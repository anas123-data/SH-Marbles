/** Deliberately small, factual catalogue projection. No prices or inferred specifications. */
export const pieceOptions = ['A table', 'A basin', 'A stone object', 'An architectural project'] as const;
export const settingOptions = ['Indoors', 'Outdoors', 'Not decided'] as const;
export const styleOptions = ['Quiet & minimal', 'Expressive & sculptural', 'Classic & considered', 'Still exploring'] as const;
export const toneOptions = ['Dark & contrasting', 'Warm & neutral', 'A note of colour', 'Open to ideas'] as const;
export const budgetOptions = ['Not decided', 'Under 1,000', '1,000–5,000', '5,000–15,000', '15,000–50,000', 'Over 50,000', 'Prefer to discuss'] as const;
export const currencyOptions = ['USD', 'PKR', 'AED', 'SAR', 'QAR', 'GBP', 'EUR'] as const;
export interface Preferences {
  piece: typeof pieceOptions[number] | ''; setting: typeof settingOptions[number] | '';
  style: typeof styleOptions[number] | ''; tone: typeof toneOptions[number] | '';
  dimensions: string; budget: typeof budgetOptions[number]; currency: typeof currencyOptions[number]; country: string;
}
export function emptyPreferences(): Preferences {
  return { piece: '', setting: '', style: '', tone: '', dimensions: '', budget: 'Not decided', currency: 'USD', country: '' };
}
export function validatePreferences(input: unknown): Preferences | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const p = input as Record<string, unknown>;
  if (Object.keys(p).length !== 8 || Object.keys(p).some(key => !(key in emptyPreferences()))) return null;
  for (const [key, options] of Object.entries({piece:pieceOptions,setting:settingOptions,style:styleOptions,tone:toneOptions,budget:budgetOptions,currency:currencyOptions})) {
    if (typeof p[key] !== 'string' || !(options as readonly string[]).includes(p[key])) return null;
  }
  for (const [key, limit] of [['dimensions',120],['country',80]] as const) {
    if (typeof p[key] !== 'string' || p[key].length > limit || /[\u0000-\u001f\u007f<>]/.test(p[key])) return null;
  }
  return { piece:p.piece,setting:p.setting,style:p.style,tone:p.tone,dimensions:(p.dimensions as string).trim(),budget:p.budget,currency:p.currency,country:(p.country as string).trim() } as Preferences;
}
export interface ReferenceImage { src: string; alt: string; position?: string }
export interface MaterialReference {
  id:string; slug:string; title:string; tone:'dark'|'warm'|'coloured'; pattern:'veined'|'clouded'|'mottled';
  image:ReferenceImage; palette:string[];
}
export interface ProductReference {
  id:string; slug:string; title:string; category:'tables'|'basins'|'objects'; materialStudyId:string|null; image:ReferenceImage;
}
export interface ReferenceCatalogue { materials: MaterialReference[]; products: ProductReference[] }
export interface Selection { productIds:string[]; materialIds:string[] }
export interface Recommendation {
  mode:'guided'|'assisted'; products:(ProductReference & {reason:string})[]; materials:(MaterialReference & {reason:string})[];
}
export function categoryFor(piece:Preferences['piece']) {
  return piece === 'A table' ? 'tables' : piece === 'A basin' ? 'basins' : piece === 'A stone object' ? 'objects' : null;
}
export function preferredTone(p:Preferences) {
  return p.tone === 'Dark & contrasting' ? 'dark' : p.tone === 'Warm & neutral' ? 'warm' : p.tone === 'A note of colour' ? 'coloured' : null;
}
export function candidatesFor(p:Preferences,catalogue:ReferenceCatalogue):ReferenceCatalogue {
  const category=categoryFor(p.piece);
  return {materials:catalogue.materials,products:category ? catalogue.products.filter(product=>product.category===category) : []};
}
export function selectReferences(p:Preferences,catalogue:ReferenceCatalogue):Selection {
  const candidates=candidatesFor(p,catalogue), tone=preferredTone(p);
  function score(material:MaterialReference) {
    return (tone && material.tone===tone ? 10 : 0) + (p.style==='Quiet & minimal' && material.pattern!=='veined' ? 2 : p.style==='Expressive & sculptural' && material.pattern==='veined' ? 2 : 0);
  }
  const ranked=[...candidates.materials].sort((a,b)=>score(b)-score(a));
  const materialIds=ranked.slice(0,2).map(item=>item.id);
  const productIds=[...candidates.products].sort((a,b)=>{
    const aMaterial=candidates.materials.find(item=>item.id===a.materialStudyId);
    const bMaterial=candidates.materials.find(item=>item.id===b.materialStudyId);
    return (bMaterial ? score(bMaterial) : 0)-(aMaterial ? score(aMaterial) : 0);
  }).slice(0,2).map(item=>item.id);
  return {productIds,materialIds};
}
/** Provider output is data, never instructions. Reject extra keys and unknown/duplicate IDs. */
export function validateSelection(value:unknown,candidates:ReferenceCatalogue):Selection|null {
  if (!value || typeof value!=='object' || Array.isArray(value)) return null;
  const raw=value as Record<string,unknown>;
  if (Object.keys(raw).length!==2 || Object.keys(raw).some(key=>!['productIds','materialIds'].includes(key))) return null;
  for (const [key, records] of [['productIds',candidates.products],['materialIds',candidates.materials]] as const) {
    const ids=raw[key];
    if (!Array.isArray(ids) || ids.length!==Math.min(2,records.length) || new Set(ids).size!==ids.length || ids.some(id=>typeof id!=='string' || !records.some(record=>record.id===id))) return null;
  }
  return {productIds:[...(raw.productIds as string[])],materialIds:[...(raw.materialIds as string[])]};
}
export function presentSelection(p:Preferences,catalogue:ReferenceCatalogue,selection:Selection,mode:Recommendation['mode']='guided'):Recommendation {
  const tone=preferredTone(p);
  return {mode,
    products:selection.productIds.flatMap(id=>{
      const item=catalogue.products.find(product=>product.id===id);if(!item)return [];
      const material=catalogue.materials.find(entry=>entry.id===item.materialStudyId);
      return [{...item,reason:tone && material?.tone===tone ? 'A form reference in your preferred colour direction.' : 'A form reference for your chosen piece. The pictured colour may differ from your palette.'}];
    }),
    materials:selection.materialIds.flatMap(id=>{
      const item=catalogue.materials.find(material=>material.id===id);if(!item)return [];
      const colour=tone ? item.tone===tone ? 'Reflects your chosen colour family.' : 'An alternative colour direction to consider.' : 'A colour direction to explore.';
      const pattern=p.style==='Quiet & minimal' && item.pattern!=='veined' ? ' The pictured pattern is softer and less linear.' : p.style==='Expressive & sculptural' && item.pattern==='veined' ? ' Visible veins bring a more expressive line.' : '';
      return [{...item,reason:colour+pattern}];
    })};
}
export function consultationSummary(p:Preferences,result:Recommendation):string {
  return ['STONE CONCIERGE — VISUAL DIRECTION',`Piece: ${p.piece}`,`Setting: ${p.setting}`,`Style: ${p.style}`,`Palette: ${p.tone}`,`Approximate dimensions: ${p.dimensions || 'To discuss'}`,`Budget preference: ${p.budget}${['Not decided','Prefer to discuss'].includes(p.budget) ? '' : ` ${p.currency}`}`,`Project country: ${p.country || 'To discuss'}`,`Form references: ${result.products.map(item=>item.title).join(', ') || 'Bespoke discussion'}`,`Colour studies: ${result.materials.map(item=>item.title).join(', ') || 'Studio guidance needed'}`,'Visual references only. Stone identity, suitability, dimensions, price, availability and timing require studio confirmation.'].join('\n');
}
