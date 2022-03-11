import { createRouter, createWebHistory } from 'vue-router'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: () => import('../components/Main/index.vue'),
    },
    {
      path: '/admin/article',
      component: () => import('../view/Article/index.vue'),
      name: 'article'
    },
    {
      path: '/admin/category',
      component: () => import('../view/Category/index.vue'),
      name: 'category'
    },

  ]
})
export default router