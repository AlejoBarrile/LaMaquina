        //CODIGO PARA GENERAR LOS MAZOS UNICOS, REPETICIONES ALEATORIAS,
        // CON 3 SINERGIA DE PERSPECTIVA 10 CARTAS MAZO COMPETITIVO GRADO ETER (NO OFICIAL) 



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
            generarEstadisticas,
            generarIDCarta
            } from "../helpers/GenerateFunctions.mjs";
            import {
                obtenerEter,
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
            const estadoEter = obtenerEter()
            console.log("EL ESTADO "+ estadoEter + " TENDRÁ UNA PERSPECTIVA CON GRADO ÉTER")
    
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
                    if(estado === estadoEter){
                        const perspectivaElegida = carta.perspectiva; //DEFINO LA PERSPECTIVA A CONFECCIONAR
                        const elementoElegido = carta.elemento;
                        console.log(
                            "CREACION DE PERSPECTIVA: \n" +
                            carta.elemento +
                            " - " +
                            carta.perspectiva + "\n ESTA PERSPECTIVA TENDRÁ CARTA GRADO ÉTER, FELICIDADES!"
                        );
                       
                        const nivelEter = "ÉTER"
                        let cartaEter = generarCartaPerspectiva(estado, perspectivaElegida, elementoElegido, nivelEter, cod)
                        mazo.push(cartaEter)
                        i++
                         // Generar cartas para la perspectiva
                        for (let i3 = 1; i3 < 10; i3++) {
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
                    
                    }else{
                        
                    // SI ES LA PRIMERA CARTA DEL MAZO, O LA PRIMERA CARTA DEL ESTADO, HACER LO SIGUIENTE:
                    if (i === 0 ) {
                        const perspectivaElegida = carta.perspectiva; //DEFINO LA PERSPECTIVA A CONFECCIONAR
                        const elementoElegido = carta.elemento;
                        console.log(
                            "CREACION DE PERSPECTIVA: \n" +
                            carta.elemento +
                            " - " +
                            carta.perspectiva 
                        );
                       
                        const nivelARepetir = obtenerAleatorio(nivelesParaUsar); 
                                // SI LA PERSP ES DE 10 CARTAS, HAY UNA QUE DEBERÁ REPETIRSE, LA SELECCIONAMOS EN ESTE MOMENTO POR SU NIVEL
                                // SI LA PERSPECTIVA TIENE 10 CARTAS, UTILIZARÉ TODOS LOS NIVELES Y REPETIRÉ EL QUE ANTERIORMENTE DEFINÍ.
        
                                console.log(
                                "NIVEL REPETIDO EN ESTA PERSPECTIVA: " + nivelARepetir
                                );
                            
                            
                        
                        
                        // Generar cartas para la perspectiva
                        for (let i3 = 0; i3 < 10; i3++) {
                            if (i3 == 9 ) {
                                   //SI YA TENGO 1 DE CADA NIVEL, ES MOMENTO DE REPETIR LA QUE DEFINÍ ANTERIORMENTE.
                                    let cartaARepetir = mazo.find(
                                        (card) => (card.perspectiva === perspectivaElegida)&&
                                        (card.elemento === elementoElegido)&&
                                        (card.nivel === nivelARepetir)
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
                        }else{
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
const grado = "Grado ETER"




const deck = {
mazo: mazo,
stats: stats,
code: code,
grado: grado
}


export  {deck}
        