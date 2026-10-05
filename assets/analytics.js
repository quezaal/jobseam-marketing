(() => {
  'use strict';
  const config = window.JOBSEAM_ANALYTICS || {};
  const ga = config.ga4MeasurementId || '';
  const gtm = config.gtmContainerId || '';
  if (ga && gtm) return; // Never send the same conversion through two integrations.
  window.dataLayer = window.dataLayer || [];
  let src;
  if (/^G-[A-Z0-9]+$/.test(ga)) {
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ga);
    window.addEventListener('jobseam:demo-booked', event => {
      window.gtag('event', 'jobseam_demo_booked', {
        product: 'JobSeam', plan_interest: event.detail.plan_interest
      });
    });
    src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ga);
  } else if (/^GTM-[A-Z0-9]+$/.test(gtm)) {
    window.dataLayer.push({'gtm.start': Date.now(), event: 'gtm.js'});
    src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(gtm);
  } else return;
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
})();
