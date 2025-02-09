<template>
{{actionCache}}
  <div>
    <v-container class="">
      <v-col cols="auto">
        <v-btn density="compact" icon="mdi-plus" @click="addNewActionCard"></v-btn>
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
                <ActionCardComp :action="action"
                            @update:action="updateActionsAndCache(idx, action)"
                            @delete:action="deleteActionsAndCache(idx, action)"
                >
                </ActionCardComp>
              </VueDraggableNext>
            </v-sheet>
          </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import {onMounted, reactive, ref} from "vue";
  import ActionCard from "@/model/ActionCard";
  import ActionCardComp from "@/components/ActionCard.vue";
  import { getActions} from "@/api/actions";
  import { VueDraggableNext } from 'vue-draggable-next'
  import ActionCache from "@/model/ActionCache";

  const actionCache = reactive(new ActionCache());
  const actions = ref([]);

  const updateActionsAndCache = (idx, actionCard) => {
    updateActions(idx, actionCard);
    updateCacheByModifiedCard(actionCard);
    console.log(actionCache)
  }

  const updateActions = (idx, action) => {
    actions.value[idx] = action;
  }

  const updateCacheByModifiedCard = (actionCard) => {
    const cmmd = actionCard.isNew() ? 'insert' : 'update';
    const parsingData = actionCard.parseActionData();

    actionCache.put(cmmd, parsingData);
  }

  const deleteActionsAndCache = (idx, action) => {
    deleteActions(idx);
    updateCacheByDeletedCard(action);

  }

  const deleteActions = (idx) => {
    actions.value.splice(idx, 1)
  }

  const updateCacheByDeletedCard = (actionCard) => {
    const parsingData = actionCard.parseActionData();
    let clearCmmd = actionCard.isNew()? 'insert':'update';

    actionCache.clear(clearCmmd, parsingData, actionCard.isNew());
  }

  const addNewActionCard = () => {
    let newActionCard = ActionCard.builder().build();
    actions.value.unshift(newActionCard);
    actionCache.add('insert', newActionCard.parseActionData());
  }

  const loadActions = async () => {
    const res = await getActions();

    actions.value = parseActionCardList(res.data);
    console.log("actions:",actions.value)
  };

  const parseActionCardList = (actionDataList) => {
    if(!actionDataList){
      return [];
    }
    return actionDataList.map(data => new ActionCard(data));
  };

  const saveActions = ()=>{
    console.log("actionCache:",actionCache)

  }

  onMounted(() =>{
    loadActions();
  });

</script>
