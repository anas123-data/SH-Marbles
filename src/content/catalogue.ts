import type { CatalogueImage, CatalogueRepository, Collection, Material, Product } from './catalogue-models';
import { greenOnyxBasin } from './green-onyx-basin';
import { darkEmperadorBasin } from './dark-emperador-basin';
import { luxuryOnyxBasin } from './luxury-onyx-basin';
import { ziaratWhiteBasin } from './ziarat-white-basin';
import { darkGreenOnyxBasin } from './dark-green-onyx-basin';
import { travertineBasin } from './travertine-basin';
import { greenMarbleBasin } from './green-marble-basin';
import { roundTravertineBasin } from './round-travertine-basin';
import { greenOnyx19Basin } from './green-onyx-19-basin';
import { ziaratWhiteFlutedBasin } from './ziarat-white-fluted-basin';
import { ziyaratWhiteFlutedBasin } from './ziyarat-white-fluted-basin';
import { rossoLevantoSquareBasin } from './rosso-levanto-square-basin';
import { blackMarbleBasin } from './black-marble-basin';

const photograph = (file: string, alt: string, caption = 'Supplied setting', position = '50% 60%'): CatalogueImage => ({ src: `/media/${file}.webp`, alt, caption, position });
const detail = (image: CatalogueImage): CatalogueImage => ({ ...image, alt: `Surface detail: ${image.alt}`, caption: 'Detail crop · same supplied image', detail: true });
const table = photograph('table-bedroom', 'Dark veined side table with a cross-shaped base beside a bed');
const fluted = photograph('fluted-basin', 'Rectangular burgundy-toned basin with a fluted exterior', 'Supplied bathroom setting', '50% 64%');
const round = photograph('black-basin', 'Round dark basin with pale veins and a fluted exterior', 'Supplied bathroom setting', '50% 62%');
const warm = photograph('warm-basin', 'Warm ivory-toned round vessel basin with a textured outer wall', 'Supplied bathroom setting', '50% 62%');
const rose = photograph('rose-basin', 'Pale rose-toned vessel basin in a softly lit bathroom', 'Supplied bathroom setting', '50% 59%');
const amber = photograph('amber-basin', 'Amber and cream-toned basin with flowing surface patterns', 'Supplied bathroom setting', '50% 64%');
const green = photograph('workshop-basin', 'Green stone basin with a carved edge in a workshop setting', 'Supplied workshop view', '50% 55%');
const objects = photograph('stone-objects', 'Light stone noughts and crosses on a dark square board', 'Supplied living-room setting', '50% 63%');

export const catalogueCollections: Collection[] = [
  { id: 'tables', title: 'Tables', subtitle: 'An anchor for the everyday.', description: 'Quiet geometry. A surface with its own rhythm. Explore stone tables through form, proportion and the space around them.', introduction: 'A table can hold a room together without asking for attention. Begin with a side-table study, then bring your own proportions to the conversation.', image: table, interest: 'A marble table', seo: { title: 'Marble Tables', description: 'Explore a sculptural marble side-table study and start a brief for a custom table with SH MARBLES.' } },
  { id: 'basins', title: 'Wash Basins', subtitle: 'A different kind of daily ritual.', description: 'Soft bowls and precise lines. Natural stone wash basins that bring material character to a familiar ritual.', introduction: 'A basin is experienced up close. The curve of the bowl, the line of the rim and the pattern beneath the light each deserve a closer look.', image: greenOnyxBasin.images[0], interest: 'A marble basin', seo: { title: 'Marble Sinks & Basins', description: 'Explore handcrafted natural stone wash basins, from fluted forms to rounded vessels, with SH MARBLES.' } },
  { id: 'objects', title: 'Objects', subtitle: 'An invitation to linger.', description: 'Smaller in scale. Just as considered. Stone objects for a quiet pause, a shared moment and a place on the table.', introduction: 'Sometimes the smallest piece changes the way a room feels. Contrasting stone and familiar shapes make a simple game worth leaving in view.', image: objects, interest: 'A stone object', seo: { title: 'Decorative Stone Objects', description: 'Discover a stone game-set study and explore ideas for decorative marble objects with SH MARBLES.' } },
];

type ProductSeed = Pick<Product, 'slug' | 'title' | 'category' | 'materialStudyId' | 'description' | 'detailStory' | 'form' | 'character' | 'images'>;
function product(seed: ProductSeed): Product {
  return { ...seed, id: seed.slug, collection: seed.category, stone: null, finish: null, dimensions: null, weightKg: null, featured: true, customizable: null,
    customizationNotes: 'Bring your preferred size, stone direction and finish. The studio will need to confirm what is possible for your piece.',
    leadTime: null, shippingInformation: null, craftsmanship: null, applications: [], availability: 'unconfirmed', contentStatus: 'visual-study',
    seo: { title: seed.title, description: `${seed.description} Explore this ${seed.category === 'tables' ? 'table' : seed.category === 'basins' ? 'basin' : 'object'} study with SH MARBLES.` } };
}

