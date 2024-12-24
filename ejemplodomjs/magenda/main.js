// inicio de script
var fullcontactos = [];
var contacto = {};

function llenardatos(){
    if (window.localStorage.getItem("fcontactos")!= null){
        fullcontactos = window.localStorage.getItem("fcontactos");
        if (fullcontactos.length > 0){
        
        for (const i in fullcontactos) {
            let contact = JSON.parse(fullcontactos[i]); 
            let datafila = "<div>";
            datafila += "<h3>" + contact.nombre + "</h3>";
            datafila += "<h3>" + contact.apellido + "</h3>";
            datafila += "<p>" + contact.numero + "</p>";
            datafila += "<p>" + contact.direccion + "</p>";
            datafila += "<span class='elim' onclick=eliminar()>Eliminar</span>";
            datafila += "</div>";

        }

        document.getElementById(".listado").innerHTML = datafila;
    }
}
    else {
        console.log("lectura de carga")

//window.localStorage.setItem("Fcontactos",contacto.nombre);

//console.log(nombre.value,apellido.value,numero.value);

console.log(window.localStorage.getItem("fcontactosag"));
    }

}

function guardardatos(){
    
    contacto.nombre = document.getElementById('nombre').value;
    contacto.apellido = document.getElementById('apellido').value;
    contacto.numero = document.getElementById('numero').value;
    contacto.direccion = document.getElementById('direccion').value;

    fullcontactos.push(contacto);

    console.log(contacto);
    console.log(fullcontactos);
    window.localStorage.setItem("fcontactos",JSON.stringify(fullcontactos));
    llenardatos();
}