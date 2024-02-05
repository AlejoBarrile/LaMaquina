import { generarCartaAleatoria, generarNuevasEstadisticas } from "./GenerateFunctions.mjs";
import { obtenerAleatorio } from "./RandomFunctions.mjs";

const estados = ["Eterno", "Creador", "Armonioso"];
    const elementosPorEstado = {
        Eterno: ["Hielo", "Agua", "Vida"],
        Creador: ["Muerte", "Viento", "Magia"],
        Armonioso: ["Fuego", "Tecnologia", "Tierra"],
        Macroelementos: ["Tiempo", "Luz", "Oscuridad"]
    };
    const perspectivas = ["Positiva", "Negativa", "Neutral"];
    const niveles = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const elementos = ["Hielo", "Agua", "Vida","Muerte", "Viento", "Magia","Fuego", "Tecnologia", "Tierra","Tiempo", "Luz", "Oscuridad"]


    const Eterno= ["Hielo", "Agua", "Vida"]
    const Creador=  ["Muerte", "Viento", "Magia"]
    const Armonioso=  ["Fuego", "Tecnologia", "Tierra"]
    const Macroelementos=  ["Tiempo", "Luz", "Oscuridad"]
    const Perspectivas = ["Positiva", "Negativa", "Neutral"]
     




// Función para mezclar un arreglo en un orden aleatorio (Fisher-Yates Shuffle)
function mezclarArreglo(arreglo) {
    const copiaArreglo = [...arreglo];
    for (let i = copiaArreglo.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiaArreglo[i], copiaArreglo[j]] = [copiaArreglo[j], copiaArreglo[i]]; // Intercambiar perspectivas
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
      } else if (a.elemento !== b.elemento) {
          return elementos.indexOf(a.elemento) - elementos.indexOf(b.elemento);
      }
      return a.nivel - b.nivel;
  });

return mazo;

  } 


  function manejarRepeticionCambio(carta, mazo){
   // Filtra el array de cartas repetidas para encontrar todas las cartas con el mismo nombre
   let cartasIguales = [] 
   cartasIguales = mazo.filter(card => card.nombre === carta.nombre && card.id !== carta.id);
   const nivel = carta.nivel
   // Suma las cantidades de las cartas iguales
   const cantidadTotal = cartasIguales.length;

      if (
          (nivel >= 1 && nivel <= 3 && cantidadTotal < 4) ||
          (nivel >= 4 && nivel <= 6 && cantidadTotal < 3) ||
          (nivel >= 7 && nivel <= 9 && cantidadTotal < 2)
      ) {
          
          return true;
      } else {
          console.error(
              "Error: Se excedió el límite de repeticiones de una carta: \n" + carta.nombre
          );
          return false;
      }
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
                  cartaNew.perspectiva !== carta.perspectiva ||
                  cartaNew.elemento !== carta.elemento
                ) {
                  mazo.push(cartaNew);
                  console.log("BUCLE REALIZADO CON EXITO. LA NUEVA CARTA ES:\n "+cartaNew.nombre)
                  esDiferente = true;
                  
                }
              } while (esDiferente === false); // Continuar generando cartas mientras esDiferente sea false
              return true
}



function llevarA36(mazo){
  const mazo36 = [];
  mazo.forEach(carta => {
      if (carta.cantidad > 1) {
          carta.repetida = true;
          for (let i = 0; i < carta.cantidad; i++) { // Usar '<' en lugar de '='
              
              let cartaDesplegada = {...carta}; // Copiar la carta
              cartaDesplegada.repetida = true
              mazo36.push(cartaDesplegada);
          }
      }else{
        carta.repetida = false;
        mazo36.push(carta);
      }

  });
  mazo36.forEach((card) => {
    delete card.cantidad
  })
  return mazo36;
}


function eliminarDesdeArroba(email) {
  // Verificar si el correo electrónico contiene un arroba
  const indiceArroba = email.indexOf('@');

  if (indiceArroba !== -1) {
    // Extraer la parte del correo electrónico antes del arroba
    const parteAntesDelArroba = email.substring(0, indiceArroba);

    // Nuevo correo electrónico sin la parte después del arroba
    const nuevoEmail = parteAntesDelArroba;

    return nuevoEmail;
  } else {
    // No se encontró el arroba en el correo electrónico
    return email;
  }
}


// Función para agregar imágenes al mazo
 function agregarImagenes(mazo) {
  mazo.forEach((carta) => {
    const nombreCarta = carta.nombre;
    const ruta = "/ilustraciones/"
    const rutaImagen = (ruta+ `${encodeURIComponent(nombreCarta)}.png`);

    // Asigna la ruta de la imagen a la propiedad de la carta
    carta.img = rutaImagen;

  });

  return mazo
}