export const products: Product[] = [
  greenOnyxBasin,
  darkEmperadorBasin,
  luxuryOnyxBasin,
  ziaratWhiteBasin,
  darkGreenOnyxBasin,
  travertineBasin,
  greenMarbleBasin,
  roundTravertineBasin,
  greenOnyx19Basin,
  ziaratWhiteFlutedBasin,
  ziyaratWhiteFlutedBasin,
  rossoLevantoSquareBasin,
  blackMarbleBasin,
  product({ slug: 'cross-base-side-table', title: 'Cross-base side table', category: 'tables', materialStudyId: 'ink-and-ivory', form: 'Square top · intersecting base', character: 'Dark ground · pale, branching veins', description: 'A compact silhouette with a quietly architectural presence. Intersecting planes give expressive stone a clear, composed form.', detailStory: 'The straight edge of the top meets the intersecting base below. In the supplied views, the pale veins bring movement to an otherwise still composition.', images: [table, photograph('table-detail', 'Closer supplied view of the dark cross-base side table', 'Second supplied view'), detail(table)] }),
  product({ slug: 'stone-game-set', title: 'Stone game set', category: 'objects', materialStudyId: 'ink-and-ivory', form: 'Square board · sculptural playing pieces', character: 'Pale pieces · dark contrasting board', description: 'A familiar game, made a little more considered. Contrasting pieces and a dark square board invite a moment away from the everyday.', detailStory: 'The small scale makes the contrast more immediate. Rounded noughts sit beside angular crosses, creating a composition that changes with every game.', images: [objects, photograph('objects-detail', 'Light stone game pieces displayed against a dark board', 'Second supplied view'), photograph('objects-case', 'Stone game set displayed in an open presentation case', 'Supplied case view · packaging not confirmed')] }),
];

type MaterialSeed = Pick<Material, 'slug' | 'title' | 'description' | 'visualCharacteristics' | 'veinStyle' | 'tone' | 'pattern' | 'palette' | 'image'>;
function material(seed: MaterialSeed): Material {
  return { ...seed, id: seed.slug, tradeName: null, origin: null, stoneFamily: null, finishes: [], recommendedApplications: [],
    applicationNote: 'Use this as a colour direction for your project. Suitability for basins, furniture, wet areas or outdoor use requires confirmation for the specific stone and construction.',
    variationNote: 'A photograph is a starting point. View and approve the actual stone sample or slab for colour, pattern, surface and scale before specifying it.',
    availability: 'unconfirmed', contentStatus: 'visual-study', seo: { title: `${seed.title} — Stone Study`, description: `Explore the ${seed.title.toLowerCase()} colour direction in the SH MARBLES Stone Library. ${seed.visualCharacteristics}` } };
}

export const materials: Material[] = [
  material({ slug: 'ink-and-ivory', title: 'Ink & ivory', description: 'A dark ground. Lines of light. A direction for spaces that can hold a little contrast.', visualCharacteristics: 'A near-black field crossed by irregular pale lines in the supplied image.', veinStyle: 'Branching, high-contrast lines', tone: 'dark', pattern: 'veined', palette: ['#242523', '#66685d', '#e5dfd1'], image: round }),
  material({ slug: 'warm-ivory', title: 'Warm ivory', description: 'Quiet variation, close in tone. A warm neutral direction with a softer presence.', visualCharacteristics: 'Cream and sand tones with a softly mottled appearance in the supplied image.', veinStyle: 'Low-contrast, diffuse pattern', tone: 'warm', pattern: 'mottled', palette: ['#c6bba7', '#ded4bf', '#eee6d6'], image: warm }),
  material({ slug: 'burgundy', title: 'Burgundy', description: 'Deep colour with a fine, restless line. An expressive direction for a focal piece.', visualCharacteristics: 'Wine and brown tones interrupted by a fine network of pale veins.', veinStyle: 'Fine intersecting lines', tone: 'coloured', pattern: 'veined', palette: ['#4b3331', '#81635b', '#d9c8ba'], image: fluted }),
  material({ slug: 'rose', title: 'Rose', description: 'A trace of blush, held in cream. A gentle direction that rewards a closer look.', visualCharacteristics: 'Pale rose and cream areas that blend softly in the supplied image.', veinStyle: 'Soft clouds and tonal shifts', tone: 'coloured', pattern: 'clouded', palette: ['#b69484', '#d4b9a7', '#ecdfcf'], image: rose }),
  material({ slug: 'amber', title: 'Amber', description: 'A warm, flowing composition. Honey, cream and deeper accents held in one surface.', visualCharacteristics: 'Honey and cream bands with darker amber patches in the supplied image.', veinStyle: 'Flowing, clouded bands', tone: 'warm', pattern: 'clouded', palette: ['#83501f', '#bf943f', '#e5d7a5'], image: amber }),
  material({ slug: 'forest', title: 'Forest', description: 'Depth, interrupted by a pale line. A green direction with a quietly expressive character.', visualCharacteristics: 'Deep green tones crossed by irregular pale marks in the workshop image.', veinStyle: 'Irregular, interlacing veins', tone: 'coloured', pattern: 'veined', palette: ['#263c32', '#647568', '#c0c6ae'], image: green }),
];

export const catalogue: CatalogueRepository = {
  async listCollections() { return catalogueCollections; },
  async getCollection(id) { return catalogueCollections.find(item => item.id === id); },
  async listProducts(category) { return category ? products.filter(item => item.category === category) : products; },
  async getProduct(slug) { return products.find(item => item.slug === slug); },
  async listMaterials() { return materials; },
  async getMaterial(slug) { return materials.find(item => item.slug === slug); },
};
