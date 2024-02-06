//CODIGO PARA GENERAR LOS MAZOS UNICOS, REPETICIONES ALEATORIAS,
//1 CARTA OBLIGATORIA REPETIDA POR ESTADO Y MACRO, (EXCEPTO EL ESTADO QUE TIENE PERSPECTIVA), RESPETANDO LIMITES,
// CON 2 SINERGIA DE PERSPECTIVA 5-7 CARTAS MAZO COMPETITIVO GRADO 2 10% 
// IMPORTACIÓN DE FUNCIONES AFINES

import {
  bucleEsDiferente,
  buscarRepetida,
  manejarRepeticion,
  mezclarArreglo,
  ordenarMazo,
  llevarA36, agregarImagenes, cambiarNombres
} from "../helpers/ActionFunctions.mjs";
import {
  generarCartaAleatoria,
  generarCartaMacro,
  generarCartaPerspectiva,
  generarCodigoAleatorio,
  obtenerContadorRepeticiones,
  generarEstadisticas,
  generarIDCarta
} from "../helpers/GenerateFunctions.mjs";
import {
  numeroAleatorio5,
  obtenerAleatorio,
} from "../helpers/RandomFunctions.mjs";

// INFORMACIÓN REQUERIDA PARA EL CORRECTO ARMADO

const estados = ["Eterno", "Creador", "Armonioso"];
const elementosPorEstado = {
  Eterno: ["Hielo", "Agua", "Vida"],
  Creador: ["Muerte", "Viento", "Magia"],
  Armonioso: ["Fuego", "Tecnologia", "Tierra"],
  Macroelementos: ["Tiempo", "Luz", "Oscuridad"]
};
const perspectivas = ["Positiva", "Negativa", "Neutral"];
const niveles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// INICIO DEL ALGORITMO

