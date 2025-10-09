// Al cargar: poner timestamp, iniciar animación y enlazar modales
document.addEventListener('DOMContentLoaded', () => {
  // Timestamp oculto
  const ts = document.getElementById('timestamp');
  if (ts) ts.value = new Date().toISOString();

  // Animación inicial de cards
  const cards = document.getElementById('membershipCards');
  if (cards) cards.classList.add('loaded');

  // Mapa de modales
  const map = {
    np: document.getElementById('modal-np'),
    bronze: document.getElementById('modal-bronze'),
    silver: document.getElementById('modal-silver'),
    gold: document.getElementById('modal-gold'),
  };

  // Abrir modal
  document.querySelectorAll('[data-dialog]').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.getAttribute('data-dialog');
      const dlg = map[key];
      if (!dlg) return;
      if (typeof dlg.showModal === 'function') {
        dlg.showModal();
      } else {
        // Fallback si <dialog> no está soportado
        dlg.setAttribute('open','');
      }
    });
  });

  // Cerrar por Escape (extra por fallback)
  Object.values(map).forEach(dlg=>{
    dlg?.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') dlg.close?.(); });
  });

  // Año en footer (si existe)
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
