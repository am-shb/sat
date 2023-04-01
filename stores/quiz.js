export const useQuizStore = defineStore({
  id: "quiz",
  state: () => {
    return {
      quizzes: {},
    };
  },
  actions: {
    createQuizState(quizId, n_questions) {
      this.quizzes[quizId] = {
        answers: Array(n_questions).fill(null),
        currentQuestion: 0,
        lastVisited: new Date(),
        completed: false,
      };
    },
    setQuizAnswer(quizId, questionId, answer) {
      this.quizzes[quizId].answers[questionId] = answer;
    },
    setQuizCurrentQuestion(quizId, questionId) {
      this.quizzes[quizId].currentQuestion = questionId;
      this.quizzes[quizId].lastVisited = new Date();
    },
    deleteQuizState(quizId) {
      delete this.quizzes[quizId];
    },
  },
  getters: {
    quizState(state) {
      return (quizId) => state.quizzes[quizId];
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
