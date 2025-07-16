function crearSeccionHTML(categoria, items) {
  const contenedor = document.getElementById("menu-container");

  const seccion = document.createElement("section");
  seccion.className = "bg-white shadow-md p-6 rounded-lg animate-fadeIn";
  seccion.id = categoria.toLowerCase().replace(/\s+/g, "");

  const titulo = document.createElement("h2");
  titulo.className = "text-xl font-bold mb-4 text-green-900 border-b pb-2 border-green-200";
  titulo.textContent = categoria;

  const lista = document.createElement("ul");
  lista.className = "space-y-2";

  items.forEach(item => {
    const li = document.createElement("li");

    if (typeof item === "string") {
      li.innerHTML = `• ${item}`;
    } else if (typeof item === "object") {
      const nombre = Object.keys(item)[0];
      const contenido = item[nombre];

      const textoPrincipal = document.createElement("div");
      textoPrincipal.className = "font-semibold text-gray-800";

      if (typeof contenido === "string") {
        textoPrincipal.innerHTML = ` <strong>${nombre}</strong> - ${contenido}`;
        li.appendChild(textoPrincipal);
      } else if (Array.isArray(contenido)) {
        textoPrincipal.innerHTML = ` <strong>${nombre}</strong>`;
        li.appendChild(textoPrincipal);

        const sublista = document.createElement("ul");
        sublista.className = "ml-5 list-disc text-sm text-gray-700";
        contenido.forEach(subitem => {
          const subLi = document.createElement("li");
          subLi.textContent = subitem;
          sublista.appendChild(subLi);
        });
        li.appendChild(sublista);
      }
    }

    lista.appendChild(li);
  });

  seccion.appendChild(titulo);
  seccion.appendChild(lista);
  contenedor.appendChild(seccion);
}
