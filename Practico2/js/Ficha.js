class Ficha extends Figura {
  constructor(jugador,imagen,color) {//crea la ficha en la pocision del lado del jugador y guarda el origen para volver a su lugar en caso de movimiento erroneo
    let x=Math.floor(Math.random() * (151 - 25)) + 25;
    let y=Math.floor(Math.random() * (501 - 75)) + 75;
    if (jugador==1) {
      super(x,y);
      this.xorigen=x;
    }else if (jugador==2) {
      super(canvas.width-x,y);
      this.xorigen=canvas.width-x;
    }
    this.yorigen=y;
    this.usada=false;
    this.radio=20;
    this.setImagen(imagen);
    this.setColor(color);
    this.jugador=jugador;
  }
  dibujar(){ //dibuja la ficha con color e imagen en el lugar que tiene que estar
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(this.x, this.y, this.radio, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.drawImage(this.imagen, this.x-this.radio, this.y-this.radio, this.width-this.radio/2, this.height-this.radio/2);
  }
  moverorigen(){ //vuelve la ficha al origen
    this.x=this.xorigen;
    this.y=this.yorigen;
  }
  mover(x,y){//mueve una ficha si no esta colocada en el tablero
    if (!this.usada) {
      this.x=x;
      this.y=y;
    }
  }
  esta(x,y){ //indica si la ficha esta en la pocision x,y
    return (x<this.x+this.radio && x>this.x-this.radio && y<this.y+this.radio && y>this.y-this.radio)
  }
  getposicion(){ //devuelve la posicion de la ficha
    return {x:this.x,
            y:this.y};
  }
  setusada(){ //setea que la ficha ya fue depositada en una tolva correcta
    this.usada=true;
  }
  getjugador(){ //devuelve el jugador al que le pertenece la ficha
    return this.jugador;
  }
  setImagen(imagen){ //cambia la imagen de la ficha
    this.imagen = document.querySelector("#imagen"+imagen);
    this.dibujar();
  }
  setColor(color){ //cambia el color de la ficha
    this.color = color;
    this.dibujar();
  }
}
