document.addEventListener("DOMContentLoaded", function() {
    const square = document.getElementById("square");
    const triangle = document.getElementById("triangle");
    const gameContainer = document.getElementById("gameContainer");
    const squareScoreElement = document.getElementById("squareScore");
    const triangleScoreElement = document.getElementById("triangleScore");
    let squareScore = 0;
    let triangleScore = 0;

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
    }

    function increaseTriangleScore() {
        triangleScore++;
        triangleScoreElement.textContent = triangleScore;
    }

    function handleElementClick(element, increaseScoreFunction) {
        increaseScoreFunction();
        moveElement(element);
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
        moveElement(square);
        moveElement(triangle);
    }

    startGame();
    setInterval(() => {
        moveElement(square);
        moveElement(triangle);
    }, 1000);
});
