<template>
  <div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="loading" class="loading text-center">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
      <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="!loading && Object.keys(topTrendingKeywords).length">
      <swiper
          :pagination="{ dynamicBullets: true }"
          :modules="[Pagination]"
          class="mySwipe trendBox"
          :loop="true"
      >
        <swiper-slide v-for="(keyword, group) in topTrendingKeywords" :key="group">
          <div class="text-center">
            지금 인기 있는 것은 <strong>[{{ keyword }}]</strong><br />
            {{ group }}에 맞는 KB금융상품은?
          </div>
        </swiper-slide>
      </swiper>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

const topTrendingKeywords = ref({});
const newsMap = ref({});
const errorMessage = ref('');
const loading = ref(false);

const fetchTopTrendNews = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await axios.get('/api/top-trend-news');
    console.log("API 응답 데이터:", response.data);

    if (response.data.success) {
      topTrendingKeywords.value = response.data.keywords || {};
      newsMap.value = response.data.news || {};
    } else {
      errorMessage.value = response.data.message || '데이터를 가져오는 중 오류가 발생했습니다.';
    }
  } catch (error) {
    errorMessage.value = '뉴스 데이터를 가져오는 중 오류가 발생했습니다.';
    console.error("오류:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTopTrendNews();
});
</script>

<style scoped>
.loading {
  color: blue;
  font-weight: bold;
  margin: 20px 0;
}
.error {
  color: red;
}
.trendBox {
  font-size: 20px;
  border-radius: 20px;
  width: 640px;
  height: 100px;
  background-color: #EFEFF1;
  margin: 0 auto;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
