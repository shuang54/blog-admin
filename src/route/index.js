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
    {
      path: '/admin/addArticle',
      component: () => import('../view/AddFile/index.vue'),
      name: 'addArticle'
    },
    {
      path: '/admin/updateArticle',
      component: () => import('../view/AddFile/index.vue'),
      name: 'updateArticle'
    },

  ]
})
export default router