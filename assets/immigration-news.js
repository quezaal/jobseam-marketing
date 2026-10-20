(() => {
  'use strict';
  const grid = document.getElementById('newsGrid');
  const note = document.getElementById('refreshNote');
  const endpoint = document.querySelector('meta[name="compliance-news-url"]')?.content || '/assets/immigration-news.json';
  let items = [], tag = 'all', days = 0, state = 'loading';
  const sources = [
    ['USCIS newsroom', 'https://www.uscis.gov/newsroom'],
    ['DOL newsroom', 'https://www.dol.gov/newsroom'],
    ['DHS newsroom', 'https://www.dhs.gov/newsroom']
  ];
  function node(type, text, className) {
    const element = document.createElement(type);
    if (text) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function articleUrl(value) {
    try {
      const url = new URL(value);
      return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
    } catch (_) { return null; }
  }
  function link(text, url) {
    const a = node('a', text); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a;
  }
  function button(text, action) {
    const b = node('button', text, 'button'); b.type = 'button'; b.addEventListener('click', action); return b;
  }
  function reset() {
    tag = 'all'; days = 0;
    document.querySelectorAll('#filterBar button, #periodBar button').forEach(b => {
      const selected = b.dataset.tag === 'all' || b.dataset.days === '0';
      b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected));
    });
    render();
  }
  function render() {
    grid.setAttribute('aria-busy', String(state === 'loading'));
    grid.replaceChildren();
    if (state !== 'ready') {
      const box = node('div', '', 'empty-state');
      box.append(node('p', state === 'loading' ? 'Loading official updates…' :
        state === 'error' ? 'The live news feed is unavailable. This is not a filter result.' :
        'The news feed returned no updates. Browse the official sources below or try again.'));
      if (state !== 'loading') {
        box.append(button('Retry loading updates', load));
        const links = node('div', '', 'actions');
        sources.forEach(([title, url]) => links.append(link(title + ' ↗', url)));
        box.append(links);
      }
      grid.append(box); return;
    }
    const shown = items.filter(item => (tag === 'all' || item.tags.includes(tag)) &&
      (!days || (Number.isFinite(Date.parse(item.published_at)) && Date.parse(item.published_at) >= Date.now() - days * 86400000)));
    if (!shown.length) {
      const box = node('div', '', 'empty-state');
      box.append(node('p', 'No loaded updates match the selected topic and period.'), button('Reset filters', reset));
      grid.append(box); return;
    }
    shown.forEach(item => {
      const card = node('article', '', 'news-card');
      const meta = node('div', '', 'news-meta');
      meta.append(node('span', item.source || 'News source', 'source-badge'));
      const date = Date.parse(item.published_at);
      if (Number.isFinite(date)) meta.append(node('span', new Date(date).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})));
      const title = node('div', '', 'news-title'); title.append(link(item.title, item.url));
      const tags = node('div'); item.tags.forEach(t => tags.append(node('span', t, 'tag-pill')));
      const more = link('Read article ↗', item.url); more.className = 'news-readmore';
      card.append(meta, title, tags, more); grid.append(card);
    });
  }
  for (const [id, key] of [['filterBar', 'tag'], ['periodBar', 'days']]) {
    const bar = document.getElementById(id);
    bar.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('active'))));
    bar.addEventListener('click', event => {
      const selected = event.target.closest('button'); if (!selected || !bar.contains(selected)) return;
      bar.querySelectorAll('button').forEach(b => { b.classList.toggle('active', b === selected); b.setAttribute('aria-pressed', String(b === selected)); });
      if (key === 'tag') tag = selected.dataset.tag; else days = Number(selected.dataset.days) || 0;
      render();
    });
  }
  async function load() {
    state = 'loading'; note.textContent = 'Fetching news updates…'; render();
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, {signal: controller.signal});
      if (!response.ok) throw new Error('Feed unavailable');
      const payload = await response.json();
      const data = Array.isArray(payload) ? payload : payload.items;
      if (!Array.isArray(data)) throw new Error('Invalid feed');
      items = data.filter(item => item && typeof item.title === 'string' && articleUrl(item.url)).map(item => ({...item, url:articleUrl(item.url), tags:Array.isArray(item.tags) ? item.tags.filter(t => typeof t === 'string') : []}));
      items.sort((a,b) => (Date.parse(b.published_at)||0) - (Date.parse(a.published_at)||0));
      state = items.length ? 'ready' : 'empty';
      note.textContent = items.length ? `${items.length} agency publications loaded.${payload.updated_at ? ' Snapshot refreshed ' + new Date(payload.updated_at).toLocaleString('en-US') + '.' : ''} Open each source for the latest status.` : 'No updates were returned by the news service.';
    } catch (_) {
      state = 'error'; items = [];
      note.textContent = 'Live updates could not be loaded. You can retry or open the official newsrooms below.';
    } finally { clearTimeout(timeout); render(); }
  }
  load();
})();
