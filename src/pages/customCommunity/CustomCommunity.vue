<script setup>
// 버튼 클릭 시 실행할 동작
const handleClick = () => {
};

import { ref, onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import {  Autoplay } from 'swiper/modules';


// 샘플 데이터
const popularCustoms = ref([
  { id: 1, title: '제목 1', image: '이미지 1' },
  { id: 2, title: '제목 2', image: '이미지 2' },
  { id: 3, title: '제목 3', image: '이미지 3' },
  { id: 4, title: '제목 4', image: '이미지 4' },
  { id: 5, title: '제목 5', image: '이미지 5' },
]);

// 상세 페이지 이동 함수
const navigateToDetailPage = (id) => {
  window.location.href = `/detailPage/${id}`;
};
</script>

<template>
  <div class="container">
    <h3><b>커스텀 커뮤니티</b></h3>
    <br />
    <!-- 이번주 인기 커스텀 -->
    <div class="section">
      <h4 class="popular-title">이번주 인기 커스텀</h4>
      <!-- Swiper 슬라이드 영역 -->
      <Swiper
          :modules="[Autoplay]"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          loop
          class="product-swiper"
      >
        <SwiperSlide
            v-for="custom in popularCustoms"
            :key="custom.id"
            @click="navigateToDetailPage(custom.id)"
        >
          <div class="content-item">
            <div class="image">{{ custom.image }}</div>
            <div class="text">
              <h5>{{ custom.title }}</h5>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <br />

    <!-- 커스텀 목록 -->
    <div class="section">
      <h4>커스텀 목록</h4>
      <div class="content-item">
        <div class="image">이미지들</div>
        <div class="text">
          <h5>제목</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* 컨테이너 스타일 */
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
}



/* 텍스트 스타일 */
.popular-title {
  margin: 0;
}

.icon-button i {
  color: #333;
  transition: color 0.2s ease;
}

</style>

