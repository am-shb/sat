<template>
  <div :class="$vuetify.display.mdAndUp ? 'fill-height' : ''">
    <QuizQuestion
      :question="current_question.question"
      :choices="current_question.choices"
      :hint="current_question.hint"
      :solution="current_question.solution"
      :answer_index="current_question.answer_index"
      :nocenter="!!current_question.nocenter"
      :selected_choice="selected_answers[current_question_index]"
      @answered="answer_selected"
      ref="question"
    ></QuizQuestion>

    <v-footer app color="indigo-darken-2">
      <div class="align-center hidden-xs d-flex-sm-and-up px-2">
        {{ current_question_index + 1 }}/{{ total_questions }}
      </div>
      <div style="margin: auto" class="hidden-xs"></div>
      <v-btn
        v-if="!first_question"
        @click="previous_question"
        variant="text"
        size="large"
      >
        <v-icon>mdi-chevron-left</v-icon>
        <v-tooltip activator="parent" location="top"
          >Previous Question</v-tooltip
        >
      </v-btn>
      <v-btn
        v-if="current_question.hint"
        @click="toggle_hint"
        variant="text"
        size="large"
      >
        <v-icon>mdi-help-circle</v-icon>
        <v-tooltip activator="parent" location="top">Show Hint</v-tooltip>
      </v-btn>
      <v-btn
        v-if="current_question.solution"
        @click="toggle_solution"
        variant="text"
        size="large"
      >
        <v-icon>mdi-check-circle</v-icon>
        <v-tooltip activator="parent" location="top">View Solution</v-tooltip>
      </v-btn>
      <v-btn
        v-if="!last_question"
        @click="next_question"
        variant="text"
        size="large"
      >
        <v-icon>mdi-chevron-right</v-icon>
        <v-tooltip activator="parent" location="top">Next Question</v-tooltip>
      </v-btn>
    </v-footer>
  </div>

  <v-dialog v-model="correct_dialog" width="auto">
    <v-card>
      <v-card-text class="text-center">
        <v-icon color="success" size="120">mdi-check-circle</v-icon>
        <br />
        <span>You selected the correct answer!</span>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="py-0">
        <v-btn-group variant="text" divided>
          <v-btn color="secondary" @click="correct_dialog = false">
            Stay Here
          </v-btn>
          <v-btn
            color="secondary"
            v-if="current_question.solution"
            @click="toggle_solution"
          >
            View Solution
          </v-btn>
          <v-btn v-if="last_question" color="secondary" @click="next_question">
            Finish Quiz
          </v-btn>
          <v-btn v-else color="secondary" @click="next_question">
            Next Question
          </v-btn>
        </v-btn-group>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="incorrect_dialog" width="400">
    <v-card>
      <v-card-text class="text-center">
        <v-icon color="error" size="120">mdi-close-circle</v-icon>
        <br />
        <span>The selected answer is not correct!</span>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="justify-center py-0">
        <v-btn-group variant="text" divided>
          <v-btn
            color="secondary"
            v-if="current_question.hint"
            @click="toggle_hint"
            >Show Hint</v-btn
          >
          <v-btn
            color="secondary"
            v-if="current_question.solution"
            @click="toggle_solution"
          >
            View Solution
          </v-btn>
          <v-btn color="secondary" @click="incorrect_dialog = false">
            Try Again
          </v-btn>
        </v-btn-group>
      </v-card-actions>
    </v-card>
  </v-dialog>
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
      selected_answers: Array(this.questions.length),
      correct_dialog: false,
      incorrect_dialog: false,
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
    ...mapStores(useQuizStore),
    quizState() {
      return this.quizStore.quizState(this.id);
    },
  },
  methods: {
    next_question() {
      this.close_dialogs();
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
    answer_selected(answer) {
      this.selected_answers[this.current_question_index] = answer;
      if (answer === this.current_question.answer_index) {
        this.correct_dialog = true;
      } else {
        this.incorrect_dialog = true;
      }
    },
    close_dialogs() {
      this.correct_dialog = false;
      this.incorrect_dialog = false;
    },
    ...mapActions(useQuizStore, [
      "createQuizState",
      "setQuizAnswer",
      "setQuizCurrentQuestion",
    ]),
  },
  watch: {
    current_question_index(newVal) {
      this.setQuizCurrentQuestion(this.id, newVal);
    },
    selected_answers(newVal) {
      this.setQuizAnswer(this.id, newVal);
    },
  },
  mounted() {
    if (this.quizState) {
      this.selected_answers = this.quizState.answers;
      this.current_question_index = this.quizState.currentQuestion;
    } else {
      this.createQuizState(this.id, this.questions.length);
    }
  },
});
</script>
