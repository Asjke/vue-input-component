import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home-page',
    component: () => import('../views/home-page')
  },
  {
    path: '/posts',
    name: 'posts-page',
    component: () => import('../views/posts-page')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router