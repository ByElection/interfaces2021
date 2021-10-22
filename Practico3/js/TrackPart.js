class TrackPart extends ObjetoSolido {
  constructor(id) {
    if (id!=0 && id!=20 && id!=21){
      id=Math.floor(Math.random()*50);
      if (id>19 && id<50) {
        id=0;
      }
    }
    let w = 16;
    let posx;
    if (id==0 || id==1 || id==11 || id==12) {
      w=w*2;
    }else if (id==2 || id==5 || id==6 || id==7) {
      w=w*3;
    }else if (id==21) {
      w=w*4;
    }else if (id==3 || id==4) {
      w=w*5;
    }else if (id==17 || id==20) {
      w=w*6;
    }else if (id==15 || id==16 || id==18) {
      w=w*13;
    }else if (id==19) {
      w=w*14;
    }
    let h;
    if (id==0 || id==11 || id==12 || id==13 || id==14 || id==15 || id==16 || id==17 || id==21) {
      h=0;
    }else if (id==1) {
      h=10;
    }else if (id==2) {
      h=18;
    }else if (id==3 || id==5) {
      h=34;
    }else if (id==4) {
      h=16;
    }else if (id==6 || id==7) {
      h=26;
    }else if (id==8) {
      h=15;
    }else if (id==9 || id==10) {
      h=7;
    }else if (id==20) {
      h=25;
    }
    super(posx,h,w);
    this.imagen;
    this.id=id;
    this.canvas = document.querySelector('canvas#TrackGenerator');
    this.ctx = this.canvas.getContext('2d');
    if (this.id==19) {
      this.roads=new Array(6);
    }else {
      this.roads=new Array(4);
    }
    for (var i = 0; i < this.roads.length; i++) {
      this.roads[i]=new Array(this.w);
    }
    if (this.id==0 || this.id==11 || this.id==12 || this.id==13 || this.id==14 || this.id==15 || this.id==16 || this.id==17 || this.id==21) {
      this.anguloentrada=0;
      this.angulosalida=0;
    }else if (this.id==1 || this.id==2 || this.id==3 || this.id==4 || this.id==5) {
      this.anguloentrada=this.teoremaSeno(this.w/2);
      this.angulosalida=this.teoremaSeno(this.w/2);
    }
    this.dibujar();
  }
  dibujar(){
    let tracks = document.querySelector("canvas#ExcitebikeTracks");
    let tracksctx = tracks.getContext('2d');
    let pos = this.canvas.width;
    let trackpos;
    if (this.id==0){
      trackpos=192;
    }else if (this.id==1){
      trackpos=224;
    }else if (this.id==2){
      trackpos=256;
    }else  if (this.id==3){
      trackpos=304;
    }else  if (this.id==4){
      trackpos=384;
    }else  if (this.id==5){
      trackpos=464;
    }else  if (this.id==6){
      trackpos=512;
    }else  if (this.id==7){
      trackpos=560;
    }else  if (this.id==8){
      trackpos=608;
    }else  if (this.id==9){
      trackpos=624;
    }else  if (this.id==10){
      trackpos=640;
    }else  if (this.id==11){
      trackpos=656;
    }else  if (this.id==12){
      trackpos=688;
    }else  if (this.id==13){
      trackpos=720;
    }else  if (this.id==14){
      trackpos=736;
    }else  if (this.id==15){
      trackpos=752;
    }else  if (this.id==16){
      trackpos=960;
    }else  if (this.id==17){
      trackpos=1168;
    }else  if (this.id==18){
      trackpos=1264;
    }else  if (this.id==19){
      trackpos=1472;
    }else  if (this.id==20){
      trackpos=1696;
    }else {
      trackpos=128;
    }
    let imageData = this.ctx.getImageData(0,0,pos+1,this.canvas.height);
    let imageDataTracks = tracksctx.getImageData(trackpos,0,this.w,tracks.height);
    this.canvas.width+=this.w;
    this.ctx.putImageData(imageData,0,0);
    this.ctx.putImageData(imageDataTracks,pos,0);
    this.ctx.beginPath();
  }
  teoremaSeno(w){
    return (this.h*Math.sin(1.5708))/Math.hypot(this.h,w);
  }
}
