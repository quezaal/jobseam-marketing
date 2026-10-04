const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const code = fs.readFileSync(require('node:path').join(__dirname, '../assets/marketing.js'), 'utf8');
function setup(search = '', blocked = false) {
  const source = {};
  const nodes = {
    'booking-calendar': { querySelector: () => ({contentWindow: source}), replaceChildren() {} },
    'booking-success': {hidden: true}, 'booking-fallback': {}, 'plan-interest': {hidden: true}
  };
  let listener, script;
  const window = { location: {search}, addEventListener: (_, fn) => listener = fn };
  const document = {querySelectorAll: () => [], querySelector: () => null, getElementById: id => nodes[id], createElement: () => ({}), head: {appendChild: x => script = x}};
  vm.runInNewContext(code, {window, document, URL, URLSearchParams, sessionStorage: {
    getItem() { if (blocked) throw Error(); return null; }, setItem() { if (blocked) throw Error(); }
  }});
  const event = {origin: 'https://calendly.com', source, data: {event: 'calendly.event_scheduled', payload: {event: {uri: 'https://api.calendly.com/scheduled_events/example'}}}};
  return {window, nodes, event, send: e => listener(e), script};
}
test('only a confirmed embedded booking emits once, without contact information', () => {
  const s = setup('?plan=founding');
  assert.equal(s.window.dataLayer, undefined);
  s.send(s.event); s.send(s.event);
  assert.equal(s.window.dataLayer.length, 1);
  assert.equal(s.window.dataLayer[0].event, 'jobseam_demo_booked');
  assert.equal(s.window.dataLayer[0].plan_interest, 'founding');
  assert.equal(s.nodes['booking-success'].hidden, false);
  assert.deepEqual(Object.keys(s.window.dataLayer[0]).sort(), ['event','plan_interest','product']);
});
test('rejects wrong origin, wrong iframe, intermediate steps and missing confirmation', () => {
  const s = setup();
  s.send({...s.event, origin:'https://example.com'});
  s.send({...s.event, source:{}});
  s.send({...s.event, data:{event:'calendly.event_type_viewed'}});
  s.send({...s.event, data:{event:'calendly.event_scheduled'}});
  assert.equal(s.window.dataLayer, undefined);
  assert.equal(s.nodes['booking-success'].hidden, true);
});
test('fallback retains campaign attribution and works with storage blocked', () => {
  const s = setup('?utm_source=youtube&plan=unknown&email=private', true);
  assert.equal(s.nodes['booking-fallback'].href, 'https://calendly.com/connect-quezaal/20min?utm_source=youtube');
  assert.equal(s.nodes['plan-interest'].hidden, true);
  assert.equal(s.script.src, 'https://assets.calendly.com/assets/external/widget.js');
});
