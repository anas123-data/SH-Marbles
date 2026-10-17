/** Build-time public identity, separate from preview/production indexing policy. */
export interface SiteEnvironment { SITE_URL?:string; SITE_INDEXABLE?:string; VERCEL_PROJECT_PRODUCTION_URL?:string; VERCEL_ENV?:string; NODE_ENV?:string }
export function resolveSiteConfig(env:SiteEnvironment) {
  const candidate=env.SITE_URL?.trim() || (env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}` : '');
  let origin:string|null=null;
  if(candidate){
    try{
      const url=new URL(candidate);
      if(url.protocol!=='https:' || url.username || url.password || url.pathname!=='/' || url.search || url.hash || url.port || !url.hostname.includes('.') || /(^localhost$|\.localhost$|\.local$|^\d+\.\d+\.\d+\.\d+$)/i.test(url.hostname))throw new Error('Invalid public origin');
      origin=url.origin;
    }catch{throw new Error('SITE_URL must be a public HTTPS origin without credentials, port, path, query or fragment.');}
  }
  const indexable=Boolean(origin && env.SITE_INDEXABLE==='true' && env.NODE_ENV==='production' && (!env.VERCEL_ENV || env.VERCEL_ENV==='production'));
  return {origin,indexable};
}
export const site=resolveSiteConfig({SITE_URL:process.env.SITE_URL,SITE_INDEXABLE:process.env.SITE_INDEXABLE,VERCEL_PROJECT_PRODUCTION_URL:process.env.VERCEL_PROJECT_PRODUCTION_URL,VERCEL_ENV:process.env.VERCEL_ENV,NODE_ENV:process.env.NODE_ENV});
export const privatePaths=['/bespoke/inquiry','/bespoke/configure','/concierge'] as const;
export function absoluteUrl(path:string,origin=site.origin){return origin?new URL(path,origin).href:undefined;}
