<script setup>
const route = useRoute();
const quizId = route.params.id;
const quiz = await queryContent(`/quizzes/${quizId}/quiz`).findOne();
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center">
        <h1>Well done!</h1>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <ContentDoc
          :path="`quizzes/${quizId}/outro`"
          class="md-content"
        ></ContentDoc>

        <v-alert color="info" v-if="quiz.programming_task">
          This quiz contains a programming task. Use the button below to go to
          the programming notebook.
        </v-alert>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="text-center">
        <v-btn color="primary" to="/start"> Take another quiz </v-btn>
        <v-btn
          v-if="quiz.programming_task"
          color="primary"
          :href="quiz.programming_task"
          target="_blank"
        >
          Open programming notebook
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
