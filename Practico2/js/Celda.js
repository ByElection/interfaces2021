class Celda extends Figura{
  constructor(x,y) { //crea la celda con su imagen y posicion
    super(x,y);
    this.imagen = document.querySelector("#imagencelda");
    this.ficha=null;
  }
  dibujar(){ //fibuja la celda en su posicion
    this.ctx.rect(this.x, this.y, this.width, this.height);
    this.ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height);
  }
  setficha(ficha){ //guarda la ficha en la celda
    this.ficha=ficha;
  }
  hayficha(){ //devuelve si hay una ficha en la celda
      return this.ficha!=null;
  }
  getcentro(){ //devuelve el centro de la celda
    return {x:this.x+this.width/2,
            y:this.y+this.height/2};
  }
  getficha(){  //devuelve la ficha
    return this.ficha;
  }
}
