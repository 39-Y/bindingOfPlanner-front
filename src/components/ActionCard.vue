<template>
  <v-card color="indigo">
    <v-chip
      class="ma-2"
      color="pink"
      label
    >
      <v-icon icon="mdi-label" start></v-icon>
      <span>{{ cardTag === 'Action'? '⚡Action' : '🚀Project' }}</span>
    </v-chip>
    <v-card-title>{{ cardTitle }}</v-card-title>
    <v-card-text>{{ cardContent }}</v-card-text>
    <v-checkbox
            color="error"
            label="isDone"
            :model-value="isDone"
          ></v-checkbox>
  </v-card>

</template>

<script>
export default {
  props: {
    cardTitle: {
      type: String,
      required: true

    }, 
    cardContent:{
      type: String,
      required: true
    },
    cardTag:{
      type: String,
      default: 'Action'
    },
    isDone:{
      type: Boolean,
      default: true
    },
  },
  setup () {
    const updateIsDone = (v) => {
      this.$emit('update:checked', v)
    };

    return {updateIsDone}
  }
}
</script>

<style lang="scss" scoped>

</style>