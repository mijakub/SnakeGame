const field = document.getElementById("playingField");
const startCard = document.getElementById("start");
let snake = [{x: 10, y: 10}];
let food = {x: random(), y: random()};
let direction = "left";

function random(){
    return Math.floor(Math.random() * 21);
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
    snake.pop();
}

const startGame = () => {
    setInterval(() => {
        removeAll(field, "snake");
        drawSnake();
    }, 100)
    makeFood();
}

document.addEventListener("keydown", (event) => {
    switch(event.key){
        case " ":
            startCard.style.display = "none";
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