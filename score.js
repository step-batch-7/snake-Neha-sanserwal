class Score{
  constructor(score){
    this.score = score;
  }
  update(){
    this.score = this.score+10;
  }
  get total(){
    return this.score;
  }
}