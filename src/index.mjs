import express from "express"
import __dirname from "./utils.mjs";
import { ManagerDeck } from "./public/helpers/ManagerDeck.mjs";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence  } from "firebase/auth";
import { agregarImagenes, eliminarDesdeArroba } from "./public/helpers/ActionFunctions.mjs";
import dotenv from 'dotenv';
import session from 'express-session';

dotenv.config();  // Cargar variables de entorno desde .env


    // SERVER CONFIG
    const app =   express();
    const puerto = process.env.PORT || 8070;
    const httpServer = app.listen(puerto, () => {
    console.log(`Server listening on port ${puerto}`)});

    
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set('views', __dirname + "/public/views");
app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/assets"));
app.use('/ilustraciones', express.static(__dirname +'/assets/ilustraciones'));
app.use('/assets', express.static(__dirname +'/assets'));



// Configuración del middleware para servir ilustraciones


//CONFIGURACION DE FIREBASE

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID

};

// Initialize Firebase
  const fbapp =  initializeApp(firebaseConfig);


const auth = getAuth(fbapp)


export {fbapp}
  
const MD = new ManagerDeck();

const requireAuth = (req, res, next) => {
  const auth = getAuth(fbapp);
  const user = auth.currentUser;
  if (user) {
    // Usuario autenticado, permitir acceso a la ruta
    next();

  } else {
    // Usuario no autenticado, redirigir al inicio de sesión
    res.redirect('/');
  }
};

//CONFIGURACION DE VISTAS
app.get('/', (req, res) => {
  res.render("login.ejs");
});


app.get('/home', requireAuth, (req, res) => {

    res.render("home.ejs",);

})

app.get('/mazoNoCompetitivo.ejs',requireAuth,(req, res) => {
    res.render("mazoNoCompetitivo.ejs");


});
app.get('/mazoGrado0.ejs', requireAuth,(req, res) => {
    res.render("mazoGrado0.ejs");

  
});
app.get('/mazoGrado1.ejs', requireAuth, (req, res) => {
      res.render("mazoGrado1.ejs");

});
app.get('/mazoGrado2.ejs', requireAuth, (req, res) => {
      res.render("mazoGrado2.ejs");

});
app.get('/mazoGrado3.ejs', requireAuth, (req, res) => {
      res.render("mazoGrado3.ejs");


});
app.get('/mazoGrado4.ejs', requireAuth, (req, res) => {
      res.render("mazoGrado4.ejs");

});
app.get('/mazoGrado5.ejs', requireAuth, (req, res) => {
      res.render("mazoGrado5.ejs");

 
});
app.get('/mazoGradoETER.ejs', requireAuth, (req, res) => {
      res.render("mazoGradoETER.ejs");


});
app.get('/decksGeneradosDB.ejs',requireAuth, (req, res) => {
      res.render("decksGeneradosDB.ejs");

});
app.get('/cartasMazoDB.ejs',requireAuth, (req, res) => {
  res.render("cartasMazoDB.ejs");

});

app.get("/getDecks", requireAuth, async (req,res) =>{
try{

  const auth = getAuth(fbapp);
  const user = eliminarDesdeArroba(auth.currentUser.email)
  const decks = await MD.getDecks(user)
  if(decks){

  res.send(decks)
  }else{
    res.status(500).send('Error interno del servidor');

  }
}catch(error){
  console.error('Error al obtener mazos:', error);
}




app.post("/img", async (req, res) => {
    try{
      const mazo = req.body

      const ruta = `${__dirname}/src/assets/ILUSTRACIONES`
      let mazoImg = await agregarImagenes(mazo, ruta);
      res.json(mazoImg);
    }
    catch(error){
      res.status(500).send({status:"error", message:"Error al agregar imagenes: "+error})
    }
});




})

//CODIGO UTILIZADO POR UNICA VEZ PARA REGISTRAR USUARIOS ETER

/* app.post("/register", async (req,res) => {

  const { email, password } = req.body;
  console.log(email, password)

  
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=> {
      const user = (userCredential) 
        console.log("MOSTRANDO CREDENCIAL DESDE EL REGISTER: "+(user.user.uid))
      res.status(200).send({status:"ok",message:"Usuario registrado exitosamente."})
      return user;
    })
    .catch((error) => {
      console.log(error)
      
    });
    

    
  } catch (error) {
    console.error('Error al crear el usuario:', error.message);
    throw error;
  }
})
 */


