const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
async function main(){
  const base=process.env.QA_BASE_URL||'http://127.0.0.1:3000',origin=process.env.QA_SITE_ORIGIN||null,indexable=process.env.QA_INDEXABLE==='true';
  const report={routes:[],accessibility:[],errors:[],indexable,origin};
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  try{
    const context=await browser.newContext({reducedMotion:'reduce'}),page=await context.newPage();
    page.on('pageerror',e=>report.errors.push(e.message));
    const queue=['/','/collections','/stone-library','/projects','/concierge','/bespoke/configure','/bespoke/inquiry'],seen=new Set(),titles=new Set();
    while(queue.length){
      const route=queue.shift();if(seen.has(route))continue;seen.add(route);
      const response=await page.goto(base+route,{waitUntil:'domcontentloaded'});assert.equal(response.status(),200,route);
      const title=await page.title();assert.ok(title&&!titles.has(title),`Unique title: ${route}`);titles.add(title);
      const description=await page.locator('meta[name=description]').getAttribute('content');assert.ok(description.length>=60,route);
      assert.equal(await page.locator('h1').count(),1,route);
      const canonical=await page.locator('link[rel=canonical]').count()?await page.locator('link[rel=canonical]').getAttribute('href'):null;assert.equal(canonical,origin?origin+route:null,route);
      const robots=await page.locator('meta[name=robots]').first().getAttribute('content');
      const privatePage=['/bespoke/configure','/bespoke/inquiry','/concierge'].includes(route);
      assert.equal(robots.includes('noindex'),!indexable||privatePage,route);
      if(origin){const image=await page.locator('meta[property="og:image"]').getAttribute('content');assert.ok(image.startsWith(origin+'/'));assert.equal(await page.locator('meta[property="og:url"]').getAttribute('content'),origin+route);assert.equal(await page.locator('meta[name="twitter:card"]').getAttribute('content'),'summary_large_image');}
      const schemas=await page.locator('script[type="application/ld+json"]').evaluateAll(nodes=>nodes.map(node=>JSON.parse(node.textContent)));
      assert.ok(schemas.some(schema=>schema['@graph']?.some(node=>node['@type']==='Organization'&&node.name==='SH MARBLES')));
      if(route==='/products/green-onyx-stone-vessel-sink'){const product=schemas.find(schema=>schema['@type']==='Product');assert.equal(product.offers.price,52000);assert.equal(product.offers.priceCurrency,'PKR');assert.ok(!product.offers.availability);}else if(['/products/dark-emperador-marble-sink','/products/luxury-onyx-vessel-sink','/products/ziarat-white-marble-vessel-sink','/products/dark-green-onyx-vessel-sink','/products/travertine-stone-vessel-sink','/products/green-marble-vessel-sink','/products/round-travertine-vessel-sink','/products/green-onyx-vessel-sink-19x13','/products/ziarat-white-fluted-vessel-sink','/products/ziyarat-white-fluted-vessel-sink','/products/rosso-levanto-square-marble-sink','/products/black-marble-vessel-sink'].includes(route)){assert.ok(schemas.some(schema=>schema['@type']==='Product'&&schema.offers));}else if(route.startsWith('/products/')){assert.ok(schemas.some(schema=>schema['@type']==='CreativeWork'));assert.ok(!schemas.some(schema=>schema.offers||schema.aggregateRating));}
      if(route!=='/'){const crumbs=page.locator('[itemtype="https://schema.org/BreadcrumbList"]');assert.equal(await crumbs.count(),1,route);const positions=await crumbs.locator('meta[itemprop=position]').evaluateAll(nodes=>nodes.map(node=>Number(node.content)));assert.deepEqual(positions,positions.map((_,i)=>i+1));}
      const links=await page.locator('a[href^="/"]').evaluateAll(nodes=>nodes.map(node=>node.getAttribute('href').split(/[?#]/)[0]));
      for(const link of links)if(link&&!link.includes('.')&&!link.startsWith('/api/')&&!seen.has(link))queue.push(link);
      report.routes.push({route,status:response.status(),title,canonical,noindex:robots.includes('noindex')});
    }
    for(const route of ['/','/products/black-marble-vessel-sink','/stone-library','/trade','/concierge','/bespoke/configure']){
      for(const width of [390,1440]){
        await page.setViewportSize({width,height:900});await page.goto(base+route,{waitUntil:'networkidle'});
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
        const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();const violations=audit.violations.map(item=>({id:item.id,nodes:item.nodes.map(node=>node.target)}));report.accessibility.push({route,width,violations});assert.equal(violations.length,0,JSON.stringify(violations));
      }
    }
    await page.goto(base+'/products/black-marble-vessel-sink');assert.equal(await page.locator('.image-dialog img').count(),0);await page.getByRole('button',{name:/View full image/}).click();await page.locator('.image-dialog img').waitFor();await page.waitForFunction(()=>document.querySelector('.image-dialog img')?.naturalWidth>0);await page.keyboard.press('Escape');assert.equal(await page.locator('.image-dialog img').count(),0);
    const robots=await (await context.request.get(base+'/robots.txt')).text(),map=await (await context.request.get(base+'/sitemap.xml')).text();
    if(indexable){assert.match(robots,/Sitemap:/);for(const route of report.routes.filter(item=>!['/bespoke/inquiry','/bespoke/configure','/concierge'].includes(item.route)))assert.ok(map.includes(`<loc>${origin+route.route}</loc>`),route.route);}else{assert.match(robots,/Disallow: \//);assert.ok(!map.includes('<loc>'));}
    const card=await context.request.get(base+'/social/sh-marbles.png');assert.equal(card.status(),200);assert.match(card.headers()['content-type'],/image\/png/);const buffer=await card.body();assert.equal(buffer.readUInt32BE(16),1200);assert.equal(buffer.readUInt32BE(20),630);fs.mkdirSync('output/phase-11',{recursive:true});fs.writeFileSync('output/phase-11/social-card.png',buffer);
    const photoColours=await page.evaluate(async()=>{const image=new Image();image.src='/social/sh-marbles.png';await image.decode();const canvas=document.createElement('canvas');canvas.width=1200;canvas.height=630;const context=canvas.getContext('2d');context.drawImage(image,0,0);const pixels=context.getImageData(720,50,420,530).data;const colours=new Set();for(let i=0;i<pixels.length;i+=40)colours.add(`${pixels[i]},${pixels[i+1]},${pixels[i+2]}`);return colours.size;});assert.ok(photoColours>100,'Social card photograph is missing');
    assert.equal((await context.request.get(base+'/products/unknown-piece')).status(),404);assert.equal(report.errors.length,0);
    report.socialCard={width:1200,height:630,bytes:buffer.length,photoColours};report.gallery='Full image requested only on open; Escape closes it';
  }finally{await browser.close();fs.writeFileSync(process.env.QA_REPORT||'docs/phase-11-seo-qa.json',JSON.stringify(report,null,2));}
  console.log(JSON.stringify({routes:report.routes.length,accessibility:report.accessibility.length,errors:report.errors}));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
