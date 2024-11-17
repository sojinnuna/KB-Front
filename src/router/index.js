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
  routes,
});

export default router;
