
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
                    <h3 class="text-lg font-semibold">${item.name}</h3>
                    <p class="text-gray-600">Cantidad: ${item.quantity}</p>
                    <p class="text-gray-600">Unidad: ${item.price_end}</p>
                    <p class="text-gray-600">Precio: S/${itemTotal.toFixed(2)}</p>
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
};

// FUNCION PARA AGREGAR PRODUCTOS AL CARRITO
window.addToCart = function (product) {
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();

    
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


// FUNCION PARA MOSTRAR/OCULTAR EL CARRITO
document.getElementById('cartButton').addEventListener('click', () => {
    const cartDiv = document.getElementById('cart');
    cartDiv.style.display = cartDiv.style.display === 'none' || cartDiv.style.display === '' ? 'block' : 'none';
    updateCart();
});

