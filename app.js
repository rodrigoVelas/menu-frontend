document.addEventListener("DOMContentLoaded", async () => {
  const menuContainer = document.getElementById("menu-container");

  try {
    const response = await fetch("https://menu-japones-api.onrender.com/api/menu");
    const data = await response.json();

    mostrarMenu(data, menuContainer);
  } catch (error) {
    console.error("Error al cargar el menú:", error);
    menuContainer.innerHTML = "<p>Hubo un problema al cargar el menú.</p>";
  }
});

function mostrarMenu(data, contenedor) {
  contenedor.innerHTML = "";

  for (const categoria in data) {
    const seccion = document.createElement("div");
    seccion.classList.add("categoria");

    const titulo = document.createElement("h2");
    titulo.textContent = categoria.toUpperCase();
    seccion.appendChild(titulo);

    const items = data[categoria];

    if (Array.isArray(items)) {
      items.forEach(item => {
        seccion.appendChild(crearItem(item));
      });
    } else if (typeof items === "object") {
      for (const subcat in items) {
        const subtitulo = document.createElement("h3");
        subtitulo.textContent = subcat.toUpperCase();
        seccion.appendChild(subtitulo);

        items[subcat].forEach(item => {
          seccion.appendChild(crearItem(item));
        });
      }
    }

    contenedor.appendChild(seccion);
  }
}

function crearItem(item) {
  const div = document.createElement("div");
  div.classList.add("menu-item");

  const nombre = document.createElement("strong");
  nombre.textContent = item.nombre;
  div.appendChild(nombre);

  if (item.precio) {
    div.innerHTML += ` – Q${item.precio}`;
  }

  if (item.variantes) {
    const lista = document.createElement("ul");
    item.variantes.forEach(vari => {
      const li = document.createElement("li");
      li.textContent = typeof vari === "string" ? vari : `${vari.tipo}: Q${vari.precio}`;
      lista.appendChild(li);
    });
    div.appendChild(lista);
  }

  if (item.precios) {
    const precios = Object.entries(item.precios).map(([tamaño, valor]) => `${tamaño}: Q${valor}`).join(" / ");
    div.innerHTML += ` – ${precios}`;
  }

  if (item.sabores) {
    div.innerHTML += `<br>SABORES: ${item.sabores.join(", ")}`;
  }

  return div;
}
