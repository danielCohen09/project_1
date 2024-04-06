let canvasBoard = document.getElementById('canvasBoard');
let gameStatus = document.getElementById('gameStatus');
let restartPara = document.getElementById('restartPara');
let cellSize = 30;
let rows = 20;
let cols = 20;
let ctx = canvasBoard.getContext("2d");
let snakeX = cellSize * 5;
let snakeY = cellSize * 5;
let foodX;
let foodY;
let velocityX = 0;
let velocityY = 0;
let snakeBody = [];
let gameOver = false;

canvasBoard.height = rows * cellSize;
canvasBoard.width = cols * cellSize;


function render(){
  if(gameOver){
    return;
  }

  ctx.fillStyle = "lightgreen";
  ctx.fillRect(0, 0, canvasBoard.width, canvasBoard.height);

  ctx.fillStyle = "red";
  ctx.fillRect(foodX, foodY, cellSize, cellSize);
  setTimeout(render, 100);

  if(snakeX == foodX && snakeY == foodY){
    snakeBody.push([foodX, foodY]);
    generateFood();
  }

  for(let i=snakeBody.length-1; i>0; i--){
    snakeBody[i] = snakeBody[i-1];
  }
  if(snakeBody.length){
    snakeBody[0] = [snakeX, snakeY];
  }

  ctx.fillStyle = "blue";
  snakeX += velocityX * cellSize;
  snakeY += velocityY * cellSize;
  ctx.fillRect(snakeX, snakeY, cellSize, cellSize);
  for(let i=0; i<snakeBody.length;i++){
    ctx.fillRect(snakeBody[i][0], snakeBody[i][1], cellSize, cellSize);
  }

  if(snakeX < 0 || snakeX >= cols * cellSize || snakeY < 0 || snakeY >= rows * cellSize){
    gameStatus.innerHTML = "Game Over";
    gameStatus.style.backgroundColor = "red";
    restartPara.innerHTML = "refresh the page to restart";
    return gameOver = true;
  }

  for(let i=0; i<snakeBody.length; i++){
    if(snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
      gameStatus.innerHTML = "Game Over";
      gameStatus.style.backgroundColor = "red";
      restartPara.innerHTML = "refresh the page to restart";
      return gameOver = true;
    }
  }

}


generateFood()
render();

function generateFood(){
  foodX = Math.floor(Math.random() * cols) * cellSize;
  foodY = Math.floor(Math.random() * rows) * cellSize;
}

document.body.onkeyup = (ev)=>{
  switch(ev.keyCode){
    case 37://left
      if(velocityX != 1){
        velocityX = -1;
        velocityY = 0;
      }
    break;
    case 38://up
      if(velocityY != 1){
        velocityX = 0;
        velocityY = -1;
      }
    break;
    case 39://right
      if(velocityX != -1){
        velocityX = 1;
        velocityY = 0;
      }
    break;
    case 40://down
      if(velocityY != -1){
        velocityX = 0;
        velocityY = 1;
      }
    break;
    default:
      velocityX = 0;
      velocityY = 0;
    break;
  }

}
