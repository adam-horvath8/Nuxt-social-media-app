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
    },
  },

  modules: ["nuxt-bootstrap-icons", "@vee-validate/nuxt", "@pinia/nuxt"],
});