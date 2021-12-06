window.addEventListener("online", (event) => {
    let button = document.getElementById("button");
    
    button.classList.add('btn-success');
    button.classList.remove("btn-danger");

    button.innerHTML = 'Online ';

});

window.addEventListener("offline", (event) => {
    let button = document.getElementById("button");
    
    button.classList.remove("btn-success");
    button.classList.add('btn-danger');

    button.innerHTML = 'Offline ';
});
 
if (!navigator.onLine) {
    let button = document.getElementById("button");
    
    button.classList.remove("btn-success");
    button.classList.add('btn-danger');

    button.innerHTML = 'Offline ';
} else {
    let button = document.getElementById("button");
    
    button.classList.add('btn-success');
    button.classList.remove("btn-danger");

    button.innerHTML = 'Online ';
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
const lista = document.createElement('p');
const agregarBoton = document.createElement('button');
const eliminarBoton = document.createElement('button');

function crearInicio(){

    h1.classList.add('mt-1');
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
    input.setAttribute("id", "input");
    button.setAttribute("type", "submit");
    button.setAttribute("id", "button1");

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
    agregarBoton.remove();
    eliminarBoton.remove();

}

const API_KEY = "dc600162";

const sendButton = document.getElementById("button1");
const inputElement = document.getElementById("input"); 
const cargando = document.getElementById('spinner');

sendButton.addEventListener("click", () =>  {
    buscarEnAPI(inputElement.value);    
    input.value = "";
    cargando.classList.remove('d-none');
    cargando.classList.add('d-block');
    cargando.classList.add('mt-2');
});

function buscarEnAPI(buscarPalabra){
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&t=${buscarPalabra}`)
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
    cargando.remove();
    if (data.Response == 'False') {
        buscar.innerHTML = '¡No se encontro la pelicula que estabas buscando! Ingresa un nombre nuevo';

        buscar.classList.add('lead');

        main.appendChild(buscar);
        main.appendChild(input);
        main.appendChild(button);

        card.remove();
        cardBody.remove();
    } else {
        lista.classList.add('lista');
        lista.classList.add('card-text');
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
        lista.innerHTML = (`¡Si te gusto esta pelicula agregala a la lista!`)

        poster.setAttribute("src", `${data.Poster}`);
        cardBody.setAttribute("id","card-body");

        main.appendChild(buscar);
        main.appendChild(input);
        main.appendChild(button);
        main.appendChild(card);
        card.appendChild(poster);
        card.appendChild(cardBody);
        cardBody.appendChild(title);
        cardBody.appendChild(genero);
        cardBody.appendChild(cardText);       
        cardBody.appendChild(lista);

        const lista1 = JSON.parse(localStorage.getItem('Respuesta API'));

        if (lista1 != null) {
            const estaEnLista = lista1.some(item => item.Title === data.Title);

            if (estaEnLista){
                botonEliminar(data);
            }  else {
                botonAgregar(data);
            }
        } else {
            botonAgregar(data);
        }
    }
}
card.remove();
cardBody.remove();

 function botonAgregar(data){
     let buscarCard = document.getElementById('card-body');
     
     agregarBoton.classList.add('agregar');
     agregarBoton.classList.add('btn');
     agregarBoton.classList.add('btn-success');
     agregarBoton.innerHTML = 'Agregar';

     agregarBoton.addEventListener('click', () => {
        guardarPelicula(data);
        agregarBoton.remove();
        botonEliminar(data);
     })
     buscarCard.appendChild(agregarBoton);
}

function botonEliminar(data){
    let buscarCard = document.getElementById('card-body');

    eliminarBoton.classList.add('eliminar');
    eliminarBoton.classList.add('btn');
    eliminarBoton.classList.add('btn-danger');
    eliminarBoton.innerHTML = 'Eliminar';

    eliminarBoton.addEventListener('click', () => {
        eliminarPelicula(data);
        eliminarBoton.remove();
        botonAgregar(data);
    })
    buscarCard.appendChild(eliminarBoton);
}

const guardarPelicula = (data) => {
    const lista1 = JSON.parse(localStorage.getItem('Respuesta API'));
    if (lista1 == null) {
        const nuevaLista1 = [];
        nuevaLista1.push(data);
        localStorage.setItem('Respuesta API', JSON.stringify(nuevaLista1));
    } else {
        const estaEnLista = lista1.some(item => item.Title === data.Title);
        if (!estaEnLista) {
            lista1.push(data);
            localStorage.setItem('Respuesta API', JSON.stringify(lista1));
        }
    }
}

function eliminarPelicula(data) {
    const lista2 = JSON.parse(localStorage.getItem('Respuesta API'));
    if (lista2 == null) {
        const nuevaLista2 = [];
        nuevaLista2.push(data);
        localStorage.setItem('Respuesta API', JSON.stringify(nuevaLista2));
    } else {
        const estaEnLista = lista2.some(item => item.Title === data.Title);
        if (estaEnLista) {
            let nuevaLista2 = lista2.filter(item => item.Title !== data.Title);
            localStorage.setItem('Respuesta API', JSON.stringify(nuevaLista2));
       }
    }
}

function listaPeliculas() {
    const mostrarLista = JSON.parse(localStorage.getItem('Respuesta API'));
    main.innerHTML ="";

    let listaVacia = document.getElementById('lista-vacia');
    listaVacia.classList.remove('d-none');
    listaVacia.classList.add('d-block');
    
    if (mostrarLista != null && mostrarLista.length !== 0){

        for (let peliculas of mostrarLista) {

            let card = document.createElement("div");
            card.classList.add('card');
            card.classList.add('mb-4');
            card.classList.add('mt-5');
            main.appendChild(card);

            let poster = document.createElement("img");
            poster.classList.add('card-img-top');
            poster.classList.add('img-fluid');
            poster.setAttribute("src", `${peliculas.Poster}`);
            card.appendChild(poster);

            let cardBody= document.createElement("div");
            cardBody.classList.add('card-body');
            card.appendChild(cardBody);

            let title = document.createElement("h5");
            title.classList.add('card-title');
            title.innerHTML = (`${peliculas.Title}`);
            cardBody.appendChild(title);     
            
            let genero = document.createElement("p");
            genero.classList.add('card-text');  
            genero.innerHTML = (`${peliculas.Genre}`);
            cardBody.appendChild(genero);            
            
            let cardText = document.createElement("p");
            cardText.classList.add('card-text');
            cardText.innerHTML = (`${peliculas.Plot}`);
            cardBody.appendChild(cardText);  

            let eliminarBoton = document.createElement('button');
            eliminarBoton.classList.add('eliminar');
            eliminarBoton.classList.add('btn');
            eliminarBoton.classList.add('btn-danger');
            eliminarBoton.innerHTML = 'Eliminar';
            cardBody.appendChild(eliminarBoton);  

            listaVacia.classList.add('d-none');

            eliminarBoton.addEventListener('click', () => {
                eliminarPelicula(peliculas);
                listaPeliculas();
            });
        }
    }
}
