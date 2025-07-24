// app.js (Frontend) - Con depuración adicional

document.addEventListener('DOMContentLoaded', () => {
    const menuContainer = document.getElementById('menu-items-container');
    const japaneseCoffeeSection = document.getElementById('japanese-coffee-section');
    const categoryFiltersContainer = document.getElementById('category-filters');
    const menuLoading = document.getElementById('menu-loading');
    const japaneseCoffeeLoading = document.getElementById('japanese-coffee-loading');

    // ¡IMPORTANTE! Asegúrate de que esta URL sea la de tu API desplegada en Render
    const API_URL = 'https://menu-japones-api.onrender.com/api/menu';

    let allMenuItems = []; // Para almacenar todos los ítems del menú una vez que se cargan

    // Función para renderizar un solo ítem del menú (sin imágenes por ahora)
    const renderMenuItem = (item) => {
        let priceDisplay = '';
        if (typeof item.price === 'object') {
            priceDisplay = Object.entries(item.price)
                .map(([key, value]) => `<span class="block text-sm text-gray-600">${key}: Q${value.toFixed(2)}</span>`)
                .join('');
        } else {
            priceDisplay = `<span class="block text-xl font-bold text-pink-600">Q${item.price.toFixed(2)}</span>`;
        }

        return `
            <div class="menu-card bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out">
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

    // Funciones de renderizado (sin cambios significativos)
    const renderJapaneseCoffee = (items) => {
        japaneseCoffeeSection.innerHTML = '';
        if (items.length === 0) {
            japaneseCoffeeSection.innerHTML = '<p class="col-span-full text-center text-gray-500">No hay especiales de café japonés por el momento.</p>';
            return;
        }
        items.forEach(item => {
            japaneseCoffeeSection.innerHTML += renderMenuItem(item);
        });
    };

    const renderMenuItems = (itemsToRender) => {
        menuContainer.innerHTML = '';
        if (itemsToRender.length === 0) {
            menuContainer.innerHTML = '<p class="col-span-full text-center text-gray-500">No se encontraron productos en esta categoría.</p>';
            return;
        }
        itemsToRender.forEach(item => {
            menuContainer.innerHTML += renderMenuItem(item);
        });
    };

    const createCategoryFilters = (categories) => {
        categoryFiltersContainer.innerHTML = '';
        const allButton = document.createElement('button');
        allButton.textContent = 'Todo el Menú';
        allButton.classList.add('filter-btn', 'active');
        allButton.dataset.category = 'All';
        categoryFiltersContainer.appendChild(allButton);

        categories.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category;
            button.classList.add('filter-btn');
            button.dataset.category = category;
            categoryFiltersContainer.appendChild(button);
        });

        categoryFiltersContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
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

    const loadMenu = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                const errorText = await response.text(); // Intenta leer el cuerpo del error
                throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}. Response text: ${errorText}`);
            }

            allMenuItems = await response.json();

            // --- LÍNEA DE DEPURACIÓN CLAVE ---
            console.log('Datos recibidos de la API:', allMenuItems); //
            // --- FIN DE LÍNEA DE DEPURACIÓN ---

            // **IMPORTANTE**: Verifica si allMenuItems es un array antes de usar .map() o .filter()
            if (!Array.isArray(allMenuItems)) {
                throw new TypeError('La respuesta de la API no es un array. Recibido:', allMenuItems); //
            }

            menuLoading.style.display = 'none';
            japaneseCoffeeLoading.style.display = 'none';

            const categoriesForFilters = ['Brunch', 'Postres', 'Japanese'];
            const beverageSubcategories = [...new Set(allMenuItems
                                            .filter(item => item.category === 'Bebidas' && item.subCategory)
                                            .map(item => item.subCategory))];
            categoriesForFilters.push(...beverageSubcategories.sort());

            createCategoryFilters(categoriesForFilters);
            renderMenuItems(allMenuItems);

            const japaneseCoffeeItems = allMenuItems.filter(item =>
                (item.category === 'Bebidas' && item.isJapaneseCoffeeInspired) ||
                (item.category === 'Japanese' && item.subCategory === null && ['Mochis', 'Baos'].includes(item.name))
            );
            renderJapaneseCoffee(japaneseCoffeeItems);

        } catch (error) {
            console.error('Error al cargar el menú:', error);
            menuContainer.innerHTML = `<p class="col-span-full text-center text-red-500">Lo sentimos, no pudimos cargar el menú. Error: ${error.message}. Por favor, asegúrate de que tu API esté funcionando en ${API_URL} e intenta de nuevo más tarde.</p>`; //
            japaneseCoffeeSection.innerHTML = `<p class="col-span-full text-center text-red-500">Lo sentimos, no pudimos cargar los especiales de café japonés. Error: ${error.message}</p>`; //
        }
    };

    loadMenu();
});
