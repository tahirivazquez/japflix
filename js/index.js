document.addEventListener("DOMContentLoaded", function () {
    const lista = document.getElementById("lista");
    const btnBuscar = document.getElementById("btnBuscar");
    const inputBuscar = document.getElementById("inputBuscar");

    let peliculasArray = [];
    const API_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';

        async function fetchPelis() {
            try {
                const response = await fetch(API_URL);
        
                if (response.ok) {
                    const data = await response.json();
                    peliculasArray.push(...data);
                } else {
                    throw new Error('Error al cargar los datos de películas');
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchPelis();

    btnBuscar.addEventListener("click", function () {
        lista.innerHTML = "";

        const buscarPeli = inputBuscar.value.toLowerCase();

        peliculasArray.forEach(function (pelicula) {
            const titulo = pelicula.title.toLowerCase();
            const generos = pelicula.title.toLowerCase();
            const resumen = pelicula.overview.toLowerCase();
            const eslogan = pelicula.tagline.toLowerCase();

            const mostrarPelis = () => {
                if (titulo.includes(buscarPeli) || generos.includes(buscarPeli) || resumen.includes(buscarPeli) || eslogan.includes(buscarPeli)) {
                    const peliculaLi = document.createElement("li");
                    peliculaLi.className = "list-group-item";
                    peliculaLi.innerHTML = `<h2>${pelicula.title}</h2><p>${pelicula.tagline}</p>`;
                    lista.appendChild(peliculaLi);
                }
            }
        });
    });
});