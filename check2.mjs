import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4320/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.querySelectorAll('.fx').forEach(e => e.classList.add('in')));
await p.evaluate(() => window.scrollTo(0, document.querySelector('#works').getBoundingClientRect().top + window.scrollY));
await new Promise(r => setTimeout(r, 1500));
console.log(await p.evaluate(() => {
  const i = [...document.querySelectorAll('#works .gcell img')];
  return { loaded: i.filter(x => x.naturalWidth > 0).length + '/' + i.length, broken: i.filter(x => x.complete && x.naturalWidth === 0).map(x => x.currentSrc) };
}));
await b.close();
