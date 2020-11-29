let productCost1 = 0;
let productCount1 = 0;
let envio = 0;
let MONEY_SYMBOL = "$";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let EXITO_MSG = "¡Se ha realizado tus compras con éxito!";
let ERROR_MSG = "Algunos campos no están completos, vuelva a revisarlos!";

var carritos = {}


let $items = document.querySelector('#items');
let carrito = [];
let total = 0;
let productCount = 0;
let $carrito = document.querySelector('#carrito');
let $total = document.querySelector('#total');
let $botonComprar = document.querySelector('#boton-comprar');
let $botonListo = document.querySelector('#boton-listo');


let USDtoUYU=40;




function subtotal(carritos) {
    

    let prodCant = document.getElementsByClassName("productCount");
    
    //let Subt=document.getElementsByClassName("subTotal");        

    //let resultadofinal = 0;
    let total = 0;
    let r=0;


    for (let i = 0; i < carritos.length; i++) {

        let resultadofinal;
        let unitario = carritos[i].unitCost;
        carritos[i].count = prodCant[i].value;

        
        if (carritos[i].currency == "USD") {               
            

            resultadofinal = unitario * carritos[i].count*USDtoUYU;
            
        } else {
            resultadofinal=unitario * carritos[i].count;          


        }
                
        
      document.getElementsByClassName("subTotal")[i].innerHTML = resultadofinal
       
        total = total + resultadofinal;
    }
    

    

   document.getElementById("total").innerHTML = total;  

 //Realizamos el precio en el HTML
 $total.textContent = total.toFixed(0);
}




function MostrarCarrito(array) {
        let htmlContentToAppend = "";

        for (let i = 0; i < array.length; i++) {
            let carritos = array[i];
            

            htmlContentToAppend += `
                    
                            <div class="col" style="background-position: center;">
                            <div class="d-block mb-3">
                                <img class="img-fluid img-thumbnail"  src=" ` + carritos.src + ` " alt="" >
                            </div>
                                <br>
                                <div> <b> Nombre: </b> `+ carritos.name + `</div>
                                            
                                
                                <div id="productCount" > <b>Cantidad: </b> <input type="number" value="`+ carritos.count + `"   min="0" class="productCount"></div>
                                                                    
                                <span > <b>Precio:</b> `+ carritos.currency + " " + carritos.unitCost + `</span >
                                <br>
                                 <div > <b>Subtotal:</b> `+ "UYU"+ " "  +`<span class="subTotal"> </span > `+ `</div>
                            </div>
                        `

        }

        document.getElementById("productCart").innerHTML = htmlContentToAppend;
        subtotal(array);

}


// Función de la suma
function suma(a,b){
   
   var resultado1= parseFloat(a)+parseFloat(b);
    return resultado1;
}


