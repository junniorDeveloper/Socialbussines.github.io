const toggleDarkMode = () => {
    const body = document.body;
    const link = document.getElementById('darkModeToggle');

    body.classList.toggle('bg-gray-900');
    body.classList.toggle('text-white');
    body.classList.toggle('dark');

    if (body.classList.contains('bg-gray-900')) {
        link.innerHTML = ' Modo Claro';
    } else {
        link.innerHTML = ' Modo Oscuro';
    }
};

document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);