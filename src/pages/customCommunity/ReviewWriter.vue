<!--<script setup>-->
<!--import { ref } from "vue";-->
<!--import ReviewHeader from "@/pages/customCommunity/ReviewHeader.vue";-->

<!--// 모달 표시 여부를 관리하는 변수-->
<!--const isModalVisible = ref(false);-->

<!--// 모달 열기-->
<!--const openModal = () => {-->
<!--  isModalVisible.value = true;-->
<!--};-->

<!--// 모달 닫기-->
<!--const closeModal = () => {-->
<!--  isModalVisible.value = false;-->
<!--};-->

<!--// 작성 동작-->
<!--const submitReview = () => {-->
<!--  // 리뷰 작성 로직을 여기에 추가-->
<!--  alert("리뷰가 작성되었습니다!");-->
<!--  isModalVisible.value = false;-->
<!--};-->
<!--</script>-->

<!--<template>-->
<!--  <div class="container">-->
<!--    <ReviewHeader /><br /><br />-->
<!--    <div class="header">-->
<!--      <h2><b>제목</b></h2>-->
<!--      <div class="right-section">-->
<!--        <i class="bi bi-heart-fill"></i>-->
<!--        <h5>숫자</h5>-->
<!--      </div>-->
<!--    </div>-->
<!--    <br /><br />-->
<!--    <div>-->
<!--      <h5 class="d-inline">-->
<!--        <b>리뷰작성 </b><i class="bi bi-feather"></i>-->
<!--      </h5>-->
<!--      <div class="text-center">-->
<!--        <br />-->
<!--        <textarea class="reviewArea"></textarea>-->
<!--      </div>-->
<!--    </div>-->
<!--    <br /><br />-->
<!--    <div class="text-center">-->
<!--      <button class="writerBtn" @click="openModal">작성</button>-->
<!--    </div>-->
<!--  </div>-->

<!--  &lt;!&ndash; 모달 &ndash;&gt;-->
<!--  <div v-if="isModalVisible" class="modalOverlay">-->
<!--    <div class="modalWriter">-->
<!--      <h1>리뷰를 작성하시겠습니까?</h1>-->
<!--      <div class="modalButtons">-->
<!--        <button class="cancelBtn" @click="closeModal">취소</button>-->
<!--        <button class="submitBtn" @click="submitReview">작성</button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<style scoped>-->
<!--/* 작성 버튼 스타일 */-->
<!--.writerBtn {-->
<!--  font-size: 20px;-->
<!--  width: 280px;-->
<!--  height: 50px;-->
<!--  border: none;-->
<!--  background-color: #ffcc00;-->
<!--  border-radius: 20px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--/* 텍스트 영역 스타일 */-->
<!--.reviewArea {-->
<!--  resize: none;-->
<!--  width: 270px;-->
<!--  height: 200px;-->
<!--  border-radius: 30px;-->
<!--  padding: 20px;-->
<!--  background-color: rgba(217, 217, 217, 1);-->
<!--}-->

<!--/* 전체 컨테이너 스타일 */-->
<!--.container {-->
<!--  padding: 20px;-->
<!--  font-family: Arial, sans-serif;-->
<!--  position: relative;-->
<!--}-->

<!--/* 헤더 스타일 */-->
<!--.header {-->
<!--  display: flex;-->
<!--  align-items: center; /* 수직 정렬 */-->
<!--  justify-content: space-between; /* 좌우 정렬 */-->
<!--}-->

<!--/* 제목 스타일 */-->
<!--.header h2 {-->
<!--  flex: 1;-->
<!--  text-align: start;-->
<!--  margin: 0;-->
<!--}-->

<!--/* 아이콘과 숫자 영역 스타일 */-->
<!--.right-section {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  gap: 5px;-->
<!--}-->

<!--/* 아이콘 스타일 */-->
<!--.right-section .bi {-->
<!--  font-size: 24px;-->
<!--  color: #ff5a5f;-->
<!--}-->

<!--/* 인라인 텍스트 스타일 */-->
<!--.d-inline b {-->
<!--  font-size: 20px;-->
<!--  padding: 5px;-->
<!--}-->

<!--/* 모달 오버레이 스타일 */-->
<!--.modalOverlay {-->
<!--  position: fixed;-->
<!--  top: 0;-->
<!--  left: 0;-->
<!--  width: 100%;-->
<!--  height: 100%;-->
<!--  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  z-index: 1000;-->
<!--}-->

<!--/* 모달 창 스타일 */-->
<!--.modalWriter {-->
<!--  background-color: white;-->
<!--  padding: 30px;-->
<!--  border-radius: 20px;-->
<!--  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);-->
<!--  text-align: center;-->
<!--}-->

<!--/* 모달 버튼 스타일 */-->
<!--.modalButtons {-->
<!--  display: flex;-->
<!--  justify-content: space-around;-->
<!--  margin-top: 20px;-->
<!--}-->

<!--.cancelBtn,-->
<!--.submitBtn {-->
<!--  width: 100px;-->
<!--  height: 40px;-->
<!--  border: none;-->
<!--  border-radius: 10px;-->
<!--  font-size: 16px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--.cancelBtn {-->
<!--  background-color: #ccc;-->
<!--}-->

<!--.submitBtn {-->
<!--  background-color: #ffcc00;-->
<!--}-->

<!--/* 아이콘 스타일 */-->
<!--.right-section .bi {-->
<!--  font-size: 24px; /* 아이콘 크기 조정 */-->
<!--  color: #ff5a5f; /* 하트 아이콘 색상 */-->
<!--}-->

<!--.d-inline b{-->
<!--  font-size: 20px;-->
<!--  padding: 5px;-->
<!--}-->
<!--</style>-->