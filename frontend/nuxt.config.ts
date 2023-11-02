// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  imports: {
    dirs: ["./utils"],
  },
  pinia: {
    autoImports: [["defineStore", "definePiniaStore"]],
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600&display=swap",
        },
      ],
    },
  },
});
