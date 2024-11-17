
import { createRouter, createWebHistory } from 'vue-router'
import Trend from "@/pages/trend/Trend.vue";
import Shop from "@/pages/trend/Shop.vue";
import Loading from "@/pages/product/Loading.vue";
import MatchingProducts from "@/pages/product/MatchingProducts.vue";

import { createRouter, createWebHistory } from 'vue-router';
import UIUX from '@/pages/UiUx.vue';

const routes = [
  {
    path: '/uiux',
    name: 'UiUx',
    component: UIUX,
  },
  // 다른 경로를 추가할 수 있습니다.
];

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
    { path: '/matchingProducts',
      name: 'matchingProducts',
      component: MatchingProducts },
  ],
})

export default router

  routes,
});

export default router;

