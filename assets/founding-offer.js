(() => {
  const banner = document.querySelector('[data-founding-banner]');
  if (!banner) return;

  const deadline = Date.parse(banner.querySelector('time').dateTime);
  if (!Number.isFinite(deadline) || Date.now() >= deadline) return;

  const countdown = banner.querySelector('[data-founding-countdown]');
  function refresh() {
    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      banner.hidden = true;
      return;
    }

    const minutes = Math.ceil(remaining / 60000);
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor(minutes / 60) % 24;
    countdown.textContent = days
      ? ` · ${days}d ${hours}h left`
      : ` · ${hours}h ${minutes % 60}m left`;
    banner.hidden = false;
    window.setTimeout(refresh, Math.min(remaining, 15000));
  }

  refresh();
})();
