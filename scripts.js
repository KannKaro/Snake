let board = document.querySelector('.game-board')
let rows = 30
let columns = 30
let foodX, foodY
let snakeX = 10, snakeY = 10
let intervalId
let direction = "right"

function createFoodAndSnakeGrid() {
    let createSnakeAndFood = `<div class="snake" style='grid-area:${snakeY} / ${snakeX}'></div>`
    createSnakeAndFood += `<div class="food" style='grid-area:${foodY} / ${foodX}'></div>`
    board.innerHTML = createSnakeAndFood
}

function randomizeFoodXandY() {
    foodX = Math.floor(Math.random() * rows + 1)
    foodY = Math.floor(Math.random() * columns + 1)
}

function checkSnakeAndFoodGrid() {
    if (snakeX === foodX && snakeY === foodY) {
        randomizeFoodXandY()
    }
}

function maxXandMaxY() {
    let minGridValue = 1
    if (snakeX > columns) {
        snakeX = minGridValue
    }
    if (snakeY > rows) {
        snakeY = minGridValue
    }
    if (snakeY < minGridValue) {
        snakeY = rows
    }
    if (snakeX < minGridValue) {
        snakeX = columns
    }
}

function snakeMove() {
    let deleteSnake = document.querySelector('.snake')
    deleteSnake.remove();
    checkSnakeAndFoodGrid()
    maxXandMaxY()
    createFoodAndSnakeGrid()
}

function autoMoveSnake() {
    switch (direction) {
        case "right":
            snakeX++
            break
        case "left":
            snakeX--
            break
        case "up":
            snakeY--
            break
        case "down":
            snakeY++
            break
    }
    snakeMove()
}

const changeSnakeDirection = (e) => {
    if (e.key === 'ArrowDown' && direction !== "up") {
        direction = "down"
    } else if (e.key === 'ArrowUp' && direction !== "down") {
        direction = "up"
    } else if (e.key === 'ArrowLeft' && direction !== "right") {
        direction = "left"
    } else if (e.key === 'ArrowRight' && direction !== "left") {
        direction = "right"
    }
}

function startGame() {
    randomizeFoodXandY()
    createFoodAndSnakeGrid()
    intervalId = setInterval(autoMoveSnake, 100)
}

startGame()
document.addEventListener('keydown', changeSnakeDirection)
