var cajadatos, bd;
function iniciar() {
    cajadatos = document.getElementById("cajadatos");
    var boton = document.getElementById("grabar");
    boton.addEventListener("click", agregarobjeto);
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
}
function crearbd(evento) {
    var basededatos = evento.target.result;
    var almacen = basededatos.createObjectStore("peliculas", {keyPath: "id"});
    almacen.createIndex("BuscarFecha","fecha", {unique: false});
}

function agregarobjeto() {
    var clave = document.getElementById("clave").value;
    var titulo = document.getElementById("texto").value;
    var fecha = document.getElementById("fecha").value;
    
    var transaccion = bd.transaction(["peliculas"], "readwrite");
    var almacen = transaccion.objectStore("peliculas");
    transaccion.addEventListener("complete", function() {
        mostrar(clave);
    });

    var solicitud = almacen.add({id: clave, nombre: titulo, fecha: fecha});
    document.getElementById("clave").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("fecha").value = "";
}

function mostrar(clave) {
    var transaccion = bd.transaction(["peliculas"], "readonly");
    var almacen = transaccion.objectStore("peliculas");
    var solicitud = almacen.get(clave);
    solicitud.addEventListener("success", mostrarlista);
}

function mostrarlista(evento) {
    var resultado = evento.target.result;
    if (resultado !== null) {
        cajadatos.innerHTML = "<div>" + resultado.id + " - " + resultado.nombre + " - " + resultado.fecha + "</div>";
    } else {
        cajadatos.innerHTML = "No existe el objeto";
    }
}

window.addEventListener("load", iniciar, false);
