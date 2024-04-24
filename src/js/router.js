const Hello = { template: '<div>Ahuan</div>' }

const routes = [
  { path: './', component: HomeView }
]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')