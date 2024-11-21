<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const searchQuery = ref(route.query.query || '');
const results = ref([]);
const loading = ref(false);
const errorMessage = ref('');

const fetchSearchResults = async () => {
  if (!searchQuery.value.trim()) {
    errorMessage.value = '검색어를 입력해주세요.';
    return;
  }

  loading.value = true;
  errorMessage.value = ''; // 에러 메시지 초기화
  try {
    const response = await axios.get('/api/searchProducts', {
      params: {
        query: searchQuery.value.trim()
      }
    });

    if (response.data) {
      results.value = response.data || [];
    } else {
      errorMessage.value = response.data.message || '검색 결과를 가져오는 중 오류가 발생했습니다.';
    }
  } catch (error) {
    errorMessage.value = '검색 데이터를 가져오는 중 오류가 발생했습니다.';
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSearchResults();
});

</script>

<template>
  <div class="binBox">

  </div>
  <div class="search-result">
    <h2>"{{ searchQuery }}" 검색 결과</h2>

    <!-- 로딩 상태 -->
    <div v-if="loading" class="loading text-center">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p>검색 중입니다...</p>
    </div>

    <!-- 에러 메시지 -->
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <!-- 검색 결과 -->
    <div v-if="!loading && results.length" class="result-list">
      <div v-for="result in results" :key="result.productId" class="result-item">
        <h3>{{ result.productName }}</h3>
        <p>{{ result.benefit.replace(/\n/g, ' ') }}</p>
        <a :href="result.productUrl" target="_blank" class="product-link">자세히 보기</a>
      </div>
    </div>

    <!-- 결과 없음 -->
    <div v-if="!loading && !results.length" class="text-center">
      검색 결과가 없습니다.
    </div>
  </div>
</template>


<style scoped>
.result-item{
  background-color: white;
  border-radius: 40px;
}
.search-result {
  overflow-y: auto;
  padding: 60px 20px 20px;
  background-color: #eef4f9;
  position: relative;
}

.loading {
  color: #ffaa00;
  font-weight: bold;
  margin: 20px 0;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 20px;
}

.result-item {
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 20px;
}

.result-item h3 {
  font-size: 18px;
  margin: 0;
  color: #333;
}

.result-item p {
  margin: 5px 0 0;
  font-size: 14px;
  color: #555;
}

.text-center {
  text-align: center;
  color: #888;
  margin-top: 20px;

}
.binBox {
  width: 100%;
  height: 60px;
  background-color: #EEF4F9; /* 필요한 경우 배경색 추가 */
  position: fixed;
  top: 0;
  z-index: 100;
}
</style>
