var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
// set initial color & size
ctx.fillStyle = "firebrick"
var ballRadius = 10
// start location of ball
var x = canvas.width/2
var y = canvas.height-30
// speed and direction of ball
var dx = 2
var dy = -2
// paddle dimensions
var paddelHeight = 10
var paddleWidth = 75
var paddleX = (canvas.width - paddleWidth)/2
// define keys
var rightPressed = false
var leftPressed = false

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

// same as:
// function drawBall() {...}
var drawBall = () => {
  ctx.beginPath()
  ctx.arc(x, y, ballRadius, 0, Math.PI*2)
  ctx.fill()
  ctx.closePath()
}

// change to random color
var randColor = () => {
  ctx.fillStyle = "#"+((1<<24)*Math.random()|0).toString(16)
  ctx.fill()
}

var draw = () => {
  // clears ball each frame
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  drawBall()
  drawPaddle()
  x += dx
  y += dy
  // bounces off x & y walls
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
    randColor()
  }
  if(y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
    dy = -dy
    randColor()
  }
  // paddle mover
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7
  }
  else if(leftPressed && paddleX > 0) {
      paddleX -= 7
  }
}

function drawPaddle() {
  ctx.beginPath()
  ctx.rect(paddleX, canvas.height - paddelHeight, paddleWidth, paddelHeight)
  ctx.fill()
  ctx.closePath()
}

function keyDownHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = true
  }
  else if(e.keyCode == 37) {
      leftPressed = true
  }
}
function keyUpHandler(e) {
  if(e.keyCode == 39) {
      rightPressed = false
  }
  else if(e.keyCode == 37) {
      leftPressed = false
  }
}

// run every 10 miliseconds
// smaller = faster frame refresh
setInterval(draw, 10)