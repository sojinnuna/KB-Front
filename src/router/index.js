import { createRouter, createWebHistory } from 'vue-router'
import Trend from "@/pages/Trend.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/trend',
      name: 'trend',
      component: Trend
    },
  ],
})

export default router
