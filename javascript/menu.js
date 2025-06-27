let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

// Variable para controlar si se ha hecho clic en el menú
let isMenuClicked = false;

// Evento para el clic en los enlaces del menú
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        isMenuClicked = true; // Cambia el estado a clicado
        setTimeout(() => {
            isMenuClicked = false; // Resetea después de un tiempo
        }, 1000); // Tiempo para que el menú permanezca visible
    });
});

window.addEventListener("scroll", function () {
    if (!isMenuClicked) { // Solo oculta si no se ha hecho clic
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            navbar.style.top = "-120px"; // Oculta el menú
        } else {
            navbar.style.top = "0"; // Muestra el menú
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para evitar valores negativos
    }
});

document.querySelectorAll('.nav-list li').forEach(item => {
    item.addEventListener('click', function() {
        // Elimina la clase active de todos los elementos
        document.querySelectorAll('.nav-list li').forEach(li => li.classList.remove('active'));
        // Agrega la clase active al elemento clicado
        this.classList.add('active');
    });
});
