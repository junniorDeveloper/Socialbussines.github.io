let allProducts = [];

// CONSUME LOS PRODUCTOS DE LA API
async function displayProducts() {
    try {
        const products = await fetchProducts();
        allProducts = products;

        // Mostrar todos los productos al inicio
        filterProducts('todos'); 
    } catch (error) {
        console.error('Error:', error);
    }
}

// FUNCION PARA FILTRAR PRODUCTOS POR CATEGORIA
window.filterProducts = function (category) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const filteredProducts = category === 'todos' ? allProducts : allProducts.filter(product => product.category === category);

    // ESTRUCTURA DE LAS CARD DE LOS PRODUCTOS LISTADOS
    filteredProducts.forEach((product, index) => {
        const uniqueId = `desc-${index}`; 
        const productDiv = document.createElement('div');
        productDiv.className = 'bg-white shadow-md overflow-hidden transition-transform transform scroll-item';
        productDiv.innerHTML = `
            <div class="h-72 w-full flex items-center justify-center">
                <img src="https://qiziyaqqptpwcarbywsx.supabase.co/storage/v1/object/public/imagenes/products/${product.image}" alt="${product.name}" class="w-64 h-64 object-cover">
            </div>

            <div class="p-4">
                <h2 class="text-lg font-semibold truncate-text">${product.name}</h2>
                
                <p class="text-gray-600">
                    <span class="${product.message_stock === 'Disponible' ? 'text-green-500' : product.message_stock === 'Limitado' ? 'text-yellow-500' : 'text-red-500'}">
                        ${product.message_stock}
                    </span>
                </p>
                <button class="mt-2 text-gray-500" onclick="toggleDescription('${uniqueId}')">
                    <i class="fas fa-eye"></i> Ver descripción
                </button>
                <div id="${uniqueId}" class="description-content text-gray-500 mt-2 text-sm">
                    <p class="text-gray-400 text-sm mb-2">Marca: ${product.brand}</p>
                    ${product.description}
                </div>
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-small mt-2">
                            <strong class="font-semibold">Precio:</strong> S/${product.price_end.toFixed(2)} 
                            <span class="line-through text-gray-500"> (S/${product.price.toFixed(2)})</span>
                        </p>
                    </div>
                    <button class="mt-2 bg-gray-100 text-gray-600 px-4 py-2" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-shopping-cart effect"></i>
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    });

    // Configuración del Intersection Observer
    const observerOptions = {
        root: null, // El viewport
        rootMargin: '0px',
        threshold: 0.3 // 10% del elemento debe ser visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    // Observa cada elemento de producto
    const scrollItems = document.querySelectorAll('.scroll-item');
    scrollItems.forEach(item => {
        observer.observe(item);
    });
}

// FUNCION PARA MOSTRAR/OCULTAR LA DESCRIPCION DE LOS PRODUCTOS
window.toggleDescription = function (id) {
    const allDescriptions = document.querySelectorAll('.description-content');
    allDescriptions.forEach(desc => {
        if (desc.id !== id) {
            desc.classList.remove('show');
        }
    });

    const description = document.getElementById(id);
    if (description) {
        description.classList.toggle('show');
    }
}

displayProducts(); 
