"use strict"
let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
let imagen;
let imageScaledWidth;
let imageScaledHeight;
let clicked;

function borrarTodo(){ //borra el canvas y devuelve a sus dimensiones originales
  canvas.width = 800;
  canvas.height = 600;
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  conservarCambio();
}

function startPosition(){ //indica si esta clickeado para la funcion draw
  clicked = true;
}

function finishPosition(){ //indica que se solto el click para que la funcion draw no dibuje
  clicked = false;
  ctx.beginPath();
}

function draw(e){ //dibuja en el cambas
  if (clicked) {
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }
}

function punteroNormal(){ //cambia el puntero al puntero normal
  canvas.removeEventListener("mousedown",startPosition,false);
  canvas.removeEventListener("mouseup",finishPosition,false);
  canvas.removeEventListener("mousemove",draw,false);
}

function pincel(){ //cambia el puntero al pincel
  ctx.strokeStyle="#000000";
  canvas.addEventListener("mousedown",startPosition);
  canvas.addEventListener("mouseup",finishPosition);
  canvas.addEventListener("mousemove",draw);
}

function borrador(){ //cambia el puntero a borrador
  ctx.strokeStyle="#FFFFFF";
  canvas.addEventListener("mousedown",startPosition);
  canvas.addEventListener("mouseup",finishPosition);
  canvas.addEventListener("mousemove",draw);
}

function cargarImagen(){ //carga una imagen al canvas
  let input = document.querySelector('#imagenacargar');
  input.click();
  input.onchange = imagenacargar => {
    borrarTodo();
    let imagencargada = imagenacargar.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(imagencargada);
    reader.onload = readerEvent => {
      let content = readerEvent.target.result;
      imagen = new Image();
      //image.crossOrigin = 'Anonymous';
      imagen.src = content;
      imagen.onload = function () {
        let imageAspectRatio = (1.0 * this.height) / this.width;
        imageScaledWidth = canvas.width;
        imageScaledHeight = canvas.width * imageAspectRatio;
        canvas.width = imageScaledWidth;
        canvas.height = imageScaledHeight;
        ctx.drawImage(this, 0, 0, imageScaledWidth, imageScaledHeight);
      }
    }
  }
}

function descargarImagen() { // descarga la imagen actual
  let a = document.createElement('a');
  a.href = canvas.toDataURL();;
  a.download = 'untitled.jpeg';
  document.body.appendChild(a);
  a.click();
}

function original(){ //vuelve a mostrar la ultima capa guardada
  ctx.drawImage(imagen, 0, 0, imageScaledWidth, imageScaledHeight);
}

