import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4322/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 700));
console.log(await p.evaluate(() => ({
  overlays: [...document.querySelectorAll('body *')].filter(e => {
    const s = getComputedStyle(e);
    return s.position === 'fixed' && +s.zIndex > 9000 && parseFloat(s.width) > 200;
  }).map(e => e.className || e.tagName),
  textHasBrand: /SiteFast|МАКЕТ/i.test(document.body.innerText),
  sections: document.querySelectorAll('section').length,
})));
await p.screenshot({ path: 'shots/watermark-clean-1440.png' });
await b.close();
