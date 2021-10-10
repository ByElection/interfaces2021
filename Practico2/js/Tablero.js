class Tablero {
  constructor(dificultad) { //crea el tablero con la dificultad seleccionada y su pocision
    this.dificultad=dificultad;
    this.col=7+this.dificultad*2;
    this.fil=6+this.dificultad*2;
    this.matriz=[];
    this.tolvas=[];
    let posicion = (canvas.width-50*this.col)/2;
    for (let x = 0; x < this.col; x++) {
      this.matriz[x]=[];
      this.tolvas[x]=new Tolva(posicion+50*x);
      for (let y = 0; y < this.fil; y++) {
        this.matriz[x][y]=new Celda(posicion+50*x,100+50*y);
      }
    }
  }

  dibujar(){ //dibuja las celdas del tablero con las tolvas para cada columna
    for (let x = 0; x < this.matriz.length; x++) {
      this.tolvas[x].dibujar();
      for (let y = 0; y < this.matriz[x].length; y++) {
        this.matriz[x][y].dibujar();
      }
    }
  }

  setficha(ficha){ //ocupa la ultima celda disponible de la columna de la tolva en la que se coloco la ficha
    let posicion=ficha.getposicion();
    for (let x = 0; x < this.tolvas.length; x++) {//busca en cual tolva esta
      if (this.tolvas[x].esta(posicion.x,posicion.y)) {
        for (let y = this.matriz[x].length-1; y >= 0 ; y--) {//busca el primer lugar disponible
          if (ficha!=null && !this.matriz[x][y].hayficha()){
            let centro = this.matriz[x][y].getcentro();
            ficha.mover(centro.x,centro.y); //mueve la ficha al centro de la celda correspondiente
            ficha.setusada(); //setea que la ficha fue usada
            this.matriz[x][y].setficha(ficha); //setea la ficha en la matriz de celdas
            cambiaturno();//cambia el turno
            return true; //devuelve que la ficha fue colocada
          }
        }
      }
    }
    return false;//devuelve que la ficha no fue colocada
  }

  hayganador(jugador){ //se fija si el jugador es un ganador
    if (this.dificultad==0) { // 4 en linea
      for (let x = 0; x < this.matriz.length; x++) {
        for (let y = this.matriz[x].length-1; y >= 0 ; y--) {
          if (this.matriz[x][y].getficha()!=null && this.matriz[x][y].getficha().getjugador()==jugador){ //se fija que haya una ficha en la celda
            if (x<this.matriz.length-3 && this.matriz[x+1][y].getficha()!=null && this.matriz[x+2][y].getficha()!=null && this.matriz[x+3][y].getficha()!=null
            && this.matriz[x+1][y].getficha().getjugador()==jugador && this.matriz[x+2][y].getficha().getjugador()==jugador && this.matriz[x+3][y].getficha().getjugador()==jugador) {
              return true;//devuelve true si hay fichas validas alineadas en las celdas a la derecha y pertenecen al jugador
            }else if (y>2 && this.matriz[x][y-1].getficha()!=null && this.matriz[x][y-2].getficha()!=null && this.matriz[x][y-3].getficha()!=null
             && this.matriz[x][y-1].getficha().getjugador()==jugador && this.matriz[x][y-2].getficha().getjugador()==jugador && this.matriz[x][y-3].getficha().getjugador()==jugador) {
              return true;//devuelve true si hay fichas validas alineadas en las celdas para arriba y pertenecen al jugador
            }else if (x>2 && y>2 && this.matriz[x-1][y-1].getficha()!=null && this.matriz[x-2][y-2].getficha()!=null && this.matriz[x-3][y-3].getficha()!=null
             && this.matriz[x-1][y-1].getficha().getjugador()==jugador && this.matriz[x-2][y-2].getficha().getjugador()==jugador && this.matriz[x-3][y-3].getficha().getjugador()==jugador) {
              return true;//devuelve true si hay fichas validas alineadas en las celdas para arriba-izquierda y pertenecen al jugador
            }else if (x<this.matriz.length-3 && y>2 && this.matriz[x+1][y-1].getficha()!=null && this.matriz[x+2][y-2].getficha()!=null && this.matriz[x+3][y-3].getficha()!=null
             && this.matriz[x+1][y-1].getficha().getjugador()==jugador && this.matriz[x+2][y-2].getficha().getjugador()==jugador && this.matriz[x+3][y-3].getficha().getjugador()==jugador) {
              return true;//devuelve true si hay fichas validas alineadas en las celdas para arriba-derecha y pertenecen al jugador
            }
          }
        }
      }
      return false; //devuelve false si no hay ganador
    }else if (this.dificultad==1) { // 5 en linea
      for (let x = 0; x < this.matriz.length; x++) {
        for (let y = this.matriz[x].length-1; y >= 0 ; y--) {
          if (this.matriz[x][y].getficha()!=null && this.matriz[x][y].getficha().getjugador()==jugador){ //se fija que haya una ficha en la celda
            if (x<this.matriz.length-4 && this.matriz[x+1][y].getficha()!=null && this.matriz[x+2][y].getficha()!=null && this.matriz[x+3][y].getficha()!=null  && this.matriz[x+4][y].getficha()!=null
             && this.matriz[x+1][y].getficha().getjugador()==jugador && this.matriz[x+2][y].getficha().getjugador()==jugador && this.matriz[x+3][y].getficha().getjugador()==jugador  && this.matriz[x+4][y].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas a la derecha y pertenecen al jugador
            }else if (y>2 && this.matriz[x][y-1].getficha()!=null && this.matriz[x][y-2].getficha()!=null && this.matriz[x][y-3].getficha()!=null  && this.matriz[x][y-4].getficha()!=null
             && this.matriz[x][y-1].getficha().getjugador()==jugador && this.matriz[x][y-2].getficha().getjugador()==jugador && this.matriz[x][y-3].getficha().getjugador()==jugador && this.matriz[x][y-4].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas para arriba y pertenecen al jugador
            }else if (x>2 && y>2 && this.matriz[x-1][y-1].getficha()!=null && this.matriz[x-2][y-2].getficha()!=null && this.matriz[x-3][y-3].getficha()!=null && this.matriz[x-4][y-4].getficha()!=null
             && this.matriz[x-1][y-1].getficha().getjugador()==jugador && this.matriz[x-2][y-2].getficha().getjugador()==jugador && this.matriz[x-3][y-3].getficha().getjugador()==jugador && this.matriz[x-4][y-4].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas para arriba-izquierda y pertenecen al jugador
            }else if (x<this.matriz.length-4 && y>2 && this.matriz[x+1][y-1].getficha()!=null && this.matriz[x+2][y-2].getficha()!=null && this.matriz[x+3][y-3].getficha()!=null && this.matriz[x+4][y-4].getficha()!=null
             && this.matriz[x+1][y-1].getficha().getjugador()==jugador && this.matriz[x+2][y-2].getficha().getjugador()==jugador && this.matriz[x+3][y-3].getficha().getjugador()==jugador && this.matriz[x+4][y-4].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas para arriba-derecha y pertenecen al jugador
            }
          }
        }
      }
      return false; //devuelve false si no hay ganador
    }else if (this.dificultad==2) { // 6 en linea
      for (let x = 0; x < this.matriz.length; x++) {
        for (let y = this.matriz[x].length-1; y >= 0 ; y--) {
          if (this.matriz[x][y].getficha()!=null && this.matriz[x][y].getficha().getjugador()==jugador){ //se fija que haya una ficha en la celda
            if (x<this.matriz.length-5 && this.matriz[x+1][y].getficha()!=null && this.matriz[x+2][y].getficha()!=null && this.matriz[x+3][y].getficha()!=null && this.matriz[x+4][y].getficha()!=null && this.matriz[x+5][y].getficha()!=null
             && this.matriz[x+1][y].getficha().getjugador()==jugador && this.matriz[x+2][y].getficha().getjugador()==jugador && this.matriz[x+3][y].getficha().getjugador()==jugador && this.matriz[x+4][y].getficha().getjugador()==jugador && this.matriz[x+5][y].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas a la derecha y pertenecen al jugador
            }else if (y>2 && this.matriz[x][y-1].getficha()!=null && this.matriz[x][y-2].getficha()!=null && this.matriz[x][y-3].getficha()!=null && this.matriz[x][y-4].getficha()!=null && this.matriz[x][y-5].getficha()!=null
             && this.matriz[x][y-1].getficha().getjugador()==jugador && this.matriz[x][y-2].getficha().getjugador()==jugador && this.matriz[x][y-3].getficha().getjugador()==jugador && this.matriz[x][y-4].getficha().getjugador()==jugador && this.matriz[x][y-5].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas para arriba y pertenecen al jugador
            }else if (x>2 && y>2 && this.matriz[x-1][y-1].getficha()!=null && this.matriz[x-2][y-2].getficha()!=null && this.matriz[x-3][y-3].getficha()!=null && this.matriz[x-4][y-4].getficha()!=null && this.matriz[x-5][y-5].getficha()!=null
             && this.matriz[x-1][y-1].getficha().getjugador()==jugador && this.matriz[x-2][y-2].getficha().getjugador()==jugador && this.matriz[x-3][y-3].getficha().getjugador()==jugador && this.matriz[x-4][y-4].getficha().getjugador()==jugador && this.matriz[x-5][y-5].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas para arriba-izquierda y pertenecen al jugador
            }else if (x<this.matriz.length-5 && y>2 && this.matriz[x+1][y-1].getficha()!=null && this.matriz[x+2][y-2].getficha()!=null && this.matriz[x+3][y-3].getficha()!=null && this.matriz[x+4][y-4].getficha()!=null && this.matriz[x+5][y-5].getficha()!=null
             && this.matriz[x+1][y-1].getficha().getjugador()==jugador && this.matriz[x+2][y-2].getficha().getjugador()==jugador && this.matriz[x+3][y-3].getficha().getjugador()==jugador && this.matriz[x+4][y-4].getficha().getjugador()==jugador && this.matriz[x+5][y-5].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas para arriba-derecha y pertenecen al jugador
            }
          }
        }
      }
      return false; //devuelve false si no hay ganador
    }else if (this.dificultad==3) { // 7 en linea
      for (let x = 0; x < this.matriz.length; x++) {
        for (let y = this.matriz[x].length-1; y >= 0 ; y--) {
          if (this.matriz[x][y].getficha()!=null && this.matriz[x][y].getficha().getjugador()==jugador){ //se fija que haya una ficha en la celda
            if (x<this.matriz.length-6 && this.matriz[x+1][y].getficha()!=null && this.matriz[x+2][y].getficha()!=null && this.matriz[x+3][y].getficha()!=null && this.matriz[x+4][y].getficha()!=null && this.matriz[x+5][y].getficha()!=null && this.matriz[x+6][y].getficha()!=null
             && this.matriz[x+1][y].getficha().getjugador()==jugador && this.matriz[x+2][y].getficha().getjugador()==jugador && this.matriz[x+3][y].getficha().getjugador()==jugador && this.matriz[x+4][y].getficha().getjugador()==jugador && this.matriz[x+5][y].getficha().getjugador()==jugador && this.matriz[x+6][y].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas a la derecha y pertenecen al jugador
            }else if (y>2 && this.matriz[x][y-1].getficha()!=null && this.matriz[x][y-2].getficha()!=null && this.matriz[x][y-3].getficha()!=null && this.matriz[x][y-4].getficha()!=null && this.matriz[x][y-5].getficha()!=null && this.matriz[x][y-6].getficha()!=null
             && this.matriz[x][y-1].getficha().getjugador()==jugador && this.matriz[x][y-2].getficha().getjugador()==jugador && this.matriz[x][y-3].getficha().getjugador()==jugador && this.matriz[x][y-4].getficha().getjugador()==jugador && this.matriz[x][y-5].getficha().getjugador()==jugador && this.matriz[x][y-6].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas para arriba y pertenecen al jugador
            }else if (x>2 && y>2 && this.matriz[x-1][y-1].getficha()!=null && this.matriz[x-2][y-2].getficha()!=null && this.matriz[x-3][y-3].getficha()!=null && this.matriz[x-4][y-4].getficha()!=null && this.matriz[x-5][y-5].getficha()!=null && this.matriz[x-6][y-6].getficha()!=null
             && this.matriz[x-1][y-1].getficha().getjugador()==jugador && this.matriz[x-2][y-2].getficha().getjugador()==jugador && this.matriz[x-3][y-3].getficha().getjugador()==jugador && this.matriz[x-4][y-4].getficha().getjugador()==jugador && this.matriz[x-5][y-5].getficha().getjugador()==jugador && this.matriz[x-6][y-6].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas para arriba-izquierda y pertenecen al jugador
            }else if (x<this.matriz.length-6 && y>2 && this.matriz[x+1][y-1].getficha()!=null && this.matriz[x+2][y-2].getficha()!=null && this.matriz[x+3][y-3].getficha()!=null && this.matriz[x+4][y-4].getficha()!=null && this.matriz[x+5][y-5].getficha()!=null && this.matriz[x+6][y-6].getficha()!=null
             && this.matriz[x+1][y-1].getficha().getjugador()==jugador && this.matriz[x+2][y-2].getficha().getjugador()==jugador && this.matriz[x+3][y-3].getficha().getjugador()==jugador && this.matriz[x+4][y-4].getficha().getjugador()==jugador && this.matriz[x+5][y-5].getficha().getjugador()==jugador && this.matriz[x+6][y-6].getficha().getjugador()==jugador) {
              return true; //devuelve true si hay fichas validas alineadas en las celdas para arriba-derecha y pertenecen al jugador
            }
          }
        }
      }
      return false; //devuelve false si no hay ganador
    }
  }
}
