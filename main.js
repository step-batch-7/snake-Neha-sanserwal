const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;
const H_WALLS = [100,-1];
const V_WALLS = [60,-1]
const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) => document.getElementById(getCellId(colId, rowId));

const createCell = function(grid, colId, rowId) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.id = getCellId(colId, rowId);
  grid.appendChild(cell);
};

const createGrids = function() {
  const grid = getGrid();
  for (let y = 0; y < NUM_OF_ROWS; y++) {
    for (let x = 0; x < NUM_OF_COLS; x++) {
      createCell(grid, x, y);
    }
  }
};

const showScore = function(score){
  document.getElementById('count').innerText = score ;
}

const eraseTail = function(snake) {
  let [colId, rowId] = snake.previousTail;
  const cell = getCell(colId, rowId);
  cell.classList.remove(snake.species);
};

const drawFood = function(food){
  const cell = getCell(...food.positions);
  cell.classList.add('food');
}

const drawSnake = function(snake) {
  snake.location.forEach(([colId, rowId]) => {
    const cell = getCell(colId, rowId);
    cell && cell.classList.add(snake.species);
  });
};

const handleKeyPress = snake => {
  snake.turnLeft();
};

const drawAndEraseSnake = function(snake) {
  eraseTail(snake);
  drawSnake(snake);
};

const attachEventListeners = snake => {
  document.body.onkeydown = handleKeyPress.bind(null, snake);
};

const createSnake = function(){
  const cells = [[40, 25],[41, 25],[42, 25]];
  return new Snake(cells, new Direction(EAST), 'snake');
}

const createGhostSnake = function(){
  const cells =  [[40, 30],[41, 30],[42, 30]];
  return new Snake(cells, new Direction(WEST),'ghost');
}

const paint = function(assets) {
  drawSnake(assets.snake);
  drawFood(assets.food);
  drawSnake(assets.ghostSnake);
}

const animateSnakes = function(game){
  game.moveSnakes();
  game.turnGhostSnake();
  drawAndEraseSnake(game.assets.snake);
  drawAndEraseSnake(game.assets.ghostSnake);
}

const generatePosition = function(){
  const colId = Math.random()*(NUM_OF_COLS);
  const rowId = Math.random()*(NUM_OF_ROWS);
  return [Math.floor(colId) ,Math.floor(rowId)];
}

const repaintGame = function(game){
  if(game.isFoodEaten()){
    game.updateScore();
    showScore(game.totalScore);
    eraseFood();
    game.growSnake();
    const position = generatePosition();
    game.updateFood(position);
  }
  paint(game.assets);
}

const eraseFood = function(){
  const cell = document.getElementsByClassName('food')[0];
  cell.classList.remove('food');
}
const showGameOver = function(gameOver){
  clearInterval(gameOver);
  document.getElementById('gameOver').style.display = 'flex';
}

const main = function() {
  const snake = createSnake();
  const ghostSnake = createGhostSnake();
  const [foodX,foodY] = generatePosition();
  const food = new Food(foodX,foodY); 
  const score = new Score(0);
  createGrids();
  attachEventListeners(snake);
  const game = new Game(snake,ghostSnake,food,score);
  showScore(game.totalScore);
  paint(game.assets);

  const gameOver = setInterval(()=>{
    if(game.isWallTouched()|| game.isSnakeTouched()){
      showGameOver(gameOver)
    }
    repaintGame(game);
    animateSnakes(game)
  },100);
};
