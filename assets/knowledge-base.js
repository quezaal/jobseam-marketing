const search = document.querySelector('.kb-search');
const input = document.getElementById('kb-query');
const topics = document.getElementById('kb-topics');
const results = document.getElementById('kb-results');
const status = document.getElementById('kb-status');
const articles = [...results.querySelectorAll('[data-article]')].map(element => ({
  element,
  text: (element.dataset.topic + ' ' + element.textContent).toLowerCase(),
}));

function filterGuides() {
  const terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  topics.hidden = terms.length > 0;
  results.hidden = !topics.hidden;
  let count = 0;
  for (const { element, text } of articles) {
    element.hidden = !terms.every(term => text.includes(term));
    if (!element.hidden) count++;
  }
  status.textContent = terms.length ? (count ? `${count} matching ${count === 1 ? "guide" : "guides"}` : 'No matching guides. Try a different search.') : '';
}

input.addEventListener('input', filterGuides);
search.hidden = false;
filterGuides();
