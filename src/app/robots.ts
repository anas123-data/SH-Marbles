import type { MetadataRoute } from 'next';
import { site } from '@/content/site-config';
export default function robots(): MetadataRoute.Robots {
  return site.indexable && site.origin ? {rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:`${site.origin}/sitemap.xml`} : {rules:{userAgent:'*',disallow:'/'}};
}
