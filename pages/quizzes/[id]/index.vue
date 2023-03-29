<script setup>
const route = useRoute();
const quiz = await queryContent(`/quizzes/${route.params.id}/quiz`).findOne();
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>{{ quiz.title }}</h1>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <ContentDoc :path="`quizzes/${route.params.id}/intro`"></ContentDoc>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="text-center">
        <v-btn color="primary" :to="`/quizzes/${route.params.id}/test`">
          Begin test
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
