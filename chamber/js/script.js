// script.js — events + spotlights + footer meta

function setFooterMeta(){
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
        <strong>${ev.date}:</strong> ${ev.title}
        ${ev.location ? ` — <span class="muted">${ev.location}</span>` : ''}
        ${ev.description ? `<br><span>${ev.description}</span>` : ''}
      </li>
    `).join('');

    status && (status.textContent = `Loaded ${events.length} event(s).`);
  } catch (err) {
    console.error(err);
    status && (status.textContent = 'Failed to load events.');
    // Optional fallback:
    list.innerHTML = `
      <li><strong>Sept 25:</strong> Local Business Fair</li>
      <li><strong>Sept 30:</strong> Entrepreneurship Conference</li>
    `;
  }
}

function levelLabel(level){
  switch (Number(level)) {
    case 3: return 'Gold';
    case 2: return 'Silver';
    default: return 'Member';
  }
}

function pickSpotlights(members, count=3){
  const preferred = members.filter(m => Number(m.membershipLevel) >= 2);
  const pool = preferred.length >= count ? preferred : members;
  // simple shuffle
  for (let i=pool.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

async function loadSpotlights(){
  const container = document.querySelector('.spotlight-container');
  if (!container) return;

  try {
    const res = await fetch('data/members.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const members = Array.isArray(data) ? data : (data.members || []);
    const chosen = pickSpotlights(members, 3);

    container.innerHTML = chosen.map(m => {
      const img = m.image ? `images/members/${m.image}` : 'images/members/default.svg';
      const site = m.website?.startsWith('http') ? m.website : (m.website ? `https://${m.website}` : '');
      const tel = m.phone ? `tel:${m.phone.replace(/\s+/g,'')}` : '#';
      return `
        <article class="spot" role="listitem">
          <img src="${img}" alt="${m.name} logo" onerror="this.src='images/members/default.svg'"/>
          <div>
            <h3>${m.name} <span class="badge">${levelLabel(m.membershipLevel)}</span></h3>
            ${m.address ? `<p>${m.address}</p>` : ''}
            <p>
              ${m.phone ? `<a href="${tel}">Call</a>` : ''}
              ${m.phone && site ? ' · ' : ''}
              ${site ? `<a href="${site}" target="_blank" rel="noopener">Website</a>` : ''}
            </p>
          </div>
        </article>
      `;
    }).join('');
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p class="muted">Unable to load spotlights right now.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setFooterMeta();
  loadEvents();
  loadSpotlights();
});
