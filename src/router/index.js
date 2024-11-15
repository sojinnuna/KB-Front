import { createRouter, createWebHistory } from 'vue-router'
import Trend from "@/pages/trend/Trend.vue";
import Shop from "@/pages/trend/Shop.vue";
import Loading from "@/pages/product/Loading.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/trend',
      name: 'trend',
      component: Trend
    },
    {
      path: '/shop',
      name: 'shop',
      component: Shop
    },
    {
      path: '/loading',
      name: 'loading',
      component: Loading
    },
  ],
})

export default router
