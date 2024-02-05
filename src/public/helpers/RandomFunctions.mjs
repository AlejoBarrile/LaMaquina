
const estados = ["Eterno", "Creador", "Armonioso"];
const elementosPorEstado = {
    Eterno: ["hielo", "agua", "vida"],
    Creador: ["muerte", "viento", "magia"],
    Armonioso: ["fuego", "tecnología", "tierra"],
    Macroelementos: ["Tiempo", "Luz", "Oscuridad"]
};
const perspectivas = ["positiva", "negativa", "neutral"];
const niveles = [1, 2, 3, 4, 5, 6, 7, 8, 9];





function numeroAleatorio5() {
    const numeros = [5, 6, 7];
    const indice = Math.floor(Math.random() * numeros.length);
    return numeros[indice];
    }
    function numeroAleatorio7() {
        const numeros = [7, 8, 9, 10];
        const indice = Math.floor(Math.random() * numeros.length);
        return numeros[indice];
        }
    

           // Función para obtener un elemento aleatorio de un arreglo
    function obtenerAleatorio(arr) {
        const indice = Math.floor(Math.random() * arr.length);
        return arr[indice];
    }
    

   function obtenerEter(){
        let estado = obtenerAleatorio(estados)
        return estado;
   }

export {numeroAleatorio5, numeroAleatorio7, obtenerAleatorio, obtenerEter}


 