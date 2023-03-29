<script setup>
const meta = await queryContent("/meta").findOne();
const tab = ref();

for (let i = 0; i < meta.modules.length; i++) {
  const module_quiz_ids = meta.modules[i].quiz_ids;
  meta.modules[i].quizzes = meta.quizzes.filter((q) =>
    module_quiz_ids.includes(q.id)
  );
}
</script>
<template>
  <v-container>
    <h1>Available Assessments</h1>
    <p class="mb-6">
      The vector institue provides a variety of assessments ...
    </p>
    <v-card>
      <v-tabs fixed-tabs bg-color="indigo-darken-2" v-model="tab">
        <v-tab value="modules"> Modules </v-tab>
        <v-tab value="quizzes"> Quizzes </v-tab>
      </v-tabs>
      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="modules">
            <ModuleList :modules="meta.modules"></ModuleList>
          </v-window-item>
          <v-window-item value="quizzes">
            <QuizList :quizzes="meta.quizzes"></QuizList>
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    <!-- This is required for the prerenderer to find all quizzes -->
    <div class="d-none">
      <NuxtLink
        :to="`/quizzes/${quiz.id}`"
        v-for="quiz in meta.quizzes"
      ></NuxtLink>
    </div>
  </v-container>
</template>
