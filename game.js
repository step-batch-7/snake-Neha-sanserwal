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
   return this.snake.isHeadAt(this.food.positions);
  }
  growSnake(){
    this.snake.grow();
  }

  isWallTouched(){
    const[headX,headY] = this.snake.head;
    return H_WALLS.includes(headX)|| V_WALLS.includes(headY);
  }

  isSnakeTouched(){
    return this.snake.hasTouchedBody();
  }

  turnGhostSnake(){
    this.ghostSnake.turnLeft();
  }
}