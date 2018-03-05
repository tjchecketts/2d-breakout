var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
// start location of ball
var x = canvas.width/2
var y = canvas.height-30

// speed and direction of ball
var dx = 2
var dy = -2

// same as:
// function drawBall() {...}
var drawBall = () => {
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, Math.PI*2)
  ctx.fillStyle = "#0095dd"
  ctx.fill()
  ctx.closePath()
}

var draw = () => {
  // clears ball each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  x += dx
  y += dy
}

// run every 10 miliseconds
// lower = faster frame refresh
setInterval(draw, 10)