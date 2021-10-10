class Countdown {
  constructor(time,jugador) {
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');
    this.time = Math.floor(time*60); //GUARDA EL TIEMPO EN SEGUNDOS
    this.jugador=jugador;
  }

  correr(){ //HACE CORRER EL TIMER
    let t=this; //DEFINE THIS PARA QUE LO RECONOZCA LA FUNCION DENTRO DEL INTERVAL
    this.interval = setInterval(function () {
      t.dibujar();
      if (t.time==0){
        t.parar();
        perder(t.jugador);
      }else {
        actualizar();
        t.time--;
      }
    },1000)
  }

  dibujar(){ //DIBUJA EL CRONOMETRO
    let min = Math.floor( this.time / 60 );
    let sec = this.time % 60;
    if (sec < 10) sec = "0" + sec;
    let text = min + ':' + sec;
    this.ctx.font = "30px monospace";
    if (this.jugador==1){
      this.ctx.fillText(text, 180, 30);
    }else {
      this.ctx.fillText(text, canvas.width-250, 30);
    }
  }

  parar(){ //PARA EL CRONOMETRO
    clearInterval(this.interval);
  }

}
