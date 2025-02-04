import ActionList from "@/views/ActionList.vue";
import {getActions} from "@/api/actions";
import {shallowMount} from "@vue/test-utils";

jest.mock('@/api/actions', ()=>({
  getActions: jest.fn()
}))

let actionListComp;
let testAction =  {
  id: 1001,
  title: 'test title2',
  content: 'test content2',
  planDate: new Date("2025-02-04T23:00:00"),
  uniqKey: 'abcd',
  isDone: true
};

let testAction1 =  {
  id: 1001,
  title: 'test title1',
  content: 'test content1',
  planDate: new Date("2025-02-04T23:00:00"),
  uniqKey: 'abcdef',
  isDone: true
};

let testActionCard =  {
  id: 1001,
  cardTitle: 'test title2',
  cardContent: 'test content2',
  cardPlanDate: new Date("2025-02-04T23:00:00"),
  uniqKey: 'abcd',
  isDone: true
};

let testActionList = [testAction]

describe( 'ActionList Test', () =>{
  beforeEach(() => {
    getActions.mockResolvedValueOnce({
        'data':testActionList
      });

    actionListComp = shallowMount(ActionList).vm;
  })

  it('[parseActionCache] => testActionCard는 parse 후 testAction과 동일하다.', () => {
    const parseAction = actionListComp.parseActionCache(testActionCard);
    expect(parseAction.toString()).toBe(testAction.toString());
  })

  it('[parseActionCard] => testAction은 parse 후 testActionCard와 동일하다.', ()=>{
    const parseActionCard = actionListComp.parseActionCard(testAction);
    expect(parseActionCard.toString()).toBe(testActionCard.toString());
  })

  it('[parseActionCard] => parseActionCard와 parseActionCache는 역변환 관계다.', ()=>{
    const parseActionCard = actionListComp.parseActionCard(testAction);
    const parseAction = actionListComp.parseActionCache(parseActionCard);
    expect(parseAction).toBe(parseAction);
    expect(actionListComp.parseActionCard(parseAction).toString()).toBe(parseActionCard.toString());
  })

  it('[makeUniqueKey] => 난수로 만든 uniqueKey 연달아 생성해도 동일하지 않다.', ()=>{
    const uniqKey1 = actionListComp.makeUniqueKey();
    const uniqKey2 = actionListComp.makeUniqueKey();
    const uniqKey3 = actionListComp.makeUniqueKey();

    expect(uniqKey1).not.toBe(uniqKey2);
    expect(uniqKey2).not.toBe(uniqKey3);
    expect(uniqKey1).not.toBe(uniqKey3);
  })

  it('[loadActions] => getActions로 조회한 action을 cardList로 변환한다.', ()=>{
    //action
    actionListComp.loadActions();

    //assert
    expect(actionListComp.actions.length).toBe(testActionList.length)
  })

  it('[updateActionsAndCache] => actions, cache의 크기가 0보다 크다 ', ()=>{
    //act
    actionListComp.updateActionsAndCache(0,testAction);

    //assert
    expect(actionListComp.actions.length).toBeGreaterThan(0);
    expect(actionListComp.actionCache.update.length).toBeGreaterThan(0);
  })

  it('[updateActionsAndCache] => cache에 추가된 Action은 TestAction이다. ', ()=>{

    //act
    actionListComp.updateActionsAndCache(0,testAction);
    const updateAction = actionListComp.actionCache.update[0];

    //asert
    expect(updateAction.id).toBe(testAction.id);
    expect(updateAction.title).toBe(testAction.cardTitle);
    expect(updateAction.content).toBe(testAction.cardContent);
    expect(updateAction.isDone).toBe(testAction.isDone);
  })

  it('[updateActionsAndCache] => 빈 Action을 추가하고 변경했을 때 insert에 추가된다.', ()=>{
    actionListComp.addNewAction();
    const newAction = actionListComp.actionCache.insert[0];
    newAction.cardTitle = '변경된 제목'

    actionListComp.updateActionsAndCache(0, newAction);

    const updatedNewAction = actionListComp.actionCache.insert[0];

    expect(updatedNewAction.title).toBe(newAction.cardTitle);

  })

  it('[updateActions] => 변경된 action이 이전 actions의 값을 대체한다.', () => {
    const oldAction = actionListComp.actions[0];

    actionListComp.updateActions(0, testAction1);

    expect(oldAction).not.toBe(actionListComp.actions[0]);
  })

  it('[addAction] => Actions에 빈 Action이 새로 생성. ', ()=>{

    //act
    actionListComp.addNewAction();
    const firstAction = actionListComp.actions[0];
    console.log(firstAction)

    //asert
    expect(firstAction.id).toBe(-1);
    expect(firstAction.cardTitle).toBe('Untitle');
    expect(firstAction.cardContent).toBe('');
    expect(firstAction.uniqKey).not.toBe('');
  })

  it('[addAction] => actionCache.insert에 Action이 저장 ', ()=>{

    //act
    actionListComp.addNewAction();
    const insertAction = actionListComp.actionCache.insert[0];

    //asert
    expect(insertAction.title).toBe('Untitle');
    expect(insertAction.content).toBe('');
    expect(insertAction.uniqKey).not.toBe('');

  })

})
