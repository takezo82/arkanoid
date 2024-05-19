const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerHeight * 0.75;
canvas.height = window.innerHeight;

const paddleHeight = 50;  // Ajusta el tamaño según la imagen
const paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const brickRowCount = 5;
const brickColumnCount = 5;
const brickWidth = (canvas.width / brickColumnCount) - 10;
const brickHeight = 30;
const brickPadding = 10;
const brickOffsetTop = 50;
const brickOffsetLeft = 5;

const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6"];

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        bricks[c][r] = { x: 0, y: 0, status: 1, color: color };
    }
}

let score = 0;
let rightPressed = false;
let leftPressed = false;
let gameInterval;

const paddleImage = new Image();
paddleImage.src = '/mnt/data/daniark.png';

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("touchstart", touchStartHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

let touchStartX = 0;
let touchCurrentX = 0;

function touchStartHandler(e) {
    touchStartX = e.touches[0].clientX;
}

function touchMoveHandler(e) {
    touchCurrentX = e.touches[0].clientX;
    let touchDifference = touchCurrentX - touchStartX;
    touchStartX = touchCurrentX;
    
    // Mover la barra proporcionalmente al movimiento del dedo
    paddleX += touchDifference;
    if (paddleX < 0) {
        paddleX = 0;
    } else if (paddleX + paddleWidth > canvas.width) {
        paddleX = canvas.width - paddleWidth;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("You win, congratulations!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.drawImage(paddleImage, paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            endGame();
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    canvas.style.display = "block";
    gameInterval = setInterval(draw, 10);
}

function endGame() {
    clearInterval(gameInterval);
    saveScore(score);
    displayScores();
    document.getElementById("finalScore").innerText = "Score: " + score;
    canvas.style.display = "none";
    document.getElementById("gameOverScreen").style.display = "flex";
}

function restartGame() {
    document.location.reload();
}

function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem("arkanoidScores")) || [];
    scores.push(score);
    localStorage.setItem("arkanoidScores", JSON.stringify(scores));
}

function displayScores() {
    let scores = JSON.parse(localStorage.getItem("arkanoidScores")) || [];
    const scoresList = document.createElement("ul");
    scores.forEach((score) => {
        const listItem = document.createElement("li");
        listItem.textContent = score;
        scoresList.appendChild(listItem);
    });
    const gameOverScreen = document.getElementById("gameOverScreen");
    gameOverScreen.appendChild(scoresList);
}

draw();
