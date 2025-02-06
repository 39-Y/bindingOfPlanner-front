<template>
{{actionCache}}
  <div>
    <v-container class="">
      <v-col cols="auto">
        <v-btn density="compact" icon="mdi-plus" @click="addNewAction"></v-btn>
      </v-col>
      <v-row no-gutters>

          <v-col
            v-for="(action,idx) in actions"
            :key="action"
            cols="12"
            sm="4"
          >
            <v-sheet class="ma-2 pa-2">
              <VueDraggableNext
                class="dragArea list-group"
                :list="actions"
                :group="{ name: 'people', pull: 'clone', put: false }"
                @change="console.log('change')"
              >
                <ActionCard :action="action"
                            @update:action="updateActionsAndCache(idx, action)"
                            @delete:action="deleteActionsAndCache(idx, action)"
                >
                </ActionCard>
              </VueDraggableNext>
            </v-sheet>
          </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import ActionCard from "@/components/ActionCard.vue";
  import { getActions} from "@/api/actions";
  import { VueDraggableNext } from 'vue-draggable-next'

  const actionCache = ref({
    update: [],
    delete: [],
    insert: []
  })
  const actions = ref([]);
  const initACtion = () => {
    return {
    id: -1,
    cardTitle: 'Untitle',
    cardContent: '',
    isDone : false,
    uniqKey: makeUniqueKey()
  }}
  const updateActionsAndCache = (idx, action) => {

    updateActions(idx, action);
    updateCacheByModifiedCard(action);
    console.log(actionCache.value)
  }

  const updateActions = (idx, action) => {
    actions.value[idx] = action;
  }

  const updateCacheByModifiedCard = (actionCard) => {
    const cmmd = isNewAction(actionCard) ? 'insert' : 'update';
    const parsingData = parseActionCache(actionCard);
    const cacheIdx = indexOfCache(cmmd, actionCard);

    if(cacheIdx < 0){
      actionCache.value[cmmd].push(parsingData);
      return;
    }
    actionCache.value[cmmd][cacheIdx] = parsingData;
  }

  const indexOfCache = (cmmd, action) => {
    if(!cmmd || !actionCache.value[cmmd]){
      return -1;
    }
    return actionCache.value[cmmd].findIndex(act => act.uniqKey === action.uniqKey);
  }

  const deleteActionsAndCache = (idx, action) => {
    deleteActions(idx);
    updateCacheByDeletedCard(action);
    console.log(actionCache.value)

  }

  const deleteActions = (idx) => {
    actions.value.splice(idx, 1)
  }

  const updateCacheByDeletedCard = (actionCard) => {
    const parsingData = parseActionCache(actionCard);
    let cmmd = 'insert';

    //기존 Action일 경우 delete cache에 저장
    if(!isNewAction(actionCard)){
      actionCache.value['delete'].push(parsingData);
      cmmd = 'update';
    }
    //update or insert cache에서 action 삭제
    const idx = indexOfCache(cmmd, actionCard);
    if(idx > -1)
      actionCache.value[cmmd].splice(idx, 1);
  }

  const isNewAction = (action) => {
    return action.id < 0;
  }


  const parseActionCache = (action) => {
    return {
      id: action.id,
      title: action.cardTitle,
      content: action.cardContent,
      planDate: action.cardPlanDate,
      isDone : action.isDone,
      uniqKey: action.uniqKey || makeUniqueKey()
    };
  }

  const parseActionCard = (action) => {
    return {
      id:action.id,
      cardTitle: action.title,
      cardContent: action.content,
      isDone: !!action.isDone,
      cardPlanDate: action.planDate,
      uniqKey: action.uniqKey || makeUniqueKey()
    }
  }

  const makeUniqueKey = () => {
    const randomTime = Date.now() + Math.floor(Math.random() *  1000000000000);
    return randomTime.toString(36) + Math.random().toString(36).substring(2, 5);
  }

  const addNewAction = () => {
    let newAction = initACtion();
    actions.value.unshift(newAction);
    actionCache.value.insert.push(parseActionCache(newAction));
  }

  const loadActions = async () => {
    const res = await getActions();

    actions.value = parseActionCardList(res.data);
    console.log("actions:",actions.value)
  };

  const parseActionCardList = (actionList) => {
    if(!actionList){
      return [];
    }
    return actionList.map(parseActionCard);
  };

  onMounted(() =>{
    loadActions();
  });

</script>
