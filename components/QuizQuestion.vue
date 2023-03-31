<template>
  <v-row no-gutters class="fill-height align-center">
    <v-col
      cols="12"
      md="6"
      :class="{ 'fit-to-window': $vuetify.display.mdAndUp }"
    >
      <v-card elevation="0">
        <v-card-text>
          <ContentRenderer :value="question" class="md-content" />
        </v-card-text>
      </v-card>
    </v-col>

    <v-divider :vertical="$vuetify.display.mdAndUp"></v-divider>

    <v-col
      cols="12"
      md="6"
      :class="{ 'fit-to-window': $vuetify.display.mdAndUp }"
    >
      <v-card elevation="0">
        <v-card-text>
          <v-btn
            class="my-2 text-none quiz-choice"
            :class="{ 'justify-start': nocenter, 'text-start': nocenter }"
            v-for="(choice, idx) in choices"
            :key="idx"
            block
            @click="answer_selected(idx)"
            variant="tonal"
            :color="button_color(idx)"
          >
            <!-- {{ choice }} -->
            <span v-html="nl2br(choice)"></span>
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
      required: false,
    },
    hint: {
      type: Object,
      required: false,
    },
    choices: {
      type: Array,
      required: true,
    },
    answer_index: {
      type: Number,
      required: true,
    },
    selected_choice: {
      type: Number,
      required: false,
    },
    nocenter: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["answered"],
  data() {
    return {
      show_hint: false,
      show_solution: false,
    };
  },
  methods: {
    toggle_hint() {
      this.show_hint = !this.show_hint;
    },
    toggle_solution() {
      this.show_solution = !this.show_solution;
    },
    answer_selected(idx) {
      this.$emit("answered", idx);
    },
    button_color(idx) {
      if (this.selected_choice === null) {
        return "secondary";
      } else if (this.selected_choice === idx) {
        if (this.selected_choice === this.answer_index) {
          return "success";
        } else {
          return "error";
        }
      } else {
        return "secondary";
      }
    },
  },
});
</script>
<style>
.fit-to-window {
  max-height: calc(100vh - 124px);
  overflow-y: auto;
}
pre {
  background-color: #18181b;
  border-radius: 5px;
  padding: 10px;
}
.quiz-choice {
  height: auto !important;
}
.quiz-choice .v-btn__content {
  white-space: normal;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
