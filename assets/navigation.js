(() => {
  'use strict';
  const nav = document.querySelector('.site-navigation');
  if (!nav) return;
  const groups = [...nav.querySelectorAll('.nav-group')];
  const close = except => groups.forEach(group => { if (group !== except) group.open = false; });
  groups.forEach(group => {
    group.addEventListener('toggle', () => { if (group.open) close(group); });
    group.addEventListener('keydown', event => {
      if (event.key === 'Escape' && group.open) {
        group.open = false;
        group.querySelector('summary').focus();
        event.preventDefault();
      }
    });
    group.addEventListener('focusout', () => {
      setTimeout(() => { if (!group.contains(document.activeElement)) group.open = false; }, 0);
    });
  });
  document.addEventListener('click', event => { if (!nav.contains(event.target)) close(); });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close()));
})();
