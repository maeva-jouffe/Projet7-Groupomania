import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/auth/signup',
    name: 'Signup',
    // Optimisation pour les pages situées en dehors de la page d'accueil, qui seront chargées plus tard
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/auth/:id',
    name: 'Profil',
    component: () => import('../views/Profil.vue')
  },
  {
    path: '/wall',
    name: 'Wall',
    component: () => import('../views/Wall.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

//Création de la constante router qui sera utilisée avec la fonction createRouter dans laquelle l'historique web sera crée et auquel on passera les routes
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
