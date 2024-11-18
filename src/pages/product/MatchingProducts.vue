<script setup>
import { ref, onMounted } from 'vue';
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

// API 호출: group 및 keyword로 상품 데이터 가져오기
const fetchProducts = async () => {
  loading.value = true;
  errorMessage.value = '';

  try {
    const response = await axios.get(`/api/matchingProducts`, {
      params: { group, keyword }, // group과 keyword를 서버로 전달
    });

    // 서버에서 두 리스트를 분리하여 응답
    keywordProducts.value = response.data.keywordProducts;
    groupProducts.value = response.data.groupProducts;

    // keywordProducts에 있는 상품은 groupProducts에서 제거 (productCode가 중복되는 상품 제거)
    groupProducts.value = groupProducts.value.filter(
        (groupProduct) =>
            !keywordProducts.value.some(
                (keywordProduct) => keywordProduct.productCode === groupProduct.productCode
            )
    );
    groupProducts.value = groupProducts.value.filter(
        (value, index, self) =>
            index === self.findIndex((t) => t.productId === value.productId)
    );
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

  // Filter out benefits that contain the keyword and show them first
  const keywordBenefits = benefits.filter(b => b.includes(keyword));
  const otherBenefits = benefits.filter(b => !b.includes(keyword));

  // Combine the keyword-related benefits with the rest, showing only the first 3
  const limitedBenefits = [...keywordBenefits, ...otherBenefits].slice(0, 3);

  return limitedBenefits;
};


// 상품 클릭 시 URL로 이동
const navigateToProduct = (url) => {
  if (url) {
    window.location.href = url; // 새 페이지로 이동
  }
};

// 컴포넌트가 마운트되었을 때 API 호출
onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="container">
    <div v-if="loading" class="loading text-center">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- keyword와 정확히 일치하는 상품을 Swiper로 나열 -->
    <div>
      <div class="trend">
        <h5>트렌드인 <b> {{ keyword }} </b> 맞춤상품</h5>
      </div>
      <swiper
          v-if="keywordProducts.length"
          :modules="[Pagination, Autoplay]"
          :pagination="{ clickable: true }"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          class="product-swiper"
          loop
          :style="{ height: '400px' }"
      >
        <swiper-slide
            v-for="product in keywordProducts"
            :key="product.productId"
            class="product-item"
            @click="navigateToProduct(product.productUrl)"
        >
          <img :src="product.imagePath" alt="Product Image" class="product-image" />
          <br><br>
          <h4>{{ product.productName }}</h4>

          <!-- Benefit List: Show up to 3 items and ensure keyword-related benefits are first -->
          <ul class="benefit-list">
            <li
                v-for="(benefit, index) in getLimitedBenefits(product.benefit)"
                :key="index"
                class="benefit-item"
            >
              {{ benefit }}

            </li>
            <li class="click">
              * 클릭 시 자세한 페이지로 이동
            </li>
          </ul>
        </swiper-slide>

      </swiper>
      <p v-else>정확히 일치하는 상품이 없습니다.</p>
    </div>
    <br><br>

    <!-- group 관련 상품 나열 -->
    <div>
      <h5>비슷한 {{ group }} 추천상품</h5>
      <ul v-if="groupProducts.length" class="product-list">
        <li v-for="product in groupProducts" :key="product.productId" class="product-item">
          <img :src="product.imagePath" alt="Product Image" class="product-image" />
          <br><br>
          <h4>{{ product.productName }}</h4>
          <ul class="benefit-list">
            <li v-for="benefit in product.benefit.split(',')" :key="benefit.trim()" class="benefit-item">
              {{ benefit.trim() }}
            </li>
          </ul>
          <a :href="product.productUrl" target="_blank" class="view-link">자세히 보기</a>
        </li>
      </ul>
      <p v-else>관련 상품이 없습니다.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  max-width: 360px;
  padding: 20px 20px 100px;
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

/* Swiper 간격 조정 */
.product-swiper {
  height: 400px; /* Swiper 고정 높이 */
  cursor: pointer;
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

#kb {
  width: 100%;
  max-width: 70px;
  margin-right: -10px;
  margin-top: -5px;
}

.click{
  text-align: start;
  font-size: 10px;
  color: #7189ff;
  padding:10px;
}
</style>
