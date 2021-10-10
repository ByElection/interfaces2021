class Jugador {
  constructor(jugador,cantfichas,time,imagen,color) { //crea el jugador con su color fichas y timer
    this.jugador=jugador;
    this.color=color;
    this.fichas=[];
    this.countdown = new Countdown(time,jugador,color);
    for (let i = 0; i < cantfichas; i++) { //crea las fichas del jugador
        if (i%2==1) {
          this.fichas[i] = new Ficha(50,75+50*i/2,this.jugador,imagen,this.color);
        }else{
          this.fichas[i] = new Ficha(100,75+50*i/2,this.jugador,imagen,this.color);
        }
    }
  }
  dibujar(){ //dibuja las fichas y el timer
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].dibujar();
    }
    this.countdown.dibujar();
  }

  correrCountdown(){ //hace correr el timer
    this.countdown.correr();
  }

  pararCountdown(){ //frena el timer
    this.countdown.parar();
  }

  buscarFicha(x,y){ //busca una ficha en la pocision del puntero
    for (let i = 0; i < this.fichas.length; i++) {
      if (this.fichas[i].esta(x,y)){
        return this.fichas[i];
      }
    }
  }
  getColor(){ //devuelve el color del jugador
    return this.color;
  }

  setColor(color){ //setea el color del jugador y el de las fichas
    this.color=color;
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].setColor(color);
    }
  }

  setImagen(imagen){ //setea la imagen en las fichas
    for (let i = 0; i < this.fichas.length; i++) {
      this.fichas[i].setImagen(imagen);
    }
  }
}
