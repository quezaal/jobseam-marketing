(() => {
  'use strict';
  const mail = document.getElementById('demo-email');
  if (!mail) return;

  const params = new URLSearchParams(window.location.search);
  const plans = { solo: 'Solo', founding: 'Founding Offer', early_adopter: 'Founding Offer', starter: 'Starter', growth: 'Growth', enterprise: 'Enterprise' };
  const useCases = { staffing: 'Recruiting and staffing', education: 'Education and placement', individual: 'Individual job search' };
  const lookup = (values, key) => Object.hasOwn(values, key) ? values[key] : '';
  const plan = lookup(plans, params.get('plan'));
  const useCase = lookup(useCases, params.get('use_case'));
  const billing = ['monthly', 'annual'].includes(params.get('billing')) ? params.get('billing') : '';
  const trial = params.get('trial') === '1';
  const subject = trial ? 'JobSeam free trial request' : 'JobSeam demo request';
  const body = [
    'Hi JobSeam team,',
    '',
    trial ? 'I’d like to request a 14-day free trial.' : 'I’d like to request a 20-minute demo.',
    ...(plan ? [`Plan: ${plan}`] : []),
    ...(billing ? [`Billing preference: ${billing}`] : []),
    ...(useCase ? [`Use case: ${useCase}`] : []),
    '',
    'Company or team:',
    'What I’d like to see:',
    'Two preferred times and time zone:',
    '',
    'Thanks!',
  ].join('\n');

  const address = mail.dataset.recipient;
  mail.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (trial) mail.textContent = 'Open free trial email draft';

  const interest = document.getElementById('plan-interest');
  if (interest && (plan || billing || trial)) {
    interest.textContent = [
      trial ? '14-day free trial. No card or bank details required.' : '20-minute demo.',
      plan ? `Plan: ${plan}${billing ? ' with ' + billing + ' billing' : ''}.` : '',
    ].filter(Boolean).join(' ');
    interest.hidden = false;
  }
})();
