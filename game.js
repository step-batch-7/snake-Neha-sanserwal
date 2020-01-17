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

  update(newFoodPosition){
    const [colId, rowId] = newFoodPosition;
    this.food = new Food(colId, rowId);
    this.snake.grow();
  }

  updateScore(){
    this.score.update();
  }
  
  isFoodEaten(){
   return this.snake.isHeadAt(this.food.positions);
  }
  isFoodEatenByGhost(){
    return this.ghostSnake.isHeadAt(this.food.positions);
  }
  
  moveSnakes(){
    this.snake.move();
    this.ghostSnake.move();
  }

  isWallTouchedByGhost(){
    const[headX,headY] = this.ghostSnake.head;
    return [99,0].includes(headX)|| [59,0].includes(headY);
  }
  isOver(){
    const[headX,headY] = this.snake.head;
    const isWallTouched = H_WALLS.includes(headX)|| V_WALLS.includes(headY);
    return isWallTouched || this.snake.hasTouchedBody();
  }
  turnGhostSnake(){
    let x = Math.random() * 100;
    if (x > 90|| this.isWallTouchedByGhost()) {
      this.ghostSnake.turnLeft();
    }
    
  }
}