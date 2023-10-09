//CODIGO PARA GENERAR LOS MAZOS UNICOS, REPETICIONES ALEATORIAS,
//1 CARTA OBLIGATORIA REPETIDA POR ESTADO Y MACRO
//(EXCEPTO EL ESTADO DE LA PERSPECTIVA ELEGIDA, UNICO CASO DE EXCEPCION SI LA PERSPECTIVA PIDE 10 CARTAS, PUES SE REPITE 1), RESPETANDO LIMITES,
// CON 1 SINERGIA DE PERSPECTIVA 7-10 CARTAS MAZO COMPETITIVO GRADO 1 10% DE 100
// competitivo grado 1 hay un 10% = 100 mazos
//(dentro de esos mazos serian 35 de 7 cartas, 28 de 8 cartas, 27 de 9 cartas, 10 de 10 cartas)

// IMPORTACIÓN DE FUNCIONES AFINES

import {
  bucleEsDiferente,
  buscarRepetida,
  manejarRepeticion,
  mezclarArreglo,
  ordenarMazo,
} from "../helpers/ActionFunctions.mjs";
import {
  generarCartaAleatoria,
  generarCartaMacro,
  generarCartaPerspectiva,
  generarCodigoAleatorio,
  obtenerContadorRepeticiones,
} from "../helpers/GenerateFunctions.mjs";
import {
  numeroAleatorio7,
  obtenerAleatorio,
} from "../helpers/RandomFunctions.mjs";

// INFORMACIÓN REQUERIDA PARA EL CORRECTO ARMADO

const estados = ["Eterno", "Creador", "Armonioso"];
const elementosPorEstado = {
  Eterno: ["hielo", "agua", "vida"],
  Creador: ["muerte", "viento", "magia"],
  Armonioso: ["fuego", "tecnología", "tierra"],
  Macroelementos: ["Tiempo", "Luz", "Oscuridad"],
};
const perspectivas = ["positiva", "negativa", "neutral"];
const niveles = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// INICIO DEL ALGORITMO

