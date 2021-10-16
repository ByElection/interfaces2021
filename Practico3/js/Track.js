class Track {
  constructor() {
    this.pista= new Array(75);
    this.pista[0] = new TrackPart(21);
    this.pista[1] = new TrackPart(22);
    this.pista[2] = new TrackPart(23);
    for (let i = 3; i < 7; i++) {
      this.pista[i] = new TrackPart(0);
    }
    for (let i = 7; i < this.pista.length-5; i++) {
      this.pista[i] = new TrackPart();
    }
    for (let i = this.pista.length-5; i < this.pista.length; i++) {
      this.pista[i] = new TrackPart(0);
    }
    this.pista[this.pista.length] = new TrackPart(20);
  }
}
