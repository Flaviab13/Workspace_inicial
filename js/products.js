
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

const ORDER_ASC_PREC = "De menor a mayor";
const ORDER_DESC_PREC = "De mayor a menor";
const ORDER_REL = "Relevancia";

var productosArray = [];
var currentSortCriterio = undefined;
var precMin = undefined;
var precMax = undefined;

function showProductosList(array){                                // Muestro la lista de productos

    let htmlContentToAppend = "";
    for(let i = 0; i < productosArray.length; i++){
        let producto = productosArray[i];

        if (((precMin == undefined) || (precMin != undefined && parseInt(producto.cost) >= precMin)) &&
        ((precMax == undefined) || (precMax != undefined && parseInt(producto.cost) <= precMax))){


        
        htmlContentToAppend +=  `
        <div class="col-12 col-sm-6 col-md-4">
                <div class="card">
                    <a href="product-info.html?producto=`+ producto.name +`" class="list-group-item list-group-item-action">
                        <img src=" ` + producto.imgSrc + ` " alt=" ` + producto.description + `"class="card-img-top" ">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-3" style="font-weight:bold;">` + producto.name +`</h4>
                           <small class="text-muted" style="font-weight:bold;">` +  producto.currency + " " + producto.cost  + ` </small> 
                        </div>
                        <p class="mb-1">` + producto.description + `</p>
                        <span class="align-bottom" style="size:14px;font-weight:bold;">` + "Total vendidos:"+" "+  producto.soldCount + `</span>
                    </a>
                </div>
            </div>`
        
         }
        //document.getElementById("row-container").innerHTML = htmlContentToAppend;
    }
    document.getElementById("row-container").innerHTML=htmlContentToAppend;
}




function OrdenProductos(criterio, array){             // Crea una funcion para ordenar de los productos
    let result = [];
    if (criterio === ORDER_ASC_PREC)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_DESC_PREC){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criterio === ORDER_REL){
        result = array.sort(function(a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if ( aSold > bSold ){ return -1; }
            if ( aSold < bSold ){ return 1; }
            return 0;
        });
    }

    return result;
}



function OrdenaYMuestraProd(OrdenCrit, prodArray){       //Ordena y Muestra los productos
    currentSortCriterio = OrdenCrit;

    if(prodArray != undefined){
        productosArray = prodArray;
    }

    productosArray = OrdenProductos(currentSortCriterio, productosArray);

    
    showProductosList();
}






document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj){

        if (resultObj.status === "ok")
        {
            productosArray= resultObj.data;
            //Muestro los productos ordenados
            showProductosList(productosArray);
        }
        document.getElementById("sortByCountAsc").addEventListener("click", function(){  // boton de orden ascendente de los precios
          OrdenaYMuestraProd(ORDER_ASC_PREC);
            //  ordenAsc();
        });

        document.getElementById("sortByCountDesc").addEventListener("click", function(){  // boton de orden descendente de los precios
           OrdenaYMuestraProd(ORDER_DESC_PREC);
           // ordenDesc();
        });

        
        document.getElementById("rel").addEventListener("click", function(){             // Boton de mas relevantes que los productos fueron mas vendidos
           OrdenaYMuestraProd(ORDER_REL);
           
           // Rel();
        });

        document.getElementById("FiltrarButton").addEventListener("click", function(e){  // boton de filtro entre el rango de los precios
                    
            filtrarProd(productosArray);
        
            
        });

        document.getElementById("FiltrarLimpiar").addEventListener("click", function(){  // boton de limpiar del rango
            document.getElementById("FiltrarMin").value = "";
            document.getElementById("FiltrarMax").value = "";

            
            precMin = undefined;
            precMax = undefined;
    
            showProductosList();
        });

      
       document.getElementById("search-l").addEventListener("click", function(e){  // boton de buscador
        buscadorProd(productosArray);
        });

      
        hideSpinner();
    });

    

});


    function filtrarProd(array){                            // Crear una funcion del filtro de los precios de productos
        //Obtenemos el mínimo y máximo de los intervalos para filtrar por precio
         precMin=document.getElementById("FiltrarMin").value;
         precMax=document.getElementById("FiltrarMax").value;

        if ((precMin != undefined) && (precMin != "") && (parseInt(precMin)) >= 0){
            precMin = parseInt(precMin);
        }
        else{
            precMin = undefined;
        }

        if ((precMax != undefined) && (precMax != "") && (parseInt(precMax)) >= 0){
            precMax = parseInt(precMax);
        }
        else{
            precMax = undefined;
        }

        showProductosList();

                     
    }





function buscadorProd(array) {                           // Crear una funcion del buscador
    var b = document.getElementById("buscar");
    var filter = b.value.toUpperCase();
    
    var arr=productosArray;
    var arrayfiltrado=[]
 
    
    for (i = 0; i < arr.length; i++) {
        txtValue = arr[i].name;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            arrayfiltrado.push(arr[i]);
        }else{
            txtValue===undefined;
        } 
             
        

    }   
    
    var arrayOriginal=productosArray; 
    productosArray=arrayfiltrado;
    showProductosList();
    productosArray=arrayOriginal;

   

}


