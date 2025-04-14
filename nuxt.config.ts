// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    secret: 'WDQuxFyeEh5APcxLgxTxT3PnsWSImiRi',
    databasePath: '/server/database/database.sqlite',
  },
  // 設定相容性日期，確保在此日期之前的 Nuxt 版本都能相容
  compatibilityDate: '2025-04-10',
  devtools: { enabled: false },

});
