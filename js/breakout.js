rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')

score = 0

brickRowCount = 9
brickColumnCount = 5

ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    size: 10,
    soeed: 4,
    dx: 4,
    dy: -4,
}

paddle = {
    x: canvas.width / 2 - 40,
    y. canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true
}

bricks = []
for (let i = 0; i< brickRowCount; i++) {
    bricks[i] = []
    for (let j = 0; j < brickColumnCount; j++) {
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY
        bricks[i][j] = {x, y, ...brickInfo}
    }
}

finction drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#009599'
    ctx.fill()
    ctx.closePath()
}


function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true)
    ctx.fillStyle = '#009599'
    ctx.fill()
    ctx.closePath()
}

function drawScore(){
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width-100, 30)
}

function drawBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath()
            ctx.rect(brick.x, brick.y, brick.w, brick.h)
            ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
            ctx.fill()
            ctx.closePath()
        })
    })
}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBricks()
}

function movePaddle() {
    paddle.x = paddle.y + paddle.dx

    if (paddle.x < 0) {
        paddle.x = 0
    }
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }
}

function keyDown(e){
    if (e.key == 'ArraowRight' || e.key == 'Right'){
        paddle.dx = paddle.speed
    }
    if (e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = -paddle.speed
    }
}

function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = 0
    }
}

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function update() {
    movePaddle()
    draw()
    requestAnimationFrame(update)
}

update()

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);


rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

closeBtn.addEventListener('click', () =. {
    rules.classList.remove('show')
})