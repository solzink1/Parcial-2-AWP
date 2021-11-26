if ('serviceWorker' in navigator){
    navigator.serviceWorker.register("../service-worker.js").then((message) => {
        console.log("Service Worker listo");
    });
} else {
    console.log('Service Worker no soportado');
}
