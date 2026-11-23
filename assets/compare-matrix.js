const compareControls = document.querySelector('.compare-controls');
const compareOptions = compareControls.querySelector('.compare-options');
const compareTable = document.getElementById('comp-table');
const filters = { category: '', status: '' };
const filterButtons = [...compareControls.querySelectorAll('[data-filter-category], [data-filter-status]')];
const compareCount = document.getElementById('compare-count');
const compareButtons = [...compareOptions.querySelectorAll('[data-compare-platform]')];
const defaultPlatforms = compareButtons.filter(button => button.getAttribute('aria-pressed') === 'true')
  .map(button => button.dataset.comparePlatform);
let selectedPlatforms = [...defaultPlatforms];
const tableRows = [...compareTable.rows].map(row => ({
  row,
  cells: new Map([...row.querySelectorAll('[data-platform]')].map(cell => [cell.dataset.platform, cell])),
}));
const products = new Map();
let drag = null;

function movePlatform(platform, target, after = false) {
  if (platform === target || !selectedPlatforms.includes(target)) return;
  const order = selectedPlatforms.filter(id => id !== platform);
  order.splice(order.indexOf(target) + Number(after), 0, platform);
  selectedPlatforms = order;
  updateComparison();
}

function reorderHandle(platform, name) {
  const handle = document.createElement('button');
  handle.type = 'button';
  handle.className = 'compare-handle';
  handle.textContent = '⠿';
  handle.setAttribute('aria-label', `Reorder ${name}`);
  handle.setAttribute('aria-describedby', 'compare-reorder-help');
  handle.dataset.reorder = platform;

  handle.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const right = event.key === 'ArrowRight';
    const index = selectedPlatforms.indexOf(platform);
    const target = selectedPlatforms[index + (right ? 1 : -1)];
    if (target) movePlatform(platform, target, right);
  });

  handle.addEventListener('pointerdown', event => {
    if (event.button !== 0 || !event.isPrimary) return;
    handle.setPointerCapture(event.pointerId);
    drag = { platform, handle, target: null, after: false };
  });
  handle.addEventListener('pointermove', event => {
    if (drag?.handle !== handle) return;
    const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-drop-platform]');
    drag.target?.classList.remove('compare-drop-target');
    drag.target = target && target.dataset.dropPlatform !== platform &&
      selectedPlatforms.includes(target.dataset.dropPlatform) ? target : null;
    if (!drag.target) return;
    const bounds = drag.target.getBoundingClientRect();
    drag.after = event.clientX > bounds.left + bounds.width / 2;
    drag.target.classList.add('compare-drop-target');
  });
  function finish(shouldMove) {
    if (drag?.handle !== handle) return;
    const { target, after } = drag;
    target?.classList.remove('compare-drop-target');
    drag = null;
    if (shouldMove && target) movePlatform(platform, target.dataset.dropPlatform, after);
  }
  handle.addEventListener('pointerup', () => finish(true));
  handle.addEventListener('lostpointercapture', () => finish(false));
  return handle;
}

function updateComparison() {
  const selected = new Set(selectedPlatforms);
  const unselected = [...products.keys()].filter(id => !selected.has(id));
  const order = [...selectedPlatforms, ...unselected];
  const active = document.activeElement;
  let shown = 0;
  let total = 0;
  for (const platform of order) {
    const { wrapper, button, handle } = products.get(platform);
    button.setAttribute('aria-pressed', String(selected.has(platform)));
    handle.hidden = !selected.has(platform);
    compareOptions.append(wrapper);
  }
  for (const { row, cells } of tableRows) {
    for (const platform of order) {
      const cell = cells.get(platform);
      cell.hidden = !selected.has(platform);
      row.append(cell);
    }
    if (row.dataset.compareCategory) {
      total++;
      row.hidden = Boolean(
        (filters.category && row.dataset.compareCategory !== filters.category) ||
        (filters.status && row.dataset.compareStatus !== filters.status)
      );
      if (!row.hidden) shown++;
    }
  }
  if (active !== document.body && active.isConnected && !active.closest('[hidden]')) active.focus({ preventScroll: true });
  for (const button of filterButtons) {
    const key = button.hasAttribute('data-filter-category') ? 'category' : 'status';
    button.setAttribute('aria-pressed', String(button.getAttribute('data-filter-' + key) === filters[key]));
  }
  compareCount.textContent = `Showing ${shown} of ${total} capabilities`;
}

for (const button of compareButtons) {
  const platform = button.dataset.comparePlatform;
  const wrapper = document.createElement('span');
  wrapper.className = 'compare-product';
  wrapper.dataset.dropPlatform = platform;
  const handle = reorderHandle(platform, button.textContent);
  button.before(wrapper);
  wrapper.append(button, handle);
  products.set(platform, { wrapper, button, handle });
  const header = tableRows[0].cells.get(platform);
  header.dataset.dropPlatform = platform;
  header.append(reorderHandle(platform, button.textContent));
  button.addEventListener('click', () => {
    if (selectedPlatforms.includes(platform)) selectedPlatforms = selectedPlatforms.filter(id => id !== platform);
    else selectedPlatforms.push(platform);
    updateComparison();
  });
}
for (const button of filterButtons) {
  button.addEventListener('click', () => {
    const key = button.hasAttribute('data-filter-category') ? 'category' : 'status';
    filters[key] = button.getAttribute('data-filter-' + key);
    updateComparison();
  });
}
document.getElementById('compare-reset').addEventListener('click', () => {
  selectedPlatforms = [...defaultPlatforms];
  filters.category = '';
  filters.status = '';
  updateComparison();
});
compareControls.hidden = false;
updateComparison();
