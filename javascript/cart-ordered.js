let cart = [];
const savedCart = localStorage.getItem('cart');
cart = savedCart ? JSON.parse(savedCart) : [];

function changeQuantity(index, delta) {
     if (cart[index]) {
        const newQuantity = cart[index].quantity + delta;

        // Impide que la cantidad baje de 1
        if (newQuantity < 1) {
            return; // No hace nada si intenta bajar de 1
        }

        cart[index].quantity = newQuantity;
        updateCart();
    }
}


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
        productCard.className = 'bg-white overflow-hidden flex items-center py-2';
        productCard.innerHTML = `
                <img src="https://qiziyaqqptpwcarbywsx.supabase.co/storage/v1/object/public/imagenes/products/${item.image}" alt="${item.name}" class="w-20 h-20 object-contain mr-2 ml-2">
                <div class="flex-1">
                    <h3 class="text-sm md:text-base font-semibold">${item.name}</h3>
                    <p class="text-sm md:text-base text-gray-600">Cantidad: ${item.quantity}</p>
                    <p class="text-sm md:text-base text-gray-600">Unidad: S/${item.price_end.toFixed(2)}</p>
                    <p class="text-sm md:text-base text-gray-600">Precio: S/${itemTotal.toFixed(2)}</p>
                </div>
                <div class="flex flex-col space-y-1 ">
                    <button class="px-1 mb-1 text-red-600 ocultar-al-capturar" onclick="removeFromCart(${index})">
                        <i class="fas fa-times"></i>
                    </button>
                    <button class="md:px-1 text-white bg-gray-300 ocultar-al-capturar" onclick="changeQuantity(${index}, 1)">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button class="md:px-1 text-white bg-gray-300 ocultar-al-capturar" onclick="changeQuantity(${index}, -1)">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                    
                </div>
            `;
        cartItemsDiv.appendChild(productCard);
    });

    document.getElementById('totalPrice').innerText = `Total: S/${total.toFixed(2)} | Ahorro: S/${(totalOriginal - total).toFixed(2)}`;

    // CONTADOR DE NOTIFICACION DEL CARRO DE COMPRAS
    const updateCartCount = () => {
        const cartCount = document.getElementById('cartCount');
        const totalItems = cart.length; 

        if (totalItems > 0) {
            cartCount.innerText = totalItems;
            cartCount.classList.remove('hidden');
        } else {
            cartCount.classList.add('hidden');
        }
    };

    updateCartCount();

    // LOCAL STORAGE
    localStorage.setItem('cart', JSON.stringify(cart));
};


window.onload = () => {
    updateCart();
};

// FUNCION PARA ENVIA TEXTO DEL PEDIDO POR WHATSAPP
// const shareCartAsText = () => {
//     let message = '*Mi carrito de compras:*\n';

//     // Mensaje que expresa interés en realizar el pedido
//     message += '¡Hola! Me gustaría hacer un pedido con los siguientes productos.';

//     // Se puede añadir un texto que indique que hay una imagen del pedido
//     message += '\nAdjunto la imagen con los detalles del pedido.';

//     // Número en formato internacional sin el signo +
//     const phone = '51967212987';
//     const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
//     window.open(url, '_blank');
// };

const shareCartAsText = async () => {
    try {
        await captureCart(); // Espera a que termine la captura

        let message = '*Mi carrito de compras:*\n';
        message += '¡Hola! Me gustaría hacer un pedido con los siguientes productos.';
        message += '\nAdjunto la imagen con los detalles del pedido.';

        const phone = '51967212987';
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    } catch (error) {
        console.error('Error al capturar el carrito:', error);
    }
};


