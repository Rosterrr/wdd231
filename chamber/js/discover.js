// discover.js — builds cards from data/places.json and shows last-visit message

function setFooterMeta(){
  const y = document.getElementById('year');
  const m = document.getElementById('lastModified');
  if (y) y.textContent = new Date().getFullYear();
  if (m) {
    const d = new Date(document.lastModified);
    m.textContent = isNaN(d) ? document.lastModified : d.toLocaleString();
  }
}

function showVisitMessage(){
  const key = 'discover:lastVisit';
  const now = Date.now();
  const prev = Number(localStorage.getItem(key));
  const box = document.getElementById('visitMessage');
  const txt = document.getElementById('visitText');

  let msg = "Welcome! Let us know if you have any questions.";
  if (prev && Number.isFinite(prev)) {
    const diffMs = now - prev;
    const dayMs = 1000*60*60*24;
    const days = Math.floor(diffMs / dayMs);
    if (diffMs < dayMs) msg = "Back so soon! Awesome!";
    else msg = days === 1 ? "You last visited 1 day ago." : `You last visited ${days} days ago.`;
  }
  if (box && txt) { txt.textContent = msg; box.hidden = false; }

  localStorage.setItem(key, String(now));
  document.getElementById('visitClose')?.addEventListener('click', () => box?.setAttribute('hidden',''));
}

function cardHTML(place, areaName){
  const img = place.image ? `images/places/${place.image}` : 'images/members/default.svg';
  const alt = place.name ? `${place.name} photo` : 'Place photo';
  const link = place.url || '#';
  const target = link.startsWith('#') ? '' : '_blank';
  const rel = link.startsWith('#') ? '' : 'noopener';

  return `
    <article class="card" ${areaName ? `data-area="${areaName}"` : ''} role="listitem">
      <h2>${place.name ?? 'Untitled'}</h2>
      <figure>
        <img src="${img}" alt="${alt}" width="300" height="200" loading="lazy"
             onerror="this.src='images/members/default.svg'">
        ${place.caption ? `<figcaption class="sr-only">${place.caption}</figcaption>` : ''}
      </figure>
      ${place.address ? `<address>${place.address}</address>` : ''}
      ${place.description ? `<p>${place.description}</p>` : ''}
      <a class="btn" href="${link}" target="${target}" rel="${rel}">Learn more</a>
    </article>
  `;
}

async function loadPlaces(){
  const grid = document.getElementById('discoverGrid');
  if (!grid) return;

  try {
    const res = await fetch('data/places.json', { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    const items = Array.isArray(json) ? json : (json.places || []);
    const firstEight = items.slice(0, 8);
    const rest = items.slice(8);

    const A = firstEight.map((p, i) => cardHTML(p, `item${i+1}`)).join('');
    const B = rest.map(p => cardHTML(p, '')).join('');

    grid.innerHTML = A + B;
  } catch (err) {
    console.error(err);
    grid.innerHTML = `<p class="muted">We couldn’t load the discover content right now.</p>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setFooterMeta();
  showVisitMessage();
  loadPlaces();
});
