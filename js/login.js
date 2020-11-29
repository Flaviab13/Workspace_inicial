
function submitEventHandler(evento){  // funcion que se va a ejecutar cuando se haga el submit
   evento.preventDefault();  // evita que se haga la peticion al servidor enviando los datos

   let usuario = {
    nombre: document.getElementById("Nombre").value,
    password: document.getElementById("Contraseña").value

  
  };

  let us=usuario.nombre
  
  let usuarioString = JSON.stringify(us);
  localStorage.setItem("usur", usuarioString);
  
 // let usuarioString = JSON.stringify(usuario);
 // localStorage.setItem("usur", usuarioString);
  
 

   sessionStorage.setItem("logueado",true); 
   window.location.href="index.html"; // redirige al index.html

   return true; // hace que al final la información se envie al servidor 


}

document.getElementById("formulario-login").addEventListener("submit",submitEventHandler); // agrega el evento para cuando se haga el submit

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.



document.addEventListener("DOMContentLoaded", function(e){

});