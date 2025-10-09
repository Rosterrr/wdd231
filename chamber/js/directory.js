/* directory.js */

const state = {
  view: 'grid', // 'grid' | 'list'
  data: []
};

const els = {
  members: null,
  btnGrid: null,
  btnList: null,
  loadStatus: null
};

function setView(view) {
  state.view = view;
  const list = els.members;
  if (!list) return;
  list.classList.toggle('grid-view', view === 'grid');
  list.classList.toggle('list-view', view === 'list');
  els.btnGrid?.classList.toggle('ghost', view !== 'grid');
  els.btnList?.classList.toggle('ghost', view !== 'list');
  els.btnGrid?.setAttribute('aria-pressed', String(view === 'grid'));
  els.btnList?.setAttribute('aria-pressed', String(view === 'list'));
  // optional: localStorage
  try { localStorage.setItem('directory:view', view); } catch {}
}

function levelLabel(level) {
  switch (Number(level)) {
    case 3: return 'Gold';
    case 2: return 'Silver';
    default: return 'Member';
  }
}

function cardTemplate(m) {
  const safePhone = m.phone?.replace(/\s+/g, '');
  const telHref = safePhone ? `tel:${safePhone}` : '#';
  const webHref = m.website?.startsWith('http') ? m.website : `https://${m.website || ''}`;
  const imgSrc = m.image ? `images/members/${m.image}` : 'images/members/default.svg';

  return `
    <article class="card" role="listitem">
      <img src="${imgSrc}" alt="${m.name} logo" onerror="this.src='images/members/default.svg'"/>
      <div>
        <h3>${m.name} <span class="badge">${levelLabel(m.membershipLevel)}</span></h3>
        <p class="meta">
          ${m.address ? `<span>${m.address}</span>` : ''}
          ${m.phone ? ` · <a href="${telHref}">${m.phone}</a>` : ''}
        </p>
        ${m.description ? `<p>${m.description}</p>` : ''}
        ${m.website ? `<p><a href="${webHref}" target="_blank" rel="noopener">Visit website</a></p>` : ''}
      </div>
      <div class="meta">
        ${m.email ? `<a href="mailto:${m.email}">${m.email}</a>` : ''}
      </div>
    </article>
  `;
}

function render() {
  if (!els.members) return;
  els.members.innerHTML = state.data.map(cardTemplate).join('');
  els.loadStatus && (els.loadStatus.textContent = `Loaded ${state.data.length} members`);
}

async function loadData() {
  els.loadStatus && (els.loadStatus.textContent = 'Loading members…');
  try {
    const res = await fetch('data/members.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    state.data = Array.isArray(json) ? json : json.members || [];
    render();
  } catch (err) {
    console.error(err);
    els.loadStatus && (els.loadStatus.textContent = 'Failed to load members.');
  }
}

function initFooterMeta() {
  const yearEl = document.getElementById('year');
  const modEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) {
    const d = new Date(document.lastModified);
    modEl.textContent = isNaN(d) ? document.lastModified : d.toLocaleString();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  els.members = document.getElementById('members');
  els.btnGrid = document.getElementById('btnGrid');
  els.btnList = document.getElementById('btnList');
  els.loadStatus = document.getElementById('loadStatus');

  // restore view pref
  try {
    const saved = localStorage.getItem('directory:view');
    if (saved === 'list' || saved === 'grid') setView(saved);
    else setView('grid');
  } catch {
    setView('grid');
  }

  els.btnGrid?.addEventListener('click', () => setView('grid'));
  els.btnList?.addEventListener('click', () => setView('list'));

  loadData();
  initFooterMeta();
});
