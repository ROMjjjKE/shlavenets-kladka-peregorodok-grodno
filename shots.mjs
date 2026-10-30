import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = []; p.on('pageerror', e => errs.push(e.message));
p.on('requestfailed', r => errs.push('FAIL ' + r.url().split('/').pop()));
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4320/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
await p.evaluate(() => document.querySelectorAll('.fx').forEach(e => e.classList.add('in')));
await new Promise(r => setTimeout(r, 400));
await p.screenshot({ path: 'shot-hero.png' });
for (const [id, name] of [['otdelka','shot-otdelka'], ['works','shot-works']]) {
  const y = await p.evaluate(s => Math.round(document.querySelector('#' + s).getBoundingClientRect().top + window.scrollY), id);
  await p.evaluate(v => window.scrollTo({ top: v - 20, behavior: 'instant' }), y);
  await new Promise(r => setTimeout(r, 900));
  await p.screenshot({ path: name + '.png' });
}
// полная высота галереи
await p.setViewport({ width: 1440, height: 2200 });
await p.evaluate(() => window.scrollTo(0, document.querySelector('#works').getBoundingClientRect().top + window.scrollY - 20));
await new Promise(r => setTimeout(r, 900));
await p.screenshot({ path: 'shot-works-full.png' });
console.log('imgs loaded:', await p.evaluate(() => [...document.images].filter(i => i.complete && i.naturalWidth > 0).length + '/' + document.images.length));
console.log('errors:', errs);
await b.close();
