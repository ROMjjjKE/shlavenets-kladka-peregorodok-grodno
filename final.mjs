import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4320/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
await p.evaluate(() => document.querySelectorAll('.fx').forEach(e => e.classList.add('in')));
await new Promise(r => setTimeout(r, 300));
await p.screenshot({ path: 'screenshots/desktop-1440.png' });
const shoot = async (sel, name, w = 1440, h = 900) => {
  await p.setViewport({ width: w, height: h });
  await p.evaluate(s => window.scrollTo({ top: Math.round(document.querySelector(s).getBoundingClientRect().top + window.scrollY) - 40, behavior: 'instant' }), sel);
  await new Promise(r => setTimeout(r, 1000));
  await p.screenshot({ path: 'screenshots/' + name + '.png' });
};
await shoot('#otdelka', 'desktop-otdelka', 1440, 1200);
await shoot('#works', 'desktop-raboty', 1440, 1900);
const p2 = await b.newPage();
await p2.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await p2.goto('http://127.0.0.1:4320/', { waitUntil: 'networkidle2' });
await p2.evaluate(() => document.querySelectorAll('.fx').forEach(e => e.classList.add('in')));
await new Promise(r => setTimeout(r, 800));
await p2.screenshot({ path: 'screenshots/mobile-390.png' });
for (const [sel, name] of [['#otdelka', 'mobile-390-otdelka'], ['#works', 'mobile-390-raboty']]) {
  await p2.evaluate(s => window.scrollTo({ top: Math.round(document.querySelector(s).getBoundingClientRect().top + window.scrollY) - 20, behavior: 'instant' }), sel);
  await new Promise(r => setTimeout(r, 900));
  await p2.screenshot({ path: 'screenshots/' + name + '.png' });
}
console.log('shots ok');
await b.close();
