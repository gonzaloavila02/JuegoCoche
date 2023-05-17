//Elementos del html
var botonStart = document.getElementById("Start")
var carretera = document.getElementById("imagencarretera")

var score = document.getElementById("score")

var cocheEnemigo1 = document.getElementById("cocheEnemigo")
var cocheEnemigo2 = document.getElementById("cocheEnemigo2")
var cocheEnemigo3 = document.getElementById("cocheEnemigo3")
var cocheEnemigo4 = document.getElementById("cocheEnemigo4")
var cocheMain = document.getElementById("maincar")

var n=0
var controlBordes
var intervalCNaranja
var intervalCVerde
var intervalCNegro
var intervalCBlanco


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


    let t= 65;
    let l = 0;

document.addEventListener("keydown" ,function(press){
  if(press.key === "W" || press.key === "w"){
    t = t-4
  }

  if(press.key === "S" || press.key === "s"){
    t = t+4
  }

  if(press.key === "A" || press.key === "a"){
    l = l-2
  }

  if(press.key === "D" || press.key === "d"){
    l = l+2
  }
  cocheMain.style.top= `${t}vh`
  cocheMain.style.left= `${l}vw`
  
})

  
})
//Funcion asincrona para ir aumentando la puntuación de la partida
async function contarScore(){
    controlBordes = setTimeout(()=>{
    score.innerText = `Score: ${n}`
    n=n+1;
    
    /*Función que controla el choque del cochemain con los coches enemigos. También controla que el cochemain no salga de la carretera. 
      También contiene la llamada a la función removeTimeouts, la cual parará todos los setIntervals y el SetTimeout que tenemos cuando choquemos
      con algún elemento
    */
    crashcontrol();
    
    //Rellamamos a la función asincrona para que el Score se actualice cada 100 milisegundos añadiendole 1 al marcador
    contarScore();


  },100)
}

function removeTimeouts() {
  clearInterval(intervalCBlanco)
  clearInterval(intervalCNaranja)
  clearInterval(intervalCVerde)
  clearInterval(intervalCNegro)
  clearTimeout(controlBordes)
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
      removeTimeouts()
      location.reload()
    }

    if(((enemy2_left < cochemain_left && cochemain_left < enemy2_right) || (enemy2_left < cochemain_right && cochemain_right < enemy2_right)) && ((enemy2_top < cochemain_top && cochemain_top< enemy2_bottom) || (enemy2_top < cochemain_bottom && cochemain_bottom < enemy2_bottom)) ){
      removeTimeouts()
      location.reload()
    }

    if(((enemy3_left < cochemain_left && cochemain_left < enemy3_right) || (enemy3_left < cochemain_right && cochemain_right < enemy3_right)) && ((enemy3_top < cochemain_top && cochemain_top< enemy3_bottom) || (enemy3_top < cochemain_bottom && cochemain_bottom < enemy3_bottom)) ){
      location.reload()
      removeTimeouts()
    }

    if(((enemy4_left < cochemain_left && cochemain_left < enemy4_right) || (enemy4_left < cochemain_right && cochemain_right < enemy4_right)) && ((enemy4_top < cochemain_top && cochemain_top< enemy4_bottom) || (enemy4_top < cochemain_bottom && cochemain_bottom < enemy4_bottom)) ){
      removeTimeouts()
      location.reload()
    }

    if(cochemain_left <770  || cochemain_right >1190 || cochemain_top< 15 || cochemain_bottom> 975){
      removeTimeouts()
      location.reload()
    }
}


