class Track {
  constructor() {
    let canvas = document.querySelector("canvas#TrackGenerator");
    let ctx =canvas.getContext('2d');
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.width=0;
    this.pista= new Array(75);
    this.pista[0] = new TrackPart(0);
    this.pista[1] = new TrackPart(21);
    for (let i = 2; i < 7; i++) {
      this.pista[i] = new TrackPart(0);
    }
    for (let i = 7; i < this.pista.length-5; i++) {
      this.pista[i] = new TrackPart();
    }
    for (let i = this.pista.length-5; i < this.pista.length; i++) {
      this.pista[i] = new TrackPart(0);
    }
    this.pista[this.pista.length] = new TrackPart(20);
    for (let i = 1; i < 11; i++) {
      this.pista[i] = new TrackPart(0);
    }
    document.querySelector("#track").style.backgroundImage= "url("+canvas.toDataURL()+")";
    this.bikes = new Array(4);
    //for (var i = 0; i < bikes.length; i++) {
      this.bikes[0] = new Bike(0);
    //}
  }
  darLargada(){
    let largada = document.querySelector("#largada");
    changeAnimation(largada,"darlargada",3,"steps(1) forwards"); //forwards para que frene cuando termina
    this.bikes[0].prendeMotor(2);
    let track = document.querySelector("#track");
    changeAnimation(track,"trackmove",20,"linear 3s forwards");
    let tribuna = document.querySelector("#tribuna");
    changeAnimation(tribuna,"adornosmove",1500,"linear infinite 3s");
    let personas = document.querySelector("#personas");
    changeAnimation(personas,"adornosmove",1500,"linear infinite 3s");
  }
  cambiaInclinacion(idmoto,direccion){
    this.bikes[idmoto].cambiaInclinacion(direccion);
  }
  moverMoto(idmoto,direccion){

  }
}
