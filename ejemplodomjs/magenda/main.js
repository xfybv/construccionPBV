
function cargardatos(){
    const nombre = document.querySelector('.nombre')
    const apellido = document.querySelector('.apellido')
    const numero = document.querySelector('.numero')
    const direccion = document.querySelector('.direccion')
    const btn_formulario = document.querySelector('.btn_formulario') 
    var dato = {
        nombre: nombre.value,
        apellido: apellido.value,
        numero: numero.value,
        direccion: direccion.value
    }
console.log("lectura de carga")

window.localStorage.setItem("inicio",dato.nombre,dato.apellido,dato.numero);

console.log(nombre.value,apellido.value,numero.value);

console.log(window.localStorage.getItem("inicio"));
}

