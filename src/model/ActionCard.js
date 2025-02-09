import Util from "@/model/Util";
import ActionData from "@/model/ActionData";

export default class ActionCard{
  constructor(actionData) {
    if(actionData && Object.keys(actionData).length > 0){
      this.of(actionData);
      return;
    }
    this.init();
  }

  static builder() {
    return new ActionCardBuild();
  }

  init() {
    this.id = -1;
    this.cardTitle = 'Untitle';
    this.cardContent = '';
    this.isDone = false;
    this.cardPlanDate = undefined;
    this.uniqKey = Util.makeUniqueKey();
  }

  of(action){
    this.id = action.id;
    this.cardTitle = action.title;
    this.cardContent = action.content;
    this.cardPlanDate = action.planDate;
    this.isDone = action.isDone;
    this.uniqKey = action.uniqKey || Util.makeUniqueKey();
  }

  parseActionData() {
    return new ActionData(this);
  }

  isNew(){
    return this.id < 0
  }

}

class ActionCardBuild {
  constructor() {
    this.actionCard = new ActionCard();
  }

  id(val){
    this.actionCard.id = val;
    return this;
  }
  cardTitle(val){
    this.actionCard.cardTitle = val;
    return this;
  }
  cardContent(val){
    this.actionCard.cardContent = val;
    return this;
  }
  isDone(val){
    this.actionCard.isDone = val;
    return this;
  }
  cardPlanDate(val){
    this.actionCard.cardPlanDate = val;
    return this;
  }
  uniqKey(val){
    this.actionCard.uniqKey = val;
    return this;
  }
  build(){
    return this.actionCard;
  }
}
