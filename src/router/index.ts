import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const titleCase = (str: string) => str.replace(/\b\w/g, l => l.toUpperCase())
const basicRoute = (id: string) => ({
  path: `/${id}`,
  name: id,
  component: () => import(`../views/${titleCase(id)}View.vue`)
})
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    basicRoute('files'),
    basicRoute('settings'),
  ]
})

export default router
