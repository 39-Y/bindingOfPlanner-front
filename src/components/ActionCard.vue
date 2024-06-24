<template>
  <v-card color="indigo">
    <v-chip
      class="ma-2"
      color="pink"
      label
    >
      <v-icon icon="mdi-label" start></v-icon>
      <span>{{ actionCard.cardTag === 'Action'? '⚡Action' : '🚀Project' }}</span>
    </v-chip>
    <div>
      <v-card-title v-if="!isTitleEditing" @click="editTitle">{{ actionCard.cardTitle }}</v-card-title>
      
      <v-text-field
              v-if="isTitleEditing"
              @blur="stopTitleEdit" 
              @keyup.enter="stopTitleEdit" 
              ref="inputField"
              label="Solo"
              v-model="actionCard.cardTitle"
              variant="solo"
              class="opacity-40"
            ></v-text-field>
    </div>
    <div>
      <v-card-subtitle v-if="!isDoDateEditing" @click="editDoDate">
        {{ doStartDate || 'when?' }}
      </v-card-subtitle>
      <v-date-input v-if="isDoDateEditing" 
                    class="opacity-40"
                    @blur="stopDoDateEdit"
                    clearable 
                    show-adjacent-months
                    label="Date input" 
                    variant="solo" 
                    placeholder="yyyy/mm/dd"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    v-model="actionCard.doStartDate"
                    :append-inner-icon="marker ? 'mdi-calendar-outline' : 'mdi-calendar-multiple'"
                    @click:append-inner="toggleMarker"
                    ></v-date-input>
    </div>
    <v-card-text>{{ actionCard.cardContent }}</v-card-text>
    <v-checkbox
            color="error"
            label="isDone"
            v-model="actionCard.isDone"
          ></v-checkbox>
  </v-card>

</template>

<script setup>
import { defineProps, nextTick, ref, watch } from 'vue';
import { format } from 'date-fns';

const isTitleEditing = ref(false);
const isDoDateEditing = ref(false);
const inputField = ref(null);
const props = defineProps(
{  action: {
    type: Object,
    required: true
  },
  idx:{
    type: Number,
    required: true
  }
});


const marker = ref(false)
const actionCard = ref(props.action);
const doStartDate = ref("");
const toggleMarker = () => {
  marker.value = !marker.value
}



const emit = defineEmits(['update:action']);

watch( actionCard.value, (newAction) => {
  newAction['idx'] = props.idx; 
  console.log("newAction11:",newAction);
  emit('update:action', newAction);
});

const editTitle = async () => {
  isTitleEditing.value = true;
  await nextTick;
  inputField.value.focus();
}

const editDoDate = () => {
  isDoDateEditing.value = true;
}

const stopTitleEdit = () => {
  isTitleEditing.value = false;
  console.log("actionCard:", actionCard.value);
}

const stopDoDateEdit = () => {
  isDoDateEditing.value = false;
  if(actionCard.value.doStartDate){
    doStartDate.value = format(actionCard.value.doStartDate, 'yyyy/MM/dd');
  }
}

</script>

<style lang="scss" scoped>

</style>