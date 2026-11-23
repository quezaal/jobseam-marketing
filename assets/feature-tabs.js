function featureTabSet(list, activate) {
  const tabs = [...list.querySelectorAll('a')];
  const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));
  list.setAttribute('role', 'tablist');
  tabs.forEach((tab, index) => {
    const panel = panels[index];
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    tab.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      activate(index);
    });
    tab.addEventListener('keydown', event => {
      const last = tabs.length - 1;
      const next = { ArrowLeft: index ? index - 1 : last, ArrowRight: index === last ? 0 : index + 1, Home: 0, End: last }[event.key];
      if (event.key === ' ') {
        event.preventDefault();
        activate(index);
      } else if (next !== undefined) {
        event.preventDefault();
        activate(next);
        tabs[next].focus({ preventScroll: true });
      }
    });
  });

  return {
    panels,
    select(index) {
      tabs.forEach((tab, position) => {
        const selected = position === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        panels[position].hidden = !selected;
      });
      if (!list.clientWidth) return;
      const tabBounds = tabs[index].getBoundingClientRect();
      const listBounds = list.getBoundingClientRect();
      if (tabBounds.left < listBounds.left) {
        list.scrollLeft += tabBounds.left - listBounds.left;
      } else if (tabBounds.right > listBounds.right) {
        list.scrollLeft += tabBounds.right - listBounds.right;
      }
    },
  };
}

function pushFeatureHash(id) {
  if (location.hash !== '#' + id) history.pushState(null, '', '#' + id);
}

const primaryList = document.querySelector('[data-feature-tabs]');
if (!primaryList.hasAttribute('aria-label')) primaryList.setAttribute('aria-label', 'Feature categories');
const billingSelector = document.querySelector('.billing-selector');

function updateBillingVisibility(panel) {
  if (billingSelector) billingSelector.hidden = !['plans', 'optional-modules'].includes(panel.id);
}
const primaryTabs = featureTabSet(primaryList, index => {
  primaryTabs.select(index);
  const panel = primaryTabs.panels[index];
  updateBillingVisibility(panel);
  pushFeatureHash(panel.id);
  if (primaryList.getBoundingClientRect().top <= 1) panel.scrollIntoView({ block: 'start' });
});
const complianceList = document.querySelector('[data-compliance-tabs]');
const complianceTabs = complianceList ? featureTabSet(complianceList, index => {
  complianceTabs.select(index);
  pushFeatureHash(complianceTabs.panels[index].id);
}) : null;

function syncFeatureHash() {
  const target = document.getElementById(location.hash.slice(1));
  const primary = primaryTabs.panels.findIndex(panel => panel.contains(target));
  const nested = complianceTabs?.panels.findIndex(panel => panel.contains(target)) ?? -1;
  const index = Math.max(primary, 0);
  primaryTabs.select(index);
  updateBillingVisibility(primaryTabs.panels[index]);
  complianceTabs?.select(Math.max(nested, 0));
  if (nested >= 0) {
    document.getElementById('compliance').scrollIntoView({ block: 'start' });
  } else if (primary >= 0) {
    target.scrollIntoView({ block: 'start' });
  }
}

window.addEventListener('hashchange', syncFeatureHash);
syncFeatureHash();
