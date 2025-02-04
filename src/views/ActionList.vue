<template>
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
                            @update:action="updateActionsAndCache(idx, action)">
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

  const actionCache = {
    update: [],
    delete: [],
    insert: []
  }
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
    updateCache(action);
  }

  const updateActions = (idx, action) => {
    actions.value[idx] = action;
  }

  const updateCache = (action) => {
    let cmmd = isInsert(action) ? 'insert' : 'update';
    const parsingData = parseActionCache(action);
    const cacheIdx = indexOfCache(cmmd, action);

    if(cacheIdx < 0){
      actionCache[cmmd].push(parsingData);
      return;
    }
    actionCache[cmmd][cacheIdx] = parsingData;
  }

  const isInsert = (action) => {
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
  const indexOfCache = (cmmd, action) => {
    return actionCache[cmmd].findIndex(act => act.uniqKey === action.uniqKey);
  }

  const addNewAction = () => {
    let newAction = initACtion();
    actions.value.unshift(newAction);
    actionCache.insert.push(parseActionCache(newAction));
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
