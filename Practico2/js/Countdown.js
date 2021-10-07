class Countdown {
  constructor(time,jugador) {
    this.time = Math.floor(time*60);
    this.element = document.querySelector('#cd'+jugador);
  }

  correr(){
    let t=this;
    this.interval = setInterval(function () {
      if (t.time==0){
        t.parar();
      }
      t.dibujar();
      t.time--;
    },1000)
  }

  dibujar(){
    let min = Math.floor( this.time / 60 );
    let sec = this.time % 60;
    if (sec < 10) sec = "0" + sec;
    let text = min + ':' + sec;
    this.element.innerHTML = text;
  }

  parar(){
    clearInterval(this.interval);
  }

}
