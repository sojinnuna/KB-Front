<template>
  <div class="header">
    <!-- 왼쪽 정렬: 간편홈과 토글 버튼 -->
    <div class="left-container">
      <SimpleHome v-if="!$route.meta.hideHeader"/>
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
import SimpleHome from "@/components/SimpleHome.vue";

export default {
  name: 'Header',
  components: {SimpleHome},
};
</script>

<style scoped>
/* Header Styles */
.left-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-grow: 1;
  margin-left: -15px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: fixed;
  top: 0%;
  background-color: white;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  width: 360px;
  white-space: nowrap;
  border-bottom: 1px solid #d2cdcd;
}


/* 오른쪽 정렬 */
.right-container {
  display: flex;
  justify-content: flex-end;
  flex-grow: 0;
}

/* 버튼 스타일 */
.header-btn {
  background-color: transparent;
  color: #333;
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  margin-right: -10px;
}
</style>
