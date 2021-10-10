class Tolva extends Figura{
  constructor(x) {//crea la tolva con su posicion e imagen
    super(x,50);
    this.imagen = document.querySelector("#imagentolva");
  }
  dibujar(){ //dibuja la tolva
    this.ctx.rect(this.x,this.y,this.width,this.height);
    this.ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height);
  }
  esta(x,y){ //indica si la pocision que se mando es donde esta la tolva
    return (x<=this.x+this.width && x>this.x && y<=this.y+this.height && y>this.y)
  }
}
