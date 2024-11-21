<template>
  <div
    class="fullscreen-container"
    :class="{ fadeOut: isFading }"
    @click="goToHomePage"
  >
    <img src="/images/StartPage.jpg" class="start-image" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isFading: false, // 애니메이션 상태를 관리
    };
  },
  methods: {
    goToHomePage() {
      this.isFading = true; // fadeOut 클래스 추가
      setTimeout(() => {
        this.$router.push("/"); // 딜레이 후 페이지 이동
      }, 2000); // 2초 딜레이
    },
  },
};
</script>

<style>
/* 전체 화면 컨테이너 */
.fullscreen-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  cursor: pointer;
  background-color: black; /* 배경색 추가 (선택 사항) */
  transition: opacity 2s ease; /* 페이드아웃 효과 */
}

/* 클릭 시 페이드아웃 */
.fadeOut {
  opacity: 0; /* 투명하게 만듦 */
}

/* 이미지를 화면에 꽉 차게 설정 */
.start-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
