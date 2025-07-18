let allProducts = [];
let currentIndex = 0;
let currentCategory = 'todos';

function getBatchSize() {
    const width = window.innerWidth;

    if (width >= 1280) { // xl y superior
        return 8;
    } else {
        return 6;
    }
}


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

    currentCategory = category;
    currentIndex = 0;

    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) loadMoreBtn.style.display = 'block';

    loadMoreProducts();
}

// FUNCION PARA MOSTRAR PRODUCTOS DE 8 EN 8
function loadMoreProducts() {
    const productList = document.getElementById('product-list');
    const batchSize = getBatchSize();
    const filteredProducts = currentCategory === 'todos'
        ? allProducts
        : allProducts.filter(product => product.category === currentCategory);

    const nextProducts = filteredProducts.slice(currentIndex, currentIndex + batchSize);

    nextProducts.forEach((product, index) => {
        const uniqueId = `desc-${currentIndex + index}`; 
        const productDiv = document.createElement('div');
        productDiv.className = 'bg-white overflow-hidden transition-transform transform scroll-item rounded-xl';
        productDiv.innerHTML = `
            <div class="relative">
                <div class="h-72 w-full flex items-center justify-center">
                    <img src="https://qiziyaqqptpwcarbywsx.supabase.co/storage/v1/object/public/imagenes/products/${product.image}" alt="${product.name}" class="w-64 h-64 object-cover">
                </div>
                ${product.price_end < product.price
                    ? `
                    <span class="absolute top-0 right-0 mt-2 mr-2 md:mt-1 md:mr-1 flex h-8 w-10 rounded bg-red-700 z-10 items-center justify-center">
                    <span class="absolute top-0 right-0 left-0 bottom-0 animate-soft-ping rounded bg-red-600 opacity-75"></span>
                        <span class="text-sm font-bold text-white z-10">
                            -${Math.round(((product.price - product.price_end) / product.price) * 100)}%
                        </span>
                    </span>`
                    : ''
                }
            </div>


            <div class="p-4 ">
                <div class="flex items-center ">
                    <p class="scroll-item text-sm flex ">
                        <span class="status-icon w-2 h-2 rounded-full 
                            ${product.message_stock === 'Disponible' ? 'bg-green-500' : 
                            product.message_stock === 'Limitado' ? 'bg-yellow-500' : 'bg-red-500'}">
                        </span>
                    </p>
                    <h2 class="text-lg font-semibold truncate-text text-black scroll-item ml-2">
                        ${product.name}
                    </h2>
                </div>

                
                <button class="text-sm mt-1 text-black scroll-item" onclick="toggleDescription('${uniqueId}')">
                    <i class="fas fa-eye"></i> Ver descripción
                </button>

                <div id="${uniqueId}" class="description-content text-gray-500 text-sm">
                    <p class="text-black text-sm mb-1 scroll-item">Marca: ${product.brand}</p>
                    <p class="scroll-item text-sm">
                        <span class="${product.message_stock === 'Disponible' ? 'text-green-500' : product.message_stock === 'Limitado' ? 'text-yellow-500' : 'text-red-500'}">
                            ${product.message_stock}
                        </span>
                    </p>
                    ${product.description}
                </div>
                
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-small scroll-item">
                            <span class="font-semibold text-black mr-2">Precio: S/${product.price_end.toFixed(2)}</span>
                            ${product.price_end !== product.price
                                ? `<span class="line-through text-black"> (S/${product.price.toFixed(2)})</span>`
                                : ''}
                        </p>
                    </div>
                    <button class="bg-white text-black px-4 py-2 scroll-item" onclick="addToCart(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                        <i class="fas fa-shopping-cart effect"></i>
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    });

    // Configuración del Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const scrollItems = document.querySelectorAll('.scroll-item');
    scrollItems.forEach(item => observer.observe(item));

    currentIndex += nextProducts.length;

    if (currentIndex >= filteredProducts.length) {
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (loadMoreBtn) loadMoreBtn.style.display = 'none';
    }
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

// EVENTO BOTÓN "VER MÁS"
document.addEventListener('DOMContentLoaded', () => {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            loadMoreProducts();
        });
    }
});

displayProducts();
