// https://nuxt.com/docs/api/configuration/nuxt-config
import copyAssets from "./copyAssets";

export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          "defineStore",
          "acceptHMRUpdate",
          "mapStores",
          "mapState",
          "mapActions",
          "storeToRefs",
        ],
      },
    ],
    "@pinia-plugin-persistedstate/nuxt",
  ],
  css: [
    "assets/main.scss",
    "assets/reset.scss",
    "@mdi/font/css/materialdesignicons.min.css",
  ],
  imports: {
    dirs: ["stores"],
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/"],
    },
  },
  content: {
    highlight: {
      preload: ["python"],
    },
  },
  hooks: {
    "nitro:build:public-assets": copyAssets,
  },
});
