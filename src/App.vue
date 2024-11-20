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
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import ChatBot from "./components/ChatBot.vue";
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
  margin-bottom: 110px;
  overflow-y: auto;
  box-sizing: border-box;
}
</style>
