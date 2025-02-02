import ActionCard from "@/components/ActionCard.vue";
import {shallowMount, mount} from "@vue/test-utils";
import {createVuetify} from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const vuetify = createVuetify({components, directives});

let actionCardComp;
let actionCardMountComp;
let actionCardWrapper;
let actionCardMountWrapper;
let testAction =  {
  idx: 0,
  id: 1001,
  cardTitle: 'test title2',
  cardContent: 'test content2',
  isDone: true,
  cardPlanDate:'',
  uniqKey:'abcdefg'
};
describe( 'ActionList Test', () =>{
  beforeEach(() => {
    actionCardWrapper = shallowMount(ActionCard, {
      propsData: {action : testAction}
      ,vuetify
    });
    actionCardMountWrapper = mount(ActionCard, {
      propsData: {action : testAction}
      ,vuetify
    });
    actionCardComp = actionCardWrapper.vm;
    actionCardMountComp = actionCardMountWrapper.vm;
  });

  it('[test props]', ()=>{
    expect(actionCardWrapper.props().action.cardTitle).toBe(testAction.cardTitle)
    })


  it('[ActionCard input] => change title', async () => {
    //arrange
    actionCardMountComp.isTitleEditing = true;
    await actionCardMountComp.nextTick();
    const input = actionCardMountWrapper.find('[data-testid="action-title-input"]').get('input');

    //act
    input.setValue('title changed');

    //assert
    expect(input.element.value).toBe('title changed');
  })

  it('[ActionCard title click] => isTitleEditing가 true?', async () => {
    //arrange
    const actionTitle = actionCardMountWrapper.find('[data-testid="action-title"]');

    expect(actionTitle.exists()).toBe(true);
    expect(actionCardMountComp.isTitleEditing).toBe(false);

    //act
    await actionTitle.trigger("click");

    //assert
    expect(actionCardMountComp.isTitleEditing).toBe(true);

  })


})
