// app.js

document.addEventListener('DOMContentLoaded', () => {
    // Definición de todo el menú como un array plano de objetos
    // Las imageUrl se han mantenido para futuras implementaciones, pero NO se renderizarán por ahora.
    const menu = [
        // --- Brunch ---
        {
            id: 'brunch-001',
            name: 'TOAST FUWA',
            description: 'Delicadas tostadas con mantequilla de maní casera, coronadas con frutas rojas frescas y un toque de miel.',
            price: 45.00,
            category: 'Brunch',
            subCategory: null,
            imageUrl: 'img/brunch-toast.jpg', 
            tags: ['dulce', 'frutas', 'saludable']
        },
        {
            id: 'brunch-002',
            name: 'EGG SANDWICH CLUB',
            description: 'Huevos revueltos en pan brioche suave, con queso mozzarella, un toque de sriracha picante, cebolla morada caramelizada y cama de champiñones. ¡Una explosión de sabor!',
            price: 40.00,
            category: 'Brunch',
            subCategory: null,
            imageUrl: 'img/brunch-eggsandwich.jpg', 
            tags: ['salado', 'picante', 'completo']
        },
        {
            id: 'brunch-003',
            name: 'TOSTADA BRULÉ',
            description: 'Tostada a la francesa, caramelizada al estilo "creme brulée", acompañada de frutas frescas y un helado de vainilla artesanal.',
            price: 45.00,
            category: 'Brunch',
            subCategory: null,
            imageUrl: 'img/brunch-tostadabrule.jpg', 
            tags: ['dulce', 'frutas', 'postre']
        },
        {
            id: 'brunch-004',
            name: 'MUFFIN BENEDICTINOS',
            description: 'Muffin inglés con huevos pochados, jamón o salmón ahumado (a elegir), bañados en una rica salsa holandesa. ¡Un clásico elevado!',
            price: 45.00,
            category: 'Brunch',
            subCategory: null,
            imageUrl: 'img/brunch-muffinbenedictinos.jpg', 
            tags: ['salado', 'clásico', 'completo']
        },

        // --- Postres ---
        {
            id: 'dessert-001',
            name: 'CRUMBL COOKIES',
            description: 'Nuestras famosas Crumbl Cookies del día. Pregunta por la variedad disponible. ¡Siempre una sorpresa deliciosa!',
            price: 25.00,
            category: 'Postres',
            subCategory: null,
            imageUrl: 'img/dessert-crumblcookies.jpg', 
            tags: ['galletas', 'dulce', 'variedad']
        },
        {
            id: 'dessert-002',
            name: 'CHEESECAKE DE MARACUYÁ',
            description: 'Suave y cremoso cheesecake con el toque tropical y ligeramente ácido del maracuyá, perfecto para los amantes de los sabores exóticos.',
            price: 30.00,
            category: 'Postres',
            subCategory: null,
            imageUrl: 'img/dessert-cheesecakemaracuya.jpg', 
            tags: ['queso', 'frutas', 'cremoso']
        },
        {
            id: 'dessert-003',
            name: 'PASTEL CHOCOLATE',
            description: 'Un clásico irresistible: capas de bizcocho de chocolate húmedo con un rico glaseado. La indulgencia perfecta.',
            price: 30.00,
            category: 'Postres',
            subCategory: null,
            imageUrl: 'img/dessert-pastelchocolate.jpg', 
            tags: ['chocolate', 'clásico', 'indulgencia']
        },

        // --- Japanese ---
        {
            id: 'japanese-001',
            name: 'BAOS (Pancillos al Vapor)',
            description: 'Pancillos suaves y esponjosos de origen japonés, rellenos a elegir entre cerdo desmenuzado o vegetales. ¡Una delicia para picar!',
            price: { '1': 35.00, '2': 55.00 },
            category: 'Japanese',
            subCategory: null,
            imageUrl: 'img/japanese-baos.jpg', 
            tags: ['vapor', 'cerdo', 'vegetariano']
        },
        {
            id: 'japanese-002',
            name: 'MOCHIS',
            description: 'Dulces japoneses hechos de masa de arroz glutinoso, suaves y elásticos, rellenos de sabores variados del día. ¡Un bocado de Japón!',
            price: 18.00,
            category: 'Japanese',
            subCategory: null,
            imageUrl: 'img/japanese-mochis.jpg', 
            tags: ['dulce', 'arroz', 'postre japones']
        },
        {
            id: 'japanese-003',
            name: 'KATSU SANDO',
            description: 'Sandwich japonés de pan suave con jugoso filete de lomo de cerdo empanizado, acompañado de salsa tonkatsu y pepinillos fuwa de la casa.',
            price: 50.00,
            category: 'Japanese',
            subCategory: 'Sando',
            imageUrl: 'img/japanese-katsusando.jpg', 
            tags: ['sandwich', 'cerdo', 'salado']
        },
        {
            id: 'japanese-004',
            name: 'SANDO DE POLLO',
            description: 'Versión del famoso Katsu Sando, con jugoso pollo empanizado en pan suave y nuestra salsa especial.',
            price: 45.00,
            category: 'Japanese',
            subCategory: 'Sando',
            imageUrl: 'img/japanese-sandopollo.jpg', 
            tags: ['sandwich', 'pollo', 'salado']
        },
        {
            id: 'japanese-005',
            name: 'SANDOS FRUTALES',
            description: 'Sandwich japonés de brioche de la casa, relleno de crema japonesa dulce y una selección de frutas frescas: Uva Verde, Frutos Rojos o Melocotón Mora-Fresa.',
            price: { 'Un Sabor': 38.00, 'Dos Sabores': 43.00 },
            category: 'Japanese',
            subCategory: 'Sando',
            imageUrl: 'img/japanese-sandosfrutales.jpg', 
            tags: ['sandwich', 'dulce', 'frutas', 'brioche']
        },

        // --- Bebidas Calientes (Enfoque Café Japonés) ---
        {
            id: 'drink-hot-001',
            name: 'AMERICANO',
            description: 'El clásico café americano. Perfecto para empezar el día o como acompañamiento.',
            price: { '8oz': 17.00, '12oz': 19.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-americano.jpg', 
            tags: ['cafe', 'clasico'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-002',
            name: 'CAPUCHINO',
            description: 'Espresso con leche texturizada y una capa de espuma. Un equilibrio perfecto.',
            price: { '8oz': 20.00, '12oz': 22.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-capuchino.jpg', 
            tags: ['cafe', 'leche', 'espuma'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-003',
            name: 'LATTE',
            description: 'La suavidad del latte con leche vaporizada y una fina capa de microespuma. Versátil y reconfortante.',
            price: { '8oz': 18.00, '12oz': 20.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-latte.jpg', 
            tags: ['cafe', 'leche'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-004',
            name: 'LATTE SAKURA',
            description: 'Delicado latte con un sutil sabor a flor de cerezo (sakura). ¡Un viaje sensorial a Japón!',
            price: { '8oz': 22.00, '12oz': 25.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-sakuralatte.jpg', 
            tags: ['cafe', 'especialidad', 'japones'],
            isJapaneseCoffeeInspired: true
        },
        {
            id: 'drink-hot-005',
            name: 'FLAT WHITE',
            description: 'Un café fuerte y suave a la vez, con una capa fina de leche texturizada. Intensidad y cremosidad.',
            price: { '6oz': 18.00, '12oz': 21.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-flatwhite.jpg', 
            tags: ['cafe', 'fuerte', 'cremoso'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-006',
            name: 'CHALLATTE',
            description: 'Bebida aromática de té negro especiado con leche y un toque de vainilla. Ideal para un momento de relax.',
            price: { '12oz': 28.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-challatte.jpg', 
            tags: ['te', 'especias', 'leche'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-007',
            name: 'DIRTY CHAI',
            description: 'El clásico Chai Latte con un shot de espresso. La combinación perfecta de especias y café.',
            price: { '12oz': 30.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-dirtychai.jpg', 
            tags: ['cafe', 'te', 'especias'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-008',
            name: 'DULCE PECADO',
            description: 'Un pecado de bebida con azúcar y leche condensada. ¡Para los más golosos!',
            price: { '8oz': 23.00, '12oz': 27.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-dulcepecado.jpg', 
            tags: ['dulce', 'leche'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-009',
            name: 'MOCA',
            description: 'La combinación perfecta de espresso, chocolate y leche vaporizada, coronado con crema batida.',
            price: { '8oz': 25.00, '12oz': 28.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-moca.jpg', 
            tags: ['cafe', 'chocolate', 'leche'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-010',
            name: 'WHITE MOCA',
            description: 'Una deliciosa variante de moca con chocolate blanco y espresso. Cremosa y dulce.',
            price: { '8oz': 25.00, '12oz': 28.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-whitemoca.jpg', 
            tags: ['cafe', 'chocolate blanco', 'leche'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-011',
            name: 'CHOCOLATE',
            description: 'El clásico y reconfortante chocolate caliente. Hecho con el mejor cacao.',
            price: { '8oz': 22.00, '12oz': 25.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-chocolate.jpg', 
            tags: ['chocolate', 'clasico'],
            isJapaneseCoffeeInspired: false
        },
        {
            id: 'drink-hot-012',
            name: 'TARO',
            description: 'Bebida caliente de taro, un tubérculo asiático, con un sabor único y ligeramente dulce. Con leche para una textura cremosa.',
            price: { '12oz': 33.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-taro.jpg', 
            tags: ['taro', 'asiatico', 'leche'],
            isJapaneseCoffeeInspired: true
        },
        {
            id: 'drink-hot-013',
            name: 'MATCHA',
            description: 'Auténtico té matcha japonés ceremonial, preparado a la perfección. Rico en antioxidantes y con un sabor umami distintivo.',
            price: { '12oz': 33.00 },
            category: 'Bebidas',
            subCategory: 'Calientes',
            imageUrl: 'img/hotdrink-matcha.jpg', 
            tags: ['matcha', 'te japones', 'saludable'],
            isJapaneseCoffeeInspired: true
        },

        // --- Bebidas Frías ---
        {
            id: 'drink-cold-001',
            name: 'ICED LATTE',
            description: 'Tu latte favorito ahora frío, refrescante y cremoso. Perfecto para cualquier momento del día.',
            price: { '12oz': 18.00, '16oz': 22.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-icedlatte.jpg', 
            tags: ['cafe', 'frio', 'leche']
        },
        {
            id: 'drink-cold-002',
            name: 'CARAMEL MACCHIATO HELADO',
            description: 'Espresso sobre leche fría, con un toque de vainilla y bañado en sirope de caramelo. Dulce y energizante.',
            price: { '12oz': 28.00, '16oz': 32.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-caramelmacchiato.jpg', 
            tags: ['cafe', 'caramelo', 'frio']
        },
        {
            id: 'drink-cold-003',
            name: 'ICED TARO',
            description: 'La esencia del taro en una bebida fría y refrescante. Con un dulzor suave y una textura sedosa.',
            price: { '12oz': 28.00, '16oz': 30.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-icedtaro.jpg', 
            tags: ['taro', 'asiatico', 'frio']
        },
        {
            id: 'drink-cold-004',
            name: 'ICED MATCHA',
            description: 'La vitalidad del té matcha japonés, ahora en una versión helada y refrescante. Un impulso de energía saludable.',
            price: { '12oz': 30.00, '16oz': 33.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-icedmatcha.jpg', 
            tags: ['matcha', 'te japones', 'frio']
        },
        {
            id: 'drink-cold-005',
            name: 'COTARO (Agua de Coco + Taro)',
            description: 'Una fusión exótica de agua de coco refrescante y el dulce sabor del taro. ¡Sorprendentemente delicioso!',
            price: { '12oz': 30.00, '16oz': 33.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-cotaro.jpg', 
            tags: ['coco', 'taro', 'exotico']
        },
        {
            id: 'drink-cold-006',
            name: 'SAKURAS REFRESHER (Agua de Rosas + Frutos Rojos)',
            description: 'Refrescante bebida con el delicado aroma de agua de rosas y la dulzura de los frutos rojos. ¡Un sorbo floral y frutal!',
            price: { '12oz': 32.00, '16oz': 35.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-sakurasrefresher.jpg', 
            tags: ['rosas', 'frutos rojos', 'refrescante']
        },
        {
            id: 'drink-cold-007',
            name: 'DRAGON FRUIT',
            description: 'Exótica bebida con el vibrante sabor y color de la pitahaya (dragon fruit). Dulce y tropical.',
            price: { '12oz': 28.00, '16oz': 32.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-dragonfruit.jpg', 
            tags: ['pitahaya', 'tropical', 'frutas']
        },
        {
            id: 'drink-cold-008',
            name: 'MELON FUBUKI',
            description: 'Bebida refrescante con el sabor dulce y jugoso del melón. Ideal para hidratarse con un toque de dulzura.',
            price: { '12oz': 28.00, '16oz': 32.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-melonfubuki.jpg', 
            tags: ['melon', 'frutas', 'refrescante']
        },
        {
            id: 'drink-cold-009',
            name: 'HIKARILEMON (Limón & Jengibre)',
            description: 'Refrescante limonada con un toque picante y revitalizante de jengibre. El equilibrio perfecto entre ácido y dulce.',
            price: { '12oz': 28.00, '16oz': 32.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-hikarilemon.jpg', 
            tags: ['limonada', 'jengibre', 'picante']
        },
        {
            id: 'drink-cold-010',
            name: 'FINSPINNER (Chocolate + Espresso + Crema Japonesa)',
            description: 'Una fusión audaz de chocolate, un shot de espresso y una suave crema japonesa. ¡Una experiencia única!',
            price: { '12oz': 30.00, '16oz': 35.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-finspinner.jpg', 
            tags: ['chocolate', 'cafe', 'crema', 'japones']
        },
        {
            id: 'drink-cold-011',
            name: 'KOHI CHOKO (Chocolate + Espresso)',
            description: 'El clásico moca, pero frío. La intensidad del espresso con la dulzura del chocolate.',
            price: { '12oz': 30.00, '16oz': 35.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-kohichoko.jpg', 
            tags: ['chocolate', 'cafe', 'frio']
        },
        {
            id: 'drink-cold-012',
            name: 'CHIGO KOHI (Leche Rusa + Fresas + Crema Japonesa)',
            description: 'Una bebida dulce y cremosa con leche rusa, fresas frescas y la suavidad de nuestra crema japonesa Fuwa.',
            price: { '12oz': 33.00, '16oz': 38.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/colddrink-chigokohi.jpg', 
            tags: ['leche', 'fresas', 'crema', 'japones']
        },
        {
            id: 'drink-cold-013',
            name: 'PINKY MATCHA (Fresa + Matcha + Crema Japonesa)',
            description: 'La combinación perfecta de té matcha japonés, fresas frescas y nuestra cremosa base japonesa. Un placer vibrante.',
            price: { '12oz': 33.00, '16oz': 38.00 },
            category: 'Bebidas',
            subCategory: 'Frias',
            imageUrl: 'img/pinky_matcha.png', // Esta ya estaba bien, confirmada en tu estructura de archivos
            tags: ['matcha', 'fresas', 'crema', 'japones']
        },

        // --- Frappes ---
        {
            id: 'frappe-001',
            name: 'FRAPPE CARAMEL MACCHIATO',
            description: 'El clásico caramel macchiato transformado en un delicioso frappe helado. Dulce y refrescante.',
            price: { '12oz': 28.00, '16oz': 32.00 },
            category: 'Bebidas',
            subCategory: 'Frappes',
            imageUrl: 'img/frappe-caramelmacchiato.jpg', 
            tags: ['frappe', 'caramelo', 'cafe']
        },
        {
            id: 'frappe-002',
            name: 'FRAPPE TARO',
            description: 'El exótico sabor del taro en una versión frappe cremosa y helada. Un favorito de los jóvenes.',
            price: { '12oz': 28.00, '16oz': 32.00 },
            category: 'Bebidas',
            subCategory: 'Frappes',
            imageUrl: 'img/frappe-taro.jpg', 
            tags: ['frappe', 'taro', 'cremoso']
        },
        {
            id: 'frappe-003',
            name: 'FRAPPE MOCA',
            description: 'La indulgencia del chocolate y el café en un frappe frío y espeso. Perfecto para satisfacer antojos.',
            price: { '12oz': 28.00, '16oz': 35.00 },
            category: 'Bebidas',
            subCategory: 'Frappes',
            imageUrl: 'img/frappe-moca.jpg', 
            tags: ['frappe', 'chocolate', 'cafe']
        },
    ];

    const menuContainer = document.getElementById('menu-container');
    const japaneseCoffeeContainer = document.getElementById('japanese-coffee-container'); // Nuevo ID para el contenedor de cafés japoneses
    
    // Función para renderizar un solo ítem del menú en una tarjeta
    function renderMenuItem(item) {
        let priceHtml = '';
        if (typeof item.price === 'object') {
            priceHtml = Object.entries(item.price)
                .map(([size, price]) => `<p class="menu-item-price">${size}: Q${price.toFixed(2)}</p>`)
                .join('');
        } else {
            priceHtml = `<p class="menu-item-price">Q${item.price.toFixed(2)}</p>`;
        }

        // NO incluimos el tag <img> por ahora, según tu solicitud
        return `
            <div class="menu-card">
                <div class="menu-card-content">
                    <h4 class="menu-card-name">${item.name}</h4>
                    <p class="menu-card-description">${item.description}</p>
                    ${priceHtml}
                    <div class="menu-card-tags">
                        ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Función para renderizar todo el menú o un subconjunto
    function renderMenu(itemsToRender, container) {
        container.innerHTML = ''; // Limpiar el contenedor
        if (itemsToRender && itemsToRender.length > 0) {
            itemsToRender.forEach(item => {
                container.innerHTML += renderMenuItem(item);
            });
        } else {
            container.innerHTML = '<p>No se encontraron ítems en esta categoría.</p>';
        }
    }

    // --- Renderizar todo el menú ---
    renderMenu(menu, menuContainer);

    // --- Renderizar las Especialidades de Café Japonés ---
    const japaneseCoffeeSpecialties = menu.filter(item =>
        item.category === 'Bebidas' &&
        item.subCategory === 'Calientes' &&
        item.isJapaneseCoffeeInspired
    );
    renderMenu(japaneseCoffeeSpecialties, japaneseCoffeeContainer); // Renderiza en su propio contenedor

    // Ocultar la sección de filtros si no quieres implementarla por ahora
    const categoryFiltersContainer = document.getElementById('category-filters');
    const subcategoryFiltersContainer = document.getElementById('subcategory-filters');
    if (categoryFiltersContainer) categoryFiltersContainer.style.display = 'none';
    if (subcategoryFiltersContainer) subcategoryFiltersContainer.style.display = 'none';
});
