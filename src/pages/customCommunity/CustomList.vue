<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'; // 라우터 가져오기
import 'swiper/swiper-bundle.css';
import axios from 'axios';
import ReviewHeader from "@/pages/customCommunity/ReviewHeader.vue";

const router = useRouter(); // 라우터 인스턴스 생성
const errorMessage = ref(''); // 에러 메시지
const isLoading = ref(false); // 로딩 상태
const customs = ref([]); // 커스텀 커뮤니티 데이터
const customDetail = ref([]);

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

// 이미지 URL 생성
const getImageUrl = (imagePath) => {
  const baseUrl = "http://localhost:8080";
  return imagePath ? `${baseUrl}/${imagePath}` : `${baseUrl}/images/default-image.jpeg`;
};

// 클릭 시 DetailPage로 이동
const navigateToDetailPage = (sharedID) => {
  if (sharedID) {
    router.push(`/detailPage/${sharedID}`); // sharedID를 URL에 포함하여 라우팅
  } else {
    alert('유효하지 않은 페이지 ID입니다.');
  }
};

onMounted(() => {
  fetchGetCustomPage();
});
</script>

<template>
  <div class="binBox"></div>
  <div class="container">
    <ReviewHeader />

    <br /><br />
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    <div class="customList">
      <h2>커스텀 목록</h2>

      <div class="listGroup">
        <div
            class="list"
            v-for="custom in customs"
            :key="custom.sharedID"
            @click="navigateToDetailPage(custom.sharedID)"
        >
          <div class="image">
            <img :src="getImageUrl(custom.imagePath)" alt="Custom Image" />
          </div>
          <div class="text">
            <h5>{{ custom.pageName }}</h5>
            <p>❤️ {{ custom.heart }}</p>
          </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
.container {
  padding-top: 60px;
}

.binBox {
  width: 100%;
  height: 100px;
  background-color: #EEF4F9;
  position: fixed;
  top: 0;
  z-index: 100;
}

.list {
  display: flex;
  align-items: center; /* 텍스트와 이미지 수직 정렬 */
  margin: 30px 0;
  cursor: pointer; /* 클릭 가능하도록 커서 변경 */
}

.image {
  margin-right: 15px; /* 이미지와 텍스트 사이 간격 */
}

.image img {
  width: 144px;
  height: 254px;
  object-fit: cover;
  border-radius: 8px; /* 모서리를 둥글게 */
}

.text {
  display: flex;
  flex-direction: column; /* 텍스트를 수직 정렬 */
  justify-content: center; /* 텍스트를 수직 중앙 정렬 */
}

.text h5 {
  margin: 0 0 5px 0; /* 제목과 하트 간의 간격 조정 */
  font-size: 1.2em;
}

.text p {
  margin: 0;
  color: #ff4d4f; /* 하트 색상 */
}

.customList {
  padding: 30px;
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
