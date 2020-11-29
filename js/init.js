const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_INFO_URL_2="https://japdevdep.github.io/ecommerce-api/cart/654.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}




if(
  !window.location.href.endsWith("login.html") &&  // si href termina con login.html no rendirigimos.porque ya estamos en login.html
  sessionStorage.getItem("logueado")!=="true"){ // si el uusario no ésta logueado redigir a login.html 
  window.location.href="login.html"; // redigir a login.html

} 

var usuario2 = JSON.parse(localStorage.getItem("usur"));
var linkusuario = document.createElement("a");
//linkusuario.setAttribute("id", "usuario20");
//linkusuario.setAttribute("class","py-2 d-none d-md-inline-block");
//linkusuario.setAttribute("href", "my-profile.html");
//console.log(usuario2)
//linkusuario.appendChild(document.createTextNode(usuario2.nombre));
//document.querySelectorAll('nav.site-header div')[0].appendChild(linkusuario);

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  
});


if (!window.location.href.endsWith("login.html")) {
  let dropdownUser=document.getElementById("dropdownMenuLink");
//let usuario1=localStorage.getItem("usur");

//console.log(dropdownUser);

dropdownUser.innerHTML+= usuario2;

}


function loginOut(){
  sessionStorage.setItem("logueado",false);
  localStorage.removeItem("usur");

}


