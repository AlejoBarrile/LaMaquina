import { error } from "console";
import fs, { copyFileSync, write } from "fs";
import { fbapp } from "../../../index.mjs";
import { getFirestore, collection, addDoc, doc, getDocs, getDoc, query, where, orderBy, limit, deleteDoc, updateDoc, writeBatch, setDoc} from 'firebase/firestore';

// SISTEMA DE GUARDADO PARA MAZOS NO COMPETITIVOS

class ManagerDeck {
    constructor() {
        
            this.decks = []; // Array para los mazos
            this.db = getFirestore(fbapp); // Inicializa Firestore de Firebase
            
    }
/* 
    createFile() {
        // Crea el archivo decksV1.json si no existe
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify(this.decks));
        }
    } */


    saveDecks() {
        fs.writeFileSync(this.path, JSON.stringify(this.decks), null, 2);
        console.log("Archivo actualizado con éxito.")
    }

  async  getDecks(user){
        try {
          this.decks = []
          const docRef = (collection(this.db, 'decksv1'))
          const querySnapshot = await getDocs(query(docRef, where("by", "==", user)))
          querySnapshot.forEach((doc) => {
            this.decks.push({ id: doc.id, ...doc.data() });
          });
          return this.decks;
        } catch (error) {
          console.error('Error al obtener los mazos:', error);
        }
      }
 

      async getDeckById(id, user) {
        try {
          const deckId = []
          const docRef = (collection(this.db, 'decksv1'))
          const querySnapshot = await getDocs(query(docRef, where("by", "==", user)))
          querySnapshot.forEach((doc) => {
            deckId.push({...doc.data() });
          });
          const deckEncontrado = deckId.find((deck) => deck.id == id)
          return deckEncontrado
        } 
        catch (error) {
          console.error('Error al obtener el mazo por ID:', error);
        }
      }



      async  deleteDeck(user,deckId) {
        const q = query(collection(this.db, "decksv1"), where("by", "==", user));

        const querySnapshot = await getDocs(q);
        const ids = []
        querySnapshot.forEach((doc) => {
          console.log(doc.id + "===> " + doc.data().id)
          if(doc.data().id == deckId){
                ids.push(doc.id)



          }
          
        }); 
      
        deleteDoc(doc(this.db, "decksv1", ids[0] ))
        .then(()=>{
          console.log("MAZO ELIMINADO. ")
          if(this.remakeId()){
                return true
            
          }else{
            console.log("ERROR AL REACOMODAR LOS IDS.")
          }

        }).catch((err) =>{
          console.log("Error al eliminar. "+err)
          return false

        })

        
      }


    async remakeId(){
      try {
        
          let ids = []
          const Q = query(collection(this.db, 'decksv1'), orderBy("id", "asc"))
          const decksRef = await getDocs(Q)
          decksRef.forEach((doc) => {
            ids.push(doc.id);
          });
          // Actualiza los IDs de los mazos
          for(let i=0; i<ids.length;i++){
          updateDoc(doc(this.db, "decksv1", ids[i]),{id: (i+1)})
        console.log("Deck ID DATABASE "+ids[i] +" ahora tiene ID "+(i+1));
          }
        return true
      }
    
        catch (error) {
        console.error('Error al reacomodar los ID: ', error);
        return false
      }
    }

    async generateId() {
      try {
        // Obtener el último id existente
        const ultimoIdSnapshot = await getDocs(query(collection(this.db, 'decksv1'), orderBy('id', 'desc'), limit(1)));
        const nuevoId = ultimoIdSnapshot.empty ? 1 : ultimoIdSnapshot.docs[0].data().id + 1;
        console.log('Mazo agregado con ID:', nuevoId);

        return nuevoId

    
      } catch (error) {
        console.error('Error al agregar el mazo:', error);
      }
    }



 async   addDeck(nombre, mazo, code, stats, grado, fechaCreacion, user) {   
          const id = await this.generateId()
            console.log("CODIGO Y NOMBRE VERIFICADOS, EL DECK ES VÁLIDO.")
            try{

                const newDeck = {
                    id: id, 
                    nombre: nombre,
                    mazo: mazo,
                    stats: stats,
                    code: code,
                    grado: grado,
                    fecha: fechaCreacion,
                    by: user
                    
                
            };
    
                const deckData = (newDeck)
                    // Genera un nuevo objeto con información del mazo

                    // Agrega el mazo al array de mazos
                const docRef =  addDoc(collection(this.db, 'decksv1'), deckData)
                .then((res)=>{
                  console.log("ID FIREBASE DECK: "+ (res).id)
                  console.log("Deck ha pasado por addDeck con éxito.")
                  return  true
                  
                }).catch((error)=>{
                  console.log("Añadir mazo denegado. "+error)
                  return false
                })

                

              }
            

    

catch(error){

    console.error('Operación denegada.'+error);
    

    
    

            }




          }
        

        }
    



export {ManagerDeck};


