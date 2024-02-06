
    //CODIGO PARA GENERAR LOS MAZOS UNICOS, REPETICIONES ALEATORIAS, 1 CARTA OBLIGATORIA REPETIDA POR ESTADO Y MACRO, RESPETANDO LIMITES, 
    // 1 CARTA OBLIGATORIA POR ESTADO Y MACRO, MAZO NO COMPETITIVO 40% 
import { bucleEsDiferente, buscarRepetida, manejarRepeticion, ordenarMazo, llevarA36, agregarImagenes, cambiarNombres } from "../helpers/ActionFunctions.mjs";
import { generarCartaAleatoria, generarCartaMacro, generarCodigoAleatorio, obtenerContadorRepeticiones, generarEstadisticas, generarIDCarta} from "../helpers/GenerateFunctions.mjs";


// Definir los datos de las cartas
const estados = ["Eterno", "Creador", "Armonioso"];
const elementosPorEstado = {
  Eterno: ["Hielo", "Agua", "Vida"],
  Creador: ["Muerte", "Viento", "Magia"],
  Armonioso: ["Fuego", "Tecnologia", "Tierra"],
  Macroelementos: ["Tiempo", "Luz", "Oscuridad"]
};
const perspectivas = ["Positiva", "Negativa", "Neutral"];
const niveles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // FALTA TRABAJAR LAS PROBABILIDADES DE QUE SE CREEN CARTAS MACROELEMNTALES DE NIVEL ALTO

function generarMazoAleatorio() {
  let mazo = [];
  const cod = generarCodigoAleatorio()

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
mazo = llevarA36(mazo)

ordenarMazo(mazo)

generarIDCarta(mazo)


  return mazo;
}

  let mazo = generarMazoAleatorio();
  
  mazo = agregarImagenes(mazo)
  const stats  = generarEstadisticas(mazo);
  mazo = cambiarNombres(mazo)


//INDICADORES

let cantidades = 0; // ME DEVUELVE EL TOTAL DE CANTIDAD DE CARTAS QUE HAY EN EL MAZO CONTANDO LAS REPETIDAS. LO UTILIZO PARA SABER SI EL MAZO ESTA GENERANDO CARTAS DE MÁS.
for (let i = 0; i < mazo.length; i++) {
  cantidades++
}


console.log("Cantidad total: " + cantidades);


  const primeraCarta = mazo[0]
  const code = primeraCarta.cod
  const grado = "Grado No Competitivo"




const deck = {
  mazo: mazo,
  stats: stats,
  code: code,
  grado: grado
  
}


export  {deck}