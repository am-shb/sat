<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>{{ quiz.title }}</h1>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <ContentDoc
          :path="`quizzes/${quizId}/intro`"
          class="md-content"
        ></ContentDoc>

        <ClientOnly>
          <v-alert v-if="quizState && quizState.lastVisited" color="info">
            You last visited this test on:
            {{ new Date(quizState.lastVisited).toLocaleString() }}
          </v-alert>
          <v-alert
            v-if="quizState && quizState.completed"
            color="success"
            class="mt-3"
          >
            You already completed this test. You can retake it if you want.
          </v-alert>
        </ClientOnly>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="text-center">
        <ClientOnly>
          <v-btn color="primary" :to="`/quizzes/${quizId}/test`">
            {{ quizState && quizState.lastVisited ? "Resume" : "Begin" }} test
          </v-btn>
          <v-btn
            color="primary"
            v-if="quizState && quizState.lastVisited"
            @click="reset_progress"
          >
            Reset progress
          </v-btn>
        </ClientOnly>

        <!-- This is required for the prerenderer to find the test and finish page -->
        <div class="d-none">
          <NuxtLink :to="`/quizzes/${quizId}/test`"></NuxtLink>
          <NuxtLink :to="`/quizzes/${quizId}/finish`"></NuxtLink>
        </div>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
export default defineNuxtComponent({
  async setup() {
    const route = useRoute();
    const quizId = route.params.id;
    const quiz = await queryContent(`/quizzes/${quizId}/quiz`).findOne();
    return {
      quiz,
      quizId,
    };
  },
  computed: {
    ...mapStores(useQuizStore),
    quizState() {
      return this.quizStore.quizState(this.$route.params.id);
    },
  },
  methods: {
    reset_progress() {
      this.quizStore.deleteQuizState(this.$route.params.id);
    },
  },
});
</script>
