// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    typeCheck: true,
  },

  css: [
    "bootstrap/dist/css/bootstrap.css",
    "assets/main.css",
    "assets/mainmin.css",
  ],

  app: {
    head: {
      title: "Social site",
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
          type: "text/javascript",
        },
      ],
    },
  },

  modules: [
    "nuxt-bootstrap-icons",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "@nuxt/ui",
  ],
});
