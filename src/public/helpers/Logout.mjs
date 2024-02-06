
async function logout() {
    try {
       await fetch('/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }}).then((response) =>{
        console.log(response)
        window.location.href = '/'

      }).catch((error) => {
      console.error('Error:', error);
      alert("ERROR, CREDENCIALES DESCONOCIDAS.")
      
    })
    }catch(error){
      console.error('Error:', error);
      
    }
  }


const botonLogout = document.getElementById("logout")


botonLogout.addEventListener("click", (e) =>{
    e.preventDefault();
    logout()
  })
