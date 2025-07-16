const apiUrl = "https://menu-japones-api.onrender.com/api/menu";
const container = document.getElementById("menu-container");

function createSection(title, items) {
  return `
    <section class="card">
      <h2 class="text-2xl font-bold text-green-900 mb-4">${title}</h2>
      <ul class="space-y-3 text-sm text-gray-800">
        ${items.map(item => {
          const nombre = item.nombre || "Producto";
          const precio = typeof item.precio === "string"
            ? ` - ${item.precio}`
            : typeof item.precio === "number"
              ? ` - Q${item.precio}`
              : "";

          const variantes = item.variantes
            ? `<ul class="pl-5 text-xs text-gray-600 list-disc">${item.variantes.map(v => `<li>${v}</li>`).join("")}</ul>`
            : "";

          const sabores = item.sabores
            ? `<ul class="pl-5 text-xs text-gray-600 list-disc">${item.sabores.map(s => `<li>${s}</li>`).join("")}</ul>`
            : "";

          const preciosObject = typeof item.precio === "object" && !Array.isArray(item.precio)
            ? `<ul class="pl-5 text-xs text-gray-600 list-disc">${Object.entries(item.precio).map(
                ([key, val]) => `<li>${key}: Q${val}</li>`
              ).join("")}</ul>`
            : "";

          return `
            <li>
              <strong>${nombre}</strong>${precio}
              ${variantes}
              ${sabores}
              ${preciosObject}
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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        ${createSection("Brunch", data.brunch)}
        ${createSection("Postres", data.postres)}
        ${createSection("Especiales Japoneses", data.japanese)}
        ${createSection("Bebidas Calientes", data.bebidas.calientes)}
        ${createSection("Bebidas Frías", data.bebidas.frias)}
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
