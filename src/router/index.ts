import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { getLocale, isLocaleSupported, setI18nLanguage } from '@/i18n'

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
    },
  ],
})

// navigation guards
router.beforeEach(async (to) => {
  const paramsLocale = to.params.locale as string | undefined

  if (!paramsLocale) {
    return
  }

  // use locale if paramsLocale is not in SUPPORT_LOCALES
  if (!isLocaleSupported(paramsLocale)) {
    return router.push({
      name: to.name!,
      params: { ...to.params, locale: getLocale() },
    })
  }

  // set i18n language
  setI18nLanguage(paramsLocale)
})

export default router
