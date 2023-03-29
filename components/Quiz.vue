<template>
  <div :class="$vuetify.display.mdAndUp ? 'fill-height' : ''">
    <QuizQuestion
      :question="current_question.question"
      :choices="current_question.choices"
      :hint="current_question.hint"
      :solution="current_question.solution"
      :answer_index="current_question.answer_index"
      ref="question"
    ></QuizQuestion>

    <v-footer app color="secondary">
      <div class="align-center hidden-xs d-flex-sm-and-up px-2">
        {{ current_question_index + 1 }}/{{ total_questions }}
      </div>
      <div style="margin: auto" class="hidden-xs"></div>
      <v-btn
        :disabled="first_question"
        @click="previous_question"
        variant="text"
        size="large"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <v-tooltip activator="parent" location="top"
          >Previous Question</v-tooltip
        >
      </v-btn>
      <v-btn @click="toggle_hint" variant="text" size="large">
        <v-icon>mdi-help-circle</v-icon>
        <v-tooltip activator="parent" location="top">Show Hint</v-tooltip>
      </v-btn>
      <v-btn @click="toggle_solution" variant="text" size="large">
        <v-icon>mdi-check-circle</v-icon>
        <v-tooltip activator="parent" location="top">View Solution</v-tooltip>
      </v-btn>
      <v-btn
        :disabled="last_question"
        @click="next_question"
        variant="text"
        size="large"
      >
        <v-icon>mdi-chevron-right</v-icon>
        <v-tooltip activator="parent" location="top">Next Question</v-tooltip>
      </v-btn>
    </v-footer>
  </div>
</template>
<script>
export default defineNuxtComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    questions: {
      type: Array,
      required: true,
    },
    programming_task: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      current_question_index: 0,
      show_hint: false,
    };
  },
  computed: {
    current_question() {
      return this.questions[this.current_question_index];
    },
    total_questions() {
      return this.questions.length;
    },
    first_question() {
      return this.current_question_index == 0;
    },
    last_question() {
      return this.current_question_index == this.questions.length - 1;
    },
  },
  methods: {
    next_question() {
      this.current_question_index += 1;
    },
    previous_question() {
      this.current_question_index -= 1;
    },
    toggle_hint() {
      this.$refs.question.toggle_hint();
    },
    toggle_solution() {
      this.$refs.question.toggle_solution();
    },
  },
});
</script>
