import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      themes: {
        light: {
          colors: {
            primary: "#EB008B",
            secondary: "#3B44E4",
            // accent: '#8c9eff',
            // error: '#b71c1c',
          },
        },
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
