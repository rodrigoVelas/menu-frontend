async function obtenerMenu() {
  try {
    const response = await fetch("https://menu-japones-api.onrender.com/api/menu");
    const menu = await response.json();
    renderMenu(menu);
  } catch (error) {
    console.error("Error al obtener el menú:", error);
  }
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
    calientes: "Bebidas Calientes 熱い",
    frias: "Bebidas Frías 冷たい"
  };
  return traducciones[nombre] || nombre;
}
obtenerMenu();
