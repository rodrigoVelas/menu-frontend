// js/app.js

const apiUrl = "https://menu-japones-api.onrender.com/api/menu";
const container = document.getElementById("menu-container");

function createSection(title, items) {
  return `
    <div class="card">
      <h2>${title}</h2>
      <ul class="space-y-1">
        ${items.map(item => {
          if (typeof item === "string") return `<li>${item}</li>`;
          const nombre = item.nombre || "Producto";
          const precio = item.precio ? ` - Q${item.precio}` : "";
          const detalles = item.variantes
            ? `<ul class="pl-4 text-sm text-gray-500">${item.variantes.map(v => `<li>• ${v}</li>`).join("")}</ul>`
            : "";
          return `<li><strong>${nombre}</strong>${precio}${detalles}</li>`;
        }).join("")}
      </ul>
    </div>
  `;
}

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    let html = "";

    if (data.brunch) html += createSection("🥪 Brunch", data.brunch);
    if (data.postres) html += createSection("🍰 Postres", data.postres);
    if (data.japanese) html += createSection("🍱 Especiales Japoneses", data.japanese);

    if (data.bebidas?.calientes) html += createSection("☕ Bebidas Calientes", data.bebidas.calientes);
    if (data.bebidas?.frias) html += createSection("🧊 Bebidas Frías", data.bebidas.frias);

    container.innerHTML = html;
  })
  .catch(err => {
    container.innerHTML = `<p class="text-red-500">Error al cargar el menú.</p>`;
    console.error(err);
  });
