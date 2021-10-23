class Bike extends ObjetoSolido{
  constructor(posx,posy,w,h,id) {
    super(70-12*id,16*(id+1),20,21);
    this.bike = document.querySelectorAll(".bike")[id];

  }
  prendeMotor(){
    changeAnimation(this.bike,"motor",0.5,"steps(1) infinite");
  }

}
