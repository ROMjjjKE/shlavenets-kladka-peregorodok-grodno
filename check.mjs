import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4320/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.querySelectorAll('.fx').forEach(e => e.classList.add('in')));
await new Promise(r => setTimeout(r, 600));
console.log(await p.evaluate(() => {
  const newImgs = [...document.querySelectorAll('#works .gcell img')];
  return {
    cards: document.querySelectorAll('#otdelka .svc').length,
    galleryCells: document.querySelectorAll('#works .gcell').length,
    loaded: newImgs.filter(i => i.naturalWidth > 0).length + '/' + newImgs.length,
    noSizes: newImgs.filter(i => !i.getAttribute('srcset')).length,
    lbImgEmpty: (() => { const i = document.querySelector('.lbbox img'); return i && !i.src; })(),
    navHasOtdelka: !!document.querySelector('nav.top a[href="#otdelka"]'),
    title: document.title.slice(0, 80),
  };
}));
// lightbox
await p.click('#works .gcell a');
await new Promise(r => setTimeout(r, 400));
console.log('lightbox open:', await p.evaluate(() => document.querySelector('.lbbox').classList.contains('on') && !!document.querySelector('.lbbox img').src));
await b.close();
