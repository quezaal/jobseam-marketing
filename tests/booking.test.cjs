const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const script = fs.readFileSync(path.join(__dirname, '../assets/marketing.js'), 'utf8');

function draft(search, nodes = { 'demo-email': { dataset: { recipient: 'connect@quezaal.com' } }, 'plan-interest': { hidden: true } }) {
  vm.runInNewContext(script, { URL, URLSearchParams, window: { location: { search } }, document: { getElementById: id => nodes[id] } });
  return nodes;
}

test('Email draft carries the recipient and trial and plan choices', () => {
  const nodes = draft('?trial=1&plan=early_adopter&billing=annual&use_case=staffing');
  const email = new URL(nodes['demo-email'].href);
  assert.equal(email.protocol, 'mailto:');
  assert.equal(email.pathname, 'connect@quezaal.com');
  assert.equal(email.searchParams.get('subject'), 'JobSeam free trial request');
  assert.match(email.searchParams.get('body'), /Founding Offer.*\nBilling preference: annual.*\nUse case: Recruiting and staffing/);
  assert.match(nodes['plan-interest'].textContent, /No card or bank details required/);
});

test('unknown parameters are omitted and standard requests use the demo subject', () => {
  const nodes = draft('?trial=yes&plan=bad&use_case=unknown&billing=invalid&body=unexpected');
  const email = new URL(nodes['demo-email'].href);
  assert.equal(email.searchParams.get('subject'), 'JobSeam demo request');
  assert.doesNotMatch(email.searchParams.get('body'), /unknown|invalid|unexpected|Plan:/);
});

test('pages without demo controls require no integration', () => {
  assert.doesNotThrow(() => draft('', {}));
});
