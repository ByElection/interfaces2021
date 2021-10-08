class Countdown {
  constructor(time,jugador) {
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');
    this.time = Math.floor(time*60);
    this.jugador=jugador;
  }

  correr(){
    let t=this;
    this.interval = setInterval(function () {
      if (t.time==0){
        t.parar();
        perder(t.jugador);
        return;
      }
      actualizar();
      t.time--;
      this.ctx.fillstyle; //sin esto pone cronometro de otro color
      t.dibujar();
    },1000)
  }

  dibujar(){
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

  parar(){
    clearInterval(this.interval);
  }

}
