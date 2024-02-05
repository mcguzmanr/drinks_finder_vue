import InicioViewVue from '@/views/InicioView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: InicioViewVue
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritosView.vue')
    }
  ]
})

export default router