function generarMazoAleatorio() {
  const mazo = [];
  const cod = generarCodigoAleatorio(); // COD ÚNICO Y ALEATORIO PARA CADA MAZO

  const estadosAleatorios = mezclarArreglo(estados); // MEZCLO EL ARRAY PARA QUE EL PRIMER ESTADO QUE SURJA SEA AL AZAR.
  let nivelesParaUsar = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  // GENERAR 10 CARTAS POR CADA ESTADO
  for (const estado of estadosAleatorios) {
    for (let i = 0; i < 10; ) {
      const carta = generarCartaAleatoria(estado, cod);
      const cartaRepetida = buscarRepetida(mazo, carta);
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
          const cantidadDeCartas = numeroAleatorio7(); // CANTIDAD DE CARTAS QUE TENDRA LA PERSP ELEGIDA
          console.log(
            "CREACION DE PERSPECTIVA: \n" +
              carta.elemento +
              " - " +
              carta.perspectiva +
              " \nCantidad: " +
              cantidadDeCartas
          );
          const nivelARepetir = obtenerAleatorio(nivelesParaUsar); // SI LA PERSP ES DE 10 CARTAS, HAY UNA QUE DEBERÁ REPETIRSE, LA SELECCIONAMOS EN ESTE MOMENTO POR SU NIVEL
          if (cantidadDeCartas === 9) {
            // GENERO 1 DISTINTA Y LUEGO SIGO CON LAS 9 RESTANTES DE LA MISMA PERSP.
            let cartaDistinta = generarCartaAleatoria(estado, cod);
            // SI LA CARTA ES DE LA PERSPECTIVA CON SINERGIA, SE GENERA EN BUCLE HASTA QUE SALGA UNA DISTINTA
            if (
              cartaDistinta.elemento == elementoElegido &&
              cartaDistinta.perspectiva == perspectivaElegida
            ) {
              console.log(
                "LA CARTA \n" +
                  cartaDistinta.nombre +
                  " \nREPITE PERSPECTIVA. SERA GENERADA EN BUCLE HASTA QUE SEA DIFERENTE"
              );

              let bucleExitoso = bucleEsDiferente(cartaDistinta, mazo, cod, i);
              if (bucleExitoso === true && mazo.length <= 36) {
                i++;
              }
            } else {
              mazo.push(cartaDistinta);
              i++;
            }
          } else {
            if (cantidadDeCartas < 9) {
              // SI LA PERSP ES DE MENOS DE 10 CARTAS, nivelARepetir NO SERÁ USADO.
              let nivelesADesechar = 9 - cantidadDeCartas; //SI SON MENOS DE 9, TENGO QUE DESECHAR NIVELES QUE NO SERÁN UTILIZADOS POR LA PERSP.
              //SI SON 9, EL CODIGO AVANZA DIRECTAMENTE A LA GENERACIÓN, GENERANDO 1 POR NIVEL.
              for (let i2 = 0; i2 < nivelesADesechar; i2++) {
                let nivelDesechado = obtenerAleatorio(nivelesParaUsar);
                console.log("NIVEL DESECHADO: " + nivelDesechado);
                // Usar filter para eliminar niveles
                nivelesParaUsar = nivelesParaUsar.filter(
                  (num) => num !== nivelDesechado
                );
              }
              for (let i4 = 0; i4 < nivelesADesechar; i4++) {
                //GENERO CARTAS QUE DEBEN SER DISTINTAS A LA PERSPECTIVA ELEGIDA Y LAS AGREGO
                // LUEGO SIGO CON LAS CARTAS DE LA PERSPECTIVA.
                let cartaDistinta = generarCartaAleatoria(estado, cod);
                // SI LA CARTA ES DE LA PERSPECTIVA CON SINERGIA, SE GENERA EN BUCLE HASTA QUE SALGA UNA DISTINTA
                if (
                  cartaDistinta.elemento == elementoElegido &&
                  cartaDistinta.perspectiva == perspectivaElegida
                ) {
                  console.log(
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
                  const cartaRepetida2 = buscarRepetida(mazo, carta);
                  if (cartaRepetida2 != undefined) {
                    //SI SE ENCUENTRA REPETIDA, ENTONCES
                    let repeticionExitosa = manejarRepeticion(cartaRepetida2);
                    if (repeticionExitosa === true) {
                      i++;
                    } else {
                      let bucleExitoso = bucleEsDiferente(
                        cartaRepetida2,
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
            } else {
              if (cantidadDeCartas === 10) {
                // SI LA PERSPECTIVA TIENE 10 CARTAS, UTILIZARÉ TODOS LOS NIVELES Y REPETIRÉ EL QUE ANTERIORMENTE DEFINÍ.

                console.log(
                  "NIVEL REPETIDO EN ESTA PERSPECTIVA: " + nivelARepetir
                );
              }
            }
          }

          // Generar cartas para la perspectiva
          for (let i3 = 0; i3 < cantidadDeCartas; i3++) {
            if (i3 === 9) {
              //SI YA TENGO 1 DE CADA NIVEL, ES MOMENTO DE REPETIR LA QUE DEFINÍ ANTERIORMENTE.
              let cartaARepetir = mazo.find(
                (card) => card.nivel === nivelARepetir
              );
              cartaARepetir.cantidad++;
              i++;
            } else {
              // GENERO CARTAS DE LA PERSPECTIVA RESULTANTE, UTILIZANDO 1 NIVEL DEL ARRAY POR CADA ITERACIÓN Y LUEGO DESECHANDO EL NIVEL CON FILTER.

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
          }
        } else {
          if (i === 0 && mazo.length >= 7) {
            // SI YA SE GENERO LA PERSPECTIVA CON SINERGIA Y CAMBNIÉ DE ESTADO, DEFINO LA CARTA QUE TENDRÁ REPETICIÓN OBLIGATORIA
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

  ordenarMazo(mazo); //FUNCIÓN QUE ORDENA EL MAZO POR ESTADOS Y NIVELES, EN ORDEN ASCENDENTE.
  return mazo;
}

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
