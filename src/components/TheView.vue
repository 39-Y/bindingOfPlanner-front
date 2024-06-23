<template>
  <v-container class="">
    <v-row no-gutters>
      <v-col
        v-for="(action,idx) in actions"
        :key="action"
        cols="12"
        sm="4"
      >
        <v-sheet class="ma-2 pa-2">
          <ActionCard :action="action" 
                      :idx="idx"
                      @update:action="updateAction">
          </ActionCard>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import ActionCard from "./ActionCard.vue";
  import { getActions} from "@/api/actions";

  onMounted(() =>{
    loadActions();
  });

  const actions = ref([]);
  const updateActionSet = new Set();

  const updateAction = (n) => {
    actions.value[n.idx] = n;
    updateActionSet.add({
      id: n.id,
      title: n.cardTitle,
      content: n.cardContent,
      isDone : n.isDone
    });
  }

  const loadActions = async () => {
    const res = await getActions();
    actions.value = toActionCardList(res.data);
  };

  const toActionCardList = (actionList) => {
    return actionList.map( action => ({
      id:action.id,
      cardTitle: action.title, 
      cardContent: action.content, 
      isDone: action.doneDate? true : false,
      doStartDate: action.doStartDate
    }));
  };
  
</script>

<style lang="scss" scoped>

</style>