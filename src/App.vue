<template>
  <div class="app-container">
    <Header />
    <main class="content">
      <router-view />
    </main>
    <Footer />
    <ChatBot />
  </div>
</template>

<script>
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import ChatBot from './components/ChatBot.vue';
import { login } from './api/userAPI';

export default {
  components: {
    Footer,
    ChatBot,
    Header,
  },
  async mounted() {
    try {
      // API 호출
      const data = await login();
      localStorage.setItem('user', JSON.stringify(data));

      console.log('API 호출 성공:', data);
    } catch (error) {
      console.error('API 호출 실패:', error);
    }
  },
};
</script>

<style scoped>
.app-container {
  width: 360px;
  height: 100vh;
  max-height: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  background-color: rgba(238, 244, 249, 1);
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.content {
  flex: 1;
  margin-bottom: 110px; /* 푸터 높이 만큼 여백 */
  overflow-y: auto; /* 스크롤 가능 */
  box-sizing: border-box;
}
</style>
