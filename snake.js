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

  grow(){
    const[headX, headY]  = this.positions[this.positions.length - 1];
    const [deltaX, deltaY] = this.direction.delta;
    this.positions.push([headX + deltaX, headY + deltaY]);
  }

  move() {
    this.previousTail = this.positions.shift();
    this.grow()
  }
  isHeadOnWall(){
    const [[headX,headY]] = this.positions;
    return H_WALLS.includes(headX) || V_WALLS.includes(headY);
  }
 
}

