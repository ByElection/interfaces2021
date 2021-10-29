class Bike{
  constructor(id) {
    this.posx=16*(id+1);
    this.posy=70-12*id;
    this.id=id;
    this.bike = document.querySelectorAll(".bike")[id];
    this.inclinacion = 0;
    setProperty('--inclinacion'+this.id,this.inclinacion);
    setProperty('--bike'+this.id+'posy',this.posy);
    setProperty('--bike'+this.id+'posx',this.posx);
  }
  cambiaInclinacion(direccion){
    if (direccion=="left") {
      this.inclinacion++;
    }else if (direccion=="right") {
      this.inclinacion--;
    }
    setProperty('--inclinacion'+this.id,this.inclinacion);
    if (this.inclinacion == 0) {
      this.prendeMotor(0);
    }else if (this.inclinacion>0 && this.inclinacion<6) {
      changeAnimation(this.bike,"inclinar",6,"steps(6) calc(var(--inclinacion"+this.id+")*-1s) 1 both paused");
    }else if (this.inclinacion<0 && this.inclinacion>-4) {
      changeAnimation(this.bike,"inclinarinv",4,"steps(4) calc(var(--inclinacion"+this.id+")*1s) 1 both paused");
    }else if (this.inclinacion>=6 || this.inclinacion<=-4) {
      this.caerse();
    }
  }
  cambiarCarril(direccion){
    setProperty('--bike'+this.id+'posy',this.posy);
    if (direccion == "up") {
      changeAnimation(this.bike,"doblaarriba",0.2, "linear 1 forwards");
      this.moveY(12);
    }else {
      changeAnimation(this.bike,"doblaabajo",0.2, "linear 1 forwards");
      this.moveY(-12)
    }
    let bike=this.bike;
    setTimeout(function() {
      changeAnimation(bike,"motor",0.5,"steps(1) infinite");
    },200)
  }
  moveX(value){
    this.posx -= value;
    setProperty('--bike'+this.id+'posx',this.posx);
  }
  moveY(value){
    this.posy -= value;
    setProperty('--bike'+this.id+'posy',this.posy);
  }
  prendeMotor(delay){
    changeAnimation(this.bike,"motor",0.5,"steps(1) infinite "+delay+"s");
  }
  caerse(){
    let track = document.querySelector("#track")
    changePlayState(track,"paused");
    changeAnimation(this.bike,"caida",1,"steps(4) infinite");
    let bike = this.bike;
    let biker = document.querySelectorAll(".biker")[this.id];
    setTimeout(function() {
      changeAnimation(bike,"mototirada",1,"steps(1) paused");
      changeAnimation(biker,"bikercaido",3,"steps(10) 1");
      setTimeout(function() {
        changeAnimation(bike,"levantada",2,"steps(4)");
        changeAnimation(biker,"",0,"");
        setTimeout(function() {
          changeAnimation(bike,"motor",0.5,"steps(1) infinite");
          changePlayState(track,"running");
        },2000);
      },3000);
    },1000);
  }
  setPiso(h){
    setProperty("--pisobike"+this.id,h);
  }
  getPosX(){
    return this.posx;
  }
}
