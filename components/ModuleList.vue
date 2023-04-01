<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="module in modules" :key="module.id">
      <v-expansion-panel-title>
        <v-list-item :title="module.title" :subtitle="module.description">
          <template v-slot:prepend>
            <v-avatar>
              <v-img :src="`/assets/module_logos/${module.id}.png`" />
            </v-avatar>
          </template>
        </v-list-item>
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <QuizList :quizzes="module.quizzes" :indent_level="1"></QuizList>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default defineNuxtComponent({
  props: {
    modules: {
      type: Array,
      required: true,
    },
  },
});
</script>
