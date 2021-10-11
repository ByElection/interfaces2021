
let tablero;
let jugadores;
let turno;
let ultimaficha;
let skinj1={imagen:"ficha",
            color:"cyan"};
let skinj2={imagen:"trex",
            color:"magenta"};
window.onload = function() {
  addConfigEvents();
  juegonuevo();
}


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
  jugadores[0]=null;
  jugadores[1]=null;
}

function perder(jugador) { //HACE PERDER A JUGADOR
  if (jugador==1) {
    setTimeout(ganar,100,2);
  }else {
    setTimeout(ganar,100,1);
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
      setTimeout(ganar,100,jugador); //hace ganar al ganador
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

function addConfigEvents(){ //agrega eventos a los botones que cambian el color e imagen de las fichas
  let j1skinbuttoncolor = document.querySelectorAll(".j1 button.color") //captura todos los botones que cambian el color del jugador 1
  for (let i = 0; i < j1skinbuttoncolor.length; i++) { //recorre los botones
    j1skinbuttoncolor[i].addEventListener("click",function() { //agrega el evento click
      skinj1.color=j1skinbuttoncolor[i].value; //guarda el valor por el que se cambio
      if (jugadores[0]!=null){ //si existe jugador
        jugadores[0].setColor(skinj1.color);//actualiza el color del jugador
      }
    });
  }
  let j2skinbuttoncolor = document.querySelectorAll(".j2 button.color") //captura todos los botones que cambian el color del jugador 2
  for (let i = 0; i < j2skinbuttoncolor.length; i++) { //recorre los botones
    j2skinbuttoncolor[i].addEventListener("click",function() { //agrega el evento click
      skinj2.color=j2skinbuttoncolor[i].value; //guarda el valor por el que se cambio
      if (jugadores[1]!=null){ //si existe jugador
        jugadores[1].setColor(skinj2.color);//actualiza el color del jugador
      }
    });
  }
  let j1skinbuttonimagen = document.querySelectorAll(".j1 button.imagen") //captura todos los botones que cambian la imagen del jugador 1
  for (let i = 0; i < j1skinbuttonimagen.length; i++) { //recorre los botones
    j1skinbuttonimagen[i].addEventListener("click",function() { //agrega el evento click
      skinj1.imagen=j1skinbuttonimagen[i].value; //guarda el valor por el que se cambio
      if (jugadores[0]!=null){ //si existe jugador
        jugadores[0].setImagen(skinj1.imagen);//actualiza la imagen del jugador
      }
    });
  }
  let j2skinbuttonimagen = document.querySelectorAll(".j2 button.imagen") //captura todos los botones que cambian la imagen del jugador 2
  for (let i = 0; i < j2skinbuttonimagen.length; i++) { //recorre los botones
    j2skinbuttonimagen[i].addEventListener("click",function() { //agrega el evento click
      skinj2.imagen=j2skinbuttonimagen[i].value; //guarda el valor por el que se cambio
      if (jugadores[1]!=null){ //si existe jugador
        jugadores[1].setImagen(skinj2.imagen);//actualiza la imagen del jugador
      }
    });
  }
}
document.querySelector("#juegonuevo").addEventListener("click",juegonuevo);