const cambiarNombres = (mazo) =>{
  mazo.forEach(carta => {
    // Verificar las condiciones para cambiar el nombre
    if (carta.elemento === 'Tiempo' && carta.perspectiva === 'Positiva') {
      carta.nombre = `RASICO NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Tiempo' && carta.perspectiva === 'Neutral') {
      carta.nombre = `EDAD MEDIA NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Tiempo' && carta.perspectiva === 'Negativa') {
      carta.nombre = `FUTURE NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Vida' && carta.perspectiva === 'Positiva') {
      carta.nombre = `MONTAÑA NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Vida' && carta.perspectiva === 'Neutral') {
      carta.nombre = `JUNGLA NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Vida' && carta.perspectiva === 'Negativa') {
      carta.nombre = `SABANA NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Agua' && carta.perspectiva === 'Positiva') {
      carta.nombre = `COMUNIDAD CORAL NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Agua' && carta.perspectiva === 'Neutral') {
      carta.nombre = `COMUNIDAD PARCHE DORADO NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Agua' && carta.perspectiva === 'Negativa') {
      carta.nombre = `COMUNIDAD ESPINA NIVEL ${carta.nivel}`;
    }
    else if (carta.elemento === 'Hielo' && carta.perspectiva === 'Positiva') {
      carta.nombre = `POLO SUR NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Hielo' && carta.perspectiva === 'Neutral') {
      carta.nombre = `REINO DESTERRADO NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Hielo' && carta.perspectiva === 'Negativa') {
      carta.nombre = `POLO NORTE NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Luz' && carta.perspectiva === 'Positiva') {
      carta.nombre = `ANGELES NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Luz' && carta.perspectiva === 'Neutral') {
      carta.nombre = `SOMBRAS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Luz' && carta.perspectiva === 'Negativa') {
      carta.nombre = `ILUMINADO NIVEL ${carta.nivel}`;
    }
    else if (carta.elemento === 'Muerte' && carta.perspectiva === 'Positiva') {
      carta.nombre = `INFECTADOS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Muerte' && carta.perspectiva === 'Neutral') {
      carta.nombre = `SHINIGAMIS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Muerte' && carta.perspectiva === 'Negativa') {
      carta.nombre = `MALDITOS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Viento' && carta.perspectiva === 'Positiva') {
      carta.nombre = `MONJES NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Viento' && carta.perspectiva === 'Neutral') {
      carta.nombre = `TORNA NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Viento' && carta.perspectiva === 'Negativa') {
      carta.nombre = `GUARDIANES NIVEL ${carta.nivel}`;
    }
    else if (carta.elemento === 'Magia' && carta.perspectiva === 'Positiva') {
      carta.nombre = `OBJETOS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Magia' && carta.perspectiva === 'Neutral') {
      carta.nombre = `WOODO NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Magia' && carta.perspectiva === 'Negativa') {
      carta.nombre = `CRIATURAS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Oscuridad' && carta.perspectiva === 'Positiva') {
      carta.nombre = `CABALLEROS DE LA OSCURIDAD NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Oscuridad' && carta.perspectiva === 'Neutral') {
      carta.nombre = `ESPECTROS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Oscuridad' && carta.perspectiva === 'Negativa') {
      carta.nombre = `EL VACÍO NIVEL ${carta.nivel}`;
    }
    else if (carta.elemento === 'Tecnologia' && carta.perspectiva === 'Positiva') {
      carta.nombre = `MECHAS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Tecnologia' && carta.perspectiva === 'Neutral') {
      carta.nombre = `ARTEFACTOS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Tecnologia' && carta.perspectiva === 'Negativa') {
      carta.nombre = `CIENCIOS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Fuego' && carta.perspectiva === 'Positiva') {
      carta.nombre = `LA SOCIEDAD DEL SOL NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Fuego' && carta.perspectiva === 'Neutral') {
      carta.nombre = `SHAMAS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Fuego' && carta.perspectiva === 'Negativa') {
      carta.nombre = `VOLCANOS NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Tierra' && carta.perspectiva === 'Positiva') {
      carta.nombre = `ISLAS DEL CIELO NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Tierra' && carta.perspectiva === 'Neutral') {
      carta.nombre = `PUEBLO TOPO NIVEL ${carta.nivel}`;
    } else if (carta.elemento === 'Tierra' && carta.perspectiva === 'Negativa') {
      carta.nombre = `POBLADO MISCELIO NIVEL ${carta.nivel}`;
    }


  });

  return mazo
}


