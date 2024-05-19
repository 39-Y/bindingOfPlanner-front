<template>
  <v-container class="">
    <v-row no-gutters>
      <v-col
        v-for="n in 6"
        :key="n"
        cols="12"
        sm="4"
      >
        <v-sheet class="ma-2 pa-2">
          <ActionCard></ActionCard>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import ActionCard from "./ActionCard.vue"
</script>

<style lang="scss" scoped>

</style>