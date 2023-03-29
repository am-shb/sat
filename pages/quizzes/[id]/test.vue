<script setup>
const route = useRoute();
const quiz_id = route.params.id;
const quiz_content = await queryContent(`/quizzes/${quiz_id}`).find();
let quiz = quiz_content.find((c) => c._path.endsWith("quiz"));
for (let i = 0; i < quiz.questions.length; i++) {
  const qid = quiz.questions[i].id;
  quiz.questions[i].question = quiz_content.find((c) =>
    c._path.endsWith(`${qid}/question`)
  );
  quiz.questions[i].solution = quiz_content.find((c) =>
    c._path.endsWith(`${qid}/solution`)
  );
  quiz.questions[i].hint = quiz_content.find((c) =>
    c._path.endsWith(`${qid}/hint`)
  );
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