const verificarRepetida = (carta, mazo) =>{
  
  const esRepetida = mazo.find((card) => card.nombre == carta.nombre && card.id !== carta.id )
     if (esRepetida !== undefined){
      if(manejarRepeticionCambio(carta, mazo)){
        carta.repetida = true
        alert("La carta con ID #"+carta.id+" ahora es repetida.")
        return;
      }else{
        alert("LA CARTA QUE ACABAS DE REPETIR NO CUMPLE CON LOS LÍMITES. POR FAVOR, CAMBIALA POR OTRA. \n     RECUERDA QUE:\n           NIVEL 1-3: 4 REP.\n           NIVEL 4-6: 3 REP.\n           NIVEL 7-9: 2 REP.  ")
      }
      
     }else{
      carta.repetida = false

       return;
     }
 }

 function eventoAumentar(cartaId, mazo, deck){

  const cartaEncontrada = mazo.find((card) => card.id == cartaId);
  if(cartaEncontrada.id == cartaId ){
    if(cartaEncontrada.nivel >= 1 && cartaEncontrada.nivel <= 9){
    cartaEncontrada.nivel++
    let statsNew = generarNuevasEstadisticas(mazo)
    deck.stats = statsNew
        }
    
    }

    if(cartaEncontrada.estado == "Macroelementos"){

      cartaEncontrada.nombre = `Macroelementos-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
      actualizarCarta(cartaEncontrada, mazo, deck)
      
    
    }else{
      cartaEncontrada.nombre = `${cartaEncontrada.estado}-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
      actualizarCarta(cartaEncontrada, mazo, deck)
      
  }

}


function eventoCambiar(cartaId, mazo, deck){
  const cartaEncontrada = mazo.find((card) => card.id == cartaId);
  if(cartaEncontrada.id == cartaId ){

    if(cartaEncontrada.estado == "Macroelementos"){
      const index = Macroelementos.findIndex((elemento) => cartaEncontrada.elemento == elemento)
      if(index==2){
        cartaEncontrada.elemento = Macroelementos[index-2]

      }else{
        cartaEncontrada.elemento = Macroelementos[index+1]

      }
      
      let statsNew = generarNuevasEstadisticas(mazo)
      deck.stats = statsNew
      cartaEncontrada.nombre = `Macroelementos-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
      actualizarCarta(cartaEncontrada, mazo, deck)

      const elementoCarta = document.querySelectorAll(".nombre")
      const liCorrecto = elementoCarta[cartaId-1]
      
    
    }else{
      if(cartaEncontrada.estado == "Eterno"){
        const index = Eterno.findIndex((elemento) => cartaEncontrada.elemento == elemento)
        if(index==2){
          cartaEncontrada.elemento = Eterno[index-2]

        }else{
          cartaEncontrada.elemento = Eterno[index+1]

        }
        cartaEncontrada.nombre = `${cartaEncontrada.estado}-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
        actualizarCarta(cartaEncontrada, mazo, deck)
        
        
        let statsNew = generarNuevasEstadisticas(mazo)
        deck.stats = statsNew
        const elementoCarta = document.querySelectorAll(".nombre")
        const liCorrecto = elementoCarta[cartaId-1]
        liCorrecto.id = `${cartaEncontrada.elemento}`;
      
    }else{
      if(cartaEncontrada.estado == "Creador"){
        const index = Creador.findIndex((elemento) => cartaEncontrada.elemento == elemento)
        if(index==2){
          cartaEncontrada.elemento = Creador[index-2]

        }else{
          cartaEncontrada.elemento = Creador[index+1]

        }
        
        let statsNew = generarNuevasEstadisticas(mazo)
        deck.stats = statsNew
        cartaEncontrada.nombre = `${cartaEncontrada.estado}-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
        actualizarCarta(cartaEncontrada, mazo, deck)
        
        const elementoCarta = document.querySelectorAll(".nombre")
        const liCorrecto = elementoCarta[cartaId-1]
        liCorrecto.id = `${cartaEncontrada.elemento}`;
      }else{
        const index = Armonioso.findIndex((elemento) => cartaEncontrada.elemento == elemento)
        if(index==2){
          cartaEncontrada.elemento = Armonioso[index-2]

        }else{
          cartaEncontrada.elemento = Armonioso[index+1]

        }
        let statsNew = generarNuevasEstadisticas(mazo)
        
        deck.stats = statsNew
        cartaEncontrada.nombre = `${cartaEncontrada.estado}-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
        actualizarCarta(cartaEncontrada, mazo, deck)
        
        const elementoCarta = document.querySelectorAll(".nombre")
        const liCorrecto = elementoCarta[cartaId-1]
        liCorrecto.id = `${cartaEncontrada.elemento}`;
      }
    }
    }
  }

}


