class Figura {
  constructor(x,y) { //crea la clase abstracta figura con el tamaño y la posicion donde se tiene que dibujar
    this.canvas = document.querySelector('#canvas');
    this.ctx = canvas.getContext('2d');
    this.width = 50;
    this.height = 50;
    this.x = x;
    this.y = y;
  }
}
