import './assets/main.css'
import './index.css'
import config from '@/config.json'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setI18nLanguage, setupI18n } from './i18n'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
const useDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: useDarkTheme ? 'dark' : 'light',
  },
})

const i18n = setupI18n({
  legacy: false,
  locale: navigator.language,
  fallbackLocale: config.fallbackLocale,
})


const app = createApp(App)

app.use(i18n)
app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
