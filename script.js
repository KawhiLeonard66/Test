const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const tileSize = 20;
const tileCount = 20;

let snake = [{x: 10, y: 10}];
let newFood;
do {
    newFood = {x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount)};
} while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
food = newFood;
let direction = {x: 0, y: 0};
let score = 0;

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 200);
}

function update() {
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    // 碰撞检测
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
        return;
    }

    snake.unshift(head);

    // 吃食物
    if (head.x === food.x && head.y === food.y) {
        score++;
        let newFood;
do {
    newFood = {x: Math.floor(Math.random() * tileCount), y: Math.floor(Math.random() * tileCount)};
} while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
food = newFood;
    } else {
        snake.pop();
    }
}

function draw() {
    // 清空画布
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 画蛇
    ctx.fillStyle = 'lime';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * tileSize, segment.y * tileSize, tileSize, tileSize);
    });

    // 画食物
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * tileSize, food.y * tileSize, tileSize, tileSize);

    // 显示分数
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('分数: ' + score, 10, 30);
}

function resetGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 0, y: 0};
    score = 0;
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = {x: 0, y: -1};
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = {x: 0, y: 1};
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = {x: -1, y: 0};
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = {x: 1, y: 0};
            break;
    }
});

gameLoop();