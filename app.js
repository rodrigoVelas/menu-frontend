let menuCompleto = {};
let categoriaActual = 'todas';

async function obtenerMenu() {
  try {
    const response = await fetch("https://menu-japones-api.onrender.com/api/menu");
    const menu = await response.json();
    menuCompleto = menu;
    renderMenu(menu);
  } catch (error) {
    console.error("Error al obtener el menú:", error);
  }
}

function renderMenu(menu, filtro = '') {
  const container = document.getElementById("menu-container");
  container.innerHTML = "";

  for (const categoria in menu) {
    if (categoriaActual !== 'todas' && categoria !== categoriaActual) continue;

    const productos = menu[categoria].filter(item =>
      item.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    if (productos.length === 0) continue;

    const seccion = document.createElement("div");
    seccion.className = "menu-section";
    const titulo = document.createElement("h2");
    titulo.className = "categoria-titulo";
    titulo.textContent = traducirCategoria(categoria);
    seccion.appendChild(titulo);

    const grid = document.createElement("div");
    grid.className = "card-grid";

    productos.forEach(item => {
      const card = document.createElement("div");
      card.className = "card";
      let html = `<h3>${item.nombre}</h3>`;
      if (item.precio) html += `<p><strong>Precio:</strong> Q${item.precio}</p>`;
      if (item.variantes) html += `<p><strong>Variantes:</strong></p><ul>${item.variantes.map(v => `<li>${v}</li>`).join("")}</ul>`;
      if (item.precios) html += `<p><strong>Precios:</strong></p><ul>${Object.entries(item.precios).map(([k, v]) => `<li>${k}: Q${v}</li>`).join("")}</ul>`;
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
    bebidas: "Bebidas 飲み物",
    calientes: "Calientes 熱い",
    frias: "Frías 冷たい"
  };
  return traducciones[nombre] || nombre;
}

function filtrarCategoria(cat) {
  categoriaActual = cat;
  renderMenu(menuCompleto, document.getElementById('buscador').value);
}

document.getElementById('buscador').addEventListener('input', e => {
  renderMenu(menuCompleto, e.target.value);
});

obtenerMenu();
