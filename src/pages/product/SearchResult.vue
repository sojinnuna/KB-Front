<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const searchQuery = ref(route.query.query || ''); // 쿼리 파라미터에서 검색어 가져오기
const results = ref([]);
const loading = ref(false);
const errorMessage = ref('');

const fetchSearchResults = async () => {
  if (!searchQuery.value) return;

  loading.value = true;
  try {
    const response = await axios.get('/api/search', {
      params: { query: searchQuery.value }
    });

    if (response.data.success) {
      results.value = response.data.results || [];
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
  <div class="search-result">
    <h2>"{{ searchQuery }}" 검색 결과</h2>
    <div v-if="loading" class="loading text-center">
      <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="!loading && results.length">
      <div v-for="result in results" :key="result.id" class="result-item">
        <h3>{{ result.title }}</h3>
        <p>{{ result.description }}</p>
      </div>
    </div>
    <div v-if="!loading && !results.length" class="text-center">
      검색 결과가 없습니다.
    </div>
  </div>
</template>


<style scoped>

</style>