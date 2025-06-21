let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
        navbar.style.top = "-150px"; // Oculta el menú
    } else {
        navbar.style.top = "0"; // Muestra el menú
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Para evitar valores negativos
});