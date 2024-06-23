<template>
  <v-card color="indigo">
    <v-chip
      class="ma-2"
      color="pink"
      label
    >
      <v-icon icon="mdi-label" start></v-icon>
      <span>{{ action.cardTag === 'Action'? '⚡Action' : '🚀Project' }}</span>
    </v-chip>
    <div>
      <v-card-title v-if="!isTitleEditing" @click="editTitle">{{ action.cardTitle }}</v-card-title>
      
      <v-text-field
              v-if="isTitleEditing"
              @blur="stopTitleEdit" 
              @keyup.enter="stopTitleEdit" 
              ref="inputField"
              label="Solo"
              v-model="action.cardTitle"
              variant="solo"
              class="opacity-40"
            ></v-text-field>
    </div>
    <div>
      <v-card-subtitle v-if="!isDoDateEditing" @click="editDoDate">
        {{ action.doStartDate || 'when?' }}
      </v-card-subtitle>
      <v-date-input v-if="isDoDateEditing" 
                    @blur="stopDoDateEdit"
                    clearable 
                    label="Date input" 
                    variant="solo" 
                    v-model="action.doStartDate"
                    ></v-date-input>
    </div>
    <v-card-text>{{ action.cardContent }}</v-card-text>
    <v-checkbox
            color="error"
            label="isDone"
            v-model="action.isDone"
          ></v-checkbox>
  </v-card>

</template>

<script setup>
import { defineProps, nextTick, ref, watch } from 'vue';
import { fa } from 'vuetify/locale';
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


const emit = defineEmits(['update:action']);

watch( props.action,(newAction) => {
  newAction['idx'] = props.idx; 
  console.dir(newAction);
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
}

const stopDoDateEdit = () => {
  isDoDateEditing.value = false;
}

</script>

<style lang="scss" scoped>

</style>