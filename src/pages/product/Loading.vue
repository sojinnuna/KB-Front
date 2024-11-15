<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';

const route = useRoute();
const group = route.query.group || '기본 그룹'; // 쿼리에서 group을 가져오거나 기본값 설정

// group에 따라 Lottie 파일 경로를 결정
const lottieSrc = computed(() => {
  const lottieMap = {
    여행: 'https://lottie.host/50ce27de-a1d1-4762-83ae-40ac86cde669/5heNlNsdgg.lottie',
    쇼핑: 'https://lottie.host/60a44504-a98a-4f12-bf46-84b12fea41a2/xNt2dMNkxA.lottie',
    기술: 'https://lottie.host/e3fd7c39-703e-4230-97ae-757b07395ff2/uRuK1wyzJI.lottie',
    경제: 'https://lottie.host/801f49d5-9d95-4419-bbba-9f5900bdaa64/FLJK60mJV2.lottie',
    스포츠: 'https://lottie.host/ecd32927-585d-4e2a-bbfa-0a7ad38cabb4/saLX5ECeO3.lottie',
    음악: 'https://lottie.host/bd5d3292-51c1-47c9-a15e-c00b22e68db2/GmM6npwMg0.lottie',
    영화: 'https://lottie.host/f5863df1-ef68-4b39-a437-b8991a2cabda/fuqW7CqJxU.lottie',
    패션: 'https://lottie.host/418f656d-47e5-42dd-bd06-5f8245a765c9/efmg5ynV1p.lottie',
    건강: 'https://lottie.host/860269e8-6237-4815-bb5b-7156b98da172/S0FQUXMFj1.lottie',
    교육: 'https://lottie.host/8e8ea7a6-5b8f-41eb-b971-13897eb18c67/x3VUnnIrWi.lottie',
    도서: 'https://lottie.host/97d700a5-60e8-4957-9349-f7da3c11ba57/MpeJ3jYwza.lottie',
  };
  return lottieMap[group] || 'https://lottie.host/default-animation.lottie'; // 기본 애니메이션
});
</script>

<template>
  <div class="container">
    <div class="loading">
      <h3>지금 인기있는 [ <b>{{ group }}</b> ]</h3>
      <h3>관련 상품을 찾는 중이에요!</h3>
      <div class="lottie">
        <DotLottieVue :src="lottieSrc" style="height: 310px; width: 310px" autoplay loop />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 화면 높이의 100% 사용 */
}

.loading {
  display: flex;
  flex-direction: column; /* 텍스트를 수직 배열 */
  justify-content: center; /* 수직 가운데 정렬 */
  align-items: center; /* 수평 가운데 정렬 */
  width: 540px;
  height: 540px;
  background-color: #FFCC00;
  border-radius: 50%;
  text-align: center;
}

.loading h3 {
  font-weight: 500;
  color: white;
}
</style>
