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
    head: {},
  },
});
