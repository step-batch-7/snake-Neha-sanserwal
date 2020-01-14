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

  get head(){
     return this.positions[this.positions.length - 1];
  }

  turnLeft() {
    this.direction.turnLeft();
  }

  grow(){
    const[headX, headY]  = this.positions[this.positions.length - 1];
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  isHeadAt(food){
    const [foodX, foodY] = food;
    const [headX,headY] = this.positions[this.positions.length - 1];
    return headX === foodX && headY === foodY;
  }

  move() {
    this.previousTail = this.positions.shift();
    this.grow();
  }

  hasTouchedBody(){
    const [headX,headY] = this.positions[this.positions.length - 1];
    const body = this.positions.slice(0,-1);
    return body.some(([partX,partY]) => {
      return partX === headX && partY === headY;
    }) 
  }
}

