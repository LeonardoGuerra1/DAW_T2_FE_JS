window.addEventListener('load', function(){

    // referenciar controles de pantalla
    const msgSuccess = this.document.getElementById('msgSuccess');

    // recuperar nombre de usuario
    const result = JSON.parse(this.localStorage.getItem('result'));

    // mostrar nombre de usuario en alerta
    mostrarAlerta(`Bienvenido ${result.nombreUsuario}`);
    document.getElementById("btn").addEventListener("click", salir)
});

function mostrarAlerta(mensaje) {
    msgSuccess.innerHTML = mensaje;
    msgSuccess.style.display = 'block';
}

async function salir() {
  const url = 'http://localhost:8082/app-login/salir';
  const request = {
    tipoDocumento: 1,
    numeroDocumento: "43333333"
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(request)
    });
    
    if (!response.ok) {
      throw new Error()
    }

    const json = await response.json()
    if (json.codigo === "00") {
      window.location.replace("index.html")
      localStorage.removeItem("result")
    } else {
      mostrarAlerta(json.mensaje);
    }
  } catch (error) {
    // alert(json.mensaje)
    console.log('Error: Ocurrió un problema.', error);
    mostrarAlerta('Error: Ocurrió un problema.');
  }
}