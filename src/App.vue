<template>
  <div class="app-container">
    <div class="content">
      <router-view />
      <!-- 현재 라우트에 따라 화면을 표시 -->
    </div>
    <Footer />
    <!-- 하단 메뉴바 -->
  </div>
</template>

<script>
import Footer from './components/Footer.vue';

export default {
  components: {
    Footer,
  },
};
</script>

<style scoped>
.app-container {
  width: 360px;
  height: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  overflow: hidden;
  box-sizing: border-box;
}

.content {
  flex: 1;
  overflow-y: auto; /* 콘텐츠가 푸터에 겹치지 않도록 스크롤 가능 */
}
</style>
