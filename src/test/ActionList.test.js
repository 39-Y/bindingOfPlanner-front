import ActionList from "@/views/ActionList.vue";
import {getActions} from "@/api/actions";
import {shallowMount} from "@vue/test-utils";

jest.mock('@/api/actions', ()=>({
  getActions: jest.fn()
}))

let actionListComp;
let testAction =  {
  idx: 0,
  id: 1001,
  title: 'test title2',
  content: 'test content2',
  isDone: true
};
describe( 'ActionList Test', () =>{
  beforeEach(() => {
    getActions.mockResolvedValueOnce({
        'data':[
          {
            id: 1001,
            title: 'test title',
            content: 'test content',
            isDone: true
          }
        ]
      });

    actionListComp = shallowMount(ActionList).vm;
  })


  it('[updateActionAndCache] => actions, cache의 크기가 0보다 크다 ', ()=>{
    //act
    actionListComp.updateActionAndCache(0,testAction);

    //asert
    expect(actionListComp.actions.length).toBeGreaterThan(0);
    expect(actionListComp.actionCache.update.length).toBeGreaterThan(0);
  })

  it('[updateActionAndCache] => cache에 추가된 Action은 TestAction이다. ', ()=>{

    //act
    actionListComp.updateActionAndCache(0,testAction);
    const updateAction = actionListComp.actionCache.update[0];

    //asert
    expect(updateAction.id).toBe(testAction.id);
    expect(updateAction.title).toBe(testAction.cardTitle);
    expect(updateAction.content).toBe(testAction.cardContent);
    expect(updateAction.isDone).toBe(testAction.isDone);
  })

  it('[addAction] => Actions에 빈 Action이 새로 생성. ', ()=>{

    //act
    actionListComp.addNewAction();
    const firstAction = actionListComp.actions[0];

    //asert
    expect(firstAction.title).toBe('Untitle');
    expect(firstAction.content).toBe('');
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

  it('', ()=>{
    console.log(actionListComp.makeUniqueKey());
    console.log(actionListComp.makeUniqueKey());
    console.log(actionListComp.makeUniqueKey());
  })
})
