//Actualiza el top que hemos puesto en nuestro menuPrincipal con las 3 mejores puntuaciones
function actualizarTop(){
    arrayPuntuaciones = localStorage.getItem("Puntuaciones")
    arrayPuntuaciones = JSON.parse(arrayPuntuaciones)
  
    if(arrayPuntuaciones == null){
      arrayPuntuaciones = []
    }
  
    if(arrayPuntuaciones.length < 3){
      divTop.style.display = "none"
    }
  
    top1.innerHTML = arrayPuntuaciones[0]
    top2.innerHTML = arrayPuntuaciones[1]
    top3.innerHTML = arrayPuntuaciones[2]
  }

  actualizarTop()