<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <nuxt-link to="/">
          <img
            style="max-width: 120px; max-height: 60px"
            class="mx-2"
            src="/vector-logo.png"
          />
        </nuxt-link>
      </template>
      <v-app-bar-title> Vector Institute Self Assessment </v-app-bar-title>
    </v-app-bar>
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>
