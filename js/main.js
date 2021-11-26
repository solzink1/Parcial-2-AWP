window.addEventListener("online", (event) => {
    let button = document.getElementById("button");
    
    button.classList.add('btn-success');
    button.classList.remove("btn-danger");

    button.innerHTML = (`Online `);
});

window.addEventListener("offline", (event) => {
    let button = document.getElementById("button");
    
    button.classList.remove("btn-success");
    button.classList.add('btn-danger');

    button.innerHTML = (`Offline `);
});
 
if (!navigator.onLine) {
    let button = document.getElementById("button");
    
    button.classList.remove("btn-success");
    button.classList.add('btn-danger');

    button.innerHTML = (`Offline `);
}

const main = document.getElementById('main');
const h1 = document.createElement('h1');
const p = document.createElement('p');
const input = document.createElement('input');
const button = document.createElement('button');
const card = document.createElement("div");
const poster = document.createElement("img");
const cardBody= document.createElement("div");
const title = document.createElement("h5");
const cardText = document.createElement("p");
const genero = document.createElement("p");
const buscar = document.createElement("p");

function crearInicio(){
    p.classList.add('lead');
    input.classList.add('form-control');
    input.classList.add('mr-sm-2');
    input.classList.add('boton1');
    button.classList.add('btn');
    button.classList.add('btn-outline-light');
    button.classList.add('my-2');
    button.classList.add('my-sm-0');

    input.setAttribute("type", "buscar");
    input.setAttribute("placeholder", "Buscar");
    input.setAttribute("aria-label", "buscar");
    input.setAttribute("id", "input")
    button.setAttribute("type", "submit");
    button.setAttribute("id", "button")

    h1.innerHTML = (`¡Busca la pelicula que quieras!`);
    p.innerHTML = (`Tenemos las peliculas mas populares`);
    button.innerHTML = (`Buscar`);

    main.appendChild(h1);
    main.appendChild(p);
    main.appendChild(input);
    main.appendChild(button);
}    
crearInicio();

function eliminarInicio(){
    h1.remove();
    p.remove();
    input.remove();
    button.remove();
}

const API_KEY = "dc600162";

const sendButton = document.getElementById("button");
const inputElement = document.getElementById("input"); 

sendButton.addEventListener("click", () =>  {
    buscarEnAPI(inputElement.value);
});

function buscarEnAPI(buscarPalabra){
    console.log("valor", buscarPalabra);
    fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&t=${buscarPalabra}`)
    .then(function(response){
        console.log(response);
        return response.json();
    }).then(function(responseJson){
        console.log(responseJson);
        mostrarResultados(responseJson);
    })
    .catch(function(error){
        console.log('Fallo!', error);
    });
}

function mostrarResultados(data){
    eliminarInicio();

    card.classList.add('card');
    card.classList.add('mb-4');
    card.classList.add('mt-4');
    poster.classList.add('card-img-top');
    poster.classList.add('img-fluid');
    cardBody.classList.add('card-body');
    title.classList.add('card-title');
    cardText.classList.add('card-text');
    genero.classList.add('card-text');
    buscar.classList.add('lead');
    buscar.classList.add('mb-4');
    buscar.classList.add('mt-5');
    input.classList.add('mt-2');

    title.innerHTML = (`${data.Title}`);
    cardText.innerHTML = (`${data.Plot}`);
    genero.innerHTML = (`${data.Genre}`);
    buscar.innerHTML = (`¡Segui buscando mas peliculas!`);

    poster.setAttribute("src", `${data.Poster}`)

    main.appendChild(buscar);
    main.appendChild(input);
    main.appendChild(button);
    main.appendChild(card);
    card.appendChild(poster);
    card.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(cardText);
    cardBody.appendChild(genero);
};
card.remove();
cardBody.remove();
