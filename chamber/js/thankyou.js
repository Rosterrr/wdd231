// Leer parámetros GET y mostrar sólo los campos requeridos
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const required = {
    "Nombre": params.get("firstName"),
    "Apellido": params.get("lastName"),
    "Email": params.get("email"),
    "Móvil": params.get("phone"),
    "Empresa/Organización": params.get("organization"),
    "Fecha/Hora de envío": params.get("timestamp")
  };
  const tbody = document.getElementById("summaryRows");
  if (tbody) {
    Object.entries(required).forEach(([k,v])=>{
      const tr = document.createElement("tr");
      const th = document.createElement("th"); th.textContent = k;
      const td = document.createElement("td"); td.textContent = v ?? "—";
      tr.append(th,td); tbody.append(tr);
    });
  }
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
