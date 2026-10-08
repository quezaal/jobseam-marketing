(() => {
  'use strict';
  const bookingUrl = 'https://calendly.com/connect-quezaal/20min';
  const params = new URLSearchParams(window.location.search);
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
  // Keep only campaign attribution; never collect resume or contact data here.
  let campaign = {};
  try { campaign = JSON.parse(sessionStorage.getItem('jobseam_campaign') || '{}') || {}; } catch (_) {}
  const incoming = campaignKeys.some(key => params.has(key));
  if (incoming) campaign = {};
  for (const key of campaignKeys) {
    if (params.has(key)) campaign[key] = params.get(key).slice(0, 200);
  }
  try { sessionStorage.setItem('jobseam_campaign', JSON.stringify(campaign)); } catch (_) {}
  const calendar = document.getElementById('booking-calendar');

  const selectedPlan = ['founding', 'starter', 'growth', 'enterprise'].includes(params.get('plan')) ? params.get('plan') : '';
  if (selectedPlan && calendar) {
    const interest = document.getElementById('plan-interest');
    interest.textContent = `Interested in ${selectedPlan}? We’ll cover capacity and pricing during your demo.`;
    interest.hidden = false;
  }
  const url = new URL(bookingUrl);
  for (const key of campaignKeys) {
    if (typeof campaign[key] === 'string') url.searchParams.set(key, campaign[key]);
  }
  const fallback = document.getElementById('booking-fallback');
  if (fallback) fallback.href = url.href;
  let bookingPlan = selectedPlan;
  document.querySelectorAll('a[href]').forEach(link => {
    const target = new URL(link.href, window.location.href);
    if (!target.pathname.endsWith('/demo.html')) return;
    if (target.searchParams.has('use_case')) return;
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || !window.Calendly) return;
      event.preventDefault();
      const plan = target.searchParams.get('plan');
      bookingPlan = ['founding', 'starter', 'growth', 'enterprise'].includes(plan) ? plan : '';
      window.Calendly.initPopupWidget({url: url.href});
    });
  });
  const seen = new Set();
  window.addEventListener('message', event => {
    if (event.origin !== 'https://calendly.com' || !event.data || event.data.event !== 'calendly.event_scheduled') return;
    const frame = document.querySelector('.calendly-popup-content iframe') || calendar?.querySelector('iframe');
    if (!frame || event.source !== frame.contentWindow) return;
    const booking = event.data.payload?.event?.uri;
    if (typeof booking !== 'string' || !booking.startsWith('https://api.calendly.com/scheduled_events/')) return;
    if (seen.has(booking)) return;
    seen.add(booking);
    const success = document.getElementById('booking-success');
    if (success) success.hidden = false;
    // GTM integration point. No analytics library or account is configured by this file.
    // Do not map clicks, calendar views, or form starts to this conversion.
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: 'jobseam_demo_booked', product: 'JobSeam', plan_interest: bookingPlan || 'unspecified'});
    window.dispatchEvent(new CustomEvent('jobseam:demo-booked', {detail: {plan_interest: bookingPlan || 'unspecified'}}));
  });
  const widget = document.createElement('script');
  widget.src = 'https://assets.calendly.com/assets/external/widget.js';
  widget.async = true;
  widget.onload = () => {
    if (!window.Calendly || !calendar) return;
    calendar.replaceChildren();
    window.Calendly.initInlineWidget({url: url.href, parentElement: calendar});
  };
  // Keep the existing text and direct booking link if the third-party script fails.
  document.head.appendChild(widget);
})();
