let board = document.querySelector('.game-board')
let rows = 30
let columns = 30
let foodX, foodY
let snakeX = 10, snakeY = 10

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
    let maxGridX = 31, maxGridY = 31
    let minGridX = 0, minGridY = 0
    if (snakeX === maxGridX) {
        snakeX = 1
    }
    if (snakeY === maxGridY) {
        snakeY = 1
    }
    if (snakeY === minGridY) {
        snakeY = 30
    }
    if (snakeX === minGridX) {
        snakeX = 30
    }
}

function snakeMove() {
    let deleteSnake = document.querySelector('.snake')
    deleteSnake.remove();
    checkSnakeAndFoodGrid()
    maxXandMaxY()
    createFoodAndSnakeGrid()
}

const changeSnakeDirection = (e) => {
    if (e.key === 'ArrowDown') {
        snakeY++
        snakeMove()
    }
    else if (e.key === 'ArrowUp') {
        snakeY--
        snakeMove()
    }
    else if (e.key === 'ArrowLeft') {
        snakeX--
        snakeMove()
    }
    else if (e.key === 'ArrowRight') {
        snakeX++
        snakeMove()
    }
}

function startGame() {
    randomizeFoodXandY()
    createFoodAndSnakeGrid()

}

startGame()
document.addEventListener('keydown', changeSnakeDirection)