function eventoDisminuir(cartaId, mazo, deck){
  
const cartaEncontrada = mazo.find((card) => card.id == cartaId);
if(cartaEncontrada.id == cartaId ){
  if(cartaEncontrada.nivel >= 2 && cartaEncontrada.nivel <= 10){
  cartaEncontrada.nivel--
  
  let statsNew = generarNuevasEstadisticas(mazo)
  deck.stats = statsNew

  if(cartaEncontrada.estado == "Macroelementos"){

    cartaEncontrada.nombre = `Macroelementos-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
    actualizarCarta(cartaEncontrada, mazo, deck)

    
  
  }else{
    cartaEncontrada.nombre = `${cartaEncontrada.estado}-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
    actualizarCarta(cartaEncontrada, mazo, deck)
    
    
  }
}
}

      }

      
      function eventoPerspectiva(cartaId, mazo, deck){
        const cartaEncontrada = mazo.find((card) => card.id == cartaId);
        console.log(cartaEncontrada)
    if(cartaEncontrada.id == cartaId ){
        const index = Perspectivas.findIndex((persp) => cartaEncontrada.perspectiva == persp)
        if(index==2){
          cartaEncontrada.perspectiva = Perspectivas[index-2]

        }else{
          cartaEncontrada.perspectiva = Perspectivas[index+1]

        }
          
        
          let statsNew = generarNuevasEstadisticas(mazo)
          deck.stats = statsNew
        if(cartaEncontrada.estado == "Macroelementos"){
        
          cartaEncontrada.nombre = `Macroelementos-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
          actualizarCarta(cartaEncontrada, mazo, deck)

          
        }else{
          cartaEncontrada.nombre = `${cartaEncontrada.estado}-${cartaEncontrada.elemento}-${cartaEncontrada.perspectiva}-Nivel-${cartaEncontrada.nivel}`
          actualizarCarta(cartaEncontrada, mazo, deck)

        }}
                  }


                  function actualizarCarta(card, mazo, deck) {


                    agregarImagenes(mazo)
                    cambiarNombres(mazo)
                    verificarRepetida(card, mazo)
                  
                  
                    const carta = document.getElementById("Carta "+card.id);
                    if (carta) {
                      carta.innerHTML = `
                      <div class="img-container">
                      <img src="${card.img}" class="card-img" >
                      </div>
                      
                  
                        <p class="nombre p-2" id="${card.elemento}" >${card.nombre}</p>
                        <p class="nombre p-2" id="${card.elemento}" >ID: ${card.id}</p>
                        <p class="nombre p-2" id="${card.elemento}" >${card.cod}</p>

                        
        
                          <hr>
                          <button class="aumentarNivel" id="${card.id}" >NIVEL +</button>
                          <button class="disminuirNivel" id="${card.id}" >NIVEL -</button>
                          <button class="cambiarElemento" id="${card.id}">Cambiar Elemento</button>
                          <button class="cambiarPerspectiva" id="${card.id}">Cambiar Persp.</button>
                          
                          </div>
                  
                  `;
                    }
                  
                    const botonesAumentar = document.querySelectorAll('.aumentarNivel');
                    const botonesDisminuir = document.querySelectorAll('.disminuirNivel');
                    const botonesCambiar = document.querySelectorAll('.cambiarElemento');
                    const botonesPersp = document.querySelectorAll('.cambiarPerspectiva');
                    
                   
                      // Agrega un evento a cada botón
                      const botonAum =  botonesAumentar[(card.id-1)]
                        botonAum.addEventListener('click', (e) => {
                      
                        let cartaId = e.target.id; // Extrae el ID de la carta
                        
                        eventoAumentar(cartaId, mazo, deck)
                      
                          
                        
                      });
                      
                      
                      // Agrega un evento a cada botón
                      const botonDis =  botonesDisminuir[(card.id-1)]
                        botonDis.addEventListener('click', (e) => {
                      
                        let cartaId = e.target.id; // Extrae el ID de la carta
                        
                        eventoDisminuir(cartaId, mazo, deck)
                      
                          
                        
                      });

                     // Agrega un evento a cada botón
                      const botonCam =  botonesCambiar[(card.id-1)]
                        botonCam.addEventListener('click', (e) => {
                      
                        let cartaId = e.target.id; // Extrae el ID de la carta
                        
                        eventoCambiar(cartaId, mazo, deck)
                      
                          
                        
                      });
                      
                  // Agrega un evento a cada botón
                  const botonPer =  botonesPersp[(card.id-1)]
                    botonPer.addEventListener('click', (e) => {
                  
                    let cartaId = e.target.id; // Extrae el ID de la carta
                    
                    eventoPerspectiva(cartaId, mazo, deck)
                  
                    
                  
                });

                  }



        export {mezclarArreglo, buscarRepetida, ordenarMazo, manejarRepeticion, bucleEsDiferente, llevarA36,
           eliminarDesdeArroba, agregarImagenes, cambiarNombres, manejarRepeticionCambio,
           verificarRepetida, actualizarCarta, eventoPerspectiva, eventoDisminuir, eventoCambiar,
           eventoAumentar}