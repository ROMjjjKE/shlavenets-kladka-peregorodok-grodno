import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const bad = []; p.on('requestfailed', r => bad.push(r.url()));
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 600));
console.log(await p.evaluate(() => ({
  h1font: getComputedStyle(document.querySelector('h1')).fontFamily.slice(0, 34),
  voll: document.fonts.check('700 40px Vollkorn'),
  mont: document.fonts.check('600 14px Montserrat'),
  faces: [...document.fonts].filter(f => f.status === 'loaded').length,
})), 'failed:', bad.length);
await b.close();
