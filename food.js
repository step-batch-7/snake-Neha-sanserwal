class Food{
  constructor(colId,rowId){
    this.colId = colId;
    this.rowId = rowId;
  }
  get positions(){
    return [this.colId,this.rowId];
  }
}
