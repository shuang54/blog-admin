import { createRouter, createWebHistory } from 'vue-router'
import { useUser } from '../store'
const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      redirect: '/admin'
    },

    {
      path: '/',
      component: () => import('../components/Main/index.vue'),
      children: [
        {
          path: '/article',
          component: () => import('../view/Article/index.vue'),
          name: 'article'
        },
        {
          path: '/admin',
          component: () => import('../view/Admin/index.vue'),
          name: 'admin'
        },
        {
          path: '/category',
          component: () => import('../view/Category/index.vue'),
          name: 'category'
        },
        {
          path: '/addArticle',
          component: () => import('../view/AddFile/index.vue'),
          name: 'addArticle'
        },
        {
          path: '/updateArticle',
          component: () => import('../view/AddFile/index.vue'),
          name: 'updateArticle'
        },
      ],
    },
    {
      path: '/login',
      component: () => import('../view/Login/index.vue'),
      name: 'login'
    },

  ]
})
router.beforeEach(async (to, from, next) => {
  let userStore = useUser()
  let token = window.localStorage.getItem('token')
  let name = userStore.name
  console.log(to.path);
  console.log(to.path.indexOf('/login'));
  if (to.path.indexOf('/login') != -1) {
    next()
  } else if (token != undefined) {
    if (name) {
      next()
    } else {
      try {
        await userStore.getUserInfo()
        next()
      } catch (err) {
        userStore.signOut()
        next({ path: '/login' })
      }

    }
  } else {
    next({ path: '/login' })
  }
})
export default router