//Función que se utiliza para actualizar los costos de envios
function updateTotalCosts(){
    let unitCostHTML = document.getElementById("productCost");
    let envioHTML = document.getElementById("envio");
    let totalCostHTML = document.getElementById("totalCost");

    productCost1=document.getElementById("total").innerHTML

    let envioUYU= envio*USDtoUYU
    var sumaproduct= suma(productCost1,envioUYU);
    

    let unitCostToShow = MONEY_SYMBOL + " "  + productCost1;
    let envioToShow =  MONEY_SYMBOL+ " " + envioUYU;
    let totalCostToShow = MONEY_SYMBOL + " "  + sumaproduct;

    unitCostHTML.innerHTML = unitCostToShow;
    envioHTML.innerHTML = envioToShow;
    totalCostHTML.innerHTML = totalCostToShow;
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
        if (resultObj.status === "ok") {
            carritos = resultObj.data;

            MostrarCarrito(carritos.articles);
         

        }
        let prodCount = document.getElementsByClassName("productCount");

        // Cada  número en la cantidad de productos(input) agrego en la función de subtotal.
        for (let i = 0; i < prodCount.length; i++) {
            //console.log(prodCount[i]);
            prodCount[i].addEventListener("input", function () {
                subtotal(carritos.articles);

            });
        }

    });

    
});


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL_2).then(function (resultObj) {
  

    //recuerden el precio de envio es dólares, hay que convertir en pesos  UYU

    document.getElementById("dhl").addEventListener("change", function(){
        envio = 29.59;
        updateTotalCosts();
    });
    
    document.getElementById("fedex").addEventListener("change", function(){
        envio = 40;
        updateTotalCosts();
    });

    document.getElementById("ups").addEventListener("change", function(){
        envio = 25.8;
        updateTotalCosts();
    });

})

});

  


  // Crear dos funciones para activar y desactivar de datos cuando se selecionan uno de los dos opciones del tipo de tarjeta

    function desactivarCuadro1(){
        document.getElementById("tarjetap").disabled=true;
    }

    function desactivarCuadro2(){
        document.getElementById("transferencia-banco").disabled=true;
    }

    function activarCuadro1(){
        document.getElementById("tarjetap").disabled=false;
    }

    function activarCuadro2(){
        document.getElementById("transferencia-banco").disabled=false;
    }

    var Tarjeta_Pago=document.getElementById("tarjeta-pago")
    var Transf_Pago=document.getElementById("transferencia-pago")


    Tarjeta_Pago.addEventListener("change",function(){
        desactivarCuadro2()
        activarCuadro1()
        Tarjeta_Pago.removeAttribute("required")
        Transf_Pago.setAttribute("required",true)



    });

    Transf_Pago.addEventListener("change",function(){
        desactivarCuadro1()
        activarCuadro2()
        Transf_Pago.removeAttribute("required")
        Tarjeta_Pago.setAttribute("required",true)


    });



    // boton cancelar para volver al inicio de la pagina

    document.getElementById("boton-cancelar").addEventListener("click",function(){
        window.history.go(-1);
        
    });


    // boton comprar para mostrar el mensaje que ya he comprado

   document.getElementById("cart-info").addEventListener("submit",validarCompras);



       function validarCompras(evento){
            var correcto=true;
            var errores2=[];
            
            

            evento.preventDefault();
        
            if((document.getElementById('direnvio').value.length <=0) && (document.getElementById('paisenvio').value.length <=0) && (document.getElementById('emailenvio').value.length <=0)&&(document.getElementById('totalCost').value.length <= 0)&&(document.getElementById("dhl").checked=false)||(document.getElementById("fedex").checked=false)||(document.getElementById("ups").checked=false)){
                correcto=false;
                errores2.push(ERROR_MSG);
                //document.getElementById("resultSpan").innerHTML=errores2.push(ERROR_MSG);

        }   else {
                correcto;
                errores2.push(EXITO_MSG);
                //document.getElementById("resultSpan").innerHTML=errores2.push(EXITO_MSG);

        }
         errorform1.innerHTML = errores2.join(" , ");
       //document.getElementById("resultSpan").innerHTML=errores2.join(" , ")

        
    }
    
    
//Se obtiene el formulario de forma de pagos y submitear con boton listo que deberia cumplir llenar en los inputs

    //var pagoForm=document.getElementById("forma-pagos");

    document.getElementById("cart-pagos").addEventListener("submit", validarFormulario);
             



    function validarFormulario(ev){
       
        var errorform=document.getElementById("errorform");
        var errores1=[];

        if(document.getElementById("tarjeta-pago").checked==false && document.getElementById("transferencia-pago").checked==false){
            ev.preventDefault();
            errores1.push("Selecciona una de estas opciones")
        }else{
            if (document.getElementById("tarjeta-pago").checked){
                
                var tarj = document.getElementById('tarjeta-num').value;
                var seg = document.getElementById('seguridad-num').value;
                var venc = document.getElementById('vence-num').value;
    
                if(tarj == "" && seg =="" && venc=="") {
                    ev.preventDefault();
                    
                    errores1.push(' No llenaste en el número de tarjeta, verifica de nuevo!');
                                 
                     
                    errores1.push('El código de seguridad que deberia completarlo');
              
                    
                    errores1.push('El vencimiento  que deberia completarlo');
              
                 }
    
            }else if(document.getElementById("transferencia-pago").checked){
                var tranf = document.getElementById('transferencia-num').value;
                if(tranf == "" ) {
                    ev.preventDefault();
                    errores1.push('No llenaste en el número de transferencia, verifica de nuevo!');
                    
                       }
    
                
            }
            

        }
        
        

        errorform.innerHTML = errores1.join(" , ");



     }

  

  