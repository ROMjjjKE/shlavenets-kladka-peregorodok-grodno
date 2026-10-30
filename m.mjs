import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
await p.setViewport({ width: 412, height: 823 });
await p.goto('http://127.0.0.1:4321/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
console.log(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Новая стена из кирпича — ровно, прочно, под отделку';
  const w = f => { c.font = f; return +c.measureText(s).width.toFixed(1); };
  return { voll: w('700 40px Vollkorn'), georgia: w('700 40px Georgia'), arial: w('700 40px Arial'), ratioG: +(w('700 40px Vollkorn') / w('700 40px Georgia')).toFixed(4) };
}));
await b.close();
