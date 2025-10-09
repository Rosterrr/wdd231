/* index.js — events + spotlights + footer meta */

function initFooterMeta(){
  const yearEl = document.getElementById('year');
  const modEl = document.getElementById('lastModified');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  if (modEl) {
    const d = new Date(document.lastModified);
    modEl.textContent = isNaN(d) ? document.lastModified : d.toLocaleString();
  }
}

async function loadEvents(){
  const status = document.getElementById('eventsStatus');
  const list = document.getElementById('eventsList');
  if (!list) return;
  status && (status.textContent = 'Loading events…');

  try {
    const res = await fetch('data/events.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const events = await res.json();

    list.innerHTML = events.map(ev => `
      <li>
        <strong>${ev.title}</strong>
        <span class="event-meta">${ev.date} · ${ev.location}</span>
        ${ev.description ? `<p>${ev.description}</p>` : ''}
        ${ev.link ? `<p><a class="text-link" href="${ev.link}" target="_blank" rel="noopener">Details →</a></p>` : ''}
      </li>
    `).join('');

    status && (status.textContent = `Loaded ${events.length} event(s).`);
  } catch(err){
    console.error(err);
    status && (status.textContent = 'Failed to load events.');
  }
}

function levelLabel(level){
  switch (Number(level)) {
    case 3: return 'Gold';
    case 2: return 'Silver';
    default: return 'Member';
  }
}

function dailySeed(){
  const d = new Date();
  return Number(`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`);
}
function seededRandom(seed){ // deterministic per day
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function pickSpotlights(members, count=3){
  const preferred = members.filter(m => Number(m.membershipLevel) >= 2);
  const pool = preferred.length >= count ? preferred : members;
  const seed = dailySeed();
  const picked = new Set();
  while (picked.size < Math.min(count, pool.length)) {
    const r = Math.floor(seededRandom(seed + picked.size) * pool.length);
    picked.add(r);
  }
  return Array.from(picked).map(i => pool[i]);
}

async function loadSpotlights(){
  const container = document.getElementById('spotlights');
  if (!container) return;
  container.innerHTML = '';

  try {
    const res = await fetch('data/members.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const members = Array.isArray(data) ? data : (data.members || []);
    if (!members.length) return;

    const chosen = pickSpotlights(members, 3);
    container.innerHTML = chosen.map(m => {
      const img = m.image ? `images/members/${m.image}` : 'images/members/default.svg';
      const site = m.website?.startsWith('http') ? m.website : (m.website ? `https://${m.website}` : '');
      const telHref = m.phone ? `tel:${m.phone.replace(/\s+/g,'')}` : '#';

      return `
        <article class="spot" role="listitem">
          <img src="${img}" alt="${m.name} logo" loading="lazy" onerror="this.src='images/members/default.svg'"/>
          <div>
            <h3>${m.name} <span class="badge">${levelLabel(m.membershipLevel)}</span></h3>
            ${m.address ? `<p>${m.address}</p>` : ''}
            <p class="links">
              ${m.phone ? `<a class="text-link" href="${telHref}">Call</a>` : ''}
              ${site ? ` · <a class="text-link" href="${site}" target="_blank" rel="noopener">Website</a>` : ''}
            </p>
          </div>
        </article>
      `;
    }).join('');
  } catch(err){
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initFooterMeta();
  loadEvents();
  loadSpotlights();
});
