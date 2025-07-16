document.addEventListener('DOMContentLoaded', async () => {
  const menuContenedor = document.getElementById('menu');

  try {
    const response = await fetch('https://menu-japones-api.onrender.com/menu');
    const data = await response.json();

    if (!data || !data.length) {
      menuContenedor.innerHTML = '<p class="error">No hay productos disponibles.</p>';
      return;
    }

    // Agrupar productos por categoría
    const categorias = {};
    data.forEach(producto => {
      const categoria = producto.categoria || 'Sin categoría';
      if (!categorias[categoria]) {
        categorias[categoria] = [];
      }
      categorias[categoria].push(producto);
    });

    // Renderizar cada categoría y sus productos
    for (const categoria in categorias) {
      const section = document.createElement('section');
      section.classList.add('categoria');

      const titleCard = document.createElement('div');
      titleCard.classList.add('card-categoria');
      titleCard.innerHTML = `
        <h2>${categoria}</h2>
        <p>Explora nuestras delicias en la categoría <strong>${categoria}</strong></p>
      `;
      section.appendChild(titleCard);

      const grid = document.createElement('div');
      grid.classList.add('productos-grid');

      categorias[categoria].forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('producto-card');
        card.innerHTML = `
          <h3>${producto.nombre}</h3>
          <p class="descripcion">${producto.descripcion || ''}</p>
          <p class="precio">Q${producto.precio.toFixed(2)}</p>
        `;
        grid.appendChild(card);
      });

      section.appendChild(grid);
      menuContenedor.appendChild(section);
    }

  } catch (error) {
    console.error('Error al cargar el menú:', error);
    menuContenedor.innerHTML = '<p class="error">Hubo un problema al cargar el menú.</p>';
  }
});
