import Util from "@/model/Util";
import ActionCard from "@/model/ActionCard";

export default class ActionData{
  constructor(actionCard) {
    if(actionCard && Object.keys(actionCard).length > 0){
      this.of(actionCard);
      return;
    }
    this.init();
  }

  static builder() {
    return new ActionDataBuild();
  }

  init() {
    this.id = -1;
    this.title = 'Untitle';
    this.content = '';
    this.isDone = false;
    this.planDate = undefined;
    this.uniqKey = Util.makeUniqueKey();
  }

  of(actionCard){
    this.id = actionCard.id;
    this.title = actionCard.cardTitle;
    this.content = actionCard.cardContent;
    this.planDate = actionCard.cardPlanDate;
    this.isDone = actionCard.isDone;
    this.uniqKey = actionCard.uniqKey || Util.makeUniqueKey();
  }

  parseActionCard() {
    return new ActionCard(this);
  }

  isNew(){
    return this.id < 0
  }
}

class ActionDataBuild {
  constructor() {
    this.actionData = new ActionData();
  }

  id(val){
    this.actionData.id = val;
    return this;
  }
  title(val){
    this.actionData.title = val;
    return this;
  }
  content(val){
    this.actionData.content = val;
    return this;
  }
  isDone(val){
    this.actionData.isDone = val;
    return this;
  }
  planDate(val){
    this.actionData.planDate = val;
    return this;
  }
  uniqKey(val){
    this.actionData.uniqKey = val;
    return this;
  }
  build(){
    return this.actionData;
  }
}
