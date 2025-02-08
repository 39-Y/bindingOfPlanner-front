export default class ActionCache {
  constructor() {
      this.update = [];
      this.delete = [];
      this.insert = [];
  }

  get getUpdate() {
    return this.update;
  }

  get getDelete() {
    return this.delete;
  }

  get getInsert() {
    return this.insert;
  }

  put(cmmd, action) {
    console.log("index:",this.findIndex(cmmd, action))

    if(this.findIndex(cmmd, action) < 0){
      this.add(cmmd, action);
      return;
    }
    this.modify(cmmd, action);
  }

  add(cmmd, action) {
    this[cmmd].push(action);
  }

  modify(cmmd, action) {
    const idx = this.findIndex(cmmd, action);
    if(idx > -1){
      this[cmmd][idx] = action;
    }
  }

  clear(cmmd, action, isNewAction){
    this.pop(cmmd, action);

    if(isNewAction){
      return;
    }

    this.add('delete', action);
  }

  pop(cmmd, action) {
    const idx = this.findIndex(cmmd, action);
    if(idx > -1){
      this[cmmd].splice(idx, 1);
    }
  }

  findIndex(cmmd, action) {
    if(!cmmd || !this[cmmd]){
      return -1;
    }
    return this[cmmd].findIndex(act => act.uniqKey === action.uniqKey);
  }
}
