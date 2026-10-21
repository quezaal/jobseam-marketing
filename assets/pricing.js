(() => {
  'use strict';
  const choices = [...document.querySelectorAll('input[name="billing"]')];
  if (!choices.length) return;
  const money = value => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
  function render(cycle, updateUrl = false) {
    cycle = cycle === 'annual' ? 'annual' : 'monthly';
    choices.forEach(input => { input.disabled = false; input.checked = input.value === cycle; });
    document.querySelectorAll('.price[data-plan]').forEach(node => {
      const monthly = Number(node.dataset.monthly), annual = Number(node.dataset.annual);
      const suffix = document.createElement('small');
      suffix.textContent = cycle === 'annual' ? ' / year' : ' / month';
      node.replaceChildren(document.createTextNode(money(cycle === 'annual' ? annual : monthly)), suffix);
      const note = document.querySelector(`[data-billing-note="${node.dataset.plan}"]`);
      note.textContent = cycle === 'annual'
        ? `Prepaid for 12 months · $${(annual / 12).toFixed(2)}/month equivalent · save ${money(monthly * 12 - annual)}/year.`
        : `Billed monthly. Or ${money(annual)} prepaid annually.`;
    });
    document.querySelectorAll('[data-plan-cta]').forEach(link => {
      const target = new URL(link.href, window.location.href);
      target.searchParams.set('billing', cycle);
      link.setAttribute('href', target.pathname + target.search + target.hash);
    });
    document.getElementById('billing-summary').textContent = cycle === 'annual'
      ? 'Annual billing: the full 12-month charge is shown below, paid upfront. Save 16.7% versus twelve monthly payments. Features and capacity are unchanged.'
      : 'Monthly billing: pay the displayed amount each month. Annual prepayment is optional.';
    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set('billing', cycle);
      window.history.replaceState(null, '', url.pathname + url.search + url.hash);
    }
  }
  choices.forEach(input => input.addEventListener('change', () => { if (input.checked) render(input.value, true); }));
  render(new URLSearchParams(window.location.search).get('billing'));
})();
