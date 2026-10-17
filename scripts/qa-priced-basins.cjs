const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');

const cases=[
  {slug:'green-onyx-stone-vessel-sink',title:'Green Onyx Stone Vessel Sink',price:'PKR 52,000',images:4},
  {slug:'dark-emperador-marble-sink',title:'Dark Emperador Marble Sink',price:'PKR 38,000',images:3,second:'PKR 50,000',size:'18 L × 14 W × 5.5 H inches'},
  {slug:'luxury-onyx-vessel-sink',title:'Luxury Onyx Vessel Sink',price:'PKR 50,000',images:3},
  {slug:'ziarat-white-marble-vessel-sink',title:'Ziarat White Marble Vessel Sink',price:'PKR 32,000',images:4,second:'PKR 38,000',size:'16 inches diameter × 4 inches high'},
];

async function main(){
  fs.mkdirSync('output/priced-basins',{recursive:true});
  const browser=await chromium.launch({channel:'msedge',headless:true});
  const report={pages:[],errors:[],galleryImages:0,variantHandoffs:[]};
  try {
    const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
    const page=await context.newPage();
    page.on('pageerror',error=>report.errors.push(error.message));
    for(const item of cases){
      for(const width of [390,1440]){
        await page.setViewportSize({width,height:1000});
        const response=await page.goto(`http://127.0.0.1:3000/products/${item.slug}`,{waitUntil:'networkidle'});
        assert.equal(response.status(),200);
        assert.equal(await page.locator('h1').innerText(),item.title);
        assert.equal(await page.locator('.product-price').innerText(),item.price);
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
        const audit=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
        assert.deepEqual(audit.violations.map(item=>item.id),[]);
        report.pages.push({slug:item.slug,width,axeViolations:0});
        await page.locator('.product-stage').screenshot({path:`output/priced-basins/${item.slug}-${width}.png`});
      }
      const thumbnails=page.locator('.gallery-thumbnails button');
      assert.equal(await thumbnails.count(),item.images);
      for(let i=0;i<item.images;i++){
        await thumbnails.nth(i).click();
        await page.waitForFunction(()=>{const image=document.querySelector('.gallery-stage img');return image.complete&&image.naturalWidth>0;});
        assert.equal(await thumbnails.nth(i).getAttribute('aria-pressed'),'true');
        report.galleryImages++;
      }
      await page.getByRole('button',{name:'View full image',exact:false}).click();
      await page.waitForFunction(()=>document.querySelector('.image-dialog img')?.naturalWidth>0);
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('.image-dialog').evaluate(dialog=>dialog.open),false);
      if(item.second){
        await page.locator('input[name="product-size"]').first().focus();
        await page.keyboard.press('ArrowDown');
        assert.equal(await page.locator('.product-price').innerText(),item.second);
        await page.getByRole('button',{name:'Enquire about this piece'}).click();
        const downloadPromise=page.waitForEvent('download');
        await page.getByRole('button',{name:'Download brief'}).click();
        const download=await downloadPromise;
        const contents=fs.readFileSync(await download.path(),'utf8');
        for(const value of [item.title,item.second,item.size])assert.ok(contents.includes(value),value);
        await page.getByRole('button',{name:'Continue to detailed brief'}).click();
        await page.waitForURL('**/bespoke/inquiry');
        const body=await page.locator('main').innerText();
        assert.ok(body.includes(item.size));assert.ok(body.includes(item.second));
        report.variantHandoffs.push(item.slug);
      }
    }
    await page.goto('http://127.0.0.1:3000/collections/basins',{waitUntil:'networkidle'});
    assert.equal(await page.locator('.product-card').count(),10);
    for(const item of cases){
      await page.getByRole('searchbox',{name:'Find a piece'}).fill(item.title);
      assert.equal(await page.locator('.product-card').count(),1);
      assert.ok((await page.locator('.product-card').innerText()).includes(item.price));
    }
    await page.goto('http://127.0.0.1:3000/products/luxury-onyx-vessel-sink');
    assert.ok((await page.locator('main').innerText()).includes('Avoid harsh chemicals to maintain shine.'));
    await page.goto('http://127.0.0.1:3000/products/fluted-round-basin');
    assert.equal(await page.locator('.product-price').count(),0);
    assert.match(await page.locator('.product-introduction').innerText(),/form study/i);
    assert.deepEqual(report.errors,[]);
    report.passed=true;
  }finally{
    await browser.close();
    fs.writeFileSync('output/priced-basins/qa.json',JSON.stringify(report,null,2));
  }
  console.log(JSON.stringify(report));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
