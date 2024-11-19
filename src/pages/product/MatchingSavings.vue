<script setup>
import {ref, onMounted, watch} from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

const route = useRoute();
const group = route.query.group || '기본 그룹';
const keyword = route.query.keyword || ''; // keyword 값

const groupProducts = ref([]); // group과 관련된 상품 리스트
const keywordProducts = ref([]); // keyword와 정확히 일치하는 상품 리스트
const loading = ref(false); // 로딩 상태
const errorMessage = ref(''); // 에러 메시지
const newsMap = ref({});

const fetchProducts = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await axios.get(`/api/matchingSavings`, {
      params: { group, keyword },
    });

    // 서버에서 두 리스트를 분리하여 응답
    keywordProducts.value = response.data.keywordProducts;


  } catch (error) {
    console.error('Failed to fetch matching products:', error);
    errorMessage.value = '상품 데이터를 가져오는 오류가 발생했습니다.';
  } finally {
    loading.value = false;
  }
};


const getLimitedBenefits = (benefitsString) => {
  // Split the benefits by commas
  const benefits = benefitsString.split(',').map(b => b.trim());

  // Filter out benefits that contain the keyword and show them firs
  const keywordBenefits = benefits.filter(b => b.includes(keyword));
  const otherBenefits = benefits.filter(b => !b.includes(keyword));

  // Combine the keyword-related benefits with the rest, showing only the first 3
  const limitedBenefits = [...keywordBenefits, ...otherBenefits].slice(0, 3);

  return limitedBenefits;
};

const fetchTopTrendNews = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await axios.get('/api/top-savings-news');

    // 현재 keyword의 검색어 가져오기
    const searchKeyword = response.data.keywords[group];
    if (!searchKeyword) {
      console.warn("현재 키워드에 해당하는 검색 결과가 없습니다:", keyword);
      newsMap.value[keyword] = [];
      return;
    }

    // 뉴스 데이터 가져오기
    const filteredNews = response.data.news[searchKeyword] || [];

    // `newsMap`에 저장 (keyword 기반)
    newsMap.value[keyword] = filteredNews;
  } catch (error) {
    errorMessage.value = '뉴스 데이터를 가져오는 중 오류가 발생했습니다.';
    console.error("오류:", error);
  } finally {
    loading.value = false;
  }
};


watch(
    () => group.value,
    (newGroup) => {
      fetchTopTrendNews(newGroup);
    }
);
// 상품 클릭 시 URL로 이동
const navigateToProduct = (url) => {
  if (url) {
    window.location.href = url; // 새 페이지로 이동
  }
};

// 컴포넌트가 마운트되었을 때 API 호출
onMounted(() => {
  fetchProducts();
  fetchTopTrendNews();
});
</script>

<template>
  <div class="binBox">

  </div>
  <div class="main-page" id="trend-section">
    <div v-if="loading" class="loading text-center">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <!-- keyword와 정확히 일치하는 상품을 Swiper로 나열 -->
    <div>
      <div class="trend">
        <h5>트렌드가 {{ keyword }}인 이유!</h5>
        <div v-if="newsMap[keyword] && newsMap[keyword].length" class="news-container">
          <img class="news-icon" src="/images/newspaper_3d.png" alt="News Icon"/>
          <div class="news-text">
            <p v-html="newsMap[keyword][1]"></p>
          </div>
        </div>
        <p v-else>관련 뉴스가 없습니다.</p>
      </div>
    <br><br>

    <h5 class="d-inline">{{ keyword }}에 맞는 예적금 상품</h5><img class="d-inline star" src="/images/star_3d.png">
    <swiper
        v-if="keywordProducts.length"
        :modules="[Pagination, Autoplay]"
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        class="product-swiper"
        loop
        :style="{ height: '220px' }"
    >
      <swiper-slide
          v-for="product in keywordProducts"
          :key="product.productId"
          class="product-item"
          @click="navigateToProduct(product.productUrl)"
      >
        <br>
        <h4>{{ product.productName }}</h4>
        <br>
        <!-- Benefit List: Show up to 3 items and ensure keyword-related benefits are first -->
        <ul class="benefit-list">
          <li
              v-for="(benefit, index) in getLimitedBenefits(product.benefit)"
              :key="index"
              class="benefit-item"
          >
            <h5 class="d-inline">{{ benefit }}</h5>
          </li>
          <li><img class="d-inline cc" src="/images/cc.png"></li>
          <li class="click">
            * 클릭 시 자세한 페이지로 이동
          </li>
          <li>
            <br>
          </li>
        </ul>
      </swiper-slide>
    </swiper>

    <p v-else>정확히 일치하는 상품이 없습니다.</p>

    <!-- group 관련 상품 나열 -->
  </div>
  </div>
</template>

<style scoped>
.news-item p {
  font-size: 15px;
}

.bi-arrow-up-circle {
  font-size: 25px;
}

.binBox {
  width: 100%;
  height: 60px;
  background-color: #EEF4F9; /* 필요한 경우 배경색 추가 */
  position: fixed;
  top: 0;
  z-index: 100;
}

.main-page {
  overflow-y: auto;
  padding: 80px 20px;
  background-color: #eef4f9;
  position: relative;
}

.loading {
  color: #FFCC00;
  font-weight: bold;
  margin: 20px 0;
}

.error {
  text-align: center;
  color: red;
}
.cc{
  width: 100px;
  margin-top: -100px;
}
.news-container {
  display: flex;
  align-items: flex-start; /* 아이콘과 텍스트의 세로 정렬 */
  gap: 10px; /* 아이콘과 텍스트 간격 */
  margin-top: 10px;
}

.binBox {
  width: 100%;
  height: 60px;
}

.news-icon {
  width: 50px; /* 아이콘 크기 */
  height: auto;
  margin-top: -8px;
}

.news-text {
  flex: 1; /* 텍스트가 남은 공간을 차지 */
  word-wrap: break-word; /* 단어가 길 경우 줄 바꿈 */
  white-space: normal; /* 공백과 줄 바꿈을 정상적으로 처리 */
  line-height: 1.5; /* 줄 간격 */
  font-size: 14px; /* 텍스트 크기 */
}

.star {
  width: 30px;
  vertical-align: text-bottom;
}

/* Swiper 간격 조정 */
.product-swiper {
  height: 400px; /* Swiper 고정 높이 */
  cursor: pointer;
  margin-top: 10px;
  --swiper-theme-color: #ffaa00;
}

/* Swiper 내부 아이템 스타일 */
.product-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  background-color: white;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

/* 리스트 스타일 조정 */
.benefit-list {
  list-style: none; /* li 점 제거 */
  padding: 0;
  margin: 10px 0;
}

.benefit-item {
  text-align: left;
  font-size: 14px;
  color: #333;
}

/* 링크 스타일 */
.view-link {
  display: inline-block;
  margin-top: 10px;
  color: #8d6f05;
  text-decoration: none;
}

.view-link:hover {
  text-decoration: underline;
}

/* 섹션 간격 */
.no-products,
h6 {
  margin-top: 20px;
}

/* 키워드와 비슷한 상품 리스트 */
.product-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px; /* 리스트 아이템 간격 */
}

.click {
  text-align: start;
  font-size: 10px;
  color: #7189ff;
}

.scroll-to-top {
  background-color: white;
  color: #ffaa00;
  border: none;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.scroll-to-top:hover {
  background-color: #ffaa00;
  color: white;
}

.scroll {
  text-align: end;
}

</style>
