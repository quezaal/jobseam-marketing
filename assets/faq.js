(() => {
  const page = document.querySelector('.faq-page');
  if (!page) return;
  const search = page.querySelector('#faq-search');
  const groups = [...page.querySelectorAll('.faq-group')];
  const items = groups.flatMap(group => [...group.querySelectorAll('details')]);
  const status = page.querySelector('#faq-search-status');
  const empty = page.querySelector('.faq-empty');
  let previousOpen = null;
  page.querySelector('.faq-search').hidden = false;
  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    if (query && previousOpen === null) previousOpen = new Set(items.filter(item => item.open));
    let count = 0;
    items.forEach(item => {
      const match = !query || item.textContent.toLocaleLowerCase().includes(query);
      item.hidden = !match;
      if (query) item.open = match;
      else if (previousOpen !== null) item.open = previousOpen.has(item);
      if (match) count++;
    });
    groups.forEach(group => { group.hidden = ![...group.querySelectorAll('details')].some(item => !item.hidden); });
    empty.hidden = count > 0;
    status.textContent = query ? `${count} matching ${count === 1 ? 'question' : 'questions'}` : '';
    if (!query) previousOpen = null;
  }
  search.addEventListener('input', filter);
  search.addEventListener('search', filter);
  page.querySelectorAll('.faq-topics nav a').forEach(link => {
    link.addEventListener('click', () => { search.value = ''; filter(); });
  });
})();
