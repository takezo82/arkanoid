document.addEventListener("DOMContentLoaded", function() {
    const square = document.getElementById("square");
    const gameContainer = document.getElementById("gameContainer");
    let score = 0;

    function moveSquare() {
        const maxX = gameContainer.clientWidth - square.clientWidth;
        const maxY = gameContainer.clientHeight - square.clientHeight;
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        square.style.left = randomX + "px";
        square.style.top = randomY + "px";
    }

    function increaseScore() {
        score++;
        console.log("Puntuación: " + score);
    }

    square.addEventListener("click", function() {
        increaseScore();
        moveSquare();
    });

    moveSquare();
});
