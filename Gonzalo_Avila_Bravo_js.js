//Elementos del html
var botonStart = document.getElementById("Start")
var carretera = document.getElementById("imagencarretera")

var score = document.getElementById("score")

//Variables que contienen los div de los coches
var cocheEnemigo1 = document.getElementById("cocheEnemigo")
var cocheEnemigo2 = document.getElementById("cocheEnemigo2")
var cocheEnemigo3 = document.getElementById("cocheEnemigo3")
var cocheEnemigo4 = document.getElementById("cocheEnemigo4")
var cocheMain = document.getElementById("maincar")


var n=0

//Variables contenedoras de SetInterval y SetTimeout
var controlBordes
var intervalCNaranja
var intervalCVerde
var intervalCNegro
var intervalCBlanco

//Ranking final
var top1 = document.getElementById("top1")
var top2 = document.getElementById("top2")
var top3 = document.getElementById("top3")
var divTop = document.getElementById("divPuntuaciones")


//Top y right del coche cuando 
var t= 65;
var l = 0;

//Boolean que sirve para terminar la ejecución de la función asincrona que actualiza el score
var terminoJuego = false
var arrayPuntuaciones= localStorage.getItem("Puntuaciones")



/*Este evento controla el boton de start. Cuando se inicia el juego inician los SetIntervals que hacen que los coches se muevan y vayan cambiando
su posición en la carretera cada vez que aparecen*/

botonStart.addEventListener("click", function(){
    botonStart.style.display='none'
    carretera.style.animation = 'roadanimation 10s linear infinite'
    contarScore();
    //Coche negro
      intervalCNegro = setInterval(()=>{
      num = Math.floor(Math.random()*(51-49+1)+ 49)
      cocheEnemigo1.style.right=`${num}%`

    },2000)

    //Coche naranja
      intervalCNaranja = setInterval(()=>{
      num = Math.floor(Math.random()*(40-38+1)+ 38)
      cocheEnemigo2.style.right=`${num}%`

    },3000)
    //Coche verde
      intervalCVerde=setInterval(()=>{
      num = Math.floor(Math.random()*(45-43+1)+ 43)
      cocheEnemigo3.style.right=`${num}%`

    },4000)
    //Coche blanco
      intervalCBlanco =setInterval(()=>{
      num = Math.floor(Math.random()*(57-55+1)+ 55)
      cocheEnemigo4.style.right=`${num}%`

    },5000)

    
    cocheEnemigo1.style.animation = 'enemy1 2s linear infinite'
    cocheEnemigo2.style.animation = 'enemy2 3s linear infinite'
    cocheEnemigo3.style.animation = 'enemy3 4s linear infinite'
    cocheEnemigo4.style.animation = 'enemy4 5s linear infinite'
    
    document.addEventListener("keydown", escucharTeclas)

  
})
//Funcion asincrona para ir aumentando la puntuación de la partida
async function contarScore(){
    if(terminoJuego == false){
      controlBordes = setTimeout(()=>{
        score.innerText = `Score: ${n}`
        n=n+1;
        
        /*Función que controla el choque del cochemain con los coches enemigos. También controla que el cochemain no salga de la carretera. 
          También contiene la llamada a la función removeTimeouts, la cual parará todos los setIntervals y el SetTimeout que tenemos cuando choquemos
          con algún elemento.
          Cuando llega el momento del choque con cualquier vehículo se paran los setIntervals y los setTimeout que tenemos en el programa para que la 
          carretera y los coches vuelvan a quedar estáticos
        */
        crashcontrol();
        
        //Rellamamos a la función asincrona para que el Score se actualice cada 100 milisegundos añadiendole 1 al marcador
        contarScore();
      },100)
    }
  
}


