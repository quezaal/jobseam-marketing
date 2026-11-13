import {createRequire} from 'node:module';
import {fileURLToPath,pathToFileURL} from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
await fs.mkdir(path.join(root,'previews'),{recursive:true});
const browser=await chromium.launch({headless:true});
try {
 const page=await browser.newPage({viewport:{width:1200,height:570},deviceScaleFactor:2});
 await page.goto(pathToFileURL(path.join(root,'assets/system-overview.svg')).href);
 await page.screenshot({path:path.join(root,'assets/system-overview.png')});
 for(const [name,pages] of [['one-page',1],['two-page-flyer',2]]) {
  await page.setViewportSize({width:1000,height:1300});
  await page.emulateMedia({media:'print'});
  await page.goto(pathToFileURL(path.join(root,name+'.html')).href);
  await page.evaluate(()=>document.fonts.ready);
  const sheets=page.locator('.sheet');
  if(await sheets.count()!==pages)throw Error('Incorrect sheet count');
  for(let i=0;i<pages;i++) {
   const height=await sheets.nth(i).evaluate(e=>e.scrollHeight);
   if(height>1123)throw Error(name+' page '+(i+1)+' exceeds A4: '+height);
   await sheets.nth(i).screenshot({path:path.join(root,'previews',name+(pages>1?'-'+(i+1):'')+'.png')});
  }
  const pdf=await page.pdf({path:path.join(root,name+'.pdf'),format:'A4',printBackground:true,preferCSSPageSize:true});
  const count=(pdf.toString('latin1').match(/\/Type\s*\/Page\b/g)||[]).length;
  if(count!==pages)throw Error(name+' expected '+pages+' PDF pages, got '+count);
  console.log(name+': verified '+count+' PDF page(s).');
 }
 await page.emulateMedia({media:'screen'});await page.setViewportSize({width:390,height:844});
 for(const name of ['one-page','two-page-flyer']) {
  await page.goto(pathToFileURL(path.join(root,name+'.html')).href);
  if(!await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth))throw Error('Mobile overflow: '+name);
 }
 console.log('Mobile HTML layouts fit. Original system overview exported as SVG and PNG.');
} finally {await browser.close()}
