// Snake game in JavaScript

// Initialize the canvas
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

// Set up keyboard event listeners
document.addEventListener("keydown", changeDirection);

// Function to change the direction of the snake
function changeDirection(event) {
  if (event.keyCode === 37 && dx !== 1) {
    dx = -1;
    dy = 0;
  } else if (event.keyCode === 38 && dy !== 1) {
    dx = 0;
    dy = -1;
  } else if (event.keyCode === 39 && dx !== -1) {
    dx = 1;
    dy = 0;
  } else if (event.keyCode === 40 && dy !== -1) {
    dx = 0;
    dy = 1;
  }
}

// Function to check if the snake has collided with itself or the wall
function checkCollision() {
  // Check collision with wall
  if (
    snake[0].x < 0 ||
    snake[0].x >= tileCount ||
    snake[0].y < 0 ||
    snake[0].y >= tileCount
  ) {
    return true;
  }

  // Check collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  return false;
}

// Function to update the game state
function updateGame() {
  // Move the snake
  let head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Check collision with apple
  if (snake[0].x === apple.x && snake[0].y === apple.y) {
    score++;
    // Generate a new apple position
    apple.x = Math.floor(Math.random() * tileCount);
    apple.y = Math.floor(Math.random() * tileCount);
  } else {
    // Remove the tail segment
    snake.pop();
  }

  // Check collision with self or wall
  if (checkCollision()) {
    clearInterval(gameInterval);
    alert("Game Over! Score: " + score);
    setTimeout( function () {
       window.location.reload() 
    }, 100)

  }

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = "green";
    context.fillRect(
      snake[i].x * gridSize,
      snake[i].y * gridSize,
      gridSize,
      gridSize
    );
  }

  // Draw the apple
  context.fillStyle = "red";
  context.fillRect(
    apple.x * gridSize,
    apple.y * gridSize,
    gridSize,
    gridSize
  );
}

// Start the game
let gameInterval = setInterval(updateGame, 100);

// //reload the game
// let reload_btn = document.querySelector("#reload");
// reload_btn.addEventListener("click", function () {
//     window.location.reload();
    
// })