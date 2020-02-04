import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Part2 from '../views/Part2.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/part2',
    name: 'part2',
    component: Part2
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
