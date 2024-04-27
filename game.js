const field = document.getElementById("playingField");
const startCard = document.getElementById("start");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highscore");
const loseCard = document.getElementById("lose");
const scoreAlert = document.getElementById("scoreAlert");
let snake = [{x: 10, y: 10}];
let food = {x: random(), y: random()};
let direction = "left";
let gameSpeed = 180;
let score = 0;
let highScore = 0;
let gameStatus = 0;

function random(){
    return Math.floor(Math.random() * 20) + 1;
}

const findPosition = (element, position) => {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

const removeAll = (parent, nameOfClass) => {
    document.querySelectorAll("." + nameOfClass).forEach((element) => {
        element.parentNode.removeChild(element);
    })
}

const drawSnake = () => {
    moveSnake();
    makeSnake();
    collision();
}

const makeSnake = () => {
    snake.forEach((element) => {
        let snakePart = document.createElement("div");
        snakePart.className = "snake";
        findPosition(snakePart, element);
        field.appendChild(snakePart);
    })
}

const makeFood = () => {
    let element = document.createElement("div");
    element.className = "food";
    findPosition(element, food);
    field.appendChild(element);
    snake.forEach((snakePart) => {
        if(snakePart.x == food.x && snakePart.y == food.y){
            food = {x: random(), y: random()};
            removeAll(field, "food");
            makeFood();
        }
    });
}

const moveSnake = () => {
    let head = {...snake[0]};
    switch(direction){
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }
    snake.unshift(head);
    if(head.x == food.x && head.y == food.y){
        updateSpeed();
        score++;
        scoreText.innerHTML = `Score: ${score}`;
        removeAll(field, "food");
        food = {x: random(), y: random()}
        makeFood();
        clearInterval(game);
        game = setInterval(() => {
            removeAll(field, "snake");
            drawSnake();
        }, gameSpeed);
    }
    else{
        snake.pop();
    }
}

const startGame = () => {
    gameStatus = 1;
    startCard.style.display = "none";
    game = setInterval(() => {
        removeAll(field, "snake");
        drawSnake();
    }, gameSpeed);
    makeFood();
}

const stopGame = () => {
    loseCard.style.display = "block";
    removeAll(field, "snake");
    removeAll(field, "food");
    clearInterval(game);
    updateHS();
    scoreAlert.innerHTML = `Score: ${score}`;
    highScoreText.innerHTML = `Highest Score: ${highScore}`;
    score = 0;
    scoreText.innerHTML = `Score: ${score}`;
    setTimeout(() => {
        loseCard.style.display = "none";
        startCard.style.display = "block";
        snake = [{ x: 10, y: 10 }];
        direction = "left";
        food = {x: random(), y: random()};
        gameSpeed = 180;
        gameStatus = 0;
    },1500)
}

const collision = () => {
    let head = {...snake[0]};
    for(let i = 1; i < snake.length; i++){
        if(head.x == snake[i].x && head.y == snake[i].y){
            stopGame();
        }
    }
    snake.forEach((snakePart) => {
        if(snakePart.x > 20 || snakePart.x < 0 || snakePart.y > 20 || snakePart.y < 0 ){
            stopGame();
        }
    })
}

const updateHS = () => {
    if(score > highScore){
        highScore = score;
    }
}

const updateSpeed = () => {
    if (gameSpeed > 150) gameSpeed -= 5;
    else if (gameSpeed > 120) gameSpeed -= 3;
    else if (gameSpeed > 80) gameSpeed -= 2;
}

document.addEventListener("keydown", (event) => {
    if(event.key == " " && gameStatus == 0) startGame();
    else if(event.key == "ArrowUp" || event.key == "W" || event.key == "w") direction = "up";
    else if(event.key == "ArrowDown" || event.key == "S" || event.key == "s") direction = "down";
    else if(event.key == "ArrowLeft" || event.key == "A" || event.key == "a") direction = "left";
    else if(event.key == "ArrowRight" || event.key == "D" || event.key == "d") direction = "right";
})