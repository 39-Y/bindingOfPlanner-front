import ActionList from "@/views/ActionList.vue";
import {getActions} from "@/api/actions";
import {shallowMount} from "@vue/test-utils";
import ActionCard from "@/model/ActionCard";
import ActionData from "@/model/ActionData";

jest.mock('@/api/actions', ()=>({
  getActions: jest.fn()
}))

let actionListComp;
let testAction =  ActionData.builder()
                            .id(1001)
                            .title('test title2')
                            .content('test content2')
                            .planDate(new Date("2025-02-04T23:00:00"))
                            .isDone(true)
                            .uniqKey('abcd')
                            .build();

let testAction2 =  ActionData.builder()
                            .id(1002)
                            .title('test title22')
                            .content('test content22')
                            .planDate(new Date("2025-02-04T23:00:00"))
                            .isDone(true)
                            .uniqKey('abcdef')
                            .build();

let testActionCard = ActionCard.builder()
                                      .id(1001)
                                      .cardTitle('test title2')
                                      .cardContent('test content2')
                                      .cardPlanDate(new Date("2025-02-04T23:00:00"))
                                      .isDone(true)
                                      .uniqKey('abcd')
                                      .build();

let testActionList = [testAction]

describe( 'ActionList Test', () =>{
  beforeEach(() => {
    getActions.mockResolvedValueOnce({
        'data':testActionList
      });

    actionListComp = shallowMount(ActionList).vm;
  })

  it('[loadActions] => getActions로 조회한 action을 cardList로 변환한다.', ()=>{
    //action
    actionListComp.loadActions();

    //assert
    expect(actionListComp.actions.length).toBe(testActionList.length)
  })

  it('[updateActionsAndCache] => actions, cache의 크기가 0보다 크다 ', ()=>{
    //act
    actionListComp.updateActionsAndCache(0,testActionCard);

    //assert
    expect(actionListComp.actions.length).toBeGreaterThan(0);
    expect(actionListComp.actionCache.update.length).toBeGreaterThan(0);
  })

  it('[updateActionsAndCache] => cache에 추가된 Action은 TestAction이다. ', ()=>{

    //act
    actionListComp.updateActionsAndCache(0,testActionCard);
    const updateAction = actionListComp.actionCache.getUpdate[0];
    console.log(actionListComp.actionCache.getUpdate)
    //asert
    expect(updateAction.id).toBe(testActionCard.id);
    expect(updateAction.title).toBe(testActionCard.cardTitle);
    expect(updateAction.content).toBe(testActionCard.cardContent);
    expect(updateAction.isDone).toBe(testActionCard.isDone);
  })

  it('[updateActionsAndCache] => 빈 Action을 추가하고 변경했을 때도 insert에 추가된다.', ()=>{
    actionListComp.addNewActionCard();
    const newActionData = actionListComp.actionCache.getInsert[0];
    newActionData.title = '변경된 제목'

    actionListComp.updateActionsAndCache(0, newActionData.parseActionCard());

    const updatedNewActionData = actionListComp.actionCache.getInsert[0];

    expect(updatedNewActionData.title).toBe(newActionData.cardTitle);

  })

  it('[updateActions] => 변경된 action이 이전 actions의 값을 대체한다.', () => {
    const oldAction = actionListComp.actions[0];

    actionListComp.updateActions(0, testAction2);

    expect(oldAction).not.toBe(actionListComp.actions[0]);
  })

  it('[addAction] => Actions에 빈 Action이 새로 생성. ', ()=>{

    //act
    actionListComp.addNewActionCard();
    const firstActionData = actionListComp.actions[0];
    console.log(firstActionData)

    //asert
    expect(firstActionData.id).toBe(-1);
    expect(firstActionData.cardTitle).toBe('Untitle');
    expect(firstActionData.cardContent).toBe('');
    expect(firstActionData.uniqKey).not.toBe('');
  })

  it('[addAction] => actionCache.insert에 Action이 저장 ', ()=>{

    //act
    actionListComp.addNewActionCard();
    const insertAction = actionListComp.actionCache.getInsert[0];

    //asert
    expect(insertAction.title).toBe('Untitle');
    expect(insertAction.content).toBe('');
    expect(insertAction.uniqKey).not.toBe('');

  })

  it('[deleteActionsAndCache] => actions에서는 사라지고, cache delete에 저장된다.', ()=>{
    const idx = 0;
    actionListComp.deleteActionsAndCache(idx, testActionCard);

    expect(actionListComp.actions.idx).toBeUndefined();

    expect(actionListComp.actionCache.getDelete[0].uniqKey).toBe(testAction.uniqKey);
    expect(actionListComp.actionCache.getDelete[0].id).toBe(testAction.id);
  })

  it('[updateCacheByDeletedCard] => 삭제할 Action은 delete에 있고, update 또는 insert에는 없다.', ()=>{
    const cache = actionListComp.actionCache;
    actionListComp.updateCacheByModifiedCard(testActionCard);
    actionListComp.updateCacheByDeletedCard(testActionCard);

    expect(cache.getDelete.some(action => action.uniqKey === testAction.uniqKey)).toBe(true);
    expect(cache.getInsert.some(action => action.uniqKey === testAction.uniqKey)).toBe(false);
    expect(cache.getUpdate.some(action => action.uniqKey === testAction.uniqKey)).toBe(false);
  })

  it('[updateCacheByDeletedCard] => 새로운 Action은 delete에 저장되지 않는다', () => {
    actionListComp.addNewActionCard();
    const newAction = actionListComp.actions[0];

    actionListComp.updateCacheByDeletedCard(newAction);

    expect(actionListComp.actionCache.getDelete.some(action => action.uniqKey === newAction.uniqKey)).toBe(false);
  })
})
