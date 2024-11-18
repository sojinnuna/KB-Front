<template>
  <div class="app-container">
    <Header />

    <div class="content">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";

export default {
  components: {
    Footer,
    Header,
  },
};
</script>

<style scoped>
.app-container {
  width: 360px;
  height: 100vh; /* 화면 전체를 채움 */
  max-height: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  background-color: rgba(238, 244, 249, 1);
}

/* 헤더 고정 */
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* 헤더가 콘텐츠 위에 오도록 설정 */
}

/* 푸터 고정 */
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* 푸터가 콘텐츠 위에 오도록 설정 */
}

/* 콘텐츠 영역 */
.content {
  flex: 1;
  margin-bottom: 110px; /* 푸터 높이 만큼 여백 */
  overflow-y: auto; /* 스크롤 가능 */
  box-sizing: border-box;
}
</style>
