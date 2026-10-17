import test from 'node:test';
import assert from 'node:assert/strict';
import {resolveSiteConfig} from '../src/content/site-config.ts';
import {brandGraph,productGraph,serializeStructuredData} from '../src/content/structured-data.ts';
import {readFileSync} from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';

test('preview stays noindex; production needs explicit indexing and a valid origin',()=>{
  assert.deepEqual(resolveSiteConfig({}),{origin:null,indexable:false});
  assert.equal(resolveSiteConfig({SITE_INDEXABLE:'true',NODE_ENV:'production'}).indexable,false);
  assert.deepEqual(resolveSiteConfig({SITE_URL:'https://stone.example',SITE_INDEXABLE:'true',NODE_ENV:'production'}),{origin:'https://stone.example',indexable:true});
  for(const VERCEL_ENV of ['preview','development'])assert.equal(resolveSiteConfig({SITE_URL:'https://stone.example',SITE_INDEXABLE:'true',NODE_ENV:'production',VERCEL_ENV}).indexable,false);
  assert.equal(resolveSiteConfig({VERCEL_PROJECT_PRODUCTION_URL:'stone.vercel.app',NODE_ENV:'production'}).origin,'https://stone.vercel.app');
  for(const SITE_URL of ['http://stone.example','https://localhost','https://127.0.0.1','https://user:password@stone.example','https://stone.example/path','https://stone.example?x=y','https://stone.example#fragment','https://stone.example:444','not a URL'])assert.throws(()=>resolveSiteConfig({SITE_URL}));
});
test('structured data cannot break out of script; unknown company facts are absent',()=>{
  const malicious='</script><script>alert("injected")</script>';
  const serialized=serializeStructuredData({name:malicious});assert.ok(!serialized.includes('<'));assert.equal(JSON.parse(serialized).name,malicious);
  const brand=brandGraph('https://stone.example');assert.equal(brand['@graph'][0].name,'SH MARBLES');assert.equal(brand['@graph'][0].url,'https://stone.example');
  for(const field of ['address','telephone','email','sameAs','award','foundingDate'])assert.ok(!JSON.stringify(brand).includes(field));
});
test('visual studies are not represented as verified products or purchasable offers',()=>{
  const record={slug:'test',title:'Form study',description:'A visual reference.',contentStatus:'visual-study',images:[{src:'/media/test.webp',detail:false}],category:'tables',stone:null};
  const study=productGraph(record,'https://stone.example');assert.equal(study['@type'],'CreativeWork');assert.match(study.description,/require confirmation/);
  const product=productGraph({...record,contentStatus:'verified',stone:'Verified stone name'},'https://stone.example');assert.equal(product['@type'],'Product');assert.equal(product.material,'Verified stone name');
  for(const field of ['offers','aggregateRating','review','price','availability'])assert.ok(!JSON.stringify(product).includes(field));
});
test('production metadata uses route-specific canonicals and share images; tools stay noindex',async()=>{
  const config=stripTypeScriptTypes(readFileSync('src/content/site-config.ts','utf8')).replace(/export const site=resolveSiteConfig\([^;]+;/,'export const site=resolveSiteConfig({SITE_URL:"https://stone.example",SITE_INDEXABLE:"true",NODE_ENV:"production"});');
  const configUrl=`data:text/javascript;base64,${Buffer.from(config).toString('base64')}`;
  const source=stripTypeScriptTypes(readFileSync('src/content/metadata.ts','utf8')).replace("from './site-config'",`from '${configUrl}'`);
  const {catalogueMetadata}=await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
  const result=catalogueMetadata({title:'A study',description:'Description'},{path:'/products/test',image:'/media/test.webp'});
  assert.equal(result.alternates.canonical,'https://stone.example/products/test');assert.equal(result.openGraph.url,result.alternates.canonical);assert.equal(result.openGraph.images[0].url,'https://stone.example/media/test.webp');assert.equal(result.robots.index,true);
  for(const path of ['/bespoke/inquiry','/bespoke/configure','/concierge'])assert.equal(catalogueMetadata({title:'Tool',description:'Details'},{path}).robots.index,false);
});
