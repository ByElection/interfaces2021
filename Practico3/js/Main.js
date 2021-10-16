let pista;

function juegoNuevo() {
  pista=new Track();
}

function tracksToCanvas() {
  let imagen = document.querySelector("img#ExcitebikeTracks");
  let tracks = document.querySelector("canvas#ExcitebikeTracks");
  let tracksctx = tracks.getContext('2d');
  tracks.width=imagen.width-10;
  tracks.height=imagen.height-16;
  tracksctx.drawImage(imagen, -10, -16, imagen.width, imagen.height);
}

window.onload= function() {
  tracksToCanvas();
  juegoNuevo();
}
