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

const estrellas = vote_average => {
    const maxEstrellas = 5
    const rating = Math.floor(vote_average / 2)

    let estrellasHTML = '';

    for (let i = 0; i < maxEstrellas; i++) {
        if (i < rating) {
            estrellasHTML += `<i class="fa fa-star" aria-hidden="true" style="color: #FFFF00"></i>`
        } else {
            estrellasHTML += `<i class="fa fa-star-o" aria-hidden="true" style = "color: #FFFFFF"></i>`
        }
    }
    return estrellasHTML;
}

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

            lista.innerHTML += `
            <li class="list-group-item list-group-item-action list-group-item-dark bg-dark text-white" data-bs-toggle="offcanvas" data-bs-target="#offcanvas${pelicula.id}" aria-controls="offcanvasTop">
                <div class="row">
                <div class="col-6"><h2>${pelicula.title}</h2><p style="color: #B5B2B2">${pelicula.tagline}</p></div>
                <div class="col-6 d-flex align-items-start justify-content-end">${estrellas(pelicula.vote_average)}</div>
                </div>
            </li>
            </div>   
            </li>
            <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvas${pelicula.id}" aria-labelledby="offcanvasTopLabel">
                <div class="offcanvas-header">
                    <h5 id="offcanvasTopLabel">${pelicula.title}</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <p class="p-3 border-bottom">
                    ${pelicula.overview}
                </p>
                <p class="px-3">${pelicula.genres.map(genre => genre.name).join(' - ')}</p>
                <div class="dropdown ms-auto">
                <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  More
                </button>
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Year: ${new Date(pelicula.release_date).getFullYear()}</a></li>
                  <li><a class="dropdown-item" href="#">Runtime: ${pelicula.runtime} mins</a></li>
                  <li><a class="dropdown-item" href="#">Budget: ${pelicula.budget}</a></li>
                  <li><a class="dropdown-item" href="#">Revenue: USD ${pelicula.revenue}</a></li>
                </ul>
              </div>
                </div>
            </div>
                `
            
            }
        }
        mostrarPelis()
    });
});

