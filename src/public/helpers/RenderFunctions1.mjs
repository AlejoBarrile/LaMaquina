
import { deck } from "../decks/codeDecks1.mjs";

import { eventoAumentar, eventoCambiar, eventoPerspectiva, eventoDisminuir } from "./ActionFunctions.mjs";
import { obtenerAleatorio } from "./RandomFunctions.mjs";


  const Eterno= ["Hielo", "Agua", "Vida"]
  const Creador=  ["Muerte", "Viento", "Magia"]
  const Armonioso=  ["Fuego", "Tecnologia", "Tierra"]
  const Macroelementos=  ["Tiempo", "Luz", "Oscuridad"]
  const Perspectivas = ["Positiva", "Negativa", "Neutral"]


const mazo = deck.mazo
const stats = deck.stats


// PINTO LAS CARTAS EN EL DOM
  const pintarCartas = (mazo) => {
    document.getElementById("cardsContainer");

    mazo.map((card) => {
      
    
      cardsContainer.innerHTML += `<div class="card-container" id="Carta ${card.id}" >
      <div class="img-container">
      <img src="${card.img}" class="card-img" >
      </div>
      

        <p class="nombre p-2" id="${card.elemento}" >${card.nombre}</p>
        <p class="nombre p-2" id="${card.elemento}">ID: ${card.id}</p>
        <p class="nombre p-2" id="${card.elemento}">${card.cod}</p>
        
                      <hr>
        <button class="aumentarNivel" id="${card.id}" >NIVEL +</button>
        <button class="disminuirNivel" id="${card.id}" >NIVEL -</button>
        <button class="cambiarElemento" id="${card.id}">Cambiar Elemento</button>
        <button class="cambiarPerspectiva" id="${card.id}">Cambiar Persp.</button>
          </div>

`;
    });
  };
  
/*   const elementosBarraProgreso = document.getElementById("elementos-barra-progreso");
  const elementosNiveles = document.getElementById("elementos-niveles"); */
  
  
  /* const pintarEstadisticas = (stats) =>{
    for (const elemento in stats.elementos) {
      const cantidad = stats.elementos[elemento]
      let porcentaje = 0
     if((elemento === "Luz") ||(elemento === "Oscuridad") ||(elemento === "Tiempo") ){
      
       porcentaje = cantidad /6 * 100}
      else{
         porcentaje = cantidad / 10 * 100
      }
      elementosBarraProgreso.innerHTML += `
      
      <p id="${elemento}"  class="cantidad" >${elemento.toUpperCase()} <br>  ${cantidad} CARTAS </p>
  
      <div  class="contenedor-barra" >
      
      <div id="${elemento}" class= ${porcentaje== 0 ? "barra-none" : "barra"} style= "width: ${porcentaje}%" >
          <p>Domina un ${porcentaje.toFixed(2)}% en su Estado </p>
      </div>
      </div>`;
     
  }
  for(const nivel in stats.niveles){
    const cantidad2 = stats.niveles[nivel]
    let porcentaje = cantidad2 / 36 * 100
  
    elementosNiveles.innerHTML += `
    
    <p  class="cantidad" >NIVEL ${nivel}<br>  ${cantidad2} CARTAS </p>
  
    <div  class="contenedor-nivel" >
    
    <div  class= ${porcentaje== 0 ? "barra-none" : "barra"} style= "width: ${porcentaje*1.8}%" >
        <p>Domina un ${porcentaje.toFixed(2)}% en el Mazo</p>
    </div>
    </div>`;
    
  
  
  }
  
  
  }
 */


//TODO LO SIGUIENTE ES CONDIGURACION DE LA VISTA PARA CUANDO SE INICIA POR PRIMERA VEZ.


  document.addEventListener("DOMContentLoaded", function () {
   
    pintarCartas(mazo);
/*     pintarEstadisticas(stats)
 */
     
    
const botonesAumentar = document.querySelectorAll('.aumentarNivel');
const botonesDisminuir = document.querySelectorAll('.disminuirNivel');
const botonesCambiar = document.querySelectorAll('.cambiarElemento');
const botonesPersp = document.querySelectorAll('.cambiarPerspectiva');


  // Agrega un evento a cada botón
  botonesAumentar.forEach((boton) => {
  boton.addEventListener('click', (e) => {

  let cartaId = e.target.id; // Extrae el ID de la carta
  
  eventoAumentar(cartaId, mazo, deck)

    
  
});
});

// Agrega un evento a cada botón
botonesCambiar.forEach((boton) => {
boton.addEventListener('click', (e) => {

  let cartaId = e.target.id; // Extrae el ID de la carta

  eventoCambiar(cartaId, mazo, deck)

  
});
});

// Agrega un evento a cada botón
botonesDisminuir.forEach((boton) => {
boton.addEventListener('click', (e) => {

let cartaId = e.target.id; // Extrae el ID de la carta

eventoDisminuir(cartaId, mazo, deck)

});
});


botonesPersp.forEach((boton) =>{
boton.addEventListener("click", (e) =>{
let cartaId = e.target.id; // Extrae el ID de la carta

eventoPerspectiva(cartaId,mazo, deck)

})


})
  })

