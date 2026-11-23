(() => {
  const estimator = document.getElementById('package-estimate');
  const preset = document.getElementById('package-preset');
  const plan = document.getElementById('package-plan');
  const options = [...estimator.querySelectorAll('input[type="checkbox"]')];
  const rates = document.getElementById('package-rates');
  const incumbent = document.getElementById('package-incumbent');
  const total = document.getElementById('package-total');
  const contact = document.getElementById('package-contact');
  const presets = { onblick: ['lca', 'i9', 'opt'], oorwin: ['i9'], ceipal: ['vms'] };
  const basePrices = new Map([...document.querySelectorAll('.price[data-plan]')].map(node => [node.dataset.plan, node.dataset]));
  const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  const lines = options.map(option => {
    const label = option.closest('label').textContent.trim();
    const wrap = document.createElement('div');
    const caption = document.createElement('label');
    const input = document.createElement('input');
    input.id = `package-rate-${option.value}`;
    input.type = 'number';
    input.min = '0';
    input.step = '0.01';
    input.inputMode = 'decimal';
    input.placeholder = 'Enter rate if known';
    caption.htmlFor = input.id;
    caption.textContent = `${label} (USD/month)`;
    wrap.append(caption, input);
    rates.append(wrap);
    return { option, label, wrap, input };
  });

  function renderEstimate() {
    const annual = document.querySelector('input[name="billing"]:checked').value === 'annual';
    const price = basePrices.get(plan.value);
    const base = annual ? Number(price.annual) / 12 : Number(price.monthly);
    const selected = lines.filter(line => line.option.checked);
    const quoted = selected.filter(({ input }) => input.value !== '' && input.validity.valid);
    const unresolved = selected.length - quoted.length;
    const estimate = base + quoted.reduce((sum, { input }) => sum + input.valueAsNumber, 0);
    for (const line of lines) line.wrap.hidden = !line.option.checked;
    const summary = [
      annual ? `Base plan: ${money.format(Number(price.annual))} prepaid annually (${money.format(base)}/month equivalent).` : `Base plan: ${money.format(base)}/month.`,
      'SeamBud Basic: included at no separate charge.',
      `${unresolved ? 'Known subtotal' : 'Estimated total'}: ${money.format(estimate)}/month${annual ? ' equivalent' : ''}.`,
    ];
    if (unresolved) summary.push(`${unresolved} selected ${unresolved === 1 ? 'item needs' : 'items need'} a rate. The subtotal excludes those costs.`);
    if (quoted.length) summary.push('Includes your entered rates. Taxes, provider charges and setup fees may apply.');
    if (!unresolved && incumbent.value !== '' && incumbent.validity.valid) {
      const delta = incumbent.valueAsNumber - estimate;
      summary.push(delta === 0 ? 'Matches your entered monthly spend.' : `${money.format(Math.abs(delta))}/month ${delta > 0 ? 'below' : 'above'} your entered spend.`);
    }
    total.replaceChildren(...summary.map(text => {
      const paragraph = document.createElement('p');
      paragraph.textContent = text;
      return paragraph;
    }));
    const body = [
      `Please confirm this JobSeam package: ${plan.selectedOptions[0].text} with ${annual ? 'annual' : 'monthly'} billing.`,
      ...selected.map(({ label }) => `• ${label}`),
    ].join('\n');
    contact.href = `mailto:sales@jobseam.com?subject=${encodeURIComponent('JobSeam package quote')}&body=${encodeURIComponent(body)}`;
  }

  function choosePreset(value) {
    for (const option of options) option.checked = (presets[value] || []).includes(option.value);
    renderEstimate();
  }

  estimator.addEventListener('input', event => {
    if (event.target === preset) choosePreset(preset.value);
    else {
      if (options.includes(event.target)) preset.value = 'custom';
      renderEstimate();
    }
  });
  document.querySelector('.billing-selector').addEventListener('change', renderEstimate);
  const requested = new URLSearchParams(location.search).get('package');
  if (Object.hasOwn(presets, requested)) preset.value = requested;
  estimator.hidden = false;
  choosePreset(preset.value);
})();
