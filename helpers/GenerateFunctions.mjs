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
   
   
   
   
   // Función para generar codigo aleatorio de mazos y cartas inherentes
   function generarCodigoAleatorio() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numeros = '0123456789';
    
    let codigo = '';
    
    for (let i = 0; i < 3; i++) {
    const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
    const numeroAleatorio = numeros[Math.floor(Math.random() * numeros.length)];
    
    codigo += letraAleatoria + numeroAleatorio + "-"
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
        nombre: `${estado} - ${elemento} - ${perspectiva} - Nivel ${nivel}`
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
        nombre: `${estado} - ${elementoElegido} - ${perspectivaElegida} - Nivel ${nivel}`

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
            nombre: ` Macroelementos - ${macro} - ${perspectiva} - Nivel ${nivel}`
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
export {generarCodigoAleatorio, generarCartaAleatoria, generarCartaPerspectiva, generarCartaMacro, obtenerContadorRepeticiones}
