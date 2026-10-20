const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');const vm=require('node:vm');const path=require('node:path');
const code=fs.readFileSync(path.join(__dirname,'../assets/immigration-news.js'),'utf8');
class Element {
 constructor(tag='div'){this.tag=tag;this.children=[];this.events={};this.dataset={};this.value='';this._text='';this.attrs={};this.classList={contains:()=>false,toggle:()=>{}};}
 set textContent(value){this._text=value;this.children=[];}get textContent(){return this._text+this.children.map(c=>c.textContent).join(' ')}
 append(...nodes){this.children.push(...nodes)}replaceChildren(...nodes){this.children=nodes;this._text=''}
 setAttribute(key,value){this.attrs[key]=value}addEventListener(name,fn){this.events[name]=fn}
 querySelectorAll(){return this.children}get options(){return this.children}contains(e){return this.children.includes(e)}
}
async function setup(payload,ok=true){
 const ids={};for(const id of ['newsGrid','refreshNote','companySearch','agencyFilter','actionFilter','filterBar','periodBar','governmentSources'])ids[id]=new Element();
 ids.agencyFilter.value=ids.actionFilter.value='all';
 const document={getElementById:id=>ids[id],querySelector:()=>null,querySelectorAll:()=>[],createElement:tag=>new Element(tag)};
 vm.runInNewContext(code,{document,URL,Date,AbortController,setTimeout,clearTimeout,fetch:async()=>({ok,json:async()=>payload})});
 await new Promise(resolve=>setImmediate(resolve));return ids;
}
const sample={items:[{title:'Employer A — debarment',source:'DOL/WHD',url:'https://www.dol.gov/example',tags:['H-1B'],companies:['Employer A'],action_type:'Debarment listed',restriction_start:'2025-01-01',restriction_end:'2027-01-01',verified_at:'2026-10-20'},{title:'Other publication',source:'USCIS',url:'https://www.federalregister.gov/example',tags:['PERM'],published_at:'2026-10-01'}],sources:[{title:'DOL',url:'https://www.dol.gov/',description:'Official source'}]};
test('company, agency and action filters combine and reset without inferring eligibility',async()=>{
 const ui=await setup(sample);assert.equal(ui.newsGrid.children.length,2);assert.equal(ui.governmentSources.children.length,1);
 ui.companySearch.value='employer a';ui.companySearch.events.input();assert.equal(ui.newsGrid.children.length,1);assert.match(ui.newsGrid.textContent,/Published restriction period/);
 ui.agencyFilter.value='USCIS';ui.agencyFilter.events.change();assert.match(ui.newsGrid.textContent,/does not confirm/);
 ui.newsGrid.children[0].children[1].events.click();assert.equal(ui.newsGrid.children.length,2);assert.equal(ui.companySearch.value,'');
 ui.actionFilter.value='Debarment listed';ui.actionFilter.events.change();assert.equal(ui.newsGrid.children.length,1);assert.match(ui.newsGrid.textContent,/Record reviewed/);
});
test('bad URLs and missing feed have separate safe states',async()=>{
 const unsafe=await setup({items:[{title:'Bad',url:'javascript:alert(1)'}]});assert.match(unsafe.newsGrid.textContent,/returned no updates/);
 const error=await setup(null,false);assert.match(error.newsGrid.textContent,/unavailable/);assert.doesNotMatch(error.newsGrid.textContent,/match these filters/);
});
test('published employer records have government evidence and distinct program metadata',()=>{
 const data=JSON.parse(fs.readFileSync(path.join(__dirname,'../assets/government-records.json'),'utf8'));
 for(const item of data.items){assert.ok(new URL(item.url).hostname.endsWith('.gov'));assert.match(item.verified_at,/^\d{4}-\d{2}-\d{2}$/);if(item.action_type==='Debarment listed'){assert.ok(item.restriction_start<item.restriction_end);assert.ok(item.tags.includes('H-1B'));}}
 const snapshot=JSON.parse(fs.readFileSync(path.join(__dirname,'../assets/immigration-news.json'),'utf8'));
 for(const record of data.items)assert.ok(snapshot.items.some(x=>x.title===record.title&&x.url===record.url));
});
