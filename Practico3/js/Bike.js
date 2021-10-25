class Bike extends ObjetoSolido{
  constructor(id) {
    super(70-12*id,16*(id+1),20,21);
    this.id=id;
    this.bike = document.querySelectorAll(".bike")[id];
    this.inclinacion = 0;
    document.body.style.setProperty('--inclinacion'+this.id,this.inclinacion);
  }
  cambiaInclinacion(direccion){
    if (direccion=="left") {
      this.inclinacion++;
    }else if (direccion=="right") {
      this.inclinacion--;
    }
    document.body.style.setProperty('--inclinacion'+this.id,this.inclinacion);
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
  prendeMotor(delay){
    changeAnimation(this.bike,"motor",0.5,"steps(1) infinite "+delay+"s");
  }
  caerse(){
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
        },2000);
      },3000);
    },1000);
  }
}
