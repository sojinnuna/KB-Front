<script setup>

import ReviewHeader from "@/pages/customCommunity/ReviewHeader.vue";
</script>

<template>
  <div class="container">
    <ReviewHeader/>
    <br><br>
      <div class="header">
        <h2><b>제목</b></h2>
        <div class="right-section">
          <i class="bi bi-heart-fill"></i>
          <h5>숫자</h5>
        </div>
        <br>
      </div>
    <div>
      이미지
      제목
    </div>
    <br><br>
    <div class="texts">
      <h2><b>설명</b></h2>
      어쩌고저쩌고
    </div>

    <br><br>
    <div class="reviewBox">
      <h2 class="d-inline"><b>좋아요</b></h2>
<!--      <h5 class="d-inline">리뷰작성 <i class="bi bi-feather"></i></h5>-->
    </div>
    <div>
      <div class="heartCount text-end">
        <i class="d-inline bi bi-heart-fill"></i>
        <h1 class="d-inline">123</h1>
      </div>
      <br>
      <div>
        <ul class="reviewList">
          <li>좋아요 한 유저</li>
          <li>아이디</li>
        </ul>
      </div>
    </div>
    <div class="btnBox">
      <button class="btn">적용</button>
      <button class="btn"><i class="bi bi-heart"></i></button>
    </div>
  </div>
</template>

<style scoped>
.reviewList{
  list-style: none;
}
/* 전체 컨테이너 스타일 */
.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  position: relative;
}

/* 고정 아이콘 영역 확보 */
.container {
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
  text-align: start; /* 중앙 정렬 */
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

.texts h5 {
  font-size: 18px;
}

.btn {
  width: 150px;
  height: 40px;
  font-size: 20px;
  background-color: #FFCC00;
  border-radius: 30px;
}

.btnBox {
  position: fixed;
  bottom: 140px;
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  z-index: 1000;
  align-items: center;
  gap: 15px;
}

.reviewBox {
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: space-between; /* 좌우 정렬 */
}

.heartCount h1{
  font-size:74px;
}
</style>

