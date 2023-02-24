import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import store from '@/store'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/ItemMusic',
    name: 'ItemMusic',
    component: () => import('../views/ItemMusic.vue')
  },
  {
    path: '/Search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/InfoUser',
    name: 'InfoUser',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin) {
        next()
      } else {
        next('/Login')
      }
    },
    component: () => import('../views/InfoUser.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,from)=>{
  if(to.path=='/Login'){
    store.state.isFooterMusic = false
  }else{
    store.state.isFooterMusic = true
  }
})

export default router
