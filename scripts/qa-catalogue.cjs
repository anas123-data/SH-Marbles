const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

async function main() {
  const base = process.env.QA_BASE_URL || 'http://127.0.0.1:3000';
  const output = path.resolve('output/playwright/catalogue');
  fs.mkdirSync(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, channel: process.env.QA_BROWSER_CHANNEL || 'msedge' });
  // A focused rerun can retain already-passed evidence when a later route needs repair.
  const prior = process.env.QA_RESUME && fs.existsSync(path.join(output, 'qa-results.json')) ? JSON.parse(fs.readFileSync(path.join(output, 'qa-results.json'), 'utf8')) : null;
  const report = { responsive: prior?.responsive.filter(item => !item.route.startsWith('/stone-library')) ?? [], routes: [], interactions: [], accessibility: prior?.accessibility.filter(item => !item.state.startsWith('/stone-library')) ?? [], errors: [] };
  try {
    const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'], acceptDownloads: true, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => report.errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error' && !message.text().includes('404')) report.errors.push(message.text()); });
    const allRepresentative = ['/collections', '/collections/basins', '/products/fluted-rectangular-basin', '/stone-library', '/stone-library/burgundy'];
    const representative = process.env.QA_RESUME ? allRepresentative.filter(route => route.startsWith('/stone-library')) : allRepresentative;
    const routes = new Set(['/', ...allRepresentative]);
    async function audit(state) {
      const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','wcag22aa']).analyze();
      const violations = result.violations.map(item => ({ id: item.id, impact: item.impact, nodes: item.nodes.map(node => ({ target: node.target, summary: node.failureSummary })) }));
      report.accessibility.push({ state, violations });
      assert.equal(violations.length, 0, `Axe failed: ${state}: ${JSON.stringify(violations)}`);
    }
    for (const route of representative) {
      for (const width of [375,390,430,768,1024,1440,1920]) {
        await page.setViewportSize({ width, height: 950 });
        assert.equal((await page.goto(base + route, { waitUntil: 'networkidle' })).status(), 200);
        await page.evaluate(() => document.fonts.ready);
        // Visit the lazy-loaded regions before evaluating images or making full-page captures.
        await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 650) { scrollTo(0, y); await new Promise(resolve => setTimeout(resolve, 40)); } });
        await page.waitForFunction(() => [...document.images].filter(img => img.getClientRects().length).every(img => img.complete && img.naturalWidth > 0));
        const state = await page.evaluate(() => ({ width: innerWidth, documentWidth: document.documentElement.scrollWidth, headings: document.querySelectorAll('h1').length, missingAlt: [...document.images].filter(img => !img.hasAttribute('alt')).length, links: [...document.querySelectorAll('a[href^="/"]')].map(link => link.getAttribute('href').split('#')[0]) }));
        assert.ok(state.documentWidth <= width, `${route}: overflow at ${width}: ${state.documentWidth}`);
        assert.equal(state.headings, 1); assert.equal(state.missingAlt, 0);
        state.links.forEach(link => routes.add(link || '/'));
        report.responsive.push({ route, width, documentWidth: state.documentWidth, imagesLoaded: true });
        await page.evaluate(() => scrollTo(0, 0));
        if (width === 390 || width === 1440) {
          await page.screenshot({ path: path.join(output, `${route.replaceAll('/', '-').slice(1)}-${width}.png`), fullPage: true });
          await audit(`${route} / ${width}`);
        }
      }
      console.log(`Responsive and accessibility passed: ${route}`);
    }
    // Follow every actual catalogue link, including products found on category pages.
    const seen = new Set(); const titles = new Set();
    for (const route of routes) {
      if (seen.has(route)) continue;
      seen.add(route);
      const response = await context.request.get(base + route);
      assert.equal(response.status(), 200, route);
      const html = await response.text();
      const title = html.match(/<title>(.*?)<\/title>/)?.[1];
      assert.ok(title, `Missing title: ${route}`); assert.ok(!titles.has(title), `Duplicate title: ${route}`); titles.add(title);
      assert.ok(html.includes('noindex'), `Preview unexpectedly indexable: ${route}`);
      for (const match of html.matchAll(/href="(\/(?:products|collections|stone-library)[^"#?]*)"/g)) routes.add(match[1]);
      report.routes.push({ route, status: response.status(), title });
    }
    for (const route of ['/collections/missing', '/products/missing', '/stone-library/missing']) {
      assert.equal((await context.request.get(base + route)).status(), 404, route);
    }
    report.interactions.push('All linked routes return 200 with unique metadata; unknown categories/products/materials return 404');

    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(base + '/collections');
    await page.keyboard.press('Tab');
    assert.ok(await page.locator('.skip-link').evaluate(element => element === document.activeElement));
    await page.getByLabel('Collection', { exact: true }).selectOption('basins');
    assert.equal(await page.locator('.product-card').count(), 6);
    await page.getByLabel('Find a piece').fill('fluted');
    assert.equal(await page.locator('.product-card').count(), 2);
    await page.getByLabel('Find a piece').fill('no-such-piece');
    assert.ok(await page.getByRole('heading', { name: 'A different direction?' }).isVisible());
    await page.getByRole('button', { name: 'Show all pieces' }).click();
    assert.equal(await page.locator('.product-card').count(), 8);
    report.interactions.push('Product category/search combinations, empty state and reset; keyboard skip link');

    await page.goto(base + '/products/fluted-rectangular-basin');
    await page.getByRole('button', { name: /View image 2:/ }).click();
    assert.match(await page.locator('.gallery-stage img').getAttribute('src'), /fluted-basin-kitchen/);
    await page.getByRole('button', { name: 'View full image' }).click();
    assert.ok(await page.locator('.image-dialog').isVisible());
    await page.getByRole('button', { name: 'Next →', exact: true }).click();
    assert.match(await page.locator('.image-dialog-bar').innerText(), /3 \/ 3/);
    await audit('Full image dialog');
    await page.keyboard.press('Escape');
    assert.ok(await page.getByRole('button', { name: 'View full image' }).evaluate(element => element === document.activeElement));
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    await page.getByRole('button', { name: 'Request price', exact: true }).click();
    assert.match(await page.locator('.brief-context').innerText(), /Fluted rectangular basin/);
    assert.match(await page.locator('.brief-context').innerText(), /Burgundy/);
    assert.match(await page.locator('.brief-context').innerText(), /Price enquiry/);
    await page.getByRole('button', { name: 'Copy brief', exact: true }).click();
    await page.waitForFunction(() => document.querySelector('.brief-status').textContent.includes('copied'));
    let copied = await page.evaluate(() => navigator.clipboard.readText());
    assert.match(copied, /Reference piece: Fluted rectangular basin/);
    assert.match(copied, /This brief has not been submitted/);
    await audit('Product project brief');
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Customize this piece', exact: true }).click();
    assert.match(await page.locator('.brief-context').innerText(), /Customization enquiry/);
    await page.keyboard.press('Escape');
    await page.getByText('Shipping & installation', { exact: true }).click();
    assert.equal(await page.locator('details[open]').count(), 1);
    report.interactions.push('Gallery selection, full-image next/close, keyboard focus/body-scroll restoration, product price/customization contexts and copied brief, specification accordion');

    await page.goto(base + '/stone-library');
    await page.getByLabel('Tone', { exact: true }).selectOption('warm');
    assert.equal(await page.locator('.stone-card').count(), 2);
    await page.getByLabel('Pattern', { exact: true }).selectOption('veined');
    assert.equal(await page.locator('.stone-card').count(), 0);
    await page.getByRole('button', { name: 'Show all stone studies' }).click();
    await page.getByLabel('Find a direction').fill('rose');
    assert.equal(await page.locator('.stone-card').count(), 1);
    await page.getByRole('button', { name: 'Reset filters' }).click();
    for (const name of ['Ink & ivory', 'Warm ivory', 'Burgundy']) await page.getByRole('button', { name: `Compare ${name}`, exact: true }).click();
    assert.ok(await page.getByRole('button', { name: 'Compare Rose', exact: true }).isDisabled());
    await page.getByRole('button', { name: 'Compare (3)', exact: true }).click();
    assert.equal(await page.locator('.comparison-grid article').count(), 3);
    await audit('Three-stone comparison desktop');
    await page.setViewportSize({ width: 390, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: path.join(output, 'comparison-mobile.png') });
    await audit('Three-stone comparison mobile');
    await page.keyboard.press('Escape');
    assert.ok(await page.getByRole('button', { name: 'Compare (3)', exact: true }).evaluate(element => element === document.activeElement));
    await page.getByRole('button', { name: 'Remove Burgundy from comparison' }).click();
    assert.ok(!(await page.getByRole('button', { name: 'Compare Rose', exact: true }).isDisabled()));
    await page.getByRole('button', { name: 'Add to brief', exact: true }).click();
    assert.match(await page.locator('.brief-context').innerText(), /Ink & ivory, Warm ivory/);
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download brief', exact: true }).click();
    const download = await downloadPromise;
    await download.saveAs(path.join(output, 'comparison-brief.txt'));
    copied = fs.readFileSync(path.join(output, 'comparison-brief.txt'), 'utf8');
    assert.match(copied, /Material direction: Ink & ivory, Warm ivory/);
    assert.ok(!copied.includes('Reference piece:'), 'Stale product reference leaked into material brief');
    await page.getByRole('button', { name: 'Remove reference' }).click();
    assert.equal(await page.locator('.brief-context').count(), 0);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Clear selection', exact: true }).click();
    assert.equal(await page.locator('.compare-dock').count(), 0);
    report.interactions.push('Stone search, combined filters, empty/reset, three-item limit, removal, comparison on desktop/mobile, material download handoff, no stale product context, clear selection');

    await page.goto(base + '/stone-library/rose');
    await page.getByRole('button', { name: 'Consider this direction' }).click();
    assert.match(await page.locator('.brief-context').innerText(), /Rose/);
    assert.match(await page.locator('.brief-context').innerText(), /sample options/);
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'Menu', exact: true }).click();
    await audit('Mobile navigation');
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: /Collections/ }).click();
    await page.waitForURL(base + '/collections');
    assert.ok(!(await page.locator('#mobile-menu').isVisible()));
    assert.equal(await page.evaluate(() => document.body.style.overflow), '');
    assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior), 'auto');
    report.interactions.push('Material sample context; mobile cross-page navigation closes menu and restores scroll; reduced motion');

    const noJs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const staticPage = await noJs.newPage();
    for (const route of ['/collections', '/stone-library']) {
      await staticPage.goto(base + route);
      assert.equal(await staticPage.locator('h1').count(), 1);
      assert.ok(await staticPage.locator(route === '/collections' ? '.product-card' : '.stone-card').count() > 0);
    }
    await noJs.close();
    report.interactions.push('Primary collection and material content rendered without JavaScript');
    assert.equal(report.errors.length, 0, JSON.stringify(report.errors));
  } finally {
    fs.writeFileSync(path.join(output, 'qa-results.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify({ responsiveChecks: report.responsive.length, routes: report.routes.length, interactions: report.interactions, accessibility: report.accessibility.map(item => ({ state: item.state, violations: item.violations.length })), errors: report.errors }, null, 2));
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
