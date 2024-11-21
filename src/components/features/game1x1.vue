<template>
  <div class="widget-container" @click="showDetails">
    <img :src="gameImage" alt="game icon" class="game-icon" />
  </div>
</template>

<script>
import gameImage from '../../../public/images/game.png'; // Adjust the path according to your actual file location

export default {
  name: 'Widget',
  data() {
    return {
      gameImage, // Imported image
    };
  },
  methods: {
    showDetails() {
      // Click action for the widget: Redirect to gamePage
      this.$router.push('/game'); 
    },
  },
};

</script>

<style scoped>
.widget-container {
  width: 90px;
  height: 98.125px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer; /* Pointer cursor to indicate it's clickable */
  overflow: hidden; /* 컨테이너를 벗어나는 이미지 부분 숨기기 */
  padding: 0; /* 패딩 제거 */
  border: none; /* 경계선 제거 */
  background: none; /* 배경색 제거 */
}

.game-icon {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 이미지가 꽉 차도록 조정하며 비율 유지 */
}
</style>