// FUNCIÓN PARA AGREGAR PRODUCTOS AL CARRITO USANDO ALERTIFYJS
window.addToCart = function (product) {
    if (product.message_stock === "Agotado") {
        alertify.alert(
            '¡Gracias por tu interés!',
            `<div style="text-align: center;">
                <img src="https://qiziyaqqptpwcarbywsx.supabase.co/storage/v1/object/public/imagenes/products/${product.image}" 
                    alt="Producto agotado" style="width: 250px; margin: 0 auto 10px auto; display: block;"  />
                <p>Actualmente este producto está <strong>agotado</strong>. ¡Gracias por tu interés!</p>
            </div>`
        ).set('transition', 'fade');
        
        return;
    }

    alertify.confirm(
        'Agregar al carrito',
        `<div style="text-align: center;">
            <img src="https://qiziyaqqptpwcarbywsx.supabase.co/storage/v1/object/public/imagenes/products/${product.image}" 
                alt="Producto disponible" style="width: 250px; margin: 0 auto 10px auto; display: block;"  />
        </div>`,
        
        function () {
            const existingProduct = cart.find(item => item.name === product.name);
            if (existingProduct) {
                existingProduct.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
            alertify.set('notifier','position', 'top-center');
            alertify.success('¡Producto agregado al carrito!');
        },
        function () {
            // alertify.set('notifier','position', 'top-center');
            // alertify.error('Operación cancelada');
        }
    ).set({
        labels: { ok: 'Agregar', cancel: 'Cancelar' },
        transition: 'fade',
        reverseButtons: true
    });
};


// FUNCION PARA ACTUALIZAR CANTIDAD AL PULSAR AGREGAR
// window.updateQuantity = function (index, quantity) {
//     cart[index].quantity = parseInt(quantity);
//     updateCart();
// };

// FUNCIÓN PARA ELIMINAR UN PRODUCTO DEL CARRITO USANDO ALERTIFYJS
window.removeFromCart = function (index) {
    alertify.confirm(
        '¿Estás seguro?',
        '¡No podrás revertir esto!',
        function () {
            cart.splice(index, 1);
            updateCart();
            alertify.set('notifier','position', 'top-center');
            alertify.success('Producto eliminado del carrito.');
        },
        function () {
            // alertify.set('notifier','position', 'top-center');
            // alertify.error('Operación cancelada');
        }
    ).set({
        labels: { ok: 'Sí, eliminar', cancel: 'Cancelar' },
        transition: 'fade',
        reverseButtons: true
    });
};


// FUNCIÓN PARA LIMPIAR TODA LA LISTA DEL CARRITO USANDO ALERTIFYJS
function clearCart() {
    if (cart.length === 0) {
        alertify.set('notifier','position', 'top-center');
        alertify.alert('Carrito vacío', 'El carrito ya está vacío.');
        return;
    }

    alertify.confirm(
        '¿Vaciar carrito?',
        'Se eliminarán todos los productos del carrito.',
        function () {
            cart = [];
            updateCart();
            localStorage.removeItem('cart');
            alertify.set('notifier','position', 'top-center');
            alertify.success('Carrito vaciado');
        },
        function () {
            // alertify.set('notifier','position', 'top-center');
            // alertify.error('Operación cancelada');
        }
    ).set({
        labels: { ok: 'Sí, vaciar', cancel: 'Cancelar' },
        transition: 'fade', // puedes cambiar a 'pulse' o 'fade'
        reverseButtons: true
    });
}


// FUNCIÓN PARA MOSTRAR/OCULTAR EL CARRITO USANDO SOLO TAILWIND
document.getElementById('cartButton').addEventListener('click', () => {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.toggle('hidden');
    // Controlar el scroll del body
    if (overlay.classList.contains('hidden')) {
        document.body.classList.remove('overflow-hidden'); // Habilitar scroll
    } else {
        document.body.classList.add('overflow-hidden'); // Deshabilitar scroll
    }
    updateCart();
});

// CERRAR MODAL AL HACER CLIC FUERA DEL CONTENEDOR DEL CARRITO
document.getElementById('cartOverlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeCart();
    }
});

// CERRAR MODAL AL HACER CLIC EN EL BOTÓN DE CIERRE
document.getElementById('closeCart').addEventListener('click', () => {
    closeCart();
});

// FUNCIÓN DE CIERRE REUTILIZABLE
function closeCart() {
    const overlay = document.getElementById('cartOverlay');
    overlay.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}