function generarMazoAleatorio() {
  let mazo = [];
  const cod = generarCodigoAleatorio(); // COD ÚNICO Y ALEATORIO PARA CADA MAZO

  const estadosAleatorios = mezclarArreglo(estados); // MEZCLO EL ARRAY PARA QUE EL PRIMER ESTADO QUE SURJA SEA AL AZAR.

  // GENERAR 10 CARTAS POR CADA ESTADO
  for (const estado of estadosAleatorios) {
    let nivelesParaUsar = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 10; ) {
      const carta = generarCartaAleatoria(estado, cod);
      let cartaRepetida = buscarRepetida(mazo, carta);
      if (cartaRepetida != undefined) {
        //SI SE ENCUENTRA REPETIDA, ENTONCES
        let repeticionExitosa = manejarRepeticion(cartaRepetida);
        if (repeticionExitosa === true) {
          i++;
        } else {
          let bucleExitoso = bucleEsDiferente(cartaRepetida, mazo, cod, i);
          if (bucleExitoso === true && mazo.length <= 36) {
            i++;
          }
        }
      } else {
        // SI ES LA PRIMERA CARTA DEL MAZO, HACER LO SIGUIENTE:
        if (i === 0 && mazo.length === 0) {
          const perspectivaElegida = carta.perspectiva; //DEFINO LA PERSPECTIVA A CONFECCIONAR
          const elementoElegido = carta.elemento;
          const cantidadDeCartas1P = numeroAleatorio5();
          const nivelesADesechar = 9 - cantidadDeCartas1P; // TENGO QUE DESECHAR NIVELES QUE NO SERÁN UTILIZADOS POR LA PERSP.
          console.log(
            "CREACION DE PERSPECTIVA: \n" +
              carta.elemento +
              " - " +
              carta.perspectiva +
              " \nCantidad: " +
              cantidadDeCartas1P
          );
          for (let i2 = 0; i2 < nivelesADesechar; i2++) {
            let nivelDesechado = obtenerAleatorio(nivelesParaUsar);
            console.log("NIVEL DESECHADO: " + nivelDesechado);
            // Usar filter para eliminar niveles
            nivelesParaUsar = nivelesParaUsar.filter(
              (num) => num !== nivelDesechado
            );
            //GENERO CARTAS QUE DEBEN SER DISTINTAS A LA PERSPECTIVA ELEGIDA Y LAS AGREGO
            // LUEGO SIGO CON LAS CARTAS DE LA PERSPECTIVA.
            let cartaDistinta = generarCartaAleatoria(estado, cod);
            // SI LA CARTA ES DE LA PERSPECTIVA CON SINERGIA, SE GENERA EN BUCLE HASTA QUE SALGA UNA DISTINTA

            if (
              cartaDistinta.elemento == elementoElegido &&
              cartaDistinta.perspectiva == perspectivaElegida
            ) {
              console.error(
                "LA CARTA \n" +
                  cartaDistinta.nombre +
                  " \nREPITE PERSPECTIVA. SERA GENERADA EN BUCLE HASTA QUE SEA DIFERENTE"
              );

              let bucleExitoso = bucleEsDiferente(cartaDistinta, mazo, cod, i);
              if (bucleExitoso === true && mazo.length <= 36) {
                i++;
              }
            } else {
              let cartaRepetida = buscarRepetida(mazo, carta);
              if (cartaRepetida != undefined) {
                //SI SE ENCUENTRA REPETIDA, ENTONCES
                let repeticionExitosa = manejarRepeticion(cartaRepetida);
                if (repeticionExitosa === true) {
                  i++;
                } else {
                  let bucleExitoso = bucleEsDiferente(
                    cartaRepetida,
                    mazo,
                    cod,
                    i
                  );
                  if (bucleExitoso === true && mazo.length <= 36) {
                    i++;
                  }
                }
              } else {
                mazo.push(cartaDistinta);
                i++;
              }
            }
          }
          console.log(
            "NIVELES RESULTANTES PARA LA PERSPECTIVA: \n" + nivelesParaUsar
          );

          // Generar cartas para la perspectiva
          for (let i3 = 0; i3 < cantidadDeCartas1P; i3++) {
            // GENERO CARTAS DE LA PERSPECTIVA RESULTANTE,
            //UTILIZANDO 1 NIVEL DEL ARRAY nivelesParaUsar POR CADA ITERACIÓN Y
            //LUEGO DESECHANDO EL NIVEL CON FILTER. (MISMA LÓGICA DE FILTRADO QUE ANTES CON EL DESECHO)

            let nivel = obtenerAleatorio(nivelesParaUsar);
            nivelesParaUsar = nivelesParaUsar.filter((n) => n !== nivel); // Crea un nuevo array sin el nivel seleccionado

            let cartaPers = generarCartaPerspectiva(
              estado,
              perspectivaElegida,
              elementoElegido,
              nivel,
              cod
            );
            mazo.push(cartaPers);
            i++;
          }
        } else {
          if (i === 0 && mazo.length === 10) {
            const perspectivaElegida = carta.perspectiva; //DEFINO LA PERSPECTIVA A CONFECCIONAR
            const elementoElegido = carta.elemento;
            const cantidadDeCartas2P = numeroAleatorio5();
            const nivelesADesechar = 9 - cantidadDeCartas2P; // TENGO QUE DESECHAR NIVELES QUE NO SERÁN UTILIZADOS POR LA PERSP.
            console.log(
              "CREACION DE PERSPECTIVA: \n" +
                carta.elemento +
                " - " +
                carta.perspectiva +
                " \nCantidad: " +
                cantidadDeCartas2P
            );
            for (let i2 = 0; i2 < nivelesADesechar; i2++) {
              let nivelDesechado = obtenerAleatorio(nivelesParaUsar);
              console.log("NIVEL DESECHADO: " + nivelDesechado);
              // Usar filter para eliminar niveles
              nivelesParaUsar = nivelesParaUsar.filter(
                (num) => num !== nivelDesechado
              );
              //GENERO CARTAS QUE DEBEN SER DISTINTAS A LA PERSPECTIVA ELEGIDA Y LAS AGREGO
              // LUEGO SIGO CON LAS CARTAS DE LA PERSPECTIVA.
              let cartaDistinta = generarCartaAleatoria(estado, cod);
              // SI LA CARTA ES DE LA PERSPECTIVA CON SINERGIA, SE GENERA EN BUCLE HASTA QUE SALGA UNA DISTINTA

              if (
                cartaDistinta.elemento == elementoElegido &&
                cartaDistinta.perspectiva == perspectivaElegida
              ) {
                console.error(
                  "LA CARTA \n" +
                    cartaDistinta.nombre +
                    " \nREPITE PERSPECTIVA. SERA GENERADA EN BUCLE HASTA QUE SEA DIFERENTE"
                );

                let bucleExitoso = bucleEsDiferente(
                  cartaDistinta,
                  mazo,
                  cod,
                  i
                );
                if (bucleExitoso === true && mazo.length <= 36) {
                  i++;
                }
              } else {
                let cartaRepetida = buscarRepetida(mazo, carta);
                if (cartaRepetida != undefined) {
                  //SI SE ENCUENTRA REPETIDA, ENTONCES
                  let repeticionExitosa = manejarRepeticion(cartaRepetida);
                  if (repeticionExitosa === true) {
                    i++;
                  } else {
                    let bucleExitoso = bucleEsDiferente(
                      cartaRepetida,
                      mazo,
                      cod,
                      i
                    );
                    if (bucleExitoso === true && mazo.length <= 36) {
                      i++;
                    }
                  }
                } else {
                  mazo.push(cartaDistinta);
                  i++;
                }
              }
            }
            console.log(
              "NIVELES RESULTANTES PARA LA PERSPECTIVA: \n" + nivelesParaUsar
            );

            // Generar cartas para la perspectiva
            for (let i3 = 0; i3 < cantidadDeCartas2P; i3++) {
              // GENERO CARTAS DE LA PERSPECTIVA RESULTANTE,
              //UTILIZANDO 1 NIVEL DEL ARRAY nivelesParaUsar POR CADA ITERACIÓN Y
              //LUEGO DESECHANDO EL NIVEL CON FILTER. (MISMA LÓGICA DE FILTRADO QUE ANTES CON EL DESECHO)

              let nivel = obtenerAleatorio(nivelesParaUsar);
              nivelesParaUsar = nivelesParaUsar.filter((n) => n !== nivel); // Crea un nuevo array sin el nivel seleccionado

              let cartaPers = generarCartaPerspectiva(
                estado,
                perspectivaElegida,
                elementoElegido,
                nivel,
                cod
              );
              mazo.push(cartaPers);
              i++;
            }
          } else {
            if (i === 0 && mazo.length >= 18 && nivelesParaUsar.length == 9) {
              // SI YA SE GENERARON LAS DOS PERSPECTIVAS CON SINERGIA Y CAMBIÉ DE ESTADO, DEFINO LA CARTA QUE TENDRÁ REPETICIÓN OBLIGATORIA
              let repeticion = obtenerContadorRepeticiones(carta); // LA FUNCIÓN DEVUELVE LA CANTIDAD DE VECES QUE SERÁ REPETIDA, RESPETANDO LOS LÍMITES POR NIVEL.
              carta.cantidad = repeticion;
              i += repeticion;
              mazo.push(carta);
              console.log(
                "carta repetida: \n" +
                  carta.nombre +
                  "\n Cantidad: " +
                  carta.cantidad
              );
            } else {
              // SI NO ES EL CASO DE NADA DE LO ANTERIORMENTE PROPUESTO, SIMPLEMENTE PUSHEO LA CARTA AL MAZO.
              mazo.push(carta);
              i++;
            }
          }
        }
      }
    }
  }
  // UNA VEZ FINALIZADA LA CREACIÓN DE 10 CARTAS POR ESTADO, CONTINÚO POR FUERA DE ESE BUCLE CON LAS MACRO.
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
const grado = "Grado 2"




const deck = {
mazo: mazo,
stats: stats,
code: code,
grado: grado
}


export  {deck}