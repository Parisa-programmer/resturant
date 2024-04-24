import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)



const routes = [

  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/resturant',
    name: 'resturant',
    component: () => import('../views/Resturant.vue')
  },
  {
    path: '/coffeshop',
    name: 'coffeshop',
    component: () => import('../views/Cofe.vue')
  },
  {
    path: '/menu/Login',
    name: 'Login-page',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/test-page',
    name: 'test-page',
    component: () => import('../views/TestPage.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue')
  },
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
