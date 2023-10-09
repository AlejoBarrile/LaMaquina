
    //CODIGO PARA GENERAR LOS MAZOS UNICOS, REPETICIONES ALEATORIAS, 1 CARTA OBLIGATORIA REPETIDA POR ESTADO Y MACRO, RESPETANDO LIMITES, 
    // 1 CARTA OBLIGATORIA POR ESTADO Y MACRO, MAZO NO COMPETITIVO 40% DE 100

import { bucleEsDiferente, buscarRepetida, manejarRepeticion, ordenarMazo } from "../helpers/ActionFunctions.mjs";
import { generarCartaAleatoria, generarCartaMacro, generarCodigoAleatorio, obtenerContadorRepeticiones } from "../helpers/GenerateFunctions.mjs";


    // FALTA TRABAJAR LAS PROBABILIDADES DE QUE SE CREEN CARTAS MACROELEMNTALES DE NIVEL ALTO

function generarMazoAleatorio() {
  const mazo = [];
  const cod = generarCodigoAleatorio();

  // Generar 10 cartas de cada estado
  for (const estado of estados) {
    
    for (let i = 0; i < 10;) {
      let carta = generarCartaAleatoria(estado, cod);
      let cartaRepetida = buscarRepetida(mazo, carta)
      if(cartaRepetida != undefined){ //SI SE ENCUENTRA REPETIDA, ENTONCES
          let repeticionExitosa = manejarRepeticion(cartaRepetida)
            if(repeticionExitosa === true){
                i++;
            }else{
              let bucleExitoso =  bucleEsDiferente(cartaRepetida, mazo, cod, i)
              if(bucleExitoso === true && mazo.length <= 36){
                
                i++
              }
            }

        }
          else{
            if(i===0){
              let repeticion = obtenerContadorRepeticiones(carta)
              carta.cantidad = repeticion
              i += repeticion
              mazo.push(carta);
              console.log('Carta a repetir: ' + carta.nombre + " cantidad: "+repeticion)
      
            }else{
              mazo.push(carta)
      
              i++;
          }
        }
        
      
    }
  }
  let cantidades = 0; // ME DEVUELVE EL TOTAL DE CANTIDAD DE CARTAS QUE HAY EN EL MAZO CONTANDO LAS REPETIDAS. LO UTILIZO PARA SABER SI EL MAZO ESTA GENERANDO CARTAS DE MÁS.
  for (let i = 0; i < mazo.length; i++) {
    cantidades += mazo[i].cantidad;
  }
  console.log("Cantidad total antes de las MACRO: " + cantidades);

  // Generar 6 cartas de macroelementos
  for (let i = 0; i < 6; ) {
    let carta = generarCartaMacro(cod);
    let cartaRepetida = buscarRepetida(mazo, carta);
    if (cartaRepetida != undefined) {
    //SI SE ENCUENTRA REPETIDA, ENTONCES
        let bucleExitoso = bucleEsDiferente(cartaRepetida, mazo, cod, i);
        if (bucleExitoso === true && mazo.length <= 36) {
                i++;
        }
    
    } else {
            mazo.push(carta);
            i++;
    }
}
let cantidades2 = 0; // ME DEVUELVE EL TOTAL DE CANTIDAD DE CARTAS QUE HAY EN EL MAZO CONTANDO LAS REPETIDAS. LO UTILIZO PARA SABER SI EL MAZO ESTA GENERANDO CARTAS DE MÁS.
for (let i = 0; i < mazo.length; i++) {
  cantidades2 += mazo[i].cantidad;
}
console.log("Cantidad total despues de las MACRO: " + cantidades2);

ordenarMazo(mazo)


  return mazo;
}




// Definir los datos de las cartas
const estados = ["Eterno", "Creador", "Armonioso"];
const elementosPorEstado = {
  Eterno: ["hielo", "agua", "vida"],
  Creador: ["muerte", "viento", "magia"],
  Armonioso: ["fuego", "tecnología", "tierra"],
  Macroelementos: ["Tiempo", "Luz", "Oscuridad"]
};
const perspectivas = ["positiva", "negativa", "neutral"];
const niveles = [1, 2, 3, 4, 5, 6, 7, 8, 9];




  const mazo = generarMazoAleatorio();


//INDICADORES

let cantidades = 0; // ME DEVUELVE EL TOTAL DE CANTIDAD DE CARTAS QUE HAY EN EL MAZO CONTANDO LAS REPETIDAS. LO UTILIZO PARA SABER SI EL MAZO ESTA GENERANDO CARTAS DE MÁS.
for (let i = 0; i < mazo.length; i++) {
  cantidades += mazo[i].cantidad;
}
console.log("Cantidad total: " + cantidades);

// PINTO LAS CARTAS EN EL DOM
document.getElementById("cardsContainer");
const pintarCartas = (mazo) => {
  mazo.map((card) => {

  
    cardsContainer.innerHTML += `<div id="${card.elemento}" class="card" style="width: 30rem ">
        <img src="" class="card-img-top" >
        <div id="${card.perspectiva}" class="card-body">
            <h5 class="card-title">${card.nombre} /<br> Cantidad: ${card.cantidad}</h5>
            <p class="card-text">${card.cod}</p>
        </div>
        </div>`;
  });
};

document.addEventListener("DOMContentLoaded", function () {
  pintarCartas(mazo);
});
