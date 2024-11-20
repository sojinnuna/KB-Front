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
<<<<<<< HEAD
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import ChatBot from "./components/ChatBot.vue";
=======
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

>>>>>>> b0ed5c15ece4a95dd03cfcd70075c8a23613f479
export default {
  components: {
    Footer,
    ChatBot,
    Header,
  },
};
</script>

<style scoped>
.app-container {
  width: 360px;
<<<<<<< HEAD
  height: 100vh;
=======
  height: 100vh; /* 화면 전체를 채움 */
>>>>>>> b0ed5c15ece4a95dd03cfcd70075c8a23613f479
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
<<<<<<< HEAD
  margin-bottom: 110px;
  overflow-y: auto;
=======
  margin-bottom: 110px; /* 푸터 높이 만큼 여백 */
  overflow-y: auto; /* 스크롤 가능 */
>>>>>>> b0ed5c15ece4a95dd03cfcd70075c8a23613f479
  box-sizing: border-box;
}
</style>
