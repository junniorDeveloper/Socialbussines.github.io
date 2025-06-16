
let cart = [];

// FUNCION PARA ACTUALIZAR AL AGREGAR UN PRODUCTO AL CARRITO Y ESTRUCTURA DE LA LISTA
const updateCart = () => {
    const cartItemsDiv = document.getElementById('cartItems');
    cartItemsDiv.innerHTML = '';
    let total = 0;
    let totalOriginal = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price_end * item.quantity;
        total += itemTotal;
        totalOriginal += item.price * item.quantity;

        const productCard = document.createElement('div');
        productCard.className = 'bg-white shadow-md rounded-lg overflow-hidden flex items-center';
        productCard.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-contain mr-4">
                <div class="flex-1">
                    <h3 class="text-sm md:text-base font-semibold">${item.name}</h3>
                    <p class="text-sm md:text-base text-gray-600">Cantidad: ${item.quantity}</p>
                    <p class="text-sm md:text-base text-gray-600">Unidad: ${item.price_end}</p>
                    <p class="text-sm md:text-base text-gray-600">Precio: S/${itemTotal.toFixed(2)}</p>
                </div>
                <div class="px-4 py-2">
                    <button class="text-red-500" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        cartItemsDiv.appendChild(productCard);
    });

    document.getElementById('totalPrice').innerText = `Total: S/${total.toFixed(2)} | Ahorro: S/${(totalOriginal - total).toFixed(2)}`;

    const updateCartCount = () => {
        const cartCount = document.getElementById('cartCount');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems > 0) {
            cartCount.innerText = totalItems;
            cartCount.classList.remove('hidden');
        } else {
            cartCount.classList.add('hidden');
        }
    };

    updateCartCount();
};

// FUNCION PARA AGREGAR PRODUCTOS AL CARRITO
window.addToCart = function (product) {
    if (product.message_stock === "Agotado") {
        Swal.fire({
            title: '<h3 style="font-size: 20px;">¡Gracias por tu interés!</h3>',
            html: `<h3 style="font-size: 18px;">Nuestro <strong>${product.name}</strong> actualmente está agotado, pero pronto estará disponible nuevamente.</h3>`,
            imageUrl: product.image,
            confirmButtonColor: '#3085d6',
            imageWidth: 300,
            confirmButtonText: 'OK',
            showCloseButton: true,
        });
        return;
    }

    Swal.fire({
        html: `<h3 style="font-size: 18px;">¿Deseas agregar <strong>${product.name}</strong> al carrito?</h3>`,
        imageUrl: product.image,
        imageWidth: 300,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Agregar',
        cancelButtonText: 'Cancelar',
        showCloseButton: true,
        reverseButtons: true
        
    }).then((result) => {
        if (result.isConfirmed) {
            const existingProduct = cart.find(item => item.name === product.name);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();

            Swal.fire({
                html: `<h3 style="font-size: 22px;">¡Agregado!</h3>`,
                icon: 'success',
                timer: 1200,
                showConfirmButton: false,
                draggable: true
            });
        } else {
            Swal.fire({
                html: `<h3 style="font-size: 22px;">Cancelado</h3>`,
                icon: 'info',
                timer: 1000,
                showConfirmButton: false,
                draggable: true
            });
        }
    });
};

// FUNCION PARA ACTUALIZAR CANTIDAD AL PULSAR AGREGAR
window.updateQuantity = function (index, quantity) {
    cart[index].quantity = parseInt(quantity);
    updateCart();
};

// FUNCION PARA ELIMINAR UN PRODUCTO DEL CARRITO
window.removeFromCart = function (index) {
    cart.splice(index, 1);
    updateCart();
};


// FUNCIÓN PARA MOSTRAR/OCULTAR EL CARRITO USANDO SOLO TAILWIND
document.getElementById('cartButton').addEventListener('click', () => {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.toggle('hidden');
    updateCart();
});

// CERRAR MODAL AL HACER CLIC FUERA DEL CARRITO
document.getElementById('cartOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.classList.add('hidden');
    }
});