function escalaGrises() { //pasa la imagen a escala de grises sumando los valores rgb y dividiendolos por 3
  ctx.drawImage(imagen, 0, 0, imageScaledWidth, imageScaledHeight);
  let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.height; y++) {
      let gris = (getR(imageData,x,y)+getG(imageData,x,y)+getB(imageData,x,y))/3;
      setR(imageData,x,y,gris);
      setG(imageData,x,y,gris);
      setB(imageData,x,y,gris);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function negativo() { //pasa la imagen a negativo restando el valor de cada pixel al valor 255
  ctx.drawImage(imagen, 0, 0, imageScaledWidth, imageScaledHeight);
  let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.height; y++) {
      setR(imageData,x,y,255-getR(imageData,x,y));
      setG(imageData,x,y,255-getG(imageData,x,y));
      setB(imageData,x,y,255-getB(imageData,x,y));
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function sepia() { //aplica filtro sepia multiplicando los pixeles por valores que transforman cada color
  ctx.drawImage(imagen, 0, 0, imageScaledWidth, imageScaledHeight);
  let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.height; y++) {
      setR(imageData,x,y,(getR(imageData,x,y)*.393+getG(imageData,x,y)*.769+getB(imageData,x,y)*.189));
      setG(imageData,x,y,(getR(imageData,x,y)*.349+getG(imageData,x,y)*.686+getB(imageData,x,y)*.168));
      setB(imageData,x,y,(getR(imageData,x,y)*.272+getG(imageData,x,y)*.534+getB(imageData,x,y)*.131));
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function brillo() { //cambia el brillo de la imagen multiplicando cada pixel por el brillo
  let brillo = document.querySelector('#brillo').value;
  ctx.drawImage(imagen, 0, 0, imageScaledWidth, imageScaledHeight);
  let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (var x = 0; x < imageData.width; x++) {
    for (var y = 0; y < imageData.height; y++) {
      setR(imageData,x,y,(getR(imageData,x,y)*brillo));
      setG(imageData,x,y,(getG(imageData,x,y)*brillo));
      setB(imageData,x,y,(getB(imageData,x,y)*brillo));
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function blur() { //BLUR 3x3
  ctx.drawImage(imagen, 0, 0, imageScaledWidth, imageScaledHeight);
  let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  for (let x = 0; x < imageData.width; x++) {
    for (let y = 0; y < imageData.height; y++) {
      let kernelx = [x-1,x,x+1,
                      x-1,x,x+1,
                      x-1,x,x+1]; //se definen los arreglos con las operaciones a realizar en cada pixel
      let kernely = [y-1,y-1,y-1,
                      y,  y,  y,
                      y+1,y+1,y+1];
      let sumar=0;
      let sumag=0;
      let sumab=0;
      let dividendo=0;
      for (var i = 0; i < kernelx.length; i++) {
        if (!(kernelx[i]<0 || kernely[i]<0 || kernelx[i]>imageData.width-1 || kernely[i]>imageData.height-1)) { //se suman los valores de cada pixel luego de aplicar las operaciones definidas en los kernel
          sumar=sumar+getR(imageData,kernelx[i],kernely[i]);
          sumag=sumag+getG(imageData,kernelx[i],kernely[i]);
          sumab=sumab+getB(imageData,kernelx[i],kernely[i]);
          dividendo++;
        }
      }
      //se guarda cada pixel con el valor resultante del promedio de la suma de los valores
      setR(imageData,x,y,sumar/dividendo);
      setG(imageData,x,y,sumag/dividendo);
      setB(imageData,x,y,sumab/dividendo);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function saturacion() { //filtro de saturacion
  ctx.drawImage(imagen, 0, 0, imageScaledWidth, imageScaledHeight);
  let imageData = ctx.getImageData(0, 0, imageScaledWidth, imageScaledHeight);
  let saturacion = document.querySelector("#saturacion").value;
  let pixel;
  for (let x = 0; x < imageData.width; x++) {
      for (let y = 0; y < imageData.height; y++) {
        pixel = rgbToHsl(getR(imageData,x,y),getG(imageData,x,y),getB(imageData,x,y));
        pixel[1] = pixel[1]*saturacion;  //multiplica el valor de saturacion hsl por el valor de saturacion que se quiere dar
        pixel = hslToRgb(pixel[0],pixel[1],pixel[2]);
        setR(imageData,x,y,pixel[0]);
        setG(imageData,x,y,pixel[1]);
        setB(imageData,x,y,pixel[2]);
      }
    }
    ctx.putImageData(imageData, 0, 0);
}

function conservarCambio() { //guarda la capa actual para trabajar a partir de ella
  imagen = new Image();
  imagen.src = canvas.toDataURL();
}

function getR (imageData,x,y){ //devuelve valor rojo del pixel
  let index = (x+y*imageData.width)*4;
  return imageData.data[index];
}

function getG (imageData,x,y){ //devuelve valor verde del pixel
  let index = (x+y*imageData.width)*4;
  return imageData.data[index+1];
}

function getB (imageData,x,y){ //devuelve valor azul del pixel
  let index = (x+y*imageData.width)*4;
  return imageData.data[index+2];
}

function setR (imageData,x,y,value){ //cambia valor rojo del pixel
  let index = (x+y*imageData.width)*4;
  imageData.data[index]=value;
}

function setG (imageData,x,y,value){ //cambia valor verde del pixel
  let index = (x+y*imageData.width)*4;
  imageData.data[index+1]=value;
}

function setB (imageData,x,y,value){ //cambia valor azul del pixel
  let index = (x+y*imageData.width)*4;
  imageData.data[index+2]=value;
}

function rgbToHsl(r, g, b){ //pasa los pixeles de valor rgb a hsl
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

function hslToRgb(h, s, l){ //pasa los pixeles de valor hsl a rgb
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

window.onload= eventos();
function eventos() { //agrega eventos a la barra de herramientas
  document.querySelector('#pincel').addEventListener("click",pincel);
  document.querySelector('#borrador').addEventListener("click",borrador);
  document.querySelector('#puntero').addEventListener("click",punteroNormal);
  document.querySelector('#cargarimagen').addEventListener("click",cargarImagen);
  document.querySelector('#original').addEventListener("click",original);
  document.querySelector('#escalagrises').addEventListener("click",escalaGrises);
  document.querySelector('#negativo').addEventListener("click",negativo);
  document.querySelector('#sepia').addEventListener("click",sepia);
  document.querySelector('#brillo').addEventListener("change",brillo);
  document.querySelector('#descargarimagen').addEventListener("click",descargarImagen);
  document.querySelector('#borrartodo').addEventListener("click",borrarTodo);
  document.querySelector('#conservarcambio').addEventListener("click",conservarCambio);
  document.querySelector('#blur').addEventListener("click",blur);
  document.querySelector("#saturacion").addEventListener("change",saturacion);
  borrarTodo();
}
