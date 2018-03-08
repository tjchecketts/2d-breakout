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

// brick variables
var brickRowCount = 3
var brickColumnCount = 5
var brickWidth = 75
var brickHeight = 20
var brickPadding = 10
var brickOffsetTop = 30
var brickOffsetLeft = 30

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

// brick array
var bricks = []
for(col = 0; col < brickColumnCount; col++) {
  bricks[col] = []
  for(row = 0; row < brickRowCount; row++) {
    bricks[col][row] = { x: 0, y: 0, status: 1 }
  }
}

// draw bricks
var drawBricks = () => {
  for(col = 0; col < brickColumnCount; col++) {
    for(row = 0; row < brickRowCount; row++) {
      if(bricks[col][row].status == 1) {
        var brickX = (col * (brickWidth + brickPadding)) + brickOffsetLeft
        var brickY = (row * (brickHeight + brickPadding)) + brickOffsetTop
        bricks[col][row].x = brickX
        bricks[col][row].y = brickY
        ctx.beginPath()
        ctx.rect(brickX, brickY, brickWidth, brickHeight)
        ctx.fill()
        ctx.closePath()
      }
    }
  }
}

// collision detector
var collisionDetector = () => {
  for(col = 0; col < brickColumnCount; col++) {
    for(row = 0; row < brickRowCount; row++) {
      var b = bricks[col][row]
      if(b.status == 1) {
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy
          b.status = 0
          randColor()
        }
      }
    }
  }
}

// draw ball
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
  drawBricks()
  drawBall()
  drawPaddle()
  collisionDetector()
  x += dx
  y += dy
  // bounces off x & y walls
  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx
    randColor()
  }
  if(y + dy < ballRadius) {
    dy = -dy;
    randColor()
  } else if(y + dy > canvas.height-ballRadius) {
      if(x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
        randColor()
      }
      // end game
      else {
        document.location.reload()
      }
  }
  // paddle mover
  if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7
  }
  else if(leftPressed && paddleX > 0) {
      paddleX -= 7
  }
}

// draw paddle
var drawPaddle = () => {
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