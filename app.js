// app.js (Frontend)

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-items-container');
    const japaneseCoffeeSection = document.getElementById('japanese-coffee-section');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const menuLoading = document.getElementById('menu-loading');
    const japaneseCoffeeLoading = document.getElementById('japanese-coffee-loading');

    // ¡IMPORTANTE! Asegúrate de que esta URL sea la de tu API desplegada en Render
   const API_URL = 'https://menu-japones-api.onrender.com/api/menu';

    let allMenuItems = []; // Para almacenar todos los ítems del menú una vez que se cargan

    // Función para renderizar un solo ítem del menú
    const renderMenuItem = (item) => {
        // Manejo de precios variables (ej. Baos, Sandos, Bebidas con diferentes tamaños)
        let priceDisplay = '';
        if (typeof item.price === 'object') {
            priceDisplay = Object.entries(item.price)
                .map(([key, value]) => `<span class="block text-sm text-gray-600">${key}: Q${value.toFixed(2)}</span>`)
                .join('');
        } else {
            priceDisplay = `<span class="block text-xl font-bold text-pink-600">Q${item.price.toFixed(2)}</span>`;
        }

        // Determina la imagen a usar
        // Si tienes imágenes específicas en tu carpeta img/, úsalas.
        // Si no, usa una imagen placeholder general o maneja el error.
        // Aquí estoy usando la ruta especificada en el backend (assets/img/...)
        const imageSrc = item.imageUrl || 'img/assets/placeholder.jpg'; // Usa un placeholder si no hay imagen definida

        return `
            <div class="menu-card bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
                <img src="${imageSrc}" alt="${item.name}" class="w-full h-48 object-cover object-center transform hover:scale-110 transition duration-500 ease-in-out">
                <div class="p-6">
                    <h3 class="text-2xl font-semibold text-gray-900 mb-2">${item.name}</h3>
                    <p class="text-gray-700 text-sm mb-4 h-16 overflow-hidden">${item.description}</p>
                    <div class="flex items-end justify-between">
                        <div>
                            ${priceDisplay}
                        </div>
                        <span class="text-xs text-gray-500 px-3 py-1 bg-gray-100 rounded-full">${item.category}</span>
                    </div>
                </div>
            </div>
        `;
    };

    // Función para renderizar el café japonés destacado
    const renderJapaneseCoffee = (items) => {
        japaneseCoffeeSection.innerHTML = ''; // Limpiar antes de renderizar
        if (items.length === 0) {
            japaneseCoffeeSection.innerHTML = '<p class="col-span-full text-center text-gray-500">No hay especiales de café japonés por el momento.</p>';
            return;
        }
        items.forEach(item => {
            japaneseCoffeeSection.innerHTML += renderMenuItem(item);
        });
    };

    // Función para renderizar los ítems del menú filtrados
    const renderMenuItems = (itemsToRender) => {
        menuContainer.innerHTML = ''; // Limpiar antes de renderizar
        if (itemsToRender.length === 0) {
            menuContainer.innerHTML = '<p class="col-span-full text-center text-gray-500">No se encontraron productos en esta categoría.</p>';
            return;
        }
        itemsToRender.forEach(item => {
            menuContainer.innerHTML += renderMenuItem(item);
        });
    };

    // Función para crear botones de filtro de categoría
    const createCategoryFilters = (categories) => {
        categoryFiltersContainer.innerHTML = ''; // Limpiar antes de crear

        // Botón "Todo el Menú"
        const allButton = document.createElement('button');
        allButton.textContent = 'Todo el Menú';
        allButton.classList.add('filter-btn', 'active'); // Por defecto, "Todo el Menú" está activo
        allButton.dataset.category = 'All';
        categoryFiltersContainer.appendChild(allButton);

        // Otros botones de categoría
        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.classList.add('filter-btn');
            button.dataset.category = category;
            categoryFiltersContainer.appendChild(button);
        });

        // Añadir event listeners a los botones de filtro
        categoryFiltersContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('filter-btn')) {
                // Remover clase 'active' de todos los botones
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                // Añadir clase 'active' al botón clickeado
                event.target.classList.add('active');

                const selectedCategory = event.target.dataset.category;
                if (selectedCategory === 'All') {
                    renderMenuItems(allMenuItems);
                } else {
                    const filtered = allMenuItems.filter(item => item.category === selectedCategory);
                    renderMenuItems(filtered);
                }
            }
        });
    };

    // Función principal para cargar y mostrar el menú
    const loadMenu = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            allMenuItems = await response.json();

            // Ocultar mensajes de carga
            menuLoading.style.display = 'none';
            japaneseCoffeeLoading.style.display = 'none';

            // Obtener categorías únicas para los filtros, excluyendo 'Japanese' y 'Bebidas' para agruparlas mejor en filtros
            // y añadiendo las subcategorías de bebidas como filtros principales si lo deseas.
            const rawCategories = allMenuItems.map(item => item.category);
            const uniqueCategories = [...new Set(rawCategories)].sort(); // Ordenar alfabéticamente

            // Si quieres un control más granular de las categorías mostradas en los filtros principales
            // Por ejemplo, no mostrar "Bebidas" sino "Bebidas Calientes", "Bebidas Frías", "Frappes"
            const categoriesForFilters = ['Brunch', 'Postres', 'Japanese']; // Categorías principales
            const beverageSubcategories = [...new Set(allMenuItems
                                            .filter(item => item.category === 'Bebidas' && item.subCategory)
                                            .map(item => item.subCategory))];
            categoriesForFilters.push(...beverageSubcategories.sort()); // Añadir subcategorías de bebidas

            createCategoryFilters(categoriesForFilters);


            // Renderizar todo el menú por defecto
            renderMenuItems(allMenuItems);

            // Filtrar y renderizar los cafés japoneses destacados
            // También incluimos Taro y Matcha de Bebidas Frías si están marcados como isJapaneseCoffeeInspired
            const japaneseCoffeeItems = allMenuItems.filter(item =>
                (item.category === 'Bebidas' && item.isJapaneseCoffeeInspired) ||
                (item.category === 'Japanese' && item.subCategory === null) // Considera Mochis, Baos aquí si quieres
            );
            renderJapaneseCoffee(japaneseCoffeeItems);

        } catch (error) {
            console.error('Error al cargar el menú:', error);
            menuContainer.innerHTML = '<p class="col-span-full text-center text-red-500">Lo sentimos, no pudimos cargar el menú. Por favor, intenta de nuevo más tarde.</p>';
            japaneseCoffeeSection.innerHTML = '<p class="col-span-full text-center text-red-500">Lo sentimos, no pudimos cargar los especiales de café japonés.</p>';
        }
    };

    // Cargar el menú al iniciar la página
    loadMenu();
});
