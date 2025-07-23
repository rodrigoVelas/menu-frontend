let menuGlobal = {};
let categoriaActual = "todas";

async function obtenerMenu() {
  try {
    const response = await fetch("https://menu-japones-api.onrender.com/api/menu");
    const menu = await response.json();

    // Aplanar las bebidas (calientes y frías) para que sean categorías independientes
    if (menu.bebidas) {
      if (menu.bebidas.calientes) menu.calientes = menu.bebidas.calientes;
      if (menu.bebidas.frias) menu.frias = menu.bebidas.frias;
      delete menu.bebidas;
    }

    menuGlobal = menu;
    renderMenu(menu);
    crearBotonesCategorias(Object.keys(menu));
  } catch (error) {
    console.error("Error al obtener el menú:", error);
  }
}

function crearBotonesCategorias(categorias) {
  const contenedorBotones = document.getElementById("filtros");
  contenedorBotones.innerHTML = "";

  const btnTodas = document.createElement("button");
  btnTodas.textContent = "Todas";
  btnTodas.onclick = () => {
    categoriaActual = "todas";
    renderMenu(menuGlobal);
  };
  contenedorBotones.appendChild(btnTodas);

  categorias.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = traducirCategoria(cat);
    btn.onclick = () => {
      categoriaActual = cat;
      renderMenu({ [cat]: menuGlobal[cat] });
    };
    contenedorBotones.appendChild(btn);
  });
}

function renderMenu(menu) {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  for (const categoria in menu) {
    const seccion = document.createElement("div");
    seccion.className = "menu-section";
    const titulo = document.createElement("h2");
    titulo.className = "categoria-titulo";
    titulo.textContent = traducirCategoria(categoria);
    seccion.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "card-grid";

    menu[categoria].forEach(item => {
      const card = document.createElement("div");
      card.className = "card";

      let html = `<h3>${item.nombre}</h3>`;
      if (item.precio) html += `<p><strong>Precio:</strong> Q${item.precio}</p>`;
      if (item.variantes && Array.isArray(item.variantes)) {
        html += `<p><strong>Variantes:</strong></p><ul>${item.variantes.map(v => `<li>${v.tipo || v}</li>`).join("")}</ul>`;
      }
      if (item.precios) {
        html += `<p><strong>Precios:</strong></p><ul>${Object.entries(item.precios).map(([k, v]) => `<li>${k}: Q${v}</li>`).join("")}</ul>`;
      }
      if (item.sabores) {
        html += `<p><strong>Sabores:</strong></p><ul>${item.sabores.map(s => `<li>${s}</li>`).join("")}</ul>`;
      }

      card.innerHTML = html;
      grid.appendChild(card);
    });

    seccion.appendChild(grid);
    container.appendChild(seccion);
  }
}

function traducirCategoria(nombre) {
  const traducciones = {
    brunch: "Brunch 朝食",
    postres: "Postres 甘味",
    japanese: "Japonés 和食",
    calientes: "Bebidas Calientes 熱い",
    frias: "Bebidas Frías 冷たい"
  };
  return traducciones[nombre] || nombre;
}

document.getElementById("buscar").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();
  const menuFiltrado = {};

  for (const categoria in menuGlobal) {
    const itemsFiltrados = menuGlobal[categoria].filter(item => item.nombre.toLowerCase().includes(texto));
    if (itemsFiltrados.length > 0) {
      menuFiltrado[categoria] = itemsFiltrados;
    }
  }

  renderMenu(menuFiltrado);
});

obtenerMenu();
