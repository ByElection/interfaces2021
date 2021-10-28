let pista;


function juegoNuevo() {
  pista=new Track()
  pista.darLargada();
}

function tracksToCanvas() {
  let imagen = document.querySelector("img#ExcitebikeTracks");
  let tracks = document.querySelector("canvas#ExcitebikeTracks");
  let tracksctx = tracks.getContext('2d');
  tracks.width=imagen.width-10;
  tracks.height=imagen.height-16;
  tracksctx.drawImage(imagen, -10, -16, imagen.width, imagen.height);
}

function controles(event) { //setea los controles
  let key= event.key;
  if (key == "w" || key == "W") { //jugador 1
    pista.cambiarCarril(0,"up");
  }else if (key == "a" || key == "A") {
    pista.cambiaInclinacion(0,"left");
  }else if (key == "s" || key == "S") {
    pista.cambiarCarril(0,"down");
  }else if (key == "d" || key == "D") {
    pista.cambiaInclinacion(0,"right");
  }else if (key == "i" || key == "I") { //jugador 2
    pista.cambiarCarril(1,"up");
  }else if (key == "j" || key == "J") {
    pista.cambiaInclinacion(1,"left");
  }else if (key == "k" || key == "K") {
    pista.cambiarCarril(1,"down");
  }else if (key == "l" || key == "L") {
    pista.cambiaInclinacion(1,"right");
  }else if (key == "ArrowUp") { //jugador 3
    pista.cambiarCarril(2,"up");
  }else if (key == "ArrowLeft") {
    pista.cambiaInclinacion(2,"left");
  }else if (key == "ArrowDown") {
    pista.cambiarCarril(2,"down");
  }else if (key == "ArrowRight") {
    pista.cambiaInclinacion(2,"right");
  }else if (key == "8") { //jugador 4
    pista.cambiarCarril(3,"up");
  }else if (key == "4") {
    pista.cambiaInclinacion(3,"left");
  }else if (key == "5") {
    pista.cambiarCarril(3,"down");
  }else if (key == "6") {
    pista.cambiaInclinacion(3,"right");
  }
}

function changeAnimation(element,keyframe,time,params) {
  element.style.animation= keyframe+" "+time+"s "+params;
}
function changePlayState(element,state){
  element.style.animationPlayState = state;
}
function setProperty(property,value) {
  document.body.style.setProperty(property,value);
}
window.onload= function() {
  tracksToCanvas();
  juegoNuevo();
  document.addEventListener("keydown",controles);
}
