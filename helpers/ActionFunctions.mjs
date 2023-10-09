import { generarCartaAleatoria } from "./GenerateFunctions.mjs";
import { obtenerAleatorio } from "./RandomFunctions.mjs";

const estados = ["Eterno", "Creador", "Armonioso"];
const elementosPorEstado = {
    Eterno: ["hielo", "agua", "vida"],
    Creador: ["muerte", "viento", "magia"],
    Armonioso: ["fuego", "tecnología", "tierra"],
    Macroelementos: ["Tiempo", "Luz", "Oscuridad"]
};
const perspectivas = ["positiva", "negativa", "neutral"];
const niveles = [1, 2, 3, 4, 5, 6, 7, 8, 9];







// Función para mezclar un arreglo en un orden aleatorio (Fisher-Yates Shuffle)
function mezclarArreglo(arreglo) {
    const copiaArreglo = [...arreglo];
    for (let i = copiaArreglo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiaArreglo[i], copiaArreglo[j]] = [copiaArreglo[j], copiaArreglo[i]]; // Intercambiar elementos
    }
    return copiaArreglo;
        }
       
        function buscarRepetida(mazo, carta){
            const cartaRepetida = mazo.find((card) => card.nombre === carta.nombre)
            return cartaRepetida
          }
        


   // Ordenar el mazo completo
  function ordenarMazo(mazo){
    mazo.sort((a, b) => {
        if (a.estado !== b.estado) {
            return estados.indexOf(a.estado) - estados.indexOf(b.estado);
        }
        return a.nivel - b.nivel;
    });

return mazo;

  } 


function manejarRepeticion(carta){
  let nivel = carta.nivel;

        if (
          (nivel >= 1 && nivel <= 3 && carta.cantidad < 4) ||
          (nivel >= 4 && nivel <= 6 && carta.cantidad < 3) ||
          (nivel >= 7 && nivel <= 9 && carta.cantidad < 2)
        ) {
          carta.cantidad++;
          console.log(
            "LA CARTA \n" + carta.nombre + " \nRESPETA LOS LIMITES DE REPETICION."
          );
          return true

          
        } else {
          console.error(
            "ERROR: Se excedió el límite de repeticiones de una carta: \n" +
              carta.nombre + " \nSe entrara en un bucle hasta generar una distinta."
          );
          return false; 
        }
}

function bucleEsDiferente(carta, mazo, cod, i){
  let esDiferente = false;
              do {
                let cartaNew = generarCartaAleatoria(carta.estado, cod);
                if (
                  cartaNew.elemento !== carta.elemento ||
                  cartaNew.perspectiva !== carta.perspectiva
                ) {
                  mazo.push(cartaNew);
                  console.log("BUCLE REALIZADO CON EXITO. LA NUEVA CARTA ES:\n "+cartaNew.nombre)
                  esDiferente = true;
                  
                }
              } while (esDiferente === false); // Continuar generando cartas mientras esDiferente sea false
              return true
}

        export {mezclarArreglo, buscarRepetida, ordenarMazo, manejarRepeticion, bucleEsDiferente}