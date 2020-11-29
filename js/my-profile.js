



// la primera vez no se guaradan en los campos se deberia ser vacío. 


let datos = JSON.parse(localStorage.getItem('datos'));
if(datos){
document.getElementById("nombreyapellido").value = datos.nombre_y_apellido;
document.getElementById("edad").value = datos.edad;
document.getElementById("email").value = datos.email;
document.getElementById("telefono").value = datos.telefono;
}



// creo una funcion de garadar para almacenar datos 
function guardar(){

    let datos={
        nombre_y_apellido: document.getElementById("nombreyapellido").value,
        edad: document.getElementById("edad").value,
        email: document.getElementById("email").value,
        telefono: document.getElementById("telefono").value,
     };


    
    localStorage.setItem("datos",JSON.stringify(datos));

   
    document.getElementById("nombreyapellido").value=JSON.parse(JSON.stringify(datos.nombre_y_apellido));
    document.getElementById("edad").value=JSON.parse(datos.edad);
    document.getElementById("email").value=JSON.parse(JSON.stringify(datos.email));
    document.getElementById("telefono").value=JSON.parse(datos.telefono);

    

    

}

//funcion de mostrar para hacer el click en boton que almacena los cambios guardados de los datos
function submitPerfil(evento){
    evento.preventDefault();
    guardar();
    }


document.getElementById("perfil-form").addEventListener("submit",submitPerfil); // agrega el evento para cuando se haga el submit


//document.getElementById("perfil-form").addEventListener("submit",guardar); // agrega el evento para cuando se haga el submit

document.getElementById("registroPErfil").disabled=true;

function activarPerfil(){
    
    document.getElementById("registroPErfil").disabled=false;
    
}

document.getElementById("editarPerfil").addEventListener("click",activarPerfil); 


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

});