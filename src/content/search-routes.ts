import { catalogue } from './catalogue';
import { studio } from './studio';

/** Public editorial content only. Interactive briefs and APIs do not belong in the sitemap. */
export async function searchRoutes(){
  const [collections,products,materials,projects]=await Promise.all([catalogue.listCollections(),catalogue.listProducts(),catalogue.listMaterials(),studio.listStudies()]);
  return ['/', '/collections','/stone-library','/bespoke','/projects','/craftsmanship','/about','/trade','/contact',
    ...collections.map(item=>`/collections/${item.id}`),...products.map(item=>`/products/${item.slug}`),
    ...materials.map(item=>`/stone-library/${item.slug}`),...projects.map(item=>`/projects/${item.slug}`)];
}
