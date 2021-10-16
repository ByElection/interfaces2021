class TrackPart extends ObjetoSolido {
  constructor(id) {
    if (id!=0 && id!=20 && id!=21 && id!=22 && id!=23){
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
    }else if (id==21 || id==22 || id==23) {
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
    super(posx,0,w);
    this.imagen
    this.id=id;
    this.canvas = document.querySelector('canvas#TrackGenerator');
    this.ctx = this.canvas.getContext('2d');
    this.roads=new Array(4);
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
    }else if (this.id==21){
      trackpos=0;
    }else if (this.id==22){
      trackpos=64;
    }else{
      trackpos=128;
    }
    let imageData = this.ctx.getImageData(0,0,pos+1,this.canvas.height);
    let imageDataTracks = tracksctx.getImageData(trackpos,0,this.w,tracks.height);
    this.canvas.width+=this.w;
    this.ctx.putImageData(imageData,0,0);
    this.ctx.putImageData(imageDataTracks,pos,0);
    this.ctx.beginPath();
  }
}
