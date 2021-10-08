class Jugador {
  constructor(jugador,cantfichas,time,imagen,color) {
    this.jugador=jugador;
    this.color=color;
    this.fichas=[];
    this.countdown = new Countdown(time,jugador,color);
    for (let i = 0; i < cantfichas; i++) {
        if (i%2==1) {
          this.fichas[i] = new Ficha(50,75+50*i/2,this.jugador,imagen,this.color);
        }else{
          this.fichas[i] = new Ficha(100,75+50*i/2,this.jugador,imagen,this.color);
        }
    }
  }
  dibujar(){
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].dibujar();
    }
    this.countdown.dibujar();
  }
  correrCountdown(){
    this.countdown.correr();
  }
  buscarFicha(x,y){
    for (let i = 0; i < this.fichas.length; i++) {
      if (this.fichas[i].esta(x,y)){
        return this.fichas[i];
      }
    }
  }
  getColor(){
    return this.color;
  }

  setColor(color){
    this.color=color;
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].setColor(color);
    }
  }
  setImagen(imagen){
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].setImagen(imagen);
    }
  }
}
