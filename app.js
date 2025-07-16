document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-container");

  fetch("https://menu-japones-api.onrender.com/api/menu")
    .then(res => res.json())
    .then(data => {
      if (!data || !data.length) {
        menuContainer.innerHTML = `
          <p class="text-center col-span-full text-gray-500">No hay productos disponibles.</p>
        `;
        return;
      }

      const categorias = {};

      // Agrupar productos por categoría
      data.forEach(item => {
        if (!categorias[item.categoria]) {
          categorias[item.categoria] = [];
        }
        categorias[item.categoria].push(item);
      });

      // Recorrer las categorías y construir HTML para cada una
      for (let categoria in categorias) {
        const productosHTML = categorias[categoria].map(producto => `
          <div class="bg-white border border-pink-200 p-4 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 class="text-lg font-bold text-green-900">${producto.nombre}</h3>
            <p class="text-sm text-gray-600 mt-1">${producto.descripcion || "Sin descripción"}</p>
            <p class="text-pink-600 font-semibold mt-2">Q${producto.precio}</p>
          </div>
        `).join("");

        const categoriaSection = document.createElement("section");
        categoriaSection.innerHTML = `
          <div class="col-span-full">
            <h2 id="${categoria.toLowerCase()}" class="text-2xl font-bold text-green-800 border-b border-green-300 pb-1 mb-4 mt-10">${categoria}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              ${productosHTML}
            </div>
          </div>
        `;

        menuContainer.appendChild(categoriaSection);
      }
    })
    .catch(error => {
      console.error("Error al cargar productos:", error);
      menuContainer.innerHTML = `
        <p class="text-center col-span-full text-red-500">Error al cargar el menú. Intenta nuevamente más tarde.</p>
      `;
    });
});
