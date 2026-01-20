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
    },
    {
      path: '/article/:id',
      name: 'article_view',
      component: () => import('@/views/ArticleView.vue'),
      props: true
    },
    {
      path: '/create',
      name: 'create_post',
      component: () => import('@/views/CreateEditPost.vue')
    },
    {
      path: '/edit/:id',
      name: 'edit_post',
      component: () => import('@/views/CreateEditPost.vue'),
      props: true
    }
  ]
})

export default router
