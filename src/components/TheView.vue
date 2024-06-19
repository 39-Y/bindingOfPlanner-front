<template>
  <v-container class="">
    <v-row no-gutters>
      <v-col
        v-for="post in posts"
        :key="post"
        cols="12"
        sm="4"
      >
        <v-sheet class="ma-2 pa-2">
          <ActionCard :cardTitle="post.cardTitle" 
                      :cardContent="post.cardContent" 
                      :isDone="post.isDone" 
                      :cardTag="post.cardTag">
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
    getPosts();
  });

  const posts = ref([
    {cardTitle: 'Title1', cardContent:'content1', isDone: true},
    {cardTitle: 'Title2', cardContent:'content2', isDone: true, cardTag: "Project"},
    {cardTitle: 'Title3', cardContent:'content3', isDone: false},
    {cardTitle: 'Title4', cardContent:'content4', isDone: true},
    {cardTitle: 'Title5', cardContent:'content5', isDone: true},
    {cardTitle: 'Title6', cardContent:'content6', isDone: false},
  ]);

  const getPosts = async () => {
    const res = await getActions();
    posts.value = transformDataList(res.data);
  };

  const transformDataList = (actionList) => {
    return actionList.map( action => ({
      cardTitle: action.title, 
      cardContent: action.content, 
      isDone: false
    }));
  };
  
</script>

<style lang="scss" scoped>

</style>