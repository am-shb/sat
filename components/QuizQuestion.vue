<template>
  <v-row no-gutters class="fill-height align-center">
    <v-col cols="12" md="6">
      <v-card elevation="0">
        <v-card-text>
          <ContentRenderer :value="question" class="md-content" />
        </v-card-text>
      </v-card>
    </v-col>

    <v-divider :vertical="$vuetify.display.mdAndUp"></v-divider>

    <v-col cols="12" md="6">
      <v-card elevation="0">
        <v-card-text>
          <v-btn
            class="my-2"
            v-for="(choice, idx) in choices"
            :key="idx"
            block
            @click="answer_selected(idx)"
            variant="outlined"
            color="secondary"
          >
            {{ choice }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-dialog v-model="show_hint" width="auto">
    <v-card>
      <v-card-text>
        <ContentRenderer :value="hint" class="md-content" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="toggle_hint">Close Hint</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="show_solution" width="auto">
    <v-card>
      <v-card-text>
        <ContentRenderer :value="solution" class="md-content" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click="toggle_solution">
          Close Solution
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

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
          <v-btn color="secondary" @click="incorrect_dialog = false">
            Stay Here
          </v-btn>
          <v-btn color="secondary" @click="incorrect_dialog = false">
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
          <v-btn color="secondary" @click="toggle_hint">Show Hint</v-btn>
          <v-btn color="secondary" @click="toggle_solution">
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
    question: {
      type: Object,
      required: true,
    },
    solution: {
      type: Object,
      required: true,
    },
    hint: {
      type: Object,
      required: true,
    },
    choices: {
      type: Array,
      required: true,
    },
    answer_index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      show_hint: false,
      show_solution: false,
      selected_choice: null,
      correct_dialog: false,
      incorrect_dialog: false,
    };
  },
  methods: {
    toggle_hint() {
      this.incorrect_dialog = false;
      this.show_hint = !this.show_hint;
    },
    toggle_solution() {
      this.incorrect_dialog = false;
      this.show_solution = !this.show_solution;
    },
    answer_selected(idx) {
      this.selected_choice = idx;
      if (this.selected_choice == this.answer_index) {
        this.correct_dialog = true;
      } else {
        this.incorrect_dialog = true;
      }
    },
    next_question() {
      this.correct_dialog = false;
      this.$parent.next_question();
    },
  },
  computed: {
    last_question() {
      return this.$parent.last_question;
    },
  },
  mounted() {},
});
</script>
<style>
pre {
  background-color: #18181b;
  border-radius: 5px;
  padding: 10px;
}
</style>
