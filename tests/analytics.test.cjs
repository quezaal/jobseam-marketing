const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const code = require('node:fs').readFileSync(require('node:path').join(__dirname,'../assets/analytics.js'),'utf8');
function run(config) {
 const scripts=[], handlers={};
 const window={JOBSEAM_ANALYTICS:config,addEventListener:(name,fn)=>handlers[name]=fn};
 const document={createElement:()=>({}),head:{appendChild:s=>scripts.push(s)}};
 vm.runInNewContext(code,{window,document,Date}); return {window,scripts,handlers};
}
test('no destination or ambiguous destinations never load analytics',()=>{
 for(const config of [{},{ga4MeasurementId:'invalid'},{ga4MeasurementId:'G-TEST',gtmContainerId:'GTM-TEST'}]) assert.equal(run(config).scripts.length,0);
});
test('GA4 maps confirmed booking signal, not a generic form event',()=>{
 const r=run({ga4MeasurementId:'G-TEST'});assert.equal(r.scripts.length,1);
 r.handlers['jobseam:demo-booked']({detail:{plan_interest:'founding'}});
 const e=r.window.dataLayer.at(-1);assert.equal(e[0],'event');assert.equal(e[1],'jobseam_demo_booked');assert.equal(e[2].plan_interest,'founding');
});
test('GTM uses data layer without an additional GA4 booking listener',()=>{
 const r=run({gtmContainerId:'GTM-TEST'});assert.equal(r.scripts.length,1);assert.equal(Object.keys(r.handlers).length,0);
});
