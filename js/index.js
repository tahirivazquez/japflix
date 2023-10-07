document.addEventListener("DOMContentLoaded", function () {
    const lista = document.getElementById("lista");
    const btnBuscar = document.getElementById("btnBuscar");
    const inputBuscar = document.getElementById("inputBuscar");

    let peliculas = [];

    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response => response.json())
        .then(data => {
            peliculas = data;
        })
        .catch(error => {
            console.error("Error al cargar los datos:", error);
        });

    btnBuscar.addEventListener("click", function () {
        lista.innerHTML = "";

        const buscarPeli = inputBuscar.value.toLowerCase();

        peliculas.forEach(function (pelicula) {
            const titulo = pelicula.title.toLowerCase();
            const generos = pelicula.title.toLowerCase();
            const resumen = pelicula.overview.toLowerCase();
            const eslogan = pelicula.tagline.toLowerCase();

            if (titulo.includes(buscarPeli) || generos.includes(buscarPeli) || resumen.includes(buscarPeli) || eslogan.includes(buscarPeli)) {
                const peliculaLi = document.createElement("li");
                peliculaLi.className = "list-group-item";
                peliculaLi.innerHTML = `<h2>${pelicula.title}</h2><p>${pelicula.tagline}</p>`;
                lista.appendChild(peliculaLi);
            }
        });
    });
}