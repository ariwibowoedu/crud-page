import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: LandingPage
    },
    {
      path: '/products',
      name: 'Product',
      component: () => import('@/views/ProductPage.vue')
    },
    {
      path: '/customers',
      name: 'Customer',
      component: () => import('@/views/customer/CustomerPage.vue')
    },
    {
      path: '/customers/:id',
      component: () => import('@/views/customer/DetailCustomer.vue')
    }
  ],
})

export default router