function crashcontrol(){
  var enemy1_left = Math.abs(document.getElementById("imgcoche1").getBoundingClientRect().left);
    var enemy1_right = Math.abs(document.getElementById("imgcoche1").getBoundingClientRect().right);
    var enemy1_top = Math.abs(document.getElementById("imgcoche1").getBoundingClientRect().top);
    var enemy1_bottom = Math.abs(document.getElementById("imgcoche1").getBoundingClientRect().bottom);

    var enemy2_left = Math.abs(document.getElementById("imgcoche2").getBoundingClientRect().left);
    var enemy2_right = Math.abs(document.getElementById("imgcoche2").getBoundingClientRect().right);
    var enemy2_top = Math.abs(document.getElementById("imgcoche2").getBoundingClientRect().top);
    var enemy2_bottom = Math.abs(document.getElementById("imgcoche2").getBoundingClientRect().bottom);

    var enemy3_left = Math.abs(document.getElementById("imgcoche3").getBoundingClientRect().left);
    var enemy3_right = Math.abs(document.getElementById("imgcoche3").getBoundingClientRect().right);
    var enemy3_top = Math.abs(document.getElementById("imgcoche3").getBoundingClientRect().top);
    var enemy3_bottom = Math.abs(document.getElementById("imgcoche3").getBoundingClientRect().bottom);

    var enemy4_left = Math.abs(document.getElementById("imgcoche4").getBoundingClientRect().left);
    var enemy4_right = Math.abs(document.getElementById("imgcoche4").getBoundingClientRect().right);
    var enemy4_top = Math.abs(document.getElementById("imgcoche4").getBoundingClientRect().top);
    var enemy4_bottom = Math.abs(document.getElementById("imgcoche4").getBoundingClientRect().bottom);

    var cochemain_left = Math.abs(document.getElementById("imgmaincar").getBoundingClientRect().left);
    var cochemain_right = Math.abs(document.getElementById("imgmaincar").getBoundingClientRect().right);
    var cochemain_top = Math.abs(document.getElementById("imgmaincar").getBoundingClientRect().top);
    var cochemain_bottom = Math.abs(document.getElementById("imgmaincar").getBoundingClientRect().bottom);

    if(((enemy1_left < cochemain_left && cochemain_left < enemy1_right) || (enemy1_left < cochemain_right && cochemain_right < enemy1_right)) && ((enemy1_top < cochemain_top && cochemain_top< enemy1_bottom) || (enemy1_top < cochemain_bottom && cochemain_bottom < enemy1_bottom)) ){
      stopIntervals()
      stopKeyframes()
      mostrarMensajeFinal()
      rellenarLocalStorage()
    }

    if(((enemy2_left < cochemain_left && cochemain_left < enemy2_right) || (enemy2_left < cochemain_right && cochemain_right < enemy2_right)) && ((enemy2_top < cochemain_top && cochemain_top< enemy2_bottom) || (enemy2_top < cochemain_bottom && cochemain_bottom < enemy2_bottom)) ){
      stopIntervals()
      stopKeyframes()
      mostrarMensajeFinal()
      rellenarLocalStorage()

      
    }

    if(((enemy3_left < cochemain_left && cochemain_left < enemy3_right) || (enemy3_left < cochemain_right && cochemain_right < enemy3_right)) && ((enemy3_top < cochemain_top && cochemain_top< enemy3_bottom) || (enemy3_top < cochemain_bottom && cochemain_bottom < enemy3_bottom)) ){
      stopIntervals()
      stopKeyframes()
      mostrarMensajeFinal()
      rellenarLocalStorage()
      
    }

    if(((enemy4_left < cochemain_left && cochemain_left < enemy4_right) || (enemy4_left < cochemain_right && cochemain_right < enemy4_right)) && ((enemy4_top < cochemain_top && cochemain_top< enemy4_bottom) || (enemy4_top < cochemain_bottom && cochemain_bottom < enemy4_bottom)) ){
      stopIntervals()
      stopKeyframes()
      mostrarMensajeFinal()
      rellenarLocalStorage()
    }

    if(cochemain_left <770  || cochemain_right >1190 || cochemain_top< 15 || cochemain_bottom> 975){
      stopIntervals()
      stopKeyframes()
      mostrarMensajeFinal()
      rellenarLocalStorage()
      
    }
}
//Muestra un toast el cual da la opción de volver al menu principal o volver a jugar
function mostrarMensajeFinal(){
  var divToast = document.getElementById("divToast")
  var botonJugar = document.getElementById("volverajugar")
  var botonmenu = document.getElementById("menuprincipal")

  scoreFinal.innerHTML= n-1
  divToast.classList.add("show")

  botonJugar.addEventListener("click", reiniciarJugada)
  botonmenu.addEventListener("click", volverMenu)

}
//Reinicia la pantalla del juego
function reiniciarJugada(){
    location.reload()
}

//Vuelve a cargar el contenido del menu principal
function volverMenu(){
    location.href="Gonzalo_Avila_Bravo_initial.html"
}

//Funcion para parar los intervalos
function stopIntervals() {
  clearInterval(intervalCBlanco)
  clearInterval(intervalCNaranja)
  clearInterval(intervalCVerde)
  clearInterval(intervalCNegro)
  clearTimeout(controlBordes)
  terminoJuego = true
}

/*Deshabilita la animación css que hemos implementado para que los coches enemigos se desplacen. También quita el listener keydown sobre el documento para
que el coche main deje de desplazarse  */
function stopKeyframes(){
  carretera.style.animation = 'none'
  cocheEnemigo1.style.animation = 'none'
  cocheEnemigo2.style.animation = 'none'
  cocheEnemigo3.style.animation = 'none'
  cocheEnemigo4.style.animation = 'none'
  document.removeEventListener("keydown", escucharTeclas)
}

//Funcion que cambia el style.top y el style.left del cochemain para que se desplace por la carretera cuando pulsamos las teclas
function escucharTeclas(event){
  
  if(event.key === "W" || event.key === "w"){
    t = t-4
  }

  if(event.key === "S" || event.key === "s"){
    t = t+4
  }

  if(event.key === "A" || event.key === "a"){
    l = l-2
  }

  if(event.key === "D" || event.key === "d"){
    l = l+2
  }
  cocheMain.style.top= `${t}vh`
  cocheMain.style.left= `${l}vw`
  
}
/* Función que rellena el localStorage con las 3 mejores puntuaciones que se han obtenido en el juego. */
function rellenarLocalStorage(){
  let puntuacion = n-1
  arrayPuntuaciones = localStorage.getItem("Puntuaciones")
  arrayPuntuaciones = JSON.parse(arrayPuntuaciones)

  if(arrayPuntuaciones == null){
    arrayPuntuaciones = []
  }

  arrayPuntuaciones.push(puntuacion)
  arrayPuntuaciones.sort((a, b) => b - a);
  arrayPuntuaciones = arrayPuntuaciones.slice(0,3)

  localStorage.setItem("Puntuaciones", JSON.stringify(arrayPuntuaciones))

  console.log(localStorage.getItem("Puntuaciones"))

}




