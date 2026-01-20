import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home_view',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/articles-list',
      name: 'articles_list',
      component: () => import('@/views/ArticlesList.vue')
    }
  ]
})

export default router
