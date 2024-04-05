import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('../views/Home.vue')
      },
      {
        path: 'tab2',
        component: () => import('../views/CreatePost.vue')
      },
      {
        path: 'tab3',
        component: () => import('../views/Account.vue')
      },
      
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Signin/Login.vue')
  },
  {
    path: '/signup',
    component: () => import('../views/Signin/Signup.vue')
  },
  {
    path: '/settings',
    component: () => import('../views/UserStuff/Settings.vue')
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
