const field = document.getElementById("playingField");
const startCard = document.getElementById("start");
let snake = [{x: 10, y: 10}];
let food = {x: random(), y: random()};
let direction = "left";
let gameSpeed = 100;

function random(){
    return Math.floor(Math.random() * 20) + 1;
}

function findPosition(element, position){
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function removeAll(parent, nameOfClass){
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
    startCard.style.display = "none";
    game = setInterval(() => {
        removeAll(field, "snake");
        drawSnake();
    }, gameSpeed);
    makeFood();
}

const stopGame = () => {
    startCard.style.display = "block";
    removeAll(field, "snake");
    removeAll(field, "food");
    clearInterval(game);
    snake = [{ x: 10, y: 10 }];
    direction = "left";
    food = {x: random(), y: random()};
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

document.addEventListener("keydown", (event) => {
    switch(event.key){
        case " ":
            startGame();
            break;
        case "ArrowUp":
            direction = "up";
            console.log(direction);
            break;
        case "ArrowDown":
            direction = "down";
            console.log(direction);
            break;
        case "ArrowLeft":
            direction = "left";
            console.log(direction);
            break;
        case "ArrowRight":
            direction = "right";
            console.log(direction);
            break;
        case "w":
            direction = "up";
            console.log(direction);
            drawSnake()
            break;
        case "s":
            direction = "down";
            console.log(direction);
            drawSnake()
            break;
        case "a":
            direction = "left";
            console.log(direction);
            drawSnake()
            break;
        case "d":
            direction = "right";
            console.log(direction);
            drawSnake()
            break;
    }
})