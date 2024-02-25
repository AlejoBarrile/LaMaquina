


const byUser = document.getElementById("byUser")
const decksContainer = document.getElementById("divDecks")


 const obtenerCartasDB = (id) =>{

  fetch(`/getDeckById/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
     return response.json(); // Esta línea devuelve otra promesa
  })
  .then((deck) => {
    mostrarCartasDB(deck);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  
};

const mostrarCartasDB = (deck)=>{
  const mazo = deck.mazo
  const divCartas = document.querySelectorAll(".modal-body")
  let divCorrecto = '' 
  divCartas.forEach((div) => {
    if(div.id == deck.id){
          divCorrecto = div
    }})
  divCorrecto.innerHTML = "";
  const cardElement = document.createElement("div");

  mazo.forEach((card) => {
    cardElement.innerHTML += `
                  <ul class="listado_cartas">
                      <li>   <img src="${card.img}" class="imagen"></img>   </li>
                      <li >${card.nombre}</li>
                      <li >ID: ${card.id}</li>


                  </ul>
              `;
              divCorrecto.appendChild(cardElement);

  });

  
}



const getDecks =()=>{
  fetch('/getDecks', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status == 500) {
        console.log(`Error al obtener decks: ${response.status}`);
      }
      return response.json(); // Esta línea devuelve otra promesa
    })
    .then((decks) => {
      decksContainer.innerText = ``
      mostrarDecksDB(decks);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
}



const eliminarDeFirebase =(id) =>{
  const data = JSON.stringify({id})  

  
       // Realiza una solicitud POST al servidor para ELIMINAR el mazo
    fetch('/eliminar', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',
      },
    })
       .then((response) => {
          
         
            if(response.status==500){
              Swal.fire({
                title: "ERROR",
                text: "Error en el servidor al eliminar el deck",
                icon: "error"
              });  
            }else{
           
              Swal.fire({
                title: "Deck eliminado",
                text: "DECK ELIMINADO CON ÉXITO DE LA BASE DE DATOS decksv1",
                icon: "success"
              });  
                  
                  //CORREGIR LA RENDERIZACION DE LOS MAZOS DESPUES DE BORRAR 1
                  //CORREGIR LA SESION DE USUARIOS PARA Q NO HAYA CONFLICTOM
                
                }
            

          }
          
       )
      
       .catch((error) => {
        console.error('Error:', error);

      });


      
    }





  const mostrarDecksDB = (decks) =>{
    
     byUser.textContent =` ${decks[0].by}`
     decks.sort((a, b) => a.id - b.id);
      decks.map((deck) => {
      
        decksContainer.innerHTML += `<div id="${deck.id}" class="card d-flex justify-content-center text-center" style="width: 30rem ">
            <div class="card-body d-flex align-content-center text-center ">
                <div class="card-title "> 
                  <ul class="text-center">
                     <li >ID: ${deck.id}</li>
                  
                    <li >${deck.nombre}</li>

                    <li >${deck.fecha}</li>
                    <li >${deck.code}</li>
                    <li >${deck.grado}</li>
  
                  </ul>
                </div>
                <button class="eliminarDeck" id="${deck.id}" >Eliminar Deck</button>
                <button   type="button" data-bs-toggle="modal" data-bs-target="#exampleModal${deck.id}" class="verCartas" id="${deck.id}" >Ver Cartas</button>
              
            </div>
                  <div class="modal fade" id="exampleModal${deck.id}" tabindex="-1" aria-labelledby="modal${deck.id}Label" aria-hidden="true">
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h1 class="modal-title fs-5 text-center" id="modal${deck.id}Label">CARTAS DEL DECK <i>${deck.nombre}</i></h1>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id='${deck.id}'>
                          
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Done</button>
                        </div>
                      </div>
                    </div>
                  </div>

            </div>`;
      });


      const botonesEliminar = document.querySelectorAll('.eliminarDeck');      
      botonesEliminar.forEach((boton) => {
       boton.addEventListener('click', (e) => {
           e.preventDefault()
           let id = e.target.id
           eliminarDeFirebase(id)
  
   })
  })
      
      const botonerVerCartas = document.querySelectorAll('.verCartas')
          // Agrega un evento a cada botón
          botonerVerCartas.forEach((boton) => {
            boton.addEventListener('click', (e) => {
              e.preventDefault()
              let id = e.target.id; // Extrae el ID del deck
              obtenerCartasDB(id)


          })
        })
    };
  



document.addEventListener("DOMContentLoaded", () =>{

                              getDecks()
                    });


                  