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
const error = document.createElement('p');
const lista = document.createElement('p');
const contenido = document.getElementById('contenido');
const agregarBoton = document.createElement('button');
const eliminarBoton = document.createElement('button');

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
    
    if (data.Response == 'False') {
        buscar.innerHTML = '¡No se encontro la pelicula que estabas buscando! Ingresa un nombre nuevo';
        
        main.appendChild(error);
        main.appendChild(input);
        main.appendChild(button);

        card.remove();
        cardBody.remove();
    } else {
        error.remove();

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
        card.appendChild(botonAgregar(data));
        card.appendChild(botonEliminar(data));
    }
};
error.remove();
card.remove();
cardBody.remove();

 function botonAgregar(data){
     let div = document.createElement('div');
     
     agregarBoton.classList.add('agregar');
     agregarBoton.classList.add('btn');
     agregarBoton.classList.add('btn-success');
     agregarBoton.innerHTML = 'Agregar';

     agregarBoton.addEventListener('click', () =>{
        guardarPelicula(data);
        agregarBoton.remove();
        botonEliminar(data);
     })
     card.appendChild(div);
     div.appendChild(agregarBoton);
}

function botonEliminar(data){
    let div = document.createElement('div');

    eliminarBoton.classList.add('eliminar');
    eliminarBoton.classList.add('btn');
    eliminarBoton.classList.add('btn-danger');
    eliminarBoton.innerHTML = 'Eliminar';

    eliminarBoton.addEventListener('click', () =>{
        eliminarPelicula(data);
        eliminarBoton.remove();
        botonAgregar(data);
    })
    card.appendChild(div);
    div.appendChild(eliminarBoton);
}

const guardarPelicula = (data) => {
    const lista1 = JSON.parse(localStorage.getItem('Respuesta API'));
    if (lista1 == null) {
        const nuevaLista1 = [];
        nuevaLista1.push(data);
        localStorage.setItem('Respuesta API', JSON.stringify(nuevaLista1));
    } else {
        const estaEnLista1 = lista1.some(item => item.Title === data.Title);
        if (!estaEnLista1) {
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
        const estaEnLista2 = lista2.some(item => item.Title === data.Title);
        if (estaEnLista2) {
            let nuevaLista2 = lista2.filter(item => item.Title !== data.Title);
            localStorage.setItem('Respuesta API', JSON.stringify(nuevaLista2));
       }
    }
}

const storage = JSON.parse(localStorage.getItem('Respuesta API'));

function listaVacia() {
    if (storage === null ||storage.length === 0) {
    let p = document.createElement('p');
    let botonListaVacia = document.createElement('a');

        p.classList.add('lead');
        p.innerHTML = '¡Todavia no agregaste peliculas a la lista!'

        botonListaVacia.classList.add('btn');
        botonListaVacia.classList.add('btn-outline-light');
        botonListaVacia.innerHTML ='Agregar nueva pelicula';
        botonListaVacia.setAttribute("href", "index.html");

        contenido.appendChild(p);
        contenido.appendChild(botonListaVacia);
    }
}

function listaPeliculas() {
    const mostrarLista = JSON.parse(localStorage.getItem('Respuesta API'));
    main.innerHTML ="";

    if (mostrarLista != null && mostrarLista-length !== 0){
        for (let peliculas of mostrarLista) {
            let div = document.createElement('div');
            let eliminarBoton = document.createElement('button');
        
            card.classList.add('card');
            card.classList.add('mb-4');
            card.classList.add('mt-5');
            poster.classList.add('card-img-top');
            poster.classList.add('img-fluid');
            cardBody.classList.add('card-body');
            title.classList.add('card-title');
            cardText.classList.add('card-text');
            genero.classList.add('card-text');
            eliminarBoton.classList.add('eliminar');
            eliminarBoton.classList.add('btn');
            eliminarBoton.classList.add('btn-danger');

            title.innerHTML = (`${peliculas.Title}`);
            cardText.innerHTML = (`${peliculas.Plot}`);
            genero.innerHTML = (`${peliculas.Genre}`);
            eliminarBoton.innerHTML = 'Eliminar';

            poster.setAttribute("src", `${peliculas.Poster}`)

            main.appendChild(card);
            card.appendChild(poster);
            card.appendChild(cardBody);
            cardBody.appendChild(title);
            cardBody.appendChild(genero);
            cardBody.appendChild(cardText);       
            card.appendChild(div);
            div.appendChild(eliminarBoton);
            
            eliminarBoton.addEventListener('click', () => {
                eliminarPelicula(peliculas);
                listaPeliculas();
            })
        }
    }
}