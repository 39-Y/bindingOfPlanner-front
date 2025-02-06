<template>
  <v-card color="indigo">
    <v-card-item class="">
      <v-chip
        class="ma-2"
        color="pink"
        label
      >
        <v-icon icon="mdi-label" start></v-icon>
        <span>🚀Project</span>
      </v-chip>
      <template v-slot:append>

        <div class="d-flex justify-space-around">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
            </template>
            <v-list density="compact">
              <v-list-item
                v-for="(item, i) in cardMenu"
                :key="i"
                :value="i"
                @click="item.method"
              >
                <template v-slot:prepend>
                  <v-icon :class="item.icon" size="x-small"></v-icon>
                </template>
                <v-list-item-title class="text-caption">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </div>
      </template>

    </v-card-item>

    <div>

      <v-card-title v-if="!isTitleEditing"
                    @click="editTitle"
                    data-testid="action-title"
      >{{ actionCard.cardTitle }}</v-card-title>

      <v-text-field
              v-if="isTitleEditing"
              @blur="stopEditAndEmit"
              @keydown.enter="handleEnter"
              ref="inputField"
              label="title"
              v-model="actionCard.cardTitle"
              variant="solo"
              class="opacity-40 actionCardTitle"
              data-testid="action-title-input"
              maxlength="120"
            ></v-text-field>
    </div>
    <div>
      <v-card-subtitle v-if="!isDoDateEditing" @click="editDoDate">
        {{ cardPlanDate || 'when?' }}
      </v-card-subtitle>
      <v-date-input v-if="isDoDateEditing"
                    @blur="stopEditAndEmit"
                    ref="dateInputField"
                    clearable
                    @click:clear="clearDateInput"
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
    <v-card-text>{{ actionCard.cardContent || '-' }}</v-card-text>
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
const emit = defineEmits(['update:action', 'delete:action']);

const actionCard = ref(props.action);
const isChange = ref(false);
const isTitleEditing = ref(false);
const isDoDateEditing = ref(false);
const inputField = ref(null);
const dateInputField = ref(null);
const marker = ref(false)
const cardPlanDate = ref("");
const cardMenu = [
  { title: 'Delete',
    icon:'fas fa-trash-can',
    method: () => emitDeleteAction()
  },
  { title: 'Duplicate',
    icon:'fas fa-clone',
    method: () => emitDuplicateAction()
  },
  { title: 'Move to',
    icon: 'fas fa-arrows-turn-right',
    method: () => emitMoveToAction()
  },
];

const emitDeleteAction = () => {
  emit('delete:action', actionCard.value);
};
const emitDuplicateAction = () => {
  console.log("ho")

};
const emitMoveToAction = () => {
  console.log("ho")

}

const toggleMarker = () => {
  marker.value = !marker.value
}


const handleEnter = (event) => {
  event.target.blur();
}

const clearDateInput = () => {
  actionCard.value.cardPlanDate = undefined;
  cardPlanDate.value = '';
  emitAction();
}

const editTitle = async () => {
  isTitleEditing.value = true;
  await nextTick;
  inputField.value.focus();
}

const editDoDate = async () => {
  isDoDateEditing.value = true;
  await nextTick;
  dateInputField.value.$el.querySelector("input").focus();
}
const stopEditAndEmit = () => {
  isTitleEditing.value = false;
  isDoDateEditing.value = false;

  if(actionCard.value.cardPlanDate){
    cardPlanDate.value = format(actionCard.value.cardPlanDate, 'yyyy/MM/dd');
  }

  emitAction();
  console.log("actionCard:", actionCard.value);
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
