<template>
  <v-container class="fill-height">
    <v-responsive class="d-flex align-center text-center fill-height">
      <v-img contain height="300" src="/logo.png" />

      <div class="text-body-2 font-weight-light mb-n1">Welcome to</div>

      <h1 class="text-h2 font-weight-bold">
        Vector Institute <br />
        Self Assessment
      </h1>

      <div class="py-14" />

      <v-row class="d-flex align-center justify-center">
        <v-col cols="auto">
          <v-btn
            href="https://vectorinstitute.ai"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-home" size="large" start />
            Vector Institute Website
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            color="primary"
            href="quizzes"
            min-width="228"
            size="x-large"
            variant="flat"
          >
            <v-icon icon="mdi-speedometer" size="large" start />
            Get Started
          </v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn
            href="#"
            min-width="164"
            rel="noopener noreferrer"
            target="_blank"
            variant="text"
          >
            <v-icon icon="mdi-account-group" size="large" start />
            More info about this test
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
