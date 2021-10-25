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

function controles(event) {
  let key= event.key;
  if (key == "w" || key == "W") {
    pista.moverMoto(0,"up");
  }else if (key == "a" || key == "A") {
    pista.cambiaInclinacion(0,"left");
  }else if (key == "s" || key == "S") {
    pista.moverMoto(0,"down");
  }else if (key == "d" || key == "D") {
    pista.cambiaInclinacion(0,"right");
  }
}

function changeAnimation(element,keyframe,time,params) {
  element.style.animation= keyframe+" "+time+"s "+params;
}
function changePlayState(element,state){
  element.style.animation.playState(state);
}
window.onload= function() {
  tracksToCanvas();
  juegoNuevo();
  document.addEventListener("keydown",controles);
}
