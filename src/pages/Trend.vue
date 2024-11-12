<template>
  <div>
    <h1>최근 일주일간 최고 트렌드 검색어 관련 뉴스</h1>
    <button @click="fetchTopTrendNews">뉴스 가져오기</button>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

    <ul v-if="newsList.length">
      <li v-for="(news, index) in newsList" :key="index">{{ news }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const newsList = ref([]);
const errorMessage = ref('');

const fetchTopTrendNews = async () => {
  try {
    const response = await axios.get('/api/top-trend-news');
    newsList.value = response.data;
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = '뉴스 데이터를 가져오는 중 오류가 발생했습니다.';
    console.error(error);
  }
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
