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
              @blur="stopTitleEditAndEmit"
              @keydown.enter="handleEnter"
              ref="inputField"
              label="Solo"
              v-model="actionCard.cardTitle"
              variant="solo"
              class="opacity-40"
            ></v-text-field>
    </div>
    <div>
      <v-card-subtitle v-if="!isDoDateEditing" @click="editDoDate">
        {{ cardPlanDate || 'when?' }}
      </v-card-subtitle>
      <v-date-input v-if="isDoDateEditing"
                    @blur="stopDoDateEditAndEmit"
                    clearable
                    show-adjacent-months
                    label="Date input"
                    variant="solo"
                    placeholder="yyyy/mm/dd"
                    prepend-icon=""
                    prepend-inner-icon="$calendar"
                    v-model="actionCard.cardPlanDate"
                    :append-inner-icon="marker ? 'mdi-calendar-outline' : 'mdi-calendar-multiple'"
                    @click:append-inner="toggleMarker"
                    :multiple="marker ? 'range' : null"
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

const props = defineProps(
{  action: {
    type: Object,
    required: true
  },
});
const emit = defineEmits(['update:action']);

const actionCard = ref(props.action);
const isChange = ref(false);
const isTitleEditing = ref(false);
const isDoDateEditing = ref(false);
const inputField = ref(null);
const marker = ref<Boolean>false
const cardPlanDate = ref("");

const toggleMarker = () => {
  marker.value = !marker.value
}


const handleEnter = (event) => {
  event.target.blur();
}

const editTitle = async () => {
  isTitleEditing.value = true;
  await nextTick;
  inputField.value.focus();
}

const editDoDate = () => {
  isDoDateEditing.value = true;
}

const stopTitleEditAndEmit = () => {
  isTitleEditing.value = false;
  emitAction();
  console.log("actionCard:", actionCard.value);
}

const stopDoDateEditAndEmit = () => {
  isDoDateEditing.value = false;
  if(actionCard.value.cardPlanDate){
    cardPlanDate.value = format(actionCard.value.cardPlanDate, 'yyyy/MM/dd');
  }
  emitAction();
}

const emitAction = () =>{
  if(isChange.value){
    emit('update:action', actionCard.value);
    isChange.value = false;
  }
}

watch( actionCard.value, () => {
  if(!(isTitleEditing.value || isDoDateEditing.value)){
    emit('update:action', actionCard.value);
  }else{
    isChange.value = true;
  }
});


</script>

<style lang="scss" scoped>

</style>
