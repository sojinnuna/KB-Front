<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import router from "@/router/index.js";

const route = useRoute();
const group = route.query.group || '기본 그룹';
const keyword = route.query.keyword || '';


const currentDate = new Date().toLocaleDateString('ko-KR', {
  month: 'long',
  day: 'numeric',
});


const lottieSrc = computed(() => {
  const lottieMap = {
    여행: 'https://lottie.host/50ce27de-a1d1-4762-83ae-40ac86cde669/5heNlNsdgg.lottie',
    쇼핑: 'https://lottie.host/60a44504-a98a-4f12-bf46-84b12fea41a2/xNt2dMNkxA.lottie',
    기술: 'https://lottie.host/d0067b51-9c8e-4dde-ada4-531fc84e082d/ph888O0lDj.lottie',
    금융: 'https://lottie.host/801f49d5-9d95-4419-bbba-9f5900bdaa64/FLJK60mJV2.lottie',
    음식: 'https://lottie.host/c61b070b-9b7c-4b54-9b3a-2fce4b17ed5c/q1OT3AvEKy.lottie',
    반려동물: 'https://lottie.host/2c9af33f-ff39-496f-8ef2-63114464cdd7/lWnkU9n9ij.lottie',
    엔터테인먼트: 'https://lottie.host/f5863df1-ef68-4b39-a437-b8991a2cabda/fuqW7CqJxU.lottie',
    자동차: 'https://lottie.host/e397c80e-bb98-448b-a450-be1b0264e603/4rNbI6GYx5.lottie',
    건강: 'https://lottie.host/860269e8-6237-4815-bb5b-7156b98da172/S0FQUXMFj1.lottie',
    교육: 'https://lottie.host/8e8ea7a6-5b8f-41eb-b971-13897eb18c67/x3VUnnIrWi.lottie',
  };
  return lottieMap[group] || 'https://lottie.host/default-animation.lottie'; // 기본 애니메이션
});

// 2초 후 다음 페이지로 이동
setTimeout(() => {
  router.push({ path: '/matchingProducts', query: { group, keyword } });
}, 2000);

</script>

<template>
  <div class="container">
    <div class="loading">
      <h5>{{ currentDate }}</h5>
      <h5>지금 인기있는 [ <b>{{ group }}</b> ]</h5>
      <h5>관련 상품을 찾는 중이에요!</h5>
      <div class="lottie">
        <DotLottieVue :src="lottieSrc" style="width: 100%; height: 100%; max-height: 260px; max-width: 260px" autoplay loop />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.loading {
  display: flex;
  flex-direction: column; /* 텍스트를 수직 배열 */
  justify-content: center; /* 수직 가운데 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  width: 100%;
  height: 100%;
  max-width: 330px;
  max-height: 330px;
  background-color: #FFCC00;
  border-radius: 50%;
  text-align: center;
}

.loading h5 {
  font-weight: 500;
  color: white;
}
</style>
