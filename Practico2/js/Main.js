
let tablero;
let jugadores;
let turno;
let ultimaficha;
window.onload = juegonuevo;


function juegonuevo(){
  let dificultad = document.querySelector("#dificultad").value;
  tablero = new Tablero(dificultad);
  let time = 1.5*dificultad+1;
  jugadores = new Array(new Jugador(1,28,time,"cobweb","cyan"),new Jugador(2,28,time,"roulette","magenta"));
  turno = 2;
  cambiaturno();
  actualizar();
}

function getColor(jugador) {
  return jugadores[jugador].getColor();
}

function borrarTodo(){
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = "#7C7C7C";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = jugadores[0].getColor();
  ctx.font = "30px Arial";
  ctx.fillText("Jugador 1", 10, 30);
  ctx.fillStyle = jugadores[1].getColor();
  ctx.font = "30px Arial";
  ctx.fillText("Jugador 2", canvas.width-150, 30);
  ctx.font = "30px Arial";
  ctx.fillStyle = jugadores[turno-1].getColor();
  ctx.fillText("Turno de Jugador "+turno, canvas.width/2-130, 30);
}

function actualizar() {
  borrarTodo();
  tablero.dibujar();
  for (let i = 0; i < jugadores.length; i++) {
    jugadores[i].dibujar();
  }
}
document.querySelector("#juegonuevo").addEventListener("click",juegonuevo);

canvas.addEventListener("mousedown",function(e) {
  ultimaficha=jugadores[turno-1].buscarFicha(e.layerX,e.layerY);
});

canvas.addEventListener("mousemove",moverfichitas);
function moverfichitas(e) {
  if (ultimaficha != null){
    ultimaficha.mover(e.layerX,e.layerY);
    actualizar();
  }
}
canvas.addEventListener("mouseup",function() {
  if (ultimaficha!=null) {
    if (!tablero.setficha(ultimaficha)){
      ultimaficha.moverorigen();
    }
    if (tablero.hayganador(ultimaficha.getjugador())){
      let canvas = document.querySelector('#canvas');
      let ctx = canvas.getContext('2d');
      ctx.fillStyle = "#7C7C7C";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = "100px Arial";
      cambiaturno();
      ctx.fillStyle = jugadores[turno-1].getColor();
      ctx.fillText("Gano el Jugador "+turno, 0, canvas.height/2-100);
      jugadores[0].countdown.parar();
      jugadores[1].countdown.parar();
    }else{
      actualizar();
    }
    ultimaficha=null;
  }
})

function perder(jugador){
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = "#7C7C7C";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "100px Arial";
  if (turno==1) {
    turno=2;
  }else {
    turno=1;
  }
  ctx.fillStyle = jugadores[turno-1].getColor();
  ctx.fillText("Gano el Jugador "+turno, 0, canvas.height/2-100);
}

function cambiaturno() {
  jugadores[turno-1].countdown.parar();
  if (turno==1) {
    turno=2;
  }else {
    turno=1;
  }
  jugadores[turno-1].correrCountdown();
}
