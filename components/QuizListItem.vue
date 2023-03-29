<template>
  <v-list-item :title="quiz.title" :subtitle="quiz.description">
    <template v-slot:prepend>
      <v-avatar>
        <v-img :src="`/quiz_logos/${quiz.logo}`" />
      </v-avatar>
    </template>

    <template v-slot:append>
      <v-btn color="primary" :href="`/quizzes/${quiz.id}/`"> Start Test </v-btn>
    </template>
  </v-list-item>
</template>
<script>
export default defineNuxtComponent({
  props: {
    quiz: {
      type: Object,
      required: true,
    },
  },
});
</script>
