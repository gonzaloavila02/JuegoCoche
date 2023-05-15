var canvasElement = document.getElementById("myCanvas");
var canvas = canvasElement.getContext("2d");

var img = new Image();
img.src = "img/road.jpg";
img.onload = function() {
  canvas.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
}
