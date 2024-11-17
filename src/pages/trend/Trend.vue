<template>
  <div class="bc">
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="loading" class="loading text-center">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="contentBox" v-if="!loading && Object.keys(topTrendingKeywords).length">
      <br>
      <swiper
          :pagination="{ dynamicBullets: true }"
          :modules="[Pagination, Autoplay]"
          class="mySwipe trendBox"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
      >
        <swiper-slide v-for="(keyword, group) in topTrendingKeywords" :key="group">
          <div class="content" @click="navigateToLoading(group, keyword)">
            <div class="fin">
              지금 트렌드는 <strong>[{{ keyword }}]</strong><br />
              {{ group }}에 어울리는<img src="../../assets/images/kbkb.png" alt="kb" id="kb">금융상품은?
            </div>
            <div class="emoji">
              {{ getEmoji(group) }}
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const router = useRouter();
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

// 클릭 시 Loading 페이지로 이동하면서 group 파라미터 전송
const navigateToLoading = (group, keyword) => {
  router.push({ path: '/loading', query: { group, keyword } }); // 쿼리 파라미터로 group 전달
};

const getEmoji = (group) => {
  const emojiMap = {
    여행: '✈️',
    쇼핑: '🛒',
    금융: '💰',
    음식: '🍔',
    반려동물: '🐶',
    엔터테인먼트: '🎬',
    자동차: '🚗',
    건강: '🩺',
    교육: '📚',
    기술: '📱',
  };
  return emojiMap[group] || '📌'; // 기본 이모티콘
};

onMounted(() => {
  fetchTopTrendNews();
});
</script>

<style scoped>
.contentBox{
  background-color: white;
  height: 14vh;
}

.loading {
  color: #FFCC00;
  font-weight: bold;
  margin: 20px 0;
}
.error {
  color: red;
}
.trendBox {
  font-size: 14px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  max-width: 340px;
  max-height: 85px;
  background-color: #EFEFF1;
  margin: 0 auto;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  cursor: pointer;
}

.fin {
  text-align: left;
}

.emoji {
  font-size: 30px;
  text-align: right;
}

#kb{
  width: 100%;
  max-width:35px;
  margin-right: -5px;
  margin-top: -5px;
}
</style>
