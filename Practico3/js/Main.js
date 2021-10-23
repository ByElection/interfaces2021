let pista;
let bikes = new Array(4);

function juegoNuevo() {
  pista=new Track();
  /*for (var i = 0; i < bikes.length; i++) {
    bikes[i] = new Bike();
  }*/
  darlargada();
}

function tracksToCanvas() {
  let imagen = document.querySelector("img#ExcitebikeTracks");
  let tracks = document.querySelector("canvas#ExcitebikeTracks");
  let tracksctx = tracks.getContext('2d');
  tracks.width=imagen.width-10;
  tracks.height=imagen.height-16;
  tracksctx.drawImage(imagen, -10, -16, imagen.width, imagen.height);
}
function darlargada(){
  let largada = document.querySelector("#largada");
  changeAnimation(largada,"darlargada",3,"steps(1) forwards"); //forwards para que frene cuando termina
  let track = document.querySelector("#track");
  changeAnimation(track,"trackmove",20,"linear 3s");
  let tribuna = document.querySelector("#tribuna");
  changeAnimation(tribuna,"adornosmove",1500,"linear infinite 3s");
  let personas = document.querySelector("#personas");
  changeAnimation(personas,"adornosmove",1500,"linear infinite 3s");
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
}
