<template>
  <div class="binBox">

  </div>
  <div class="container">
    <!-- ReviewHeader 컴포넌트 삽입 (필요 시 추가) -->
    <ReviewHeader />

    <br /><br />

    <!-- 상세 헤더 섹션 -->
    <div class="header">
      <h2><b>{{ customDetail.pageName }}</b></h2>
      <div class="right-section">
        <i class="bi bi-heart-fill"></i>
        <h5>{{ customDetail.heart }}</h5>
      </div>
    </div>
    <br />
    <!-- 상세 이미지 및 제목 섹션 -->
    <div class="detail-section">
      <div class="image">
        <img :src="getImageUrl(customDetail.imagePath)" alt="Custom Image" />
      </div>
    </div>

    <br /><br />

    <!-- 리뷰 섹션 -->
    <div class="reviewBox">
      <h2 class="d-inline"><b>좋아요</b></h2>
    </div>

    <div>
      <!-- 좋아요 수 표시 -->
      <div class="heartCount text-end">
        <i class="d-inline bi bi-heart-fill"></i>
        <h1 class="d-inline">{{ customDetail.heart }}</h1>
      </div>
      <br />
    </div>

    <!-- 버튼 섹션 -->
    <div class="btnBox">
      <button class="btn">적용</button>
      <button class="btn" :disabled="customDetail.isLiked" @click="toggleLike">
        <i class="bi" :class="customDetail.isLiked ? 'bi-heart-fill' : 'bi-heart'"></i>
      </button>
    </div>

    <!-- 로딩 인디케이터 -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <!-- 에러 메시지 표시 -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
    <br />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import ReviewHeader from "@/pages/customCommunity/ReviewHeader.vue"; // 필요 시 경로 수정
import axios from 'axios';

// 라우터 인스턴스
const router = useRouter();
const route = useRoute();

// 상태 관리
const errorMessage = ref(''); // 에러 메시지
const isLoading = ref(false); // 로딩 상태
const customDetail = ref({
  shareID: null,
  pageName: '',
  heart: 0,
  imagePath: '',
  isLiked: false,
});

const getImageUrl = (imagePath) => {
  const baseUrl = "http://localhost:8080";
  return imagePath ? `${baseUrl}/${imagePath}` : `${baseUrl}/images/default-image.jpeg`;
};

// 데이터 불러오기
const fetchCustomDetail = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  const shareID = route.params.sharedID; // 라우트 파라미터에서 shareID 가져오기
  if (!shareID) {
    errorMessage.value = '유효하지 않은 페이지 ID입니다.';
    isLoading.value = false;
    return;
  }

  try {
    const response = await axios.get(`/api/community/page/download`, {
      params: {
        shareID: shareID,
      },
    });
    customDetail.value = response.data;
    console.log(customDetail.value);
  } catch (error) {
    console.error('GET 요청 에러: ', error);
    if (error.response && error.response.status === 404) {
      errorMessage.value = '페이지를 찾을 수 없습니다.';
    } else {
      errorMessage.value = '데이터를 불러오는 데 실패했습니다.';
    }
  } finally {
    isLoading.value = false;
  }
};

// 좋아요 함수 (토글이 아니라 단순히 좋아요 추가)
const toggleLike = async () => {
  isLoading.value = true;
  errorMessage.value = '';

  try {
    await axios.post('/api/community/pages/heart', null, {
      params: {
        sharedID: customDetail.value.sharedID,
      },
    });
    // 성공 시 heart 수 증가
    customDetail.value.isLiked = true;
    customDetail.value.heart += 1;
  } catch (error) {
    console.error('좋아요 요청 에러:', error);
    errorMessage.value = '좋아요를 누르는 데 실패했습니다.';
  } finally {
    isLoading.value = false;
  }
};

// 컴포넌트 마운트 시 데이터 불러오기
onMounted(() => {
  fetchCustomDetail();
});
</script>

<style scoped>
/* 컨테이너 스타일 */
.container {
  padding: 60px 40px 20px;
  font-family: Arial, sans-serif;
  position: relative;
}

/* 에러 메시지 스타일 */
.error-message {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}

/* 헤더 스타일 */
.header {
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: space-between; /* 좌우 정렬 */
}

/* 제목 스타일 */
.header h2 {
  flex: 1; /* 제목이 중앙에 위치하도록 */
  text-align: start; /* 좌측 정렬 */
  margin: 0;
}

/* 아이콘과 숫자 영역 스타일 */
.right-section {
  display: flex;
  align-items: center;
  gap: 5px; /* 아이콘과 숫자 간 간격 */
}

/* 아이콘 스타일 */
.right-section .bi {
  font-size: 24px; /* 아이콘 크기 조정 */
  color: #ff5a5f; /* 하트 아이콘 색상 */
}

.heartCount .bi {
  font-size: 74px; /* 아이콘 크기 조정 */
  color: #ff5a5f;
}

/* 숫자 스타일 */
.right-section h5 {
  margin: 0;
  font-size: 18px;
}

.texts h2 {
  font-size: 1.5em;
}

.active {
  color: #ff5a5f;
  background-color: #ccc;
  cursor: not-allowed;
}


.bi-heart-fill {
  color: #ff5a5f; /* 좋아요 눌렀을 때 색상 */
}

.texts p {
  font-size: 1em;
  line-height: 1.5;
}

/* 상세 섹션 스타일 */
.detail-section {
  display: flex;
  gap: 20px;
  align-items: center;
}

.detail-section .image {
  max-width: 200px;
}

.detail-section .image img {
  width: 100%;
  height: auto;
  border-radius: 10px;
}

.detail-section .text {
  flex: 2;
}

/* 리뷰 박스 스타일 */
.reviewBox {
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: space-between; /* 좌우 정렬 */
}

.reviewBox h2 {
  font-size: 1.5em;
}

.heartCount h1 {
  font-size: 74px;
  margin: 0;
  color: #4c4c4c;
}


/* 버튼 섹션 스타일 */
.btnBox {
  position: fixed;
  bottom: 140px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  gap: 15px;
  background-color: transparent;
  z-index: 1000;
  align-items: center;
}

.btn {
  width: 150px;
  height: 40px;
  font-size: 20px;
  background-color: #FFCC00;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}


.btn .bi {
  margin-left: 8px;
  font-size: 24px;
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 그리드 스타일: 4x6 그리드 */
.main-page {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(6, 1fr);
  gap: 0;
  position: relative;
}

.binBox {
  width: 100%;
  height: 100px;
  background-color: #EEF4F9;
  position: fixed;
  top: 0;
  z-index: 100;
}
</style>
