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
   
   
   
   // Función para generar codigo aleatorio de mazos y cartas inherentes
   function generarCodigoAleatorio() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    
    let codigo = '';
    
    for (let i = 0; i < 3; i++) {
    const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
    const numeroAleatorio = numeros[Math.floor(Math.random() * numeros.length)];
    
    codigo += letraAleatoria + numeroAleatorio + (i == 2 ? "":"-")
    }
    
    return codigo;
}

    // Función para generar una carta aleatoria 

function generarCartaAleatoria(estado, cod) {
    const elemento = obtenerAleatorio(elementosPorEstado[estado]);
    const perspectiva = obtenerAleatorio(perspectivas);
    const nivel = obtenerAleatorio(niveles);
    

    const carta = {
        cantidad: 1,
        estado,
        elemento,
        perspectiva,
        nivel,
        cod,
        nombre: `${estado}-${elemento}-${perspectiva}-Nivel-${nivel}`
        };

    return carta;

}

function generarCartaPerspectiva(estado, perspectivaElegida, elementoElegido, nivel, cod){
    let cartaNew = {
        cantidad: 1,
        estado: estado, 
        elemento: elementoElegido,
        perspectiva: perspectivaElegida,
        nivel,
        cod,
        nombre: `${estado}-${elementoElegido}-${perspectivaElegida}-Nivel-${nivel}`

    };
    return cartaNew
}

function generarCartaMacro(cod){
    const macro = obtenerAleatorio(elementosPorEstado.Macroelementos);
    const perspectiva = obtenerAleatorio(perspectivas);
    const nivel = obtenerAleatorio(niveles);
        let carta = {
            cantidad: 1,
            estado: "Macroelementos", 
            elemento: macro,
            perspectiva,
            nivel,
            cod,
            nombre: `Macroelementos-${macro}-${perspectiva}-Nivel-${nivel}`
        };
        return carta
}

function obtenerContadorRepeticiones(carta) {
    const nivel = carta.nivel;
    
    if (nivel >= 1 && nivel <= 3) {
        return Math.min(Math.floor(Math.random() * 3) + 2, 4);
    } else if (nivel >= 4 && nivel <= 6) {
        return Math.min(Math.floor(Math.random() * 2) + 2, 3);
    } else if (nivel >= 7 && nivel <= 9) {
        return Math.min(Math.floor(Math.random() * 2) + 1, 2);
    } 
    }


    function generarEstadisticas(mazo) {
        // Crear acumuladores para elementos y niveles
        const elementos = {
          hielo: 0,
          vida: 0,
          agua: 0,
          Tiempo: 0,
          tierra: 0,
          tecnología: 0,
          fuego: 0,
          Oscuridad: 0,
          magia: 0,
          viento: 0,
          muerte: 0,
          Luz: 0,
        };
      
        const niveles = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
        };

        const repetidas = {
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0

        }
        // Recorrer el mazo de cartas
        mazo.forEach(carta => {
          const elemento = carta.elemento
          const nivel = carta.nivel
          const cantidad = carta.cantidad
          const repetida = (cantidad > 1 ? cantidad : 0)     
          // Acumular por elemento
          if (elemento in elementos) {
            elementos[elemento] += cantidad;
          }
      
          // Acumular por nivel
          if (nivel in niveles) {
            niveles[nivel] += cantidad;
          }

        // Acumular por repetidas
        if (repetida in repetidas) {
            repetidas[repetida] += 1 + ` /${carta.nombre}`;
        }

        });
      
        // Devolver las estadísticas
        return {elementos, niveles };
      }
      function generarNuevasEstadisticas(mazo) {
        // Crear acumuladores para elementos y niveles
        const elementos = {
          hielo: 0,
          vida: 0,
          agua: 0,
          Tiempo: 0,
          tierra: 0,
          tecnología: 0,
          fuego: 0,
          Oscuridad: 0,
          magia: 0,
          viento: 0,
          muerte: 0,
          Luz: 0,
        };
      
        const niveles = {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          7: 0,
          8: 0,
          9: 0,
        };

        const repetidas = {
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0

        }
        // Recorrer el mazo de cartas
        mazo.forEach(carta => {
          const elemento = carta.elemento
          const nivel = carta.nivel
          // Acumular por elemento
          if (elemento in elementos) {
            elementos[elemento] += 1;
          }
      
          // Acumular por nivel
          if (nivel in niveles) {
            niveles[nivel] += 1;
          }


        });
      
        // Devolver las estadísticas
        return {elementos, niveles };
      }

      function generarIDCarta(mazo) {
        let acc = 1
        mazo.forEach((card) => card.id = acc++)
        return mazo
      }

      
                           

export {generarNuevasEstadisticas, generarCodigoAleatorio, generarCartaAleatoria,
   generarCartaPerspectiva, generarCartaMacro,
    obtenerContadorRepeticiones, generarEstadisticas,
     generarIDCarta }
