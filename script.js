
document.addEventListener("DOMContentLoaded", function() {
    const square = document.getElementById("square");
    const triangle = document.getElementById("triangle");
    const gameContainer = document.getElementById("gameContainer");
    const squareScoreElement = document.getElementById("squareScore");
    const triangleScoreElement = document.getElementById("triangleScore");
    const messageContainer = document.getElementById("messageContainer");
    const loveVideo = document.getElementById("loveVideo");
    const backgroundMusic = document.getElementById("backgroundMusic");
    let squareScore = 0;
    let triangleScore = 0;
    let speed = 1000; // Initial speed (in milliseconds)

    function moveElement(element) {
        const maxX = gameContainer.clientWidth - element.clientWidth;
        const maxY = gameContainer.clientHeight - element.clientHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    function increaseSquareScore() {
        squareScore++;
        squareScoreElement.textContent = squareScore;
        increaseSpeed();
        checkScores();
    }

    function increaseTriangleScore() {
        triangleScore++;
        triangleScoreElement.textContent = triangleScore;
        increaseSpeed();
        checkScores();
    }

    function handleElementClick(element, increaseScoreFunction) {
        increaseScoreFunction();
        moveElement(element);
    }

    function checkScores() {
        if (squareScore >= 10 && triangleScore >= 10) {
            gameContainer.style.display = "none";
            document.getElementById("scoreContainer").style.display = "none";
            messageContainer.style.display = "flex";
            loveVideo.play();
            backgroundMusic.play();
        }
    }

    function increaseSpeed() {
        if (speed > 200) { // Prevent the speed from getting too fast
            speed -= 50; // Increase the speed by decreasing the interval
            clearInterval(movementInterval);
            movementInterval = setInterval(moveAllElements, speed);
        }
    }

    function moveAllElements() {
        moveElement(square);
        moveElement(triangle);
    }

    // Click events
    square.addEventListener("click", function() {
        handleElementClick(square, increaseSquareScore);
    });

    triangle.addEventListener("click", function() {
        handleElementClick(triangle, increaseTriangleScore);
    });

    // Touch events
    square.addEventListener("touchstart", function() {
        handleElementClick(square, increaseSquareScore);
    });

    triangle.addEventListener("touchstart", function() {
        handleElementClick(triangle, increaseTriangleScore);
    });

    function startGame() {
        moveElement(square);
        moveElement(triangle);
    }

    startGame();
    let movementInterval = setInterval(moveAllElements, speed);
});
