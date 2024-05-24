
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const square = document.getElementById("square");
    const triangle = document.getElementById("triangle");
    const gameContainer = document.getElementById("gameContainer");
    const scoreContainer = document.getElementById("scoreContainer");
    const squareScoreElement = document.getElementById("squareScore");
    const triangleScoreElement = document.getElementById("triangleScore");
    const totalScoreElement = document.getElementById("totalScore");
    const messageContainer = document.getElementById("messageContainer");
    const creditsContainer = document.getElementById("creditsContainer");
    const loveVideo = document.getElementById("loveVideo");
    const backgroundMusic = document.getElementById("backgroundMusic");
    let squareScore = 0;
    let triangleScore = 0;
    let totalScore = 0;
    let speed = 1000; // Velocidad inicial (en milisegundos)

    function moveElement(element) {
        const maxX = gameContainer.clientWidth - element.clientWidth;
        const maxY = gameContainer.clientHeight - element.clientHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    function increaseSquareScore() {
        squareScore++;
        totalScore++;
        squareScoreElement.textContent = squareScore;
        totalScoreElement.textContent = totalScore;
        increaseSpeed();
        checkScores();
    }

    function increaseTriangleScore() {
        triangleScore++;
        totalScore++;
        triangleScoreElement.textContent = triangleScore;
        totalScoreElement.textContent = totalScore;
        increaseSpeed();
        checkScores();
    }

    function handleElementClick(element, increaseScoreFunction) {
        increaseScoreFunction();
        moveElement(element);
    }

    function checkScores() {
        if (totalScore >= 69) {
            gameContainer.style.display = "none";
            scoreContainer.style.display = "none";
            messageContainer.style.display = "flex";
            loveVideo.play();
            backgroundMusic.play();
        }
    }

    function increaseSpeed() {
        if (speed > 200) { // Prevenir que la velocidad sea demasiado rápida
            speed -= 50; // Aumentar la velocidad disminuyendo el intervalo
            clearInterval(movementInterval);
            movementInterval = setInterval(moveAllElements, speed);
        }
    }

    function moveAllElements() {
        moveElement(square);
        moveElement(triangle);
    }

    // Eventos de clic
    square.addEventListener("click", function() {
        handleElementClick(square, increaseSquareScore);
    });

    triangle.addEventListener("click", function() {
        handleElementClick(triangle, increaseTriangleScore);
    });

    // Eventos táctiles
    square.addEventListener("touchstart", function() {
        handleElementClick(square, increaseSquareScore);
    });

    triangle.addEventListener("touchstart", function() {
        handleElementClick(triangle, increaseTriangleScore);
    });

    function startGame() {
        startButton.style.display = "none";
        gameContainer.style.display = "block";
        scoreContainer.style.display = "block";
        backgroundMusic.play();
        moveElement(square);
        moveElement(triangle);
        let movementInterval = setInterval(moveAllElements, speed);
    }

    startButton.addEventListener("click", function() {
        startGame();
    });

    loveVideo.addEventListener("ended", function() {
        messageContainer.style.display = "none";
        creditsContainer.style.display = "flex";
        backgroundMusic.pause();
    });
});
