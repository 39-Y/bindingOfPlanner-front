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
      <v-card-title v-if="!isEditing" @click="startEditing">{{ props.action.cardTitle }}</v-card-title>
      <v-card-subtitle>
        {{ action.doStartDate || 'when?' }}
      </v-card-subtitle>
      <v-text-field
              v-if="isEditing"
              @blur="stopEditing" 
              @keyup.enter="stopEditing" 
              ref="inputField"
              label="Solo"
              v-model="action.cardTitle"
              variant="solo"
              class="opacity-40"
            ></v-text-field>
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
const isEditing = ref(false);
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

const startEditing = async () => {
  isEditing.value = true;
  await nextTick;
  inputField.value.focus();

}

const stopEditing = () => {
  isEditing.value = false;
}

</script>

<style lang="scss" scoped>

</style>