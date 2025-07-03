//FUNCION PARA CAPTURAR PANTALLA
function captureCart() {
    if (!cart || cart.length === 0) {
        alertify.alert('Carrito vacío', 'No puedes capturar una imagen de un carrito vacío.');
        return; // Salir si el carrito está vacío
    }

    const cartContainer = document.getElementById('cart');      // Todo el carrito
    const scrollableDiv = cartContainer.querySelector('.overflow-y-auto'); // El div con scroll
    const loadingOverlay = document.getElementById('loadingOverlay')    // Mostrar overlay
    loadingOverlay.classList.remove('hidden')    // Guardar y ocultar elementos
    const ocultar = document.querySelectorAll('.ocultar-al-capturar');
    ocultar.forEach(el => el.style.display = 'none')    // Guardar estilos originales
    const originalMaxHeight = scrollableDiv.style.maxHeight;
    const originalOverflow = scrollableDiv.style.overflowY    // Expandir para que html2canvas capture todo
    scrollableDiv.style.maxHeight = 'none';
    scrollableDiv.style.overflowY = 'visible'    // Esperar a que el DOM se actualice y capturar
    setTimeout(() => {
        html2canvas(cartContainer, {
            scale: 2,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            ocultar.forEach(el => el.style.display = '')            // Restaurar estilos
            scrollableDiv.style.maxHeight = originalMaxHeight;
            scrollableDiv.style.overflowY = originalOverflow            // Ocultar overlay
            loadingOverlay.classList.add('hidden')            // Descargar imagen
            const randomCode = Math.floor(100000 + Math.random() * 900000);
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png');
            link.download = `${randomCode}-carrito.png`;
            link.click();
        });
    }, 200); // Espera breve para asegurar que el cambio tenga efecto
}