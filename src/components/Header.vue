<template>
  <div class="header">
    <!-- 왼쪽 정렬: 간편홈과 토글 버튼 -->
    <div class="left-container">
      <button class="toggle-btn">간편홈</button>
      <label class="switch">
        <input type="checkbox" />
        <span class="slider"></span>
      </label>
    </div>

    <!-- 오른쪽 정렬: 다른 버튼들 -->
    <div class="right-container">
      <button class="header-btn">알림</button>
      <button class="header-btn">상담</button>
      <button class="header-btn">검색</button>
      <button class="header-btn">메뉴</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style scoped>
/* Header Styles */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0%; /* 화면 세로 중간 */
  left: 50%; /* 화면 가로 중간 */
  transform: translateX(-50%); /* 정확히 중앙 정렬 */
  z-index: 999;
  width: 360px; /* 가로 크기 */
  white-space: nowrap; /* 텍스트가 다음 줄로 넘어가지 않도록 설정 */
}

/* 왼쪽 정렬 */
.left-container {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 왼쪽 정렬 */
  flex-grow: 1; /* 왼쪽 요소가 남은 공간을 차지하게 함 */
  margin-left: -15px;
}

/* 토글 버튼 */
.toggle-btn {
  background-color: transparent; /* 배경색 제거 */
  color: #333;
  padding: 10px 3px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  margin-left: 10px;
}

/* 스위치 스타일 */
.switch {
  position: relative;
  display: inline-block;
  width: 38px;
  height: 20px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 50px;
  width: 45px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 12px;
  width: 12px;
  border-radius: 50px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #fc0;
}

input:checked + .slider:before {
  transform: translateX(25px);
}

/* 오른쪽 정렬 */
.right-container {
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  flex-grow: 0; /* 오른쪽 요소가 남은 공간을 차지하게 함 */
}

/* 버튼 스타일 */
.header-btn {
  background-color: transparent; /* 배경색 제거 */
  color: #333; /* 텍스트 색 */
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  margin-right: -10px;
}
</style>
