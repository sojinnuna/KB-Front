<template>
  <div class="container">
    <h3><b>커스텀 커뮤니티</b></h3>
    <br />
    <!-- 이번주 인기 커스텀 -->
    <div class="section">
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <h4 class="popular-title">이번주 인기 커스텀</h4><br>
      <Swiper
          :modules="[Autoplay]"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          loop
          class="product-swiper"
          :slidesPerView="3">
        <SwiperSlide
            v-for="custom in popularCustoms"
            :key="custom.sharedID"
            @click="navigateToDetailPage(custom.sharedID)"
        >
          <div class="content-item">
            <div class="image">
              <img :src="getImageUrl(custom.imagePath)" alt="Custom Image" />
            </div>
            <div class="text">
              <h5 class="d-inline">{{ custom.pageName }}</h5>
              <p class="d-inline">❤️ {{ custom.heart }}</p> <!-- Heart 수 표시 -->
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>

    <!-- 커스텀 목록 -->
    <div class="section">
      <div v-if="isLoading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
      <div class="section-header" @click="customList">
        <h4 class="popular-title">커스텀 목록</h4>
        <i class="bi bi-chevron-right"></i>
      </div>
      <br>
      <Swiper
          :modules="[Autoplay]"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          loop
          class="product-swiper"
          :slidesPerView="3">
        <SwiperSlide
            v-for="custom in otherCustoms"
            :key="custom.sharedID"
            @click="navigateToDetailPage(custom.sharedID)"
            class="content-item"
        >
          <div class="image">
            <img :src="getImageUrl(custom.imagePath)" alt="Custom Image" />
          </div>
          <div class="text">
            <h5 class="d-inline">{{ custom.pageName }}</h5>
            <p class="d-inline">❤️ {{ custom.heart }}</p>
          </div>
      </SwiperSlide>
    </Swiper>
  </div>
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import { Autoplay } from 'swiper/modules';
import axios from 'axios';

// 라우터 인스턴스
const router = useRouter();

const getImageUrl = (imagePath) => {
  const baseUrl = "http://localhost:8080";
  return imagePath ? `${baseUrl}/${imagePath}` : `${baseUrl}/images/default-image.jpeg`;
};

// 상태 관리
const errorMessage = ref(''); // 에러 메시지
const isLoading = ref(false); // 로딩 상태
const customs = ref([]); // 커스텀 커뮤니티 데이터
const customDetail = ref([]);
// 인기 커스텀 (heart 수 기준 내림차순 정렬 후 상위 3개)
const popularCustoms = computed(() => {
  return [...customs.value]
      .sort((a, b) => b.heart - a.heart)
      .slice(0, 3);
});

// 기타 커스텀 (상위 3개 제외)
const otherCustoms = computed(() => {
  return [...customDetail.value]
      .sort((a, b) => b.heart - a.heart)
      .slice(3);
});

// 데이터 불러오기
const fetchGetCustomPage = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    const response = await axios.get('/api/community/pages');
    customs.value = response.data; // 응답 데이터가 배열이라고 가정
    console.log(customs.value);
    if (Array.isArray(response.data) && response.data.length > 0) {
      customDetail.value = response.data;
    } else {
      throw new Error('데이터를 찾을 수 없습니다.');
    }
  } catch (error) {
    console.error('GET 요청 에러: ', error);
    errorMessage.value = '데이터를 불러오는 데 실패했습니다.';
  } finally {
    isLoading.value = false;
  }
};

// 상세 페이지로 이동
const navigateToDetailPage = (id) => {
  if (id) {
    router.push(`/detailPage/${id}`);
  } else {
    alert('유효하지 않은 페이지 ID입니다.');
  }
};

const customList = () => {
  router.push(`/customList`);
}

// 컴포넌트 마운트 시 데이터 불러오기
onMounted(() => {
  fetchGetCustomPage();
});
</script>

<style scoped>
.section-header {
  display: flex;
  justify-content: space-between; /* 좌우 공간을 균등 분배 */
  align-items: center; /* 수직 중앙 정렬 */
}

.section-header h4 {
  font-size: 1.2em;
  margin: 0; /* 기본 여백 제거 */
}

.section-header .bi {
  font-size: 1.5em; /* 아이콘 크기 조정 */
  cursor: pointer;
}
/* 컨테이너 스타일 */
.container {
  padding: 60px 20px 20px;
  font-family: Arial, sans-serif;
}

/* 텍스트 스타일 */
.popular-title {
  margin: 0;
  font-size: 1.2em;
}

/* 슬라이드 내용 아이템 스타일 */
.content-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.content-item .image {
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px;
}

.content-item .image img {
  width: 72px;
  height: 114px;
}

.content-item .text {
  text-align: center;
}

.content-item .text h5 {
  margin: 0;
  font-size: 1em;
}

.content-item .text p {
  margin: 5px 0 0 0;
  color: #ff4d4f;
}

/* Swiper 슬라이드 스타일 */
.product-swiper {
  width: 100%;
  height: 180px; /* 원하는 높이로 조정 */
}

/* 커스텀 목록 스타일 */
.section {
}

.content-list .content-item {
  display: flex;
  padding: 10px;
  border-radius: 10px;
}

.content-list .content-item .image {
  width: 72px;
  height: 114px;
}

.content-list .content-item .image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.content-list .content-item .text h5 {
  margin: 0;
  font-size: 1.1em;
}

.content-list .content-item .text p {
  margin: 5px 0 0 0;
  color: #ff4d4f;
}

/* 로딩 오버레이 스타일 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 8px solid #f3f3f3;
  border-top: 8px solid #3498db;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
