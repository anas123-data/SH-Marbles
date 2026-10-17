const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
async function main() {
  const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
  const output = path.resolve('output/playwright/studio');
  fs.mkdirSync(output,{recursive:true});
  const report = {responsive:[],accessibility:[],routes:[],interactions:[],errors:[]};
  const browser = await chromium.launch({headless:true,channel:process.env.QA_BROWSER_CHANNEL || 'msedge'});
  try {
    const context=await browser.newContext({acceptDownloads:true,reducedMotion:'reduce'});
    const page=await context.newPage();
    page.on('pageerror',error=>report.errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error'&&!message.text().includes('404'))report.errors.push(message.text());});
    async function audit(state) {
      const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      const violations=result.violations.map(item=>({id:item.id,impact:item.impact,nodes:item.nodes.map(node=>({target:node.target,summary:node.failureSummary}))}));
      report.accessibility.push({state,violations});assert.equal(violations.length,0,JSON.stringify({state,violations}));
    }
    const representative=['/craftsmanship','/projects','/projects/a-quiet-counterpoint','/about','/trade','/contact'];
    for(const route of (process.env.QA_INTERACTIONS ? [] : representative)) {
      for(const width of [375,390,430,768,1024,1440,1920]) {
        await page.setViewportSize({width,height:950});
        assert.equal((await page.goto(base+route,{waitUntil:'networkidle'})).status(),200);
        await page.evaluate(()=>document.fonts.ready);
        await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(resolve=>setTimeout(resolve,25));}});
        await page.waitForFunction(()=>[...document.images].filter(image=>image.getClientRects().length).every(image=>image.complete&&image.naturalWidth>0));
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow ${route} / ${width}`);
        assert.equal(await page.locator('h1').count(),1);
        assert.equal(await page.locator('img:not([alt])').count(),0);
        report.responsive.push({route,width,overflow:false,imagesLoaded:true});
        await page.evaluate(()=>scrollTo(0,0));
        if(width===390||width===1440){await page.screenshot({path:path.join(output,`${route.replaceAll('/','-').slice(1)}-${width}.png`),fullPage:true});await audit(`${route} / ${width}`);}
      }
      console.log(`Responsive passed: ${route}`);
    }
    await page.setViewportSize({width:1440,height:950});
    await page.goto(base+'/projects');
    const allStudies=await page.locator('.project-study-card a').evaluateAll(links=>links.map(link=>link.getAttribute('href')));
    assert.equal(allStudies.length,6);
    assert.equal(await page.locator('.desktop-nav a').count(),8);
    assert.equal(await page.locator('.desktop-nav a[aria-current=page]').innerText(),'Projects');
    const titles=new Set();
    for(const route of [...new Set([...representative,...allStudies])]) {
      const response=await context.request.get(base+route);assert.equal(response.status(),200,route);
      const html=await response.text();const title=html.match(/<title>(.*?)<\/title>/)?.[1];
      assert.ok(title);assert.ok(!titles.has(title),'Duplicate title');titles.add(title);
      assert.ok(html.includes('noindex'));report.routes.push({route,status:200,title});
    }
    assert.equal((await context.request.get(base+'/projects/unknown-study')).status(),404);
    for(const sector of ['Residential','Hospitality','Commercial']) {
      await page.getByRole('radio',{name:sector,exact:true}).check();
      assert.equal(await page.locator('.project-study-card').count(),2);
      assert.match(await page.locator('.project-result-count').innerText(),new RegExp(`2 studies · ${sector}`));
    }
    await audit('Commercial filter / desktop');
    await page.getByRole('radio',{name:'All',exact:true}).check();
    assert.equal(await page.locator('.project-study-card').count(),6);
    await page.getByRole('radio',{name:'Residential',exact:true}).focus();await page.keyboard.press('ArrowRight');
    assert.ok(await page.getByRole('radio',{name:'Hospitality',exact:true}).isChecked());
    await page.locator('.project-study-card a').first().click();await page.waitForURL('**/projects/a-warmer-welcome');
    await page.getByRole('link',{name:'Use this as a starting point'}).click();await page.waitForURL('**/bespoke/inquiry');
    assert.equal(await page.locator('#inquiry-sector').inputValue(),'Hospitality');
    assert.equal(await page.locator('#inquiry-interest').inputValue(),'An architectural / trade project');
    assert.match(await page.locator('.inquiry-aside').innerText(),/Interior study: A warmer welcome/);
    assert.equal(await page.evaluate(()=>getComputedStyle(document.body).backgroundColor),'rgb(244, 240, 232)');
    await page.getByLabel('Your idea').fill('Keep this note when changing request context.');
    await page.getByRole('link',{name:'Contact',exact:true}).first().click();await page.waitForURL('**/contact');
    await page.getByRole('link',{name:'Prepare a material inquiry'}).click();await page.waitForURL('**/bespoke/inquiry');
    assert.match(await page.locator('.inquiry-aside').innerText(),/Material \/ sample discussion/);
    assert.equal(await page.getByLabel('Your idea').inputValue(),'Keep this note when changing request context.');
    report.interactions.push('All sector filters and keyboard radio navigation; study-to-inquiry context; request changes preserve notes; dark theme releases on legacy route');
    await page.goto(base+'/trade');
    const downloadPromise=page.waitForEvent('download');await page.getByRole('link',{name:'Download the checklist'}).click();
    const download=await downloadPromise;assert.equal(download.suggestedFilename(),'SH-MARBLES-trade-brief-checklist.txt');
    const checklist=fs.readFileSync(await download.path(),'utf8');assert.match(checklist,/DRAWINGS AND REFERENCES/);assert.match(checklist,/does not send it/);
    await page.getByRole('link',{name:'Prepare a drawing request'}).click();await page.waitForURL('**/bespoke/inquiry');
    assert.match(await page.locator('.inquiry-aside').innerText(),/CAD \/ technical drawing request/);
    await page.getByRole('link',{name:'Trade',exact:true}).first().click();await page.waitForURL('**/trade');
    await page.getByRole('link',{name:'Prepare a sample request'}).click();await page.waitForURL('**/bespoke/inquiry');
    assert.match(await page.locator('.inquiry-aside').innerText(),/Trade sample and finish request/);
    report.interactions.push('Trade checklist downloads actual planning content; drawing and sample contexts reach the detailed brief');
    await page.goto(base+'/craftsmanship');
    assert.equal(await page.locator('.craft-stage-list details').count(),7);
    const polishing=page.locator('.craft-stage-list details').filter({has:page.getByRole('heading',{name:'Polishing',exact:true})});
    await polishing.locator('summary').focus();await page.keyboard.press('Enter');assert.ok(await polishing.evaluate(element=>element.open));
    await page.setViewportSize({width:390,height:900});await audit('Craft stages expanded / mobile');
    await page.getByRole('button',{name:'Menu',exact:true}).click();await audit('Expanded eight-page mobile navigation');
    assert.equal(await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link').count(),9);
    await page.keyboard.press('Escape');assert.ok(await page.getByRole('button',{name:'Menu',exact:true}).evaluate(element=>element===document.activeElement));
    await page.getByRole('button',{name:'Menu',exact:true}).click();
    await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:/Contact/}).click();
    await page.waitForURL('**/contact');assert.ok(!(await page.locator('#mobile-menu').isVisible()));
    assert.equal(await page.evaluate(()=>document.body.style.overflow),'');
    assert.equal(await page.locator('a[href^="mailto:"],a[href^="tel:"],a[href*="wa.me"]').count(),0);
    await page.getByRole('link',{name:'Prepare a trade brief'}).click();await page.waitForURL('**/bespoke/inquiry');
    assert.equal(await page.locator('#inquiry-interest').inputValue(),'An architectural / trade project');
    report.interactions.push('Craft disclosure keyboard controls; expanded menu scroll, Escape, focus and navigation; contact routing without fabricated contact links');
    const nojs=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:900}});
    const staticPage=await nojs.newPage();await staticPage.goto(base+'/projects');assert.equal(await staticPage.locator('.project-study-card').count(),6);
    await staticPage.goto(base+'/craftsmanship');await staticPage.locator('.craft-stage-list summary').nth(1).click();assert.ok(await staticPage.locator('.craft-stage-list details').nth(1).evaluate(element=>element.open));await nojs.close();
    report.interactions.push('Interior studies render without JavaScript; native craft disclosures work without JavaScript');
    assert.equal(report.errors.length,0,JSON.stringify(report.errors));console.log('Phase 9 interactions and accessibility passed.');
  } finally {fs.writeFileSync(path.join(output,'qa-results.json'),JSON.stringify(report,null,2));await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
