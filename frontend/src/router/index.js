import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import Login from '../views/Login.vue'
import Profil from '../views/Profil.vue'
import Home from '../views/Home.vue'
import Publications from '../views/Publications.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/auth/:id',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/publications',
    name: 'Publications',
    component: Publications
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
