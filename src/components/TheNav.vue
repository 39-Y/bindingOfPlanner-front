<template>
  <v-card
    color="grey-lighten-4"
    height="200px"
    rounded="0"
    flat
  >
    <v-toolbar color="deep-purple" density="compact">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
      <v-btn>
        Home
      </v-btn>
      <v-btn>
        <span>about</span>
      </v-btn>
      <v-spacer></v-spacer>


      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  setup () {
    

    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>