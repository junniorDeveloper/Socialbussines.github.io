const toggleDarkMode = () => {
    const body = document.body;
    const link = document.getElementById('darkModeToggle');
    //const icon = link.querySelector('i');

    body.classList.toggle('bg-gray-900');
    body.classList.toggle('text-white');
    body.classList.toggle('dark');

    if (body.classList.contains('bg-gray-900')) {
        //icon.classList.remove('fa-sun');
        //icon.classList.add('fa-moon');
        link.innerHTML = '<i class="fas fa-moon"></i> Modo Claro';
    } else {
        //icon.classList.remove('fa-moon');
        //icon.classList.add('fa-sun');
        link.innerHTML = '<i class="fas fa-sun"></i> Modo Oscuro';
    }
};

document.getElementById('darkModeToggle').addEventListener('click', toggleDarkMode);