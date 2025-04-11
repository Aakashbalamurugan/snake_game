let canvas = document.getElementById("gameCanvas");
let context = canvas.getContext("2d");

// Set up the game variables
let gridSize = 20;
let tileCount = 20;
let snake = [{ x: 10, y: 10 }];
let apple = { x: 15, y: 15 };
let dx = 0;
let dy = 0;
let score = 0;

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const key = event.keyCode;
  handleDirection(key);
}

function handleDirection(keyCode) {
  if (keyCode === 37 && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (keyCode === 38 && dy !== 1) {
    dx = 0;
    dy = -1;
  } else if (keyCode === 39 && dx !== -1) {
    dx = 1;
    dy = 0;
  } else if (keyCode === 40 && dy !== -1) {
    dx = 0;
    dy = 1;
  }
}

function checkCollision() {
  if (
    snake[0].x < 0 ||
    snake[0].x >= tileCount ||
    snake[0].y < 0 ||
    snake[0].y >= tileCount
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  return false;
}

function updateGame() {
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
// random food generation
  if (snake[0].x === apple.x && snake[0].y === apple.y) {
    score++;
    apple.x = Math.floor(Math.random() * tileCount);
    apple.y = Math.floor(Math.random() * tileCount);
  } else {
    snake.pop();
  }

  if (checkCollision()) {
    clearInterval(gameInterval);
    alert("Game Over! Score: " + score);
    setTimeout(function () {
      window.location.reload();
    }, 100);
  }

  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );
  }

  context.fillStyle = "red";
  context.fillRect(apple.x * gridSize, apple.y * gridSize, gridSize, gridSize);
}

let gameInterval = setInterval(updateGame, 100);

// Reload button
document.getElementById("reload").addEventListener("click", function () {
  window.location.reload();
});


// Arrow button event listeners
document.getElementById("up").addEventListener("click", function () {
  handleDirection(38); // Up arrow
});
document.getElementById("down").addEventListener("click", function () {
  handleDirection(40); // Down arrow
});
document.getElementById("left").addEventListener("click", function () {
  handleDirection(37); // Left arrow
});
document.getElementById("right").addEventListener("click", function () {
  handleDirection(39); // Right arrow
});
