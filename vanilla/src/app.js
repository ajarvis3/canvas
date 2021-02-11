const canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var mousedown = false;
canvas.onmousedown = (event) => {
  mousedown = true;
  ctx.beginPath();
  ctx.moveTo(event.offsetX, event.offsetY);
  ctx.stroke();
}

canvas.onmousemove = (event) => {
  if (mousedown) {
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
  }
}

document.body.onmouseup = (event) => {
  ctx.moveTo(event.offsetX, event.offsetY);
  ctx.closePath();
  mousedown = false;
}
