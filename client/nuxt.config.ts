export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    "bootstrap/dist/css/bootstrap.css",
    "bootstrap/dist/css/bootstrap.min.css",
    "bootstrap-icons/font/bootstrap-icons.css",
    "assets/main.css",
    "assets/mainmin.css",
  ],

  app: {
    head: {
      title: "Whisper Web",
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.png" }],
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
    "@bootstrap-vue-next/nuxt",
  ],

  compatibilityDate: "2025-02-20",
});