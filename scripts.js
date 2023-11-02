let board = document.querySelector('.game-board')
let rows = 30
let columns = 30
let foodX, foodY
let snakeX = 10, snakeY = 10
let intervalId
let direction = "right"
let snakeBody = [{ x: snakeX, y: snakeY }]

function createFoodAndSnakeGrid() {
    let createSnakeAndFood = ''
    for (const segment of snakeBody) {
        createSnakeAndFood += `<div class="snake" style='grid-area:${segment.y} / ${segment.x}'></div>`
    }
    createSnakeAndFood += `<div class="food" style='grid-area:${foodY} / ${foodX}'></div>`
    board.innerHTML = createSnakeAndFood
}

function randomizeFoodXandY() {
    let isFoodOnSnake = true

    while (isFoodOnSnake) {
        foodX = Math.floor(Math.random() * rows + 1)
        foodY = Math.floor(Math.random() * columns + 1)

        isFoodOnSnake = false
        for (const segment of snakeBody) {
            if (foodX === segment.x && foodY === segment.y) {
                isFoodOnSnake = true
                break
            }
        }
    }
}

function checkSnakeBodyCollision() {
    for (let i = 1; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
            window.location.reload()
        }
    }
}

function checkSnakeAndFoodGrid() {
    if (snakeX === foodX && snakeY === foodY) {
        randomizeFoodXandY()
        pushNextSegmentPosition()
    }
}

function pushNextSegmentPosition() {
    snakeBody.push({ x: snakeX - 1, y: snakeY - 1 })
}

function checkSnakeCollision() {
    let minGridValue = 0
    let maxGridValue = 31
    if (snakeX > maxGridValue || snakeX < minGridValue || snakeY > maxGridValue || snakeY < minGridValue) {
        window.location.reload()
    }
}

function snakeMove() {
    let deleteSnake = document.querySelectorAll('.snake')
    for (const segment of deleteSnake) {
        segment.remove()
    }
    checkSnakeCollision()
    checkSnakeAndFoodGrid()
    checkSnakeBodyCollision()
    createFoodAndSnakeGrid()
}

function addSnakeGrid() {
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = { ...snakeBody[i - 1] };
    }
    snakeBody[0] = { x: snakeX, y: snakeY };
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
    addSnakeGrid()
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