app.post('/login', async (req, res) => {

  const { email, password } = req.body;

  if(req.body.email == '' || req.body.password == ''){
      res.status(404).send({status:"error", message: "Usuario inválido." })
  }else{
 
    try {
        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = (userCredential) 
          console.log("MOSTRANDO CREDENCIAL DESDE EL LOGIN: "+eliminarDesdeArroba(user.user.email))
          
              res.status(200).send({status: "OK", message:"Login exitoso."})

          // ...
        })
        .catch((error) => {
          console.log(error)
          res.status(404).send({status:"error", message:"Usuario no registrado."})
        });
              
        } catch (error) {
          console.error('Error al iniciar sesión:', error.message);
          throw error;
        }
      }
    });

    


    app.get("/logout", async (req, res) => {
   
      const auth = getAuth();
      await signOut(auth).then(() => {
        res.redirect("/")
        // Sign-out successful.
      }).catch((error) => {
        console.log(error)
        // An error happened.
      });

    })

    
    const db = getFirestore(fbapp);

    // VERIFICACION ANTES DEL GUARDADO
    async function compareDeckCode(db, code) {
      try {
        // Consulta a Firestore para verificar existencia del mazo por código
        const qCode = query(collection(db, 'decksv1'), where('code', '==', code));
        const queryCode = await getDocs(qCode);
    
        // Si existe un mazo con el mismo código o nombre, devuelve true
        const verificacion = !queryCode.empty ? true:false
        return verificacion
      } catch (error) {
        console.error('Error al comparar mazos:', error);
      }
    }
    async function compareDeckNombre(db,nombre) {
      try {
    
        // Consulta a Firestore para verificar existencia del mazo por nombre
        const qNombre = query(collection(db, 'decksv1'), where('nombre', '==', nombre));
        const queryNombre = await getDocs(qNombre);
    
        // Si existe un mazo con el mismo código o nombre, devuelve true
        const verificacion = !queryNombre.empty ? true:false
        return verificacion
      } catch (error) {
        console.error('Error al comparar mazos:', error);
        throw error;
      }
    }
 

app.post('/', requireAuth, async (req, res) => {   

  let {nombre, mazo, code, stats, grado, fechaCreacion} = req.body
  const existeCode = await compareDeckCode(db, code)
  const existeNombre = await compareDeckNombre(db, nombre)


  const auth = getAuth(fbapp);
  const user = eliminarDesdeArroba(auth.currentUser.email)
  
  if (
    !nombre  ||
    !mazo  ||
    !code ||
    !stats ||
    !grado||
    !user 

 
    ) 
{
  res.status(404).send({status: "error", message:" El deck requiere todos los campos!"});
 } 
if(existeCode==true){
  res.status(500).send({status: "error", message:" Code repetido."});

}else{
  if(existeNombre==true){
    res.status(400).send({status: "error", message:" Nombre repetido."});
  }else{
    try{
      if(MD.addDeck(nombre, mazo, code, stats, grado, fechaCreacion, user)){
        res.status(200).send({status:"ok", message: "Mazo agregado satisfactoriamente."})
  
      }
   
  
    
    }
    catch(error){
      console.log('Error al agregar el mazo. ' + error);
    }
  }
 

}


  
});


app.post("/eliminar", requireAuth, async (req,res) => {
    try {
          let {id} = req.body
                  
          const auth = getAuth(fbapp);
          const user = eliminarDesdeArroba(auth.currentUser.email)
          
      if(MD.deleteDeck(user, id)){
        res.status(200).send({status:"ok", message: "Mazo eliminado satisfactoriamente."})

      }else{
        res.status(500).send({status: "error", message:"Error al eliminar deck de la base de datos."})
      }

    }  catch(error){
      console.log('Error al eliminar el mazo. ' + error);
    }
  
  


})


app.get('/getDeckById/:id', requireAuth, async (req, res) => {
  try{
    const auth = getAuth(fbapp);
    const user = eliminarDesdeArroba(auth.currentUser.email)
    const {id} = req.params;
    const deck = await MD.getDeckById(id, user)

    if(deck){
        res.send(deck)
    }  else{
      res.status(404).json({ error: 'Deck no encontrado' });

    }
  }catch(error){
    console.error('Error al manejar solicitud GET:', error);
    res.status(500).send('Error interno del servidor');
  }

});
 

// CHEQUEAR LO COMETANDO, REVISAR CODIGOS.
// PENSAR EN LA PROTECCION DE CREDENCIALES, ILUSTRACIONES Y ALGORITMOS DE MAZOS
// TRABAJAR  DESDE RENDER0 Y LUEVO VOLCARLO A LOS OTROS
// FALTA AGREGAR ANGELES (DEJAR PARA LO ULTIMO Y ACOMODAR DE VUELTA TODOS)
// ARREGLAR ESTADISTICAS


//PROBLEMA CON UPLOAD, REVISAR TODO DEVUELTA, ACOMODAR CARPETA PUBLIC PARA QUE HAGA BIEN EL UPLOAD.
// TRABAJAR SOBRE EL .ENV Y LOS PROBLEMAS CON LAS VARIABLES DE ENTORNO.
// ESTOY CERCA DE LOGRARLO