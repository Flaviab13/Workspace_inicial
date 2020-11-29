var comentarios=[];
var productos = {};
function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="carousel-item">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" class="d-block w-100" alt="...">
               
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function MostrarComentarios(array){

    let htmlContentToAppend = "";
   

    for(let i = 0; i < array.length; i++){
        let comentario = array[i];

        htmlContentToAppend+=`
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div>                          
                         <h6 style="color: #grey"> `+ comentario.user + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + `<span class= "fa fa-star checked" style="color: #aa084e">` + comentario.score +`</span>` + `</h6>
                    </div>                        
                        <p> `+comentario.description+`</p>                        
                        <div> <b> Fecha actualización:  </b>`+ comentario.dateTime +`</div>                      
                    </div>                   
                </div>
            </div>
        </div>
        
        `

         document.getElementById("MuestraComentarios").innerHTML = htmlContentToAppend;
    }
}


function showProdRel(array1,array2){

    let htmlContentToAppend = "";

    for(let i = 0; i < array1.length; i++){
        let related = array2[array1[i]];

         htmlContentToAppend += `
        
       
        <div class="row">
                <div class="col-lg-8 col-md-4 col-6" >
                    <div class="d-block mb-4 h-80">
                        <img class="img-fluid img-thumbnail"  src=" ` + related.imgSrc + ` " alt="" >
                    </div>
                    <div>
                        
                        <span style="color:#000;font-weight:bold;">`+related.name + `</span>
                    
                    </div>
                    <div>
                        <span >`+related.description + `</span>                    
                    </div>
                    <div style="color:#grey;font-weight:600;">
                        <span> `+ related.currency+" " +related.cost+`</span >
                    </div>

                        
                    
                   
                    
                </div>
        </div>

        `
    

       document.getElementById("productRel").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productos = resultObj.data;

            let prodNameHTML  = document.getElementById("prodName");
            let prodDescriptionHTML = document.getElementById("productDescription");
            let productCountHTML = document.getElementById("productCount");
            let productCategHTML = document.getElementById("categoria");
            let productCostHTML = document.getElementById("costo");
            
            
            
            prodNameHTML.innerHTML = productos.name;
            prodDescriptionHTML.innerHTML = productos.description;
            productCountHTML.innerHTML = productos.soldCount;
            productCategHTML.innerHTML = productos.category;
            productCostHTML.innerHTML = productos.currency + " "+ productos.cost;

            //Muestro las imagenes en forma de galería
            showImagesGallery(productos.images);

            getJSONData(PRODUCTS_URL).then(function(respuesta){
                
                if (respuesta.status === "ok")
                {
                    productos1 = respuesta.data;

                    let productRelHTML= document.getElementById("productRel");

                    showProdRel(productos.relatedProducts,productos1);
                                
                }       
                                

            });

          

        }
       
    });


});


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(res){
        if(res.status=="ok"){
            comentarios=res.data;
           

            let comentScorHTML=document.getElementById("cometsc");
            let comentDescrHTML=document.getElementById("cometdesc");
            let comentUserHTML=document.getElementById("cometuser");
            let comentDateHTML=document.getElementById("cometdate");

           // comentScorHTML.innerHTML=comentarios.score;
            //comentDescrHTML.innerHTML=comentarios.description;
            //comentUserHTML.innerHTML=comentarios.user;
            //comentDateHTML.innerHTML=comentarios.dateTime;

            MostrarComentarios(comentarios);
            

       }

   })
});



function enviarFormulario(event){
  event.preventDefault();
  let Newus=document.getElementById("usuerP").value
  let calif=document.getElementById("Rate").value;
  let Comt=document.getElementById("textOp").value;
  let tiemp=new Date()
  let fecha=tiemp.getUTCFullYear().toString()+`-`+tiemp.getUTCMonth().toString()+`-`+tiemp.getUTCDate().toString()

  let newComt={
       score:calif,
       user:Newus,
       description:Comt,
       dateTime:fecha
   }
    comentarios.push(newComt);
    MostrarComentarios(comentarios);

    //document.getElementById("contenedor-CU").innerHTML+=newComt
    console.log(Newus);
    console.log(calif);
    console.log(Comt);
    console.log(fecha);
} 

document.getElementsByClassName("enviar").addEventListener("submit",enviarFormulario);

