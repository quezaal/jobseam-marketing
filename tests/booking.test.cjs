const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const script = fs.readFileSync(path.join(__dirname, '../assets/marketing.js'), 'utf8');

function draft(search, nodes = { 'demo-gmail': {}, 'demo-email': { dataset: { recipient: 'connect@quezaal.com' } }, 'plan-interest': { hidden: true } }) {
  vm.runInNewContext(script, { URL, URLSearchParams, window: { location: { search } }, document: { getElementById: id => nodes[id] } });
  return nodes;
}

test('Gmail and mail app carry the same trial and plan choice', () => {
  const nodes = draft('?trial=1&plan=early_adopter&billing=annual&use_case=staffing');
  const gmail = new URL(nodes['demo-gmail'].href);
  const email = new URL(nodes['demo-email'].href);
  assert.equal(gmail.origin, 'https://mail.google.com');
  assert.equal(gmail.searchParams.get('to'), 'connect@quezaal.com');
  assert.equal(email.pathname, 'connect@quezaal.com');
  assert.equal(gmail.searchParams.get('su'), 'JobSeam free trial request');
  assert.equal(gmail.searchParams.get('body'), email.searchParams.get('body'));
  assert.match(gmail.searchParams.get('body'), /Founding Offer.*\nBilling preference: annual.*\nUse case: Recruiting and staffing/);
  assert.match(nodes['plan-interest'].textContent, /No card or bank details required/);
});

test('unknown parameters are omitted and standard requests use the demo subject', () => {
  const nodes = draft('?trial=yes&plan=bad&use_case=unknown&billing=invalid&body=unexpected');
  const gmail = new URL(nodes['demo-gmail'].href);
  assert.equal(gmail.searchParams.get('su'), 'JobSeam demo request');
  assert.doesNotMatch(gmail.searchParams.get('body'), /unknown|invalid|unexpected|Plan:/);
});

test('pages without demo controls require no integration', () => {
  assert.doesNotThrow(() => draft('', {}));
});
