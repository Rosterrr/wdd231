// Fill timestamp on join.html
const timestampField = document.getElementById('timestamp');
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// Handle modals
document.querySelectorAll('.open-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const modalId = btn.getAttribute('data-modal');
    document.getElementById(modalId).classList.add('show');
  });
});

document.querySelectorAll('.close-modal').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    btn.closest('.modal').classList.remove('show');
  });
});

// On thankyou.html, display submitted values
if (window.location.pathname.includes('thankyou.html')) {
  const params = new URLSearchParams(window.location.search);
  ['firstName','lastName','email','phone','businessName','timestamp'].forEach(id=>{
    const el = document.getElementById(id);
    if (el) el.textContent = params.get(id) || '';
  });
}
