import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MessageBoard from '@/components/MessageBoard.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue'),
      children: [
        {
          path: 'signup',
          name: 'signup',
          component: () => import('../components/AuthSignup.vue')
        },
        {
          path: '',
          name: 'login',
          component: () => import('../components/AuthLogin.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: '',
          name: 'dbHome',
          component: MessageBoard,
          props: route => ({ del: route.query.del })
        },
        {
          path: 'compose',
          name: 'dbCompose',
          component: () => import('../components/ComposeBoard.vue')
        },
        {
          path: 'settings',
          name: 'dbSettings',
          component: () => import('../components/SettingsBoard.vue'),
          props: route => ({ del: route.query.del })
        },
        {
          path: 'docs',
          name: 'dbDocs',
          component: () => import ('../components/KeysBoard.vue')
        },
        {
          path: 'keys',
          name: 'dbKeys',
          component: () => import ('../components/KeysBoard.vue')
        }
      ]
    }
  ]
})

export default router
