import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {
  getLocale,
  setI18nLanguage,
  loadLocaleMessages,
  SUPPORT_LOCALES
} from '@/i18n'

import type { Router, RouteRecordRaw } from 'vue-router'
import type { I18n, Composer } from 'vue-i18n'

export function setupRouter(i18n: I18n): Router {

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: HomeView,
      },
      {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../views/AboutView.vue'),
      },
      // TODO: add route with :locale param
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/404View.vue'),
      }
    ],
  })

  // navigation guards
  router.beforeEach(async to => {
    const paramsLocale = to.params.locale as string | undefined

    if (!paramsLocale) {
      return
    }

    // use locale if paramsLocale is not in SUPPORT_LOCALES
    if (!SUPPORT_LOCALES.includes(paramsLocale)) {
      return
    }

    // load locale messages
    if (!i18n.global.availableLocales.includes(paramsLocale)) {
      await loadLocaleMessages(i18n, paramsLocale)
    }

    // set i18n language
    setI18nLanguage(i18n, paramsLocale)
  })

  return router
}
