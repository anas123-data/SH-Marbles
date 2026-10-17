import type { MetadataRoute } from 'next';
import { searchRoutes } from '@/content/search-routes';
import { site } from '@/content/site-config';

export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  if(!site.indexable || !site.origin)return [];
  return (await searchRoutes()).map(path=>({url:new URL(path,site.origin!).href}));
}
