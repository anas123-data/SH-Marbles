import type { Product } from './catalogue-models';
export function serializeStructuredData(value:unknown){return JSON.stringify(value).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');}
export function brandGraph(origin:string|null){
  return {'@context':'https://schema.org','@graph':[
    {'@type':'Organization',name:'SH MARBLES',...(origin?{'@id':`${origin}/#organization`,url:origin}:{})},
    {'@type':'WebSite',name:'SH MARBLES',inLanguage:'en',...(origin?{'@id':`${origin}/#website`,url:origin,publisher:{'@id':`${origin}/#organization`}}:{})},
  ]};
}
export function productGraph(product:Product,origin:string|null){
  const url=origin?`${origin}/products/${product.slug}`:undefined;
  const common={'@context':'https://schema.org',name:product.title,description:product.contentStatus==='visual-study'?`${product.description} A visual study; product specifications and availability require confirmation.`:product.description,...(url?{url,'@id':`${url}#piece`,image:product.images.filter(image=>!image.detail).map(image=>new URL(image.src,origin!).href)}:{})};
  if(product.contentStatus!=='verified')return {...common,'@type':'CreativeWork',genre:'Product form study'};
  // Factual Product data only. No Offer/review/rating is invented for rich-result eligibility.
  return {...common,'@type':'Product',category:product.category,brand:{'@type':'Brand',name:'SH MARBLES'},...(product.stone?{material:product.stone}:{})};
}
