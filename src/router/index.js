import { createRouter, createWebHistory } from "vue-router";
import ChatBot from "../pages/ChatBot.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth", // 이 경로로 접근할 때
      name: "ChatBot", // 경로 이름 (옵션)
      component: ChatBot, // ChatBot 컴포넌트를 렌더링합니다.
    },
  ],
});

export default router;
