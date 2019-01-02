const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const playerScore = document.querySelector('.player');
const computerScore = document.querySelector('.computer');

let playScore = 0;
let compScore = 0;


canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;

const ballSize = 20;
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

const paddleHeight = 100;
const paddleWidth = 20;

const playerX = 70;
const aiX = 910;

let playerY = 200;
let aiY = 200;

const lineWidth = 4;
const lineHeight = 16;


let ballSpeedX = 2;
let ballSpeedY = 2;

function player() {
    ctx.fillStyle = 'blue';
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight)
}

function ai() {
    ctx.fillStyle = 'red';
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight)
}

function ball() {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(ballX, ballY, ballSize, ballSize)

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= ch) {

        ballSpeedY = -ballSpeedY;
        speedUp();
    }

    if (ballX <= 0) {
        ballSpeedX = -ballSpeedX;
        ballX = cw / 2 - ballSize / 2;
        ballY = ch / 2 - ballSize / 2;
        ballSpeedX = 2;
        ballSpeedY = 2;
        compScore++;
        computerScore.innerHTML = compScore;
    }
    if (ballX + ballSize >= cw) {
        ballSpeedX = -ballSpeedX;
        ballX = cw / 2 - ballSize / 2;
        ballY = ch / 2 - ballSize / 2;
        ballSpeedX = 2;
        ballSpeedY = 2;
        playScore++;
        playerScore.innerHTML = playScore;
    }
}


function table() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, cw, ch);

    for (let linePosition = 20; linePosition < ch; linePosition += 30) {
        ctx.fillStyle = "gray"
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight)
    }
}

topCanvas = canvas.offsetTop;


function playerPosition(e) {

    playerY = e.clientY - topCanvas - paddleHeight / 2;
    if (playerY >= ch - paddleHeight) {
        playerY = ch - paddleHeight;
    }

    if (playerY <= 0) {
        playerY = 0;
    }

}

function speedUp() {

    if (ballSpeedX > 0 && ballSpeedX < 16) {
        ballSpeedX += .2;

    } else if (ballSpeedX < 0 && ballSpeedX > -16) {
        ballSpeedX -= 0.2;
    }

    if (ballSpeedY > 0 && ballSpeedY < 16) {
        ballSpeedY += 0.2;
    } else if (ballSpeedY < 0 && ballSpeedY > -16) {
        ballSpeedY -= 0.2;
    }

}



function aiPosition() {
    const middlepaddle = aiY + paddleHeight / 2;
    const middleBall = ballY + ballSize / 2;

    if (ballX > 500) {
        if (middlepaddle - middleBall > 200) {


            aiY -= 24;
        } else if (middlepaddle - middleBall > 50) {
            aiY -= 10;
        } else if (middlepaddle - middleBall < -200) {
            aiY += 24;
        } else if (middlepaddle - middleBall < -50) {
            aiY += 10;
        }
    }

    if (ballX <= 500 && ballX > 100) {
        if (middlepaddle - middleBall > 100) {
            aiY -= 3;
        }
        if (middlepaddle - middleBall < -100) {
            aiY += 3;
        }
    }

    if (aiY >= ch - paddleHeight) {
        aiY = ch - paddleHeight
    }

    if (aiY <= 0) {
        aiY = 0;
    }
}

function bounce() {
    if (ballX + ballSize / 2 >= aiX && ballY <= aiY + paddleHeight / 2 && ballY >= aiY - paddleHeight / 2) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    };
    if (ballX < playerX && ballY <= playerY + paddleHeight / 2 && ballY >= playerY -
        paddleHeight / 2) {
        ballSpeedX = -ballSpeedX;
        speedUp();
    }
}



canvas.addEventListener('mousemove', playerPosition)

function game() {
    table()
    ball();
    player();
    ai();
    aiPosition();
    bounce();
}
setInterval(game, 1000 / 60)