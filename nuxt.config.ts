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
    "nitro:config": (nitroConfig) => {
      let repo_name = process.env.GH_PAGES_REPO_NAME;
      if (repo_name) {
        console.log(
          "Building for GitHub Pages -- GH_PAGES_REPO_NAME=",
          repo_name
        );
        const baseUrl = "/" + repo_name + "/";
        nitroConfig.baseURL = baseUrl;
        nitroConfig.runtimeConfig.app.baseURL = baseUrl;
      }
    },
  },
});
