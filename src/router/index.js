import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Resturant from '../views/Resturant.vue'
import ChooseType from '../views/ChooseType.vue'
import Cofe from '../views/Cofe'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/menu/resturant',
    name: 'Resturant',
    component: Resturant
  },
  {
    path: '/menu',
    name: 'ChooseType',
    component: ChooseType
  },
  {
    path: '/menu/coffeshop',
    name: 'Cofe',
    component: Cofe
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
