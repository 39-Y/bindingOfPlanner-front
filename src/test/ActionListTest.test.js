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
            idx: 0,
            id: 1001,
            title: 'test title',
            content: 'test content',
            isDone: true
          }
        ]
      });

    actionListComp = shallowMount(ActionList).vm;
  })


  it('[updateAction] => actionList, updateActionSet의 크기가 0보다 크다 ', ()=>{
    //act
    actionListComp.updateAction(testAction);

    //asert
    expect(actionListComp.actions.length).toBeGreaterThan(0);
    expect(actionListComp.actionCache.update.length).toBeGreaterThan(0);
  })

  it('[updateAction] => updateActionSet에 추가된 Action은 TestAction이다. ', ()=>{

    //act
    actionListComp.updateAction(testAction);
    const updateAction = actionListComp.actionCache.update[0];

    //asert
    expect(updateAction.title).toBe(testAction.cardTitle);
    expect(updateAction.content).toBe(testAction.cardContent);
  })

})
