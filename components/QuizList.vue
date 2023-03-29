<template>
  <v-list lines="two" :class="`ps-${6 * indent_level}`">
    <template v-for="(quiz, idx) in quizzes" :key="quiz.id">
      <QuizListItem :quiz="quiz"></QuizListItem>
      <v-divider v-if="idx !== quizzes.length - 1"></v-divider>
    </template>
  </v-list>
</template>
<script>
export default defineNuxtComponent({
  props: {
    quizzes: {
      type: Array,
      required: true,
    },
    indent_level: {
      type: Number,
      default: 0,
      required: false,
    },
  },
});
</script>