///////////

  const decksNames = [
    //hielo
    "La Sinfonía de las Sombras Heladas",
    "El Legado del Hielo Eterno",
    "Los Custodios del Polo Sur",
    "La Espada Protectora del Polo Norte",
    "La Era Dorada del Reino Desterrado",
    "Los Enigmas de la Tierra Congelada",
    "La Magia del Hielo Negro",
    "La Sabiduria del Eterno Mago del Frío",
    "El Renacer de las Estrellas Congeladas",
    "El Oráculo de Hielo",
    "El Amor del Invierno Eterno",
    "El Invierno Venidero",
    "Los Sueños Congelados de Victoria",
    //agua
    "Los Guardianes del Agua Clara",
    "El Color del Mar Después de la Guerra",
    "La Epopeya de los Valientes Piratas",
    "El Amanecer del Agua Eterna",
    "La Daga del Guerrero de Hielo",
    "El Canto de los Corales Celestiales",
    "Los Portales Submarinos",
    "La Ciudad de la Comunidad Espina",
    "Los Propósitos de los Dorados",
    "La Valentía de los Plateados",
    "La Eterna Guerra en el Océano",
    "El Hechicero del Agua Pantanosa",
    "La Comunidad Escondida en la Profundidad",
    //vida
    "El Escudo del Héroe de la Montaña",
    "El Éxtasis de los Árboles de la Jungla",
    "El Tesoro de la Sabana",
    "El Secreto Jurásico",
    "El Rugido de los Felinos",
    "Los Guardianes de la Naturaleza",
    "La Enseñanza de la Madre Tierra",
    "La Aniquilación y la Evolución",
    "El Éxodo de la Tierra Silvestre",
    "Los Campeones de la Montaña de Hierro",
    "Los Protectores de la Sabana",
    "La Cosecha Purificadora de la Jungla",
    "El Canto de los Elementos de la Vida",
    "Los Guardianes del Templo Jurásico",
    "El Libro del Profeta de la Vida",
    //tiempo
    "Los Misterios del Tiempo Futuro",
    "Los Legendarios Creadores del Tiempo",
    "Las Enseñanzas del Tiempo Perdido",
    "La Esencia Inmutable del Tiempo",
    "La Perfecta Sincronía del Tiempo",
    "El Rincón Escondido del Tiempo",
    "La Sinfonía Sonora del Tiempo",
    "La Utopía en los Comienzos del Tiempo",
    "El Alquimista de la Edad Media",
    "La Luz en el Fin de los Tiempos",
    "Los Sabios del Tiempo Antiguo",
    "Los Viajeros del Tiempo",
    "Los Sobrevivientes del Tiempo",
    "Las Leyendas de la Edad Media",
    "Las Guerreras Aladas del Tiempo",
    "La Máquina Secreta del Tiempo",
    "La Influencia del Tiempo en la Magia",
    "Los Comienzos de la Existencia",
    "El Poder Absoluto del Tiempo",
    "El Conocimiento del Tiempo Futuro",
    //tierra
    "El Guardián de la Isla Micelio",
    "Los Micelios del Poder Oculto",
    "La Misión Salvadora de los Micelios",
    "Los Cultivadores de la Isla Micelio",
    "El Gobierno Secreto de la Isla Micelio",
    "Las Profunidades de la Tierra",
    "Las Excavaciones del Pueblo Topo",
    "Los Guardianes de los Túneles",
    "La Habitada Tierra del Pueblo Topo",
    "La Armonía Terrestre del Pueblo Topo",
    "La Tierra Protegida de los Topos",
    "Las Alturas Desconocidas",
    "Las Nubes Coloridas del Cielo",
    "El Conocimiento Superior de la Sociedad del Cielo",
    "La Tierra en el Aire",
    "La Tierra en las Profundidades",
    "La Tierra Renaciente de los Micelios",
    "La Tierra Evolutiva",
    "El Poder de las Alturas",
    "El Místico Cielo Cambiante",
    "La Decisión del Cielo",
    "El Reino Oculto en las Nubes",
    "El Protectorado Terrenal",
    "Las Fuerzas de la Sociedad del Cielo",
    //tecno
  
  
  
  
  
  
  
    
    //random, ideas, presets
    "El Resplandor de la Sociedad Solar",
  
  
  
  
    "La Ciudad de las Sombras del Amanecer",
    "La Ciudad del Amanecer Eterno",
    "La Destrucción del Viento Estelar",
    "El Canto del Bosque Radiante",
    "Los Profetas de la Magia del Futuro",
    "La Ciudad de los Magos del Universo",
    "El Envíado de las Sombras del Cielo",
    "La Edad Media Eterna",
    "La Canción del Cielo Eterno",
    "El Recuerdo del Futuro Celestial",
    "El Regalo de las Estrellas",
    "La Ciudad de los Elementos Ancestrales",
    "El Agua del Crepúsculo Infinito",
    "La Canción del Guerrero del Viento",
    "Los Secretos de las Sombras del Universo",
    "La Ciudad del Amanecer Eterno",
    "El Bastión del Templo del Reino",
    "El Llanto de las Hadas Místicas",
  
    "La Guerra de los Magos del Jamás",
    "El Jinete de las Sombras Estelares",
    "El Polvo de las Estrellas Místicas",
    "La Canción del Creador Ancestral",
    "Los Guardianes de la Edad Media Celestial",
    "El Eterno Celestial",
    "El Arcoíris Mágico",
    "El Draco de Obsidiana",
    "El Caballero Cósmico",
    "El Bosque Encantado",
    "La Tempestad Temporal",
    "El Espectro Esmeralda",
    "El Creador de Sueños",
    "El Hada de Fuego",
    "La Diosa Eterna",
    "El Dragón Lunar",
    "El Mecha del Destino",
    "La Sombra del Olvido",
    "El Volcánico Ancestral",
    "Los Susurros del Abismo",
    "El Páramo de los Recuerdos",
    "El Éxodo del Futuro",
    "El Espíritu del Hielo",
    "El Pecado Estelar",
    "La Mariposa de Cristal",
    "El Trono del Caos",
    "La Industria Solar",
    "El Reino del Crepúsculo",
    "El Enigma del Alma",
    "El Cazador de Sombras",
    "El Devorador de Sueños",
    "El Alma del Fuego",
    "La Tormenta del Olvido",
    "El Sueño de la Jungla",
    "El Guardián del Polo Norte",
    "El Cruzado Cósmico",
    "El Despertar del Dragón",
    "La Danza del Viento",
    "El Abrazo de la Oscuridad",
    "La Esencia de la Vida",
    "Las Lágrimas del Pasado",
    "La Sabiduría Celestial",
    "El Renacimiento Marítimo",
    "El Mago de la Aurora",
    "El Espíritu de Fuego",
    "La Rapsodia Espacial",
    "El Sol de Medianoche",
    "El Cielo Estrellado",
    "El Renacer de las Sombras",
    "El Guardián del Arco",
    "El Ecos del Olvido",
    "El Destino Luminoso",
    "Los Titanes del Abismo",
    "El Creador del Universo",
    "El Fénix Resplandeciente",
    "La Torre de la Eternidad",
    "La Nostalgia Solar",
    "La Esencia de los Elementos",
    "El Enigma del Crepúsculo",
    "El Sendero del Viento",
    "El Silencio del Abismo",
    "La Brisa Celestial",
    "El Espejismo Lunar",
    "El Arca del Futuro",
    "El Destino Congelado",
    "El Corazón del Bosque",
    "El Ocaso del Olvido",
    "La Luz del Pasado",
    "El Oráculo de las Sombras",
    "El Titán de Cristal",
    "El Creador de Mundos",
    "El Destructor de Mundos",
    "El Mundo Eterno",
    "La Esencia de las Estrellas",
    "El Reflejo de la Luna",
    "La Danza de las Llamas",
    "La Canción del Amanecer",
    "El Estigma del Destino",
    "El Resplandor Cósmico",
    "El Camino de los Sueños",
    "El Susurro de las Profundidades",
    "El Eterno Invierno",
    "El Corazón de las Sombras",
    "El Alma de la Tormenta",
    "El Cazador Estelar",
    "El Río de las Memorias",
    "El Mar de Cristal",
    "La Llama del Pasado",
    "La Resonancia Celestial",
    "La Brujería del Abismo",
    "Los Guardianes del Crepúsculo",
    "Las Lágrimas de la Luna",
    "La Aurora del Caos",
    "La Llave del Poder",
    "La Travesía Solar",
    "El Destino Eterno",
    "Los Susurros de la Eternidad",
    "El Misterio del Vacío",
    "El Destino del Espacio",
    "El Rincón de las Estrellas",
    "El Suspiro del Infinito",
    "El Alma en el Abismo Temporal",
    "El Llamado del Profeta",
    "El Cazador de Sueños Estelares",
    "El Reflejo de la Luna Luminosa",
    "El Abrazo del Espacio",
    "El Misterio de las Sombras",
    "Los Ecos de una Era Olvidada",
    "El Canto de las Estrellas",
    "Los Pensamientos de la Oscuridad",
    "La Aurora en el Abismo Temporal",
    "El Cielo de los Recuerdos",
    "Los Guardianes de la Eternidad",
    "El Misterio de los Elementos",
    ]
  
  
    //FUNCION DE GUARDADO
  
  const botonAleatorio = document.getElementById("random-name")
  const divNombre = document.getElementById("nombre-random")
  botonAleatorio.addEventListener("click", (e) => {
      e.preventDefault()
      const nombreRandom = obtenerAleatorio(decksNames);
      divNombre.textContent = nombreRandom;
      
      deck.nombre = nombreRandom
  
  
    })
  
  
    const botonGuardar =  document.getElementById('save-deck')
    
    botonGuardar.addEventListener('click', (e) => {
      e.preventDefault()
      const fecha = new Date().toLocaleString();
      deck.fechaCreacion = fecha
  
      
      if(document.getElementById('input-nombre').value){
        const nombre = document.getElementById('input-nombre').value
        deck.nombre = nombre
        // Agrega la fecha y hora de creación al objeto del mazo
        Swal.fire({
          title: "Saving Deck!",
          text: "Fragmentaste el Éter: "+deck.nombre+"y código "+deck.code,
          icon: "info",
          showConfirmButton: false,
          timer: 3000,

        });
          agregarAFirebase(deck)
  
      }else{
        if(deck.nombre){
  
          Swal.fire({
            title: "Saving Deck!",
            text: "Fragmentaste el Éter: "+deck.nombre+"y código "+deck.code,
            icon: "info",
            showConfirmButton: false,
            timer: 3000,
          });  
          agregarAFirebase(deck)

        }else{
          Swal.fire({
            title: "Missing Name",
            text: "Para fragmentar el Éter, ingrese un nombre único.",
            icon: "warning"
          });  
        }
      }
    })
    const agregarAFirebase =(deck) =>{
      console.log(deck)
        const data = JSON.stringify(deck)  
      
        
             // Realiza una solicitud POST al servidor para guardar el mazo
          fetch('/', {
            method: 'POST',
            body: data,
            headers: {
              'Content-Type': 'application/json',
            },
          })
             .then((response) => {
                console.log(response)
                if(response.status==404){
                  Swal.fire({
                    title: "Incomplete Deck Info",
                    text: "Error: para guardar el deck llene todos sus campos.",
                    icon: "error"
                  });  
                }else{
                  if(response.status==400){
                    Swal.fire({
                      title: "Repeated Name",
                      text: "Error: El nombre envíado ya existe en la base de datos. Pruebe cambiando el nombre, y sino, refresque la página y cree un nuevo mazo.",
                      icon: "error"
                    });  
                  }else{
                    if(response.status==500){

                      Swal.fire({
                        title: "Repeated Code",
                        text: "Error: El code envíado ya existe en la base de datos. Refresque la página y cree un nuevo mazo.",
                        icon: "error"
                      });  
                      
                    }else{
                      Swal.fire({
                        title: "NEW ÉTER DECK CREATED AND SAVED",
                        text: "Ha fragmentado el Éter con éxito y ha sido guardado en la base de datos decksv1",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 4000
                      });  
                    }

                  }
      
                }
              })
            
             .catch((error) => {
              console.error('Error:', error);
      
            });


            
          }
    
