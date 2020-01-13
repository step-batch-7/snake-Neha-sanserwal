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
  growSnake(){
    this.snake.grow();
  }
  isWallTouched(){
    return this.snake.isHeadOnWall();
  }
}