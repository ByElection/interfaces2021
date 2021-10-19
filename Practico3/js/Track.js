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
    document.querySelector("#track").style.backgroundImage= "url("+canvas.toDataURL()+")";
  }
}
