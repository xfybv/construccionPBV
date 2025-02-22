var cajadatos, bd;
function iniciar() {
    cajadatos = document.getElementById("cajadatos");
    var boton = document.getElementById("buscar");
    boton.addEventListener("click", buscarobjetos);
    var solicitud = indexedDB.open("basededatos");
    solicitud.addEventListener("error", mostrarerror);
    solicitud.addEventListener("success", comenzar);
    solicitud.addEventListener("upgradeneeded", crearbd);
}

function mostrarerror(evento) {
    alert("Error: " + evento.code + " " + evento.message);
}
function comenzar(evento) {
    bd = evento.target.result;
    //mostrar();
}
function crearbd(evento) {
    var basededatos = evento.target.result;
    var almacen = basededatos.createObjectStore("peliculas", {keyPath: "id"});
    almacen.createIndex("BuscarFecha","fecha", {unique: false});
}

function buscarobjetos() {
    cajadatos.innerHTML = "";
    var buscar = document.getElementById("fecha").value;
    var transaccion = bd.transaction(["peliculas"], "readonly");
    var almacen = transaccion.objectStore("peliculas");
    var indice = almacen.index("BuscarFecha");
    var rango = IDBKeyRange.only(buscar);
    var puntero = indice.openCursor(rango);
    puntero.addEventListener("success", mostrarlista);
}

function mostrarlista(evento) {
    var puntero = evento.target.result;
    if (puntero) {
        cajadatos.innerHTML += "<div>" + puntero.value.id + " - " + puntero.value.nombre + " - ";
        cajadatos.innerHTML += puntero.value.fecha + "</div>";
        
        puntero.continue();
    } else {
        cajadatos.innerHTML += "No hay más registros";
    }
    
}
/* 

function mostrar() {
    cajadatos.innerHTML = "";
    var transaccion = bd.transaction(["peliculas"], "readonly");
    var almacen = transaccion.objectStore("peliculas");
    var indice = almacen.index("BuscarFecha");
    var puntero = indice.openCursor(null, "prev");
    // var puntero = almacen.openCursor();
    // puntero.addEventListener("success", mostrarlista);
    
}

function removerobjeto(clave) {
    if (confirm("Estás seguro?")) {
        var transaccion = bd.transaction(["peliculas"], "readwrite");
        var almacen = transaccion.objectStore("peliculas");
        transaccion.addEventListener("complete", mostrar);
        var solicitud = almacen.delete(clave); 
    }
}


 */
window.addEventListener("load", iniciar, false);
