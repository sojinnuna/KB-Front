<template>
  <div class="game-page">
    <!-- 닫기 버튼 -->
    <button class="close-button" @click="closePage">x</button>
    
    <!-- 게임 이미지 -->
    <img :src="gameImage" alt="Game Image" class="game-image" />
  </div>
</template>

<script>
import gameImage from '../../../public/images/gamepage.png'; // 실제 이미지 파일 경로로 수정

export default {
  name: 'GamePage',
  data() {
    return {
      gameImage, // 불러온 이미지 경로를 사용
    };
  },
  methods: {
    closePage() {
      // 이전 페이지로 이동
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.game-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
}

.close-button {
  position: absolute;
  top: 20px;
  left: 20px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #333;
}

.game-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain; /* 이미지를 비율에 맞춰 표시하며 전체 영역을 채웁니다 */
}
</style>
