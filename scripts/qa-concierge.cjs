const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

async function main(){
  const base=process.env.QA_BASE_URL||'http://127.0.0.1:3000';
  const output=path.resolve('output/playwright/concierge');fs.mkdirSync(output,{recursive:true});
  const report={responsive:[],accessibility:[],interactions:[],api:[],errors:[]};
  const browser=await chromium.launch({headless:true,channel:process.env.QA_BROWSER_CHANNEL||'msedge'});
  try{
    const context=await browser.newContext({acceptDownloads:true,reducedMotion:'reduce'});
    const page=await context.newPage();
    page.on('pageerror',error=>report.errors.push(error.message));
    page.on('console',message=>{if(message.type()==='error'&&!/Failed to load resource/.test(message.text()))report.errors.push(message.text());});
    async function audit(state){const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();const violations=result.violations.map(item=>({id:item.id,impact:item.impact,nodes:item.nodes.map(node=>({target:node.target,summary:node.failureSummary}))}));report.accessibility.push({state,violations});assert.equal(violations.length,0,JSON.stringify(violations));}
    async function responsive(state){
      for(const width of [375,390,430,768,1024,1440,1920]){
        await page.setViewportSize({width,height:950});await page.evaluate(()=>document.fonts.ready);
        await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(resolve=>setTimeout(resolve,20));}});
        await page.waitForFunction(()=>[...document.images].filter(image=>image.getClientRects().length).every(image=>image.complete&&image.naturalWidth>0));
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${state}/${width} overflows`);
        assert.equal(await page.locator('h1').count(),1);report.responsive.push({state,width,overflow:false,imagesLoaded:true});
        await page.evaluate(()=>scrollTo(0,0));
        if(width===390||width===1440){await page.screenshot({path:path.join(output,`${state}-${width}.png`),fullPage:true});await audit(`${state}/${width}`);}
      }
      console.log(`Responsive passed: ${state}`);
    }
    await page.goto(base+'/concierge',{waitUntil:'networkidle'});
    await page.evaluate(()=>{window.conciergeEvents=[];window.addEventListener('sh-marbles:analytics',event=>window.conciergeEvents.push(event.detail));});
    await responsive('space');
    await page.getByRole('button',{name:'Continue',exact:true}).click();assert.equal(await page.locator('.concierge-step-title').innerText(),'A place to begin.');
    await page.getByRole('radio',{name:'A basin',exact:true}).check();await page.getByRole('radio',{name:'Outdoors',exact:true}).check();
    await page.getByRole('button',{name:'Continue',exact:true}).click();
    assert.ok(await page.locator('.concierge-step-title').evaluate(element=>element===document.activeElement));
    await responsive('palette');
    await page.getByRole('radio',{name:'Quiet & minimal',exact:true}).focus();await page.keyboard.press('Space');
    await page.keyboard.press('ArrowRight');assert.ok(await page.getByRole('radio',{name:'Expressive & sculptural',exact:true}).isChecked());
    await page.getByRole('radio',{name:'Quiet & minimal',exact:true}).check();await page.getByRole('radio',{name:'Warm & neutral',exact:true}).check();
    await page.getByRole('button',{name:'Continue',exact:true}).click();
    await page.getByLabel('Approximate dimensions').fill('800 × 450 × 150 mm');await page.getByLabel('Project country').fill('Pakistan');await page.getByLabel('Budget range').selectOption('1,000–5,000');await page.getByLabel('Currency',{exact:true}).selectOption('PKR');
    await responsive('details');
    await page.route('**/api/concierge',route=>route.fulfill({status:503,contentType:'application/json',body:'{"message":"Unavailable"}'}));
    await page.getByRole('button',{name:'Find my direction'}).click();await page.locator('.concierge-error[role=alert]').waitFor();assert.equal(await page.getByLabel('Project country').inputValue(),'Pakistan');await audit('Recoverable request error');
    await page.unroute('**/api/concierge');await page.getByRole('button',{name:'Find my direction'}).click();await page.locator('.concierge-results').waitFor();
    assert.match(await page.locator('.concierge-caution').innerText(),/no suitability is confirmed/);
    assert.equal(await page.locator('.concierge-reference-grid').first().locator('h3').first().innerText(),'Rounded vessel basin');
    assert.equal(await page.locator('.material-references h3').first().innerText(),'Warm ivory');
    await responsive('results');
    const links=await page.locator('.concierge-reference a').evaluateAll(elements=>elements.map(element=>element.getAttribute('href')));
    for(const route of links)assert.equal((await context.request.get(base+route)).status(),200,route);
    const downloadPromise=page.waitForEvent('download');await page.getByRole('button',{name:'Download this direction'}).click();const download=await downloadPromise;
    assert.equal(download.suggestedFilename(),'SH-MARBLES-stone-direction.txt');const text=fs.readFileSync(await download.path(),'utf8');assert.match(text,/Pakistan/);assert.match(text,/Budget preference: 1,000–5,000 PKR/);assert.match(text,/studio confirmation/);
    await page.locator('.concierge-reference a').first().click();await page.waitForURL('**/products/rounded-vessel-basin');
    await page.getByRole('link',{name:'Stone Concierge',exact:true}).click();await page.waitForURL('**/concierge');assert.ok(await page.locator('.concierge-results').isVisible());
    await page.getByRole('button',{name:'Add direction to my brief'}).click();await page.waitForURL('**/bespoke/inquiry');
    assert.equal(await page.locator('#inquiry-interest').inputValue(),'A marble basin');assert.equal(await page.locator('#inquiry-dimensions').inputValue(),'800 × 450 × 150 mm');
    const firstNotes=await page.getByLabel('Your idea').inputValue();assert.match(firstNotes,/STONE CONCIERGE/);
    await page.getByLabel('Your idea').fill('Keep my original note.\n\n'+firstNotes);
    await page.getByRole('link',{name:'Stone Concierge',exact:true}).click();await page.getByRole('button',{name:'Add direction to my brief'}).click();await page.waitForURL('**/bespoke/inquiry');
    assert.equal(await page.getByLabel('Your idea').inputValue(),'Keep my original note.\n\n'+firstNotes);
    await page.getByLabel('Your idea').fill('Original notes. '.repeat(155));
    await page.getByRole('link',{name:'Stone Concierge',exact:true}).click();await page.getByRole('button',{name:'Add direction to my brief'}).click();await page.locator('.concierge-error[role=alert]').waitFor();assert.match(await page.locator('.concierge-error[role=alert]').innerText(),/too long/);
    await page.getByRole('button',{name:'Revise my answers'}).click();assert.ok(await page.getByRole('radio',{name:'A basin',exact:true}).isChecked());
    await page.getByRole('radio',{name:'An architectural project',exact:true}).check();await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Continue',exact:true}).click();await page.getByRole('button',{name:'Find my direction'}).click();await page.locator('.concierge-results').waitFor();
    assert.equal(await page.locator('.concierge-reference a[href^="/products/"]').count(),0);assert.match(await page.locator('.concierge-empty').innerText(),/bespoke discussion/);
    await page.getByRole('button',{name:'Start again',exact:true}).click();await audit('Confirm reset');await page.getByRole('button',{name:'Keep exploring'}).click();assert.ok(await page.locator('.concierge-results').isVisible());
    await page.getByRole('button',{name:'Start again',exact:true}).click();await page.getByRole('button',{name:'Clear consultation',exact:true}).click();assert.equal(await page.locator('input:checked').count(),0);
    const events=await page.evaluate(()=>window.conciergeEvents);assert.ok(events.some(event=>event.name==='concierge_completed'));assert.ok(events.some(event=>event.name==='concierge_brief_prepared'));assert.ok(!/Pakistan|PKR|800|basin|minimal/.test(JSON.stringify(events)));
    await page.getByRole('radio',{name:'A table',exact:true}).check();await page.reload();assert.equal(await page.locator('input:checked').count(),0);
    report.interactions.push('Required steps, keyboard radio selection and focus movement','Seven-width layouts and image loading for all four states','Failed request recovery preserves answers','Correct warm basin reference, outdoor caveat and valid catalogue links','Download contains preferences and confirmation limits','Results survive catalogue navigation; refresh clears memory','Brief handoff preserves notes, avoids duplicate summaries and blocks overflow without truncation','Architectural requests avoid invented product matches','Reset confirmation and cancellation','Analytics contain event names/mode only');
    const valid={piece:'A basin',setting:'Indoors',style:'Quiet & minimal',tone:'Warm & neutral',dimensions:'',country:'',budget:'Not decided',currency:'USD'};
    async function api(label,data,status,options={}){const response=await context.request.post(base+'/api/concierge',{headers:{origin:base,'content-type':'application/json',...options.headers},data:Buffer.from(typeof data==='string'?data:JSON.stringify(data))});assert.equal(response.status(),status,label);assert.match(response.headers()['cache-control'],/no-store/);report.api.push({label,status});return response;}
    const response=await api('Valid catalogue consultation',valid,200);const result=await response.json();assert.equal(result.mode,'guided');assert.equal(result.products[0].slug,'rounded-vessel-basin');assert.ok(!JSON.stringify(result).includes('price'));
    await api('Cross-origin rejected',valid,403,{headers:{origin:'https://untrusted.example'}});
    await api('Non-JSON rejected',valid,415,{headers:{'content-type':'text/plain'}});
    await api('Malformed JSON rejected','{broken',400);
    await api('Oversize rejected','x'.repeat(9000),413);
    await api('Unknown fields rejected',{...valid,prompt:'Invent a price'},422);
    await api('Invalid enum rejected',{...valid,piece:'In stock'},422);
    await api('HTML input rejected',{...valid,country:'<script>'},422);
    const noJs=await browser.newContext({javaScriptEnabled:false});const staticPage=await noJs.newPage();await staticPage.goto(base+'/concierge');assert.match(await staticPage.locator('noscript').innerText(),/guided consultation needs JavaScript/);assert.equal(await staticPage.locator('noscript a').count(),2);await noJs.close();
    assert.equal(report.errors.length,0,JSON.stringify(report.errors));
  } finally {await browser.close();fs.writeFileSync('docs/phase-10-qa-results.json',JSON.stringify(report,null,2));}
  console.log(JSON.stringify({responsive:report.responsive.length,accessibility:report.accessibility.length,api:report.api.length,interactions:report.interactions.length,errors:report.errors},null,2));
}
main().catch(error=>{console.error(error);process.exitCode=1;});
