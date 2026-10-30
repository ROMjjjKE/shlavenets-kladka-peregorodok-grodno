import puppeteer from 'puppeteer-core';
const U = 'https://romjjjke.github.io/shlavenets-kladka-peregorodok-grodno/';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto(U, { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 800));
await p.evaluate(() => document.querySelectorAll('.fx').forEach(e => e.classList.add('in')));
await new Promise(r => setTimeout(r, 300));
await p.screenshot({ path: 'screenshots/desktop-1440.png' });
const shoot = async (sel, name, h) => {
  await p.setViewport({ width: 1440, height: h });
  await p.evaluate(s => window.scrollTo({ top: Math.round(document.querySelector(s).getBoundingClientRect().top + window.scrollY) - 30, behavior: 'instant' }), sel);
  await new Promise(r => setTimeout(r, 1100));
  await p.screenshot({ path: 'screenshots/' + name + '.png' });
};
await shoot('#otdelka', 'desktop-otdelka', 1180);
await shoot('#works', 'desktop-raboty', 1900);
const p2 = await b.newPage();
await p2.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await p2.goto(U, { waitUntil: 'networkidle2' });
await p2.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
await p2.evaluate(() => document.querySelectorAll('.fx').forEach(e => e.classList.add('in')));
await p2.screenshot({ path: 'screenshots/mobile-390.png' });
for (const [s, n, h] of [['#otdelka', 'mobile-390-otdelka', 1500], ['#works', 'mobile-390-raboty', 1800]]) {
  await p2.setViewport({ width: 390, height: h, deviceScaleFactor: 2 });
  await p2.evaluate(sel => window.scrollTo({ top: Math.round(document.querySelector(sel).getBoundingClientRect().top + window.scrollY) - 20, behavior: 'instant' }), s);
  await new Promise(r => setTimeout(r, 1000));
  await p2.screenshot({ path: 'screenshots/' + n + '.png' });
}
console.log('live shots ok');
await b.close();
