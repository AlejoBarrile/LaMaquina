

async function register(user)  {

  const data = JSON.stringify(user)
  try {

   await fetch('/register', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',

      }
      
    }).then((response) =>{
      console.log(response)
    }).catch((error) => {
    console.error('Error:', error);
    alert("ERROR, CREDENCIALES DESCONOCIDAS.")
    
  })
  }catch(error){
    console.error('Error:', error);
    
  }

  }
 




async function login(user)  {

  const data = JSON.stringify(user)
  try {

   await fetch('/login', {
      method: 'POST',
      body: data,
      headers: {
        'Content-Type': 'application/json',

      }
      
    }).then((response) =>{
      if(response.status == 200){
      window.location.href = '/home'
      }else{
        if(response.status == 404){
          alert("INGRESE UN USUARIO VÁLIDO.")
        }
      }
    }).catch((error) => {
    console.error('Error:', error);
    alert("ERROR, CREDENCIALES DESCONOCIDAS.")
    
  })
  }catch(error){
    console.error('Error:', error);
    alert("ERROR, CREDENCIALES DESCONOCIDAS.")

    
  }

  }
 


const botonForm = document.getElementById('loginForm')
const botonRegister = document.getElementById("registerForm")

botonForm.addEventListener('click', (e) =>{
    e.preventDefault();

  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {email: email, password: password}
    login(user)        
  })
  
  botonRegister.addEventListener('click', (e) =>{
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const userEmails = [{email: "abemusix@gmail.com"},{email: "lautaro.vinderola@gmail.com"},{email: "emanuelfiore16@gmail.com"},{email: "alvaro.vinderola@gmail.com"}]

    //AUTENTICACION DE EMAILS Y USER AUTH
    const userAuth = userEmails.find((user) => user.email == email)
    userAuth.password = password
    //...

    register(userAuth)
  })

