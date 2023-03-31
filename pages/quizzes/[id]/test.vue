<script setup>
import markdownParser from "@nuxt/content/transformers/markdown";

const route = useRoute();
const quiz_id = route.params.id;
const quiz_content = await queryContent(`/quizzes/${quiz_id}`).find();
const content_types = ["question", "solution", "hint"];

let quiz = quiz_content.find((c) => c._path.endsWith("quiz"));

for (let i = 0; i < quiz.questions.length; i++) {
  const qid = quiz.questions[i].id;
  for (let content_type of content_types) {
    if (quiz.questions[i][content_type]) {
      quiz.questions[i][content_type] = await markdownParser.parse(
        `${qid}/${content_type}`,
        quiz.questions[i][content_type]
      );
    } else {
      quiz.questions[i][content_type] = quiz_content.find((c) =>
        c._path.endsWith(`${qid}/${content_type}`)
      );
    }
  }
}
</script>
<template>
  <Quiz
    :id="quiz.id"
    :title="quiz.title"
    :questions="quiz.questions"
    :programming_task="quiz.programming_task"
  ></Quiz>
</template>
