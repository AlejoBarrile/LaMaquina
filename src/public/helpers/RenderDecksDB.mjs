


const byUser = document.getElementById("byUser")
const decksContainer = document.getElementById("divDecks")
const divCartas = document.querySelectorAll(".divCartas")


/* const mostrarCartasDB = (deck) =>{

  const mazo = deck.mazo
  console.log(mazo)
  const divCorrecto = divCartas[deck.id-1]
  console.log(divCorrecto)
  mazo.map((card)=>{
    divCorrecto.innerHTML += `<h2>${card.nombre}</h2>
      `

  })
} */

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
                text: "MAZO ELIMINADO CON ÉXITO DE LA BASE DE DATOS decksv1",
                icon: "success"
              });  
                const divDeck = document.getElementById(`${id}`)
                divDeck.classList.add("d-none")
                getDecks()
                }
            

          }
          
       )
      
       .catch((error) => {
        console.error('Error:', error);

      });


      
    }
    const botonesEliminar = document.querySelectorAll('.eliminarDeck');      
    botonesEliminar.forEach((boton) => {
     boton.addEventListener('click', (e) => {
         e.preventDefault()
         let id = e.target.id
         eliminarDeFirebase(id)

     


 })
})




  const mostrarDecksDB = (decks) =>{
    
     byUser.textContent =` ${decks[0].by}`
     decks.sort((a, b) => a.id - b.id);
      decks.map((deck) => {
      
        decksContainer.innerHTML += `<div id="${deck.id}" class="card" style="width: 30rem ">
            <div class="card-body ">
                <div class="card-title "> 
                  <ul>
                     <li >ID: ${deck.id}</li>
                  
                    <li >${deck.nombre}</li>

                    <li >${deck.fecha}</li>
                    <li >${deck.code}</li>
                    <li >${deck.grado}</li>
  
                  </ul>
                </div>
                <button class="eliminarDeck" id="${deck.id}" >Eliminar Deck</button>
                <button class="verCartas" id="${deck.id}" >Ver Cartas</button>
              
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
      
  /*     const verCartas = document.querySelectorAll('.verCartas')
      console.log(verCartas)
  // Agrega un evento a cada botón
          verCartas.forEach((boton) => {
            boton.addEventListener('click', (e) => {
              let idDeck = e.target.id; // Extrae el ID de la carta
              fetch(`/getDeckById?id=${idDeck}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
              .then((response) => {
                if (!response.ok) {
                  console.log(`Network response was not ok: ${response.status}`);
                }
                return response.json(); // Esta línea devuelve otra promesa
              })
              .then((deck) => {
                mostrarCartasDB(deck);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
              
          });



          }) */
    };
  



document.addEventListener("DOMContentLoaded", () =>{

                              getDecks()
                    });


                  