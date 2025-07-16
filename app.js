const apiUrl = "https://menu-japones-api.onrender.com/api/menu";
const container = document.getElementById("menu-container");

function createSection(title, items) {
  return `
    <section class="bg-white rounded-lg shadow-md p-5 border border-gray-200">
      <h2 class="text-2xl font-bold text-pink-700 mb-3">${title}</h2>
      <ul class="space-y-2 text-sm text-gray-700">
        ${items.map(item => {
          const nombre = item.nombre || "Producto";
          const precio = item.precio ? ` - Q${item.precio}` : "";
          const variantes = item.variantes
            ? `<ul class="pl-4 text-gray-500 text-xs">${item.variantes.map(v => `<li>• ${v}</li>`).join("")}</ul>`
            : "";
          const sabores = item.sabores
            ? `<ul class="pl-4 text-gray-500 text-xs">${item.sabores.map(s => `<li>• ${s}</li>`).join("")}</ul>`
            : "";
          const preciosDetalle = item.precios
            ? `<div class="pl-4 text-gray-500 text-xs">${Object.entries(item.precios).map(([medida, precio]) =>
              `<div>${medida}: Q${precio}</div>`).join("")}</div>`
            : "";
          return `
            <li>
              <strong>${nombre}</strong>${precio}
              ${variantes}
              ${sabores}
              ${preciosDetalle}
            </li>
          `;
        }).join("")}
      </ul>
    </section>
  `;
}

fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    let html = `
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${createSection("🥪 Brunch", data.brunch)}
        ${createSection("🍰 Postres", data.postres)}
        ${createSection("🍱 Especiales Japoneses", data.japanese)}
        ${createSection("☕ Bebidas Calientes", data.bebidas.calientes)}
        ${createSection("🧊 Bebidas Frías", data.bebidas.frias)}
      </div>
    `;
    container.innerHTML = html;
  })
  .catch(err => {
    console.error("Error al cargar el menú:", err);
    container.innerHTML = `
      <p class="text-red-600 text-center mt-8">
        🚫 Ocurrió un error al cargar el menú. Verifica la conexión con la API.
      </p>`;
  });
