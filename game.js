 class Game{
  constructor(snake,ghostSnake,food,score){
    this.snake = snake;
    this.ghostSnake = ghostSnake;
    this.food = food;
    this.score = score;
  }

  get assets() {
    const snake = this.snake;
    const ghostSnake = this.ghostSnake;
    const food = this.food;
    return {snake,ghostSnake,food}
  }
  get totalScore(){
    return this.score.total;
  }

  updateScore(){
    this.score.update(); 
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

  moveSnakes(){
    this.snake.move();
    this.ghostSnake.move();
  }

  isSnakeTouched(){
    return this.snake.hasTouchedBody();
  }
  isWallTouchedByGhost(){
    const[headX,headY] = this.ghostSnake.head;
    return [99,0].includes(headX)|| [59,0].includes(headY);
  }

  turnGhostSnake(){
    let x = Math.random() * 100;
    if (x > 90|| this.isWallTouchedByGhost()) {
      this.ghostSnake.turnLeft();
    }
    
  }
}