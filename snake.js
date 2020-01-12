const EAST = 0;
const NORTH = 1;
const WEST = 2;
const SOUTH = 3;

const areCoordEqual = function(pointA, location){
  return location.some((pointB)=>{
    return pointA[0]=== pointB[0] && pointA[1]=== pointB[1]
  });
}
class Game{
  constructor(snake,ghostSnake,food){
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
  }
  get assets() {
    const snake = this.snake;
    const ghostSnake = this.ghostSnake;
    const food = this.food;
    return {snake,ghostSnake,food}
  }
  updateFood(position){
    const [colId, rowId] = position;
    this.food = new Food(colId, rowId);
  }
  isFoodEaten(){
    return areCoordEqual(this.food.positions,this.snake.location);
  }
}

class Direction {
  constructor(initialHeading) {
    this.heading = initialHeading;
    this.deltas = {};
    this.deltas[EAST] = [1, 0];
    this.deltas[WEST] = [-1, 0];
    this.deltas[NORTH] = [0, -1];
    this.deltas[SOUTH] = [0, 1];
  }

  get delta() {
    return this.deltas[this.heading];
  }

  turnLeft() {
    this.heading = (this.heading + 1) % 4;
  }
}

class Food{
  constructor(colId,rowId){
    this.colId = colId;
    this.rowId = rowId;
  }
  get positions(){
    return [this.colId,this.rowId];
  }
}

class Snake {
  constructor(positions, direction, type) {
    this.positions = positions.slice();
    this.direction = direction;
    this.type = type;
    this.previousTail = [0, 0];
  }

  get location() {
    return this.positions.slice();
  }

  get species() {
    return this.type;
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  move() {
    const [headX, headY] = this.positions[this.positions.length - 1];
    this.previousTail = this.positions.shift();

    const [deltaX, deltaY] = this.direction.delta;

    this.positions.push([headX + deltaX, headY + deltaY]);
  }
}

const NUM_OF_COLS = 100;
const NUM_OF_ROWS = 60;

const GRID_ID = 'grid';

const getGrid = () => document.getElementById(GRID_ID);
const getCellId = (colId, rowId) => colId + '_' + rowId;

const getCell = (colId, rowId) =>
  document.getElementById(getCellId(colId, rowId));

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
    cell.classList.add(snake.species);
  });
};

const handleKeyPress = snake => {
  snake.turnLeft();
};

const moveAndDrawSnake = function(snake) {
  snake.move();
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
  return new Snake(cells, new Direction(SOUTH),'ghost');
}

const paint = function(assets) {
  drawSnake(assets.snake);
  drawFood(assets.food);
  drawSnake(assets.ghostSnake);
}
const animateSnakes = function(assets){
  moveAndDrawSnake(assets.snake);
  moveAndDrawSnake(assets.ghostSnake);
}

const randomlyMoveSnake = function(snake){
  let x = Math.random() * 100;
  if (x > 50) {
    snake.turnLeft();
  }
}

const generatePosition = function(){
  const colId = Math.random()*(NUM_OF_COLS);
  const rowId = Math.random()*(NUM_OF_ROWS);
  return [Math.floor(colId) ,Math.floor(rowId)];
}

const repaintGame = function(game){
  if(game.isFoodEaten()){
    eraseFood();
    const position = generatePosition();
    game.updateFood(position);
  }
  paint(game.assets);
}
const eraseFood = function(){
  const cell = document.getElementsByClassName('food')[0];
  cell.classList.remove('food');
}

const main = function() {
  const snake = createSnake();
  const ghostSnake = createGhostSnake();
  const food = new Food(20,25); 
  createGrids();
  attachEventListeners(snake);
  const game = new Game(snake,ghostSnake,food);
  paint(game.assets);
  setInterval(animateSnakes, 200, game.assets);
  setInterval(randomlyMoveSnake, 500, game.assets.ghostSnake);
  setInterval(repaintGame,200, game);
};
