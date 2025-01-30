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
                            @update:action="updateAction(idx, action)">
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
    title: 'Untitle',
    content: '',
    planDate: '',
    isDone : false
  }}
  const updateAction = (idx, action) => {
    actions.value[idx] = action;
    addToCacheByUpdate(action);
    console.log("addToCacheByUpdate",actionCache.update)
  }

  const addToCacheByUpdate = (action) => {
    const data = parseActionCache(action);
    const cacheIdx = indexOfCache('update', action);

    if(cacheIdx < 0){
      actionCache.update.push(data);
      return;
    }
    actionCache.update[cacheIdx] = data;
  }

  const parseActionCache = (action) => {
    return {
      id: action.id,
      title: action.cardTitle,
      content: action.cardContent,
      planDate: action.cardPlanDate,
      isDone : action.isDone
    };
  }

  const parseActionCard = (action) => {
    return {
      id:action.id,
      cardTitle: action.title,
      cardContent: action.content,
      isDone: !!action.doneDate,
      doStartDate: action.doStartDate
    }
  }

  const indexOfCache = (cmmd, action) => {
    return actionCache[cmmd].findIndex(act => act.id === action.id);
  }

  const addNewAction = () => {
    let newAction = initACtion();
    actions.value.unshift(newAction);
    actionCache.insert.push(newAction)
  }

  const loadActions = async () => {
    const res = await getActions();

    actions.value = toActionCardList(res.data);
  };

  const toActionCardList = (actionList) => {
    if(!actionList){
      return [initACtion()];
    }
    return actionList.map( action => (parseActionCard(action)));
  };

  onMounted(() =>{
    loadActions();
  });

</script>
