class TrackPart{
  constructor(id) {
    if (id!=0 && id!=20 && id!=21){
      id=Math.floor(Math.random()*50);
      if (id>19 && id<50) {
        id=0;
      }
    }
    this.w = 16;
    if (id==0 || id==1 || id==11 || id==12) {
      this.w=this.w*2;
    }else if (id==2 || id==5 || id==6 || id==7) {
      this.w=this.w*3;
    }else if (id==21) {
      this.w=this.w*4;
    }else if (id==3 || id==4) {
      this.w=this.w*5;
    }else if (id==17 || id==20) {
      this.w=this.w*6;
    }else if (id==15 || id==16 || id==18) {
      this.w=this.w*13;
    }else if (id==19) {
      this.w=this.w*14;
    }
    this.h;
    if (id==0 || id==11 || id==12 || id==13 || id==14 || id==15 || id==16 || id==17 || id==21) {
      this.h=0;
    }else if (id==1) {
      this.h=10;
    }else if (id==2) {
      this.h=18;
    }else if (id==3 || id==5) {
      this.h=34;
    }else if (id==4) {
      this.h=16;
    }else if (id==6 || id==7) {
      this.h=26;
    }else if (id==8) {
      this.h=15;
    }else if (id==9 || id==10) {
      this.h=7;
    }else if (id==20) {
      this.h=25;
    }
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
      this.setPiso(i);
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
  setPiso(road){
    let puntero;
    if (this.id==0 || this.id==11 || this.id==12 || this.id==13 || this.id==14 || this.id==15 || this.id==16 || this.id==17 || this.id==21) {
      for (let i = 0; i < this.roads[road].length; i++) {
        this.roads[road][i] = 0;
      }
    }else if (this.id==1) {
      for (let i = 0; i < 12; i++) {
        this.roads[road][i] = i;
        puntero=i;
      }
      for (let i = 12; i < 16; i++) {
        this.roads[road][i]=puntero;
      }
      for (let i = 0; i < 12; i++) {
        this.roads[road][i+16] = puntero-i;
      }
      for (let i = 28; i < this.roads[road].length; i++) {
        this.roads[road][i] = 0;
      }
    }else if (this.id==2) {
      for (let i = 0; i < 18; i++) {
        this.roads[road][i] = i;
        puntero=i;
      }
      for (let i = 18; i < 22; i++) {
        this.roads[road][i]=puntero;
      }
      for (let i = 0; i < 18; i++) {
        this.roads[road][i+22] = puntero-i;
      }
      for (let i = 40; i < this.roads[road].length; i++) {
        this.roads[road][i] = 0;
      }
    }else if (this.id==3) {
      for (let i = 0; i < 34; i++) {
        this.roads[road][i] = i;
        puntero=i;
      }
      for (let i = 34; i < 38; i++) {
        this.roads[road][i]=puntero;
      }
      for (let i = 0; i < 34; i++) {
        this.roads[road][i+38] = puntero-i;
      }
      for (let i = 72; i < this.roads[road].length; i++) {
        this.roads[road][i] = 0;
      }
    }else if (this.id==4) {
      for (let i = 0; i < 34; i++) {
        if (i%2==0) {
          this.roads[road][i] = i/2;
        }else {
          this.roads[road][i] = Math.floor(i/2);
        }
        puntero=i/2;
      }
      for (let i = 34; i < 38; i++) {
        this.roads[road][i]=puntero;
      }
      for (let i = 0; i < 34; i++) {
        if (i%2==0) {
          this.roads[road][i+38] = puntero-i/2;
        }else {
          this.roads[road][i+38] = puntero-Math.floor(i/2);
        }
      }
      for (let i = 72; i < this.roads[road].length; i++) {
        this.roads[road][i] = 0;
      }
    }else if (this.id==5) {
      for (let i = 0; i < 34; i++) {
        this.roads[road][i] = i*2;
        puntero=i*2;
      }
      for (let i = 34; i < 38; i++) {
        this.roads[road][i]=puntero;
      }
      for (let i = 0; i < 34; i++) {
        this.roads[road][i+38] = puntero-i*2;
      }
      for (let i = 72; i < this.roads[road].length; i++) {
        this.roads[road][i] = 0;
      }
    }else if (this.id==6) {
      for (let i = 0; i < 26; i++) {
        this.roads[road][i] = i;
        puntero=i;
      }
      for (let i = 26; i < 30; i++) {
        this.roads[road][i]=puntero;
      }
      for (let i = 0; i < 26; i++) {
        this.roads[road][i+30] = puntero-i*2;
      }
      for (let i = 56; i < this.roads[road].length; i++) {
        this.roads[road][i] = 0;
      }
    }else if (this.id==7) {
      for (let i = 0; i < 34; i++) {
        this.roads[road][i] = i*2;
        puntero=i*2;
      }
      for (let i = 34; i < 38; i++) {
        this.roads[road][i]=puntero;
      }
      for (let i = 0; i < 34; i++) {
        this.roads[road][i+38] = puntero-i;
      }
      for (let i = 72; i < this.roads[road].length; i++) {
        this.roads[road][i] = 0;
      }
    }else if (this.id==8) {
      if (road==3||road==4) {
        for (let i = 0; i < this.roads[road].length; i++) {
          this.roads[road][i] = i;
        }
      }else {
        for (let i = 0; i < this.roads[road].length; i++) {
          this.roads[road][i] = 0;
        }
      }
    }else if (this.id==9) {
      if (road==2||road==3) {
        for (let i = 0; i < 2; i++) {
          this.roads[road][i] = i*4;
          puntero=i*4;
        }
        for (let i = 2; i < 5; i++) {
          this.roads[road][i] = puntero;
        }
        for (let i = 0; i < 2; i++) {
          this.roads[road][i+5] = puntero-i*4;
        }
        for (let i = 7; i < this.roads[road].length; i++) {
          this.roads[road][i] = 0;
        }
      }else {
        for (let i = 0; i < this.roads[road].length; i++) {
          this.roads[road][i] = 0;
        }
      }
    }else if (this.id==10) {
      if (road==0||road==1) {
        for (let i = 0; i < 2; i++) {
          this.roads[road][i] = i*4;
          puntero=i*4;
        }
        for (let i = 2; i < 5; i++) {
          this.roads[road][i] = puntero;
        }
        for (let i = 0; i < 2; i++) {
          this.roads[road][i+5] = puntero-i*4;
        }
        for (let i = 7; i < array.length; i++) {
          this.roads[road][i] = 0;
        }
      }else {
        for (let i = 0; i < this.roads[road].length; i++) {
          this.roads[road][i] = 0;
        }
      }
    }else if (this.id == 18) {
      for (let i = 0; i < 16; i++) {
        this.roads[road][i] = i;
        puntero=i;
      }
      for (let i = 16; i < 64; i++) {
        this.roads[road][i] = puntero;
      }
      for (let i = 0; i < 16; i++) {
        puntero+=i*2;
        this.roads[road][i+64] = puntero;
      }
      for (let i = 80; i < 144; i++) {
        this.roads[road][i]=puntero;
      }
      for (let i = 0; i < 32; i++) {
        this.roads[road][i+144]=puntero-i;
      }
      puntero-=31;
      for (let i = 176; i < 192; i++) {
        this.roads[road][i] = puntero;
      }
      for (let i = 0; i < 16; i++) {
        this.roads[road][i+192] =puntero-i;
      }
    }else if (this.id == 19) {
      for (let i = 0; i < 24; i++) {
        this.roads[road][i]=i*2;
        puntero=i*2;
      }
      for (let i = 24; i < 40; i++) {
        this.roads[road][i]=puntero;
      }
      if (road==0||road==1) {
        for (let i = 0; i < 24; i++) {
          this.roads[road][i+40]=puntero-i*2;
        }
        for (var i = 64; i < this.roads[road].length; i++) {
          this.roads[road][i] = 0;
        }
      }else if (road==2||road==3) {
        for (let i = 40; i < 208; i++) {
          this.roads[road][i]=puntero;
        }
        for (var i = 208; i < this.roads[road].length; i++) {
          this.roads[road][i] = 0;
        }
      }else if (road==4||road==5) {
        for (var i = 40; i < this.roads[road].length; i++) {
          this.roads[road][i] = 0;
        }
      }
    }
  }
  getPiso(w){

  }
  teoremaSeno(w){
    return (this.h*Math.sin(1.5708))/Math.hypot(this.h,this.w);
  }
}
