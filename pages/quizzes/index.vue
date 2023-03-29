<script setup>
const { data: quiz_meta } = await useAsyncData("quiz_meta", () =>
  queryContent("/meta").findOne()
);
</script>

<template>
  <v-container>
    <h1>Available Assessments</h1>
    <p>The vector institue provides a variety of assessments ...</p>
    <v-list lines="two">
      <template v-for="quiz in quiz_meta.quizzes" :key="quiz.id">
        <v-list-item :title="quiz.title" :subtitle="quiz.description">
          <template v-slot:prepend>
            <v-avatar>
              <v-img :src="`/quiz_logos/${quiz.logo}`" />
            </v-avatar>
          </template>

          <template v-slot:append>
            <v-btn color="primary" :href="`/quizzes/${quiz.id}/`">
              Start Test
            </v-btn>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </template>
    </v-list>
  </v-container>
</template>
