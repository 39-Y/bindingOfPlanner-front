<template>
{{actionCache}}
  <div>
    <v-container class="">
      <v-col cols="auto">
        <v-btn density="compact" icon="mdi-plus" @click="addNewAction"></v-btn>
        <v-btn  density="compact" prepend-icon="mdi-check-circle" @click="saveActions">
          <template v-slot:prepend>
            <v-icon color="success"></v-icon>
          </template>
        </v-btn>
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
import {onMounted, reactive, ref} from "vue";
  import ActionCard from "@/components/ActionCard.vue";
  import { getActions} from "@/api/actions";
  import { VueDraggableNext } from 'vue-draggable-next'
  import ActionCache from "@/model/ActionCache";

  const actionCache = reactive(new ActionCache());
  const actions = ref([]);
  const initActionCard = () => {
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
    console.log(actionCache)
  }

  const updateActions = (idx, action) => {
    actions.value[idx] = action;
  }

  const updateCacheByModifiedCard = (actionCard) => {
    const cmmd = isNewAction(actionCard) ? 'insert' : 'update';
    const parsingData = parseActionCache(actionCard);

    actionCache.put(cmmd, parsingData);
    console.log("updateCache:",actionCache)
  }

  const deleteActionsAndCache = (idx, action) => {
    deleteActions(idx);
    updateCacheByDeletedCard(action);

  }

  const deleteActions = (idx) => {
    actions.value.splice(idx, 1)
  }

  const updateCacheByDeletedCard = (actionCard) => {
    const parsingData = parseActionCache(actionCard);
    let clearCmmd = isNewAction(actionCard)? 'insert':'update';

    //update or insert cache에서 action 삭제
    actionCache.clear(clearCmmd, parsingData, isNewAction((actionCard)))
    console.log("deleteCache:",actionCache)
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
    let newActionCard = initActionCard();
    actions.value.unshift(newActionCard);
    actionCache.add('insert', parseActionCache(newActionCard))
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

  const saveActions = ()=>{

  }

  onMounted(() =>{
    loadActions();
  });

</script>
