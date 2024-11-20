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
    할인쿠폰: 'https://lottie.host/afe96452-dd23-4fc0-b29a-567bb21d8d0b/GoHWSTA4IS.lottie',
    노랑풍선: 'https://lottie.host/bae151f8-3652-4db4-adb6-a31333a3012b/KTvhl1kWXG.lottie',
    목돈: 'https://lottie.host/1c0021f3-a553-459e-a6be-9de4132acd0e/vlYqAbC6n2.lottie',
    건강: 'https://lottie.host/860269e8-6237-4815-bb5b-7156b98da172/S0FQUXMFj1.lottie',
    반려동물: 'https://lottie.host/2c9af33f-ff39-496f-8ef2-63114464cdd7/lWnkU9n9ij.lottie',
    엔터테인먼트: 'https://lottie.host/f5863df1-ef68-4b39-a437-b8991a2cabda/fuqW7CqJxU.lottie',
    미래: 'https://lottie.host/05ebf2f1-9821-4f1a-8863-ca1edb34925a/lC9Rq9zjiO.lottie',
    재테크: 'https://lottie.host/91c6b2eb-be51-45a3-85b4-8faf76de508b/9UMhBNAJ5X.lottie',
    청소년: 'https://lottie.host/8f86f10e-2020-46e3-a24b-703792e01820/d0rZkENg9m.lottie',
    어린이: 'https://lottie.host/8f86f10e-2020-46e3-a24b-703792e01820/d0rZkENg9m.lottie',
    직장인: 'https://lottie.host/ce4a2bc9-c1c4-4a36-8a7a-c5a34bed606d/VtL5yEx3S7.lottie',
    사회초년생: 'https://lottie.host/ef7da7cc-0bc1-4d3d-bffc-e87f89b3a420/G3OaaQTkmm.lottie',
    자동차: 'https://lottie.host/e397c80e-bb98-448b-a450-be1b0264e603/4rNbI6GYx5.lottie'
  };

  return lottieMap[group] || 'https://lottie.host/default-animation.lottie'; // 기본 애니메이션
});

// 2초 후 다음 페이지로 이동
setTimeout(() => {
  router.push({ path: '/matchingSavings', query: { group, keyword } });
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
