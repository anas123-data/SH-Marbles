// Browser validation of the internal design-system board, not the future website.
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

(async () => {
  const root = path.resolve(__dirname, '..');
  const output = path.join(root, 'output', 'playwright');
  fs.mkdirSync(output, {recursive: true});
  const browser = await chromium.launch({headless: true, ...(process.env.QA_BROWSER_CHANNEL ? {channel:process.env.QA_BROWSER_CHANNEL} : {})});
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', msg => { if(msg.type() === 'error') errors.push(msg.text()); });
  const widths = [375, 390, 430, 768, 1024, 1440, 1920];
  const report = {viewports: [], interactions: [], contrast: [], errors};
  for (const width of widths) {
    await page.setViewportSize({width, height: 1000});
    const response = await page.goto('http://127.0.0.1:4173/design-system/');
    assert.equal(response.status(), 200);
    await page.evaluate(() => document.fonts.ready);
    // Load every lazy image before checking; then return to the cover.
    await page.locator('#image-notes').scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.images].every(img => img.complete && img.naturalWidth > 0));
    await page.evaluate(() => scrollTo({top:0,behavior:'instant'}));
    const result = await page.evaluate(() => ({
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      images: [...document.images].map(img => ({loaded: img.naturalWidth>0, alt: !!img.alt})),
      fonts: document.fonts.check('16px Manrope') && document.fonts.check('16px "Cormorant Garamond"'),
      missingAnchors: [...document.querySelectorAll('a[href^="#"]')].filter(a => !document.querySelector(a.getAttribute('href'))).map(a => a.getAttribute('href')),
    }));
    assert.ok(result.documentWidth <= width, `Overflow at ${width}: ${result.documentWidth}`);
    assert.ok(result.fonts, 'Fonts failed');
    assert.equal(result.missingAnchors.length, 0);
    assert.ok(result.images.every(i => i.loaded && i.alt));
    report.viewports.push(result);
    await page.screenshot({path: path.join(output, `board-${width}.png`), fullPage:true});
    if (width === 390 || width === 1440) await page.screenshot({path:path.join(output, `cover-${width}.png`)});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.reload();
  await page.keyboard.press('Tab');
  assert.equal(await page.locator('.skip-link').evaluate(e => e === document.activeElement), true);
  report.interactions.push('Keyboard Tab reaches visible skip link');
  await page.locator('#primary-demo').click();
  assert.equal(await page.locator('#demo-name').evaluate(e => e === document.activeElement), true);
  await page.getByRole('button', {name:'Check example'}).click();
  assert.equal(await page.locator('#demo-name').getAttribute('aria-invalid'), 'true');
  assert.equal(await page.locator('#name-error').isVisible(), true);
  await page.locator('#demo-name').fill('   ');
  await page.getByRole('button', {name:'Check example'}).click();
  assert.equal(await page.locator('#demo-name').getAttribute('aria-invalid'), 'true');
  await page.locator('#demo-name').fill('Design review');
  await page.getByRole('button', {name:'Check example'}).click();
  assert.match(await page.locator('#form-status').textContent(), /Nothing was sent or saved/);
  await page.getByRole('button', {name:'Reset', exact:true}).click();
  assert.equal(await page.locator('#demo-name').inputValue(), '');
  report.interactions.push('Primary action focus; empty/whitespace validation; sample success; reset');
  await page.getByRole('radio', {name:'Dark',exact:true}).check();
  assert.match(await page.locator('#tone-status').textContent(), /Dark tone selected/);
  await page.getByRole('radio', {name:'Light',exact:true}).focus();
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.getByRole('radio', {name:'Warm',exact:true}).isChecked(), true);
  report.interactions.push('Radio click and keyboard arrow selection');
  await page.getByText('How will material choices be presented?', {exact:true}).click();
  assert.equal(await page.locator('.disclosure').first().getAttribute('open'), '');
  report.interactions.push('Native disclosure opens');
  await page.setViewportSize({width:390,height:844});
  await page.locator('.mobile-nav summary').click();
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('.mobile-nav').getAttribute('open'), null);
  assert.equal(await page.locator('.mobile-nav summary').evaluate(e => e===document.activeElement), true);
  await page.locator('.mobile-nav summary').click();
  await page.locator('.mobile-nav a[href="#components"]').click();
  assert.equal(await page.locator('.mobile-nav').getAttribute('open'), null);
  report.interactions.push('Mobile menu closes on Escape (focus retained) and navigation');
  await page.emulateMedia({reducedMotion:'reduce'});
  const reduced = await page.evaluate(() => ({scroll:getComputedStyle(document.documentElement).scrollBehavior,transition:getComputedStyle(document.querySelector('.image-frame img')).transitionDuration}));
  assert.equal(reduced.scroll,'auto');
  assert.equal(reduced.transition,'0s');
  report.interactions.push('Reduced motion: native immediate scroll and zero-duration transitions');
  // Reflow check equivalent to a 750px layout at 200% browser zoom.
  await page.setViewportSize({width:375,height:700});
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  function luminance(hex) {
    const rgb = hex.match(/[0-9a-f]{2}/gi).map(v => parseInt(v,16)/255).map(v => v <= .04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
    return .2126*rgb[0]+.7152*rgb[1]+.0722*rgb[2];
  }
  for(const [name,fg,bg,min] of [
    ['Ink on paper','#252821','#f4f0e8',4.5],
    ['Muted on paper','#626157','#f4f0e8',4.5],
    ['Muted on limestone','#626157','#e6ded1',4.5],
    ['Bronze on paper','#806342','#f4f0e8',4.5],
    ['Error on paper','#9a382c','#f4f0e8',4.5],
    ['Control on chalk','#858075','#fcfaf6',3],
    ['Control on paper','#858075','#f4f0e8',3],
    ['Dark-section muted','#c9c0b2','#252821',4.5],
  ]) {
    const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
    report.contrast.push({name,ratio:Number(ratio.toFixed(2)),minimum:min});
    assert.ok(ratio>=min, `${name} contrast ${ratio}`);
  }
  assert.equal(errors.length,0,errors.join('\n'));
  fs.writeFileSync(path.join(output,'review-results.json'),JSON.stringify(report,null,2));
  await browser.close();
  console.log(JSON.stringify(report,null,2));
})().catch(error => {console.error(error);process.exit(1)});
