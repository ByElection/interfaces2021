
let tablero;
let jugadores;
let turno;
let ultimaficha;
let skinj1={imagen:"cobweb",
            color:"cyan"};
let skinj2={imagen:"chip",
            color:"magenta"};
window.onload = juegonuevo;


function juegonuevo(){ //EMPIEZA UN JUEGO NUEVO
  let dificultad = document.querySelector("#dificultad").value;
  tablero = new Tablero(dificultad);
  let time = 1.5*dificultad+1;
  jugadores = new Array(new Jugador(1,21*(dificultad+1),time,skinj1.imagen,skinj1.color),new Jugador(2,21*(dificultad+1),time,skinj2.imagen,skinj2.color));
  turno = 2;
  cambiaturno();
  actualizar();
  addEvents();
}

function getColor(jugador) { //dice el color del jugador
  return jugadores[jugador].getColor();
}

function actualizar() { //BORRA EL CANVAS Y LO VUELVE A DIBUJAR
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
  tablero.dibujar();
  for (let i = 0; i < jugadores.length; i++) {
    jugadores[i].dibujar();
  }
}

function ganar(jugador){ //HACE GANAR A JUGADOR
  let canvas = document.querySelector('#canvas');
  let ctx = canvas.getContext('2d');
  ctx.fillStyle = "#7C7C7C";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "100px Arial";
  ctx.fillStyle = jugadores[jugador-1].getColor();
  ctx.fillText("Gano el Jugador "+jugador, 0, canvas.height/2-100);
}

function perder(jugador) { //HACE PERDER A JUGADOR
  if (jugador==1) {
    ganar(2)
  }else {
    ganar(1);
  }
}

function cambiaturno() { //CAMBIA EL TURNO Y LOS TIMER DE LOS JUGADORES
  jugadores[turno-1].pararCountdown();
  if (turno==1) {
    turno=2;
  }else {
    turno=1;
  }
  jugadores[turno-1].correrCountdown();
}

function agarrarFicha(e) { //AGARRA UNA FICHA
  ultimaficha=jugadores[turno-1].buscarFicha(e.layerX,e.layerY);
}

function moverFicha(e) { //MUEVE LA FICHA
  if (ultimaficha != null){
    ultimaficha.mover(e.layerX,e.layerY);
    actualizar();
  }
}

function soltarFicha() { //SUELTA LA FICHA
  if (ultimaficha!=null) { //si existe una ultima ficha tocada
    let jugador = ultimaficha.getjugador(); //guarda el duenio
    if (!tablero.setficha(ultimaficha)){ //si no se coloco en el tablero
      ultimaficha.moverorigen();//devuelva la ficha al origen
    }
    if (tablero.hayganador(jugador)){ //si el jugador gano
      jugadores[turno-1].pararCountdown(); //para el timer
      removeEvents(); //apaga los eventos del mouse
      ganar(jugador); //hace ganar al ganador
    }else{
      actualizar(); //si no hay ganador actualiza el tablero
    }
    ultimaficha=null;//ovida la ultima ficha
  }
}

function addEvents() { //AGREGA EVENTOS PARA LAS FICHAS
  canvas.addEventListener("mousedown",agarrarFicha);
  canvas.addEventListener("mousemove",moverFicha);
  canvas.addEventListener("mouseup",soltarFicha);
}

function removeEvents() { //BORRA EVENTOS PARA LAS FICHAS
  canvas.removeEventListener("mousedown",agarrarFicha);
  canvas.removeEventListener("mousemove",moverFicha);
  canvas.removeEventListener("mouseup",soltarFicha);
}

document.querySelector("#juegonuevo").addEventListener("click",juegonuevo);
