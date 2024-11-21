<template>
  <div class="binBox">

  </div>
  <div class="main-page">
    <br>
    <!-- 상단 계좌 -->
    <TrendBanner/><br>
    <div class="header-section">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2">
            <img src="/images/kb-logo.png" alt="KB Logo" class="logo-img" />
            <div class="account-label">한도제한계좌</div>
            <div class="account-title">KB국민ONE통장</div>
          </div>
        </div>
      </div>
      <div class="account-number">
        <span>394410-85-000001</span>
        <i class="fa-solid fa-copy copy-icon"></i>
      </div>
      <br />
      <br />
      <div class="balance-amount">1,000,000원</div>
      <button class="transfer-button">출금계좌등록</button>
    </div>

    <br />
    <div class="word"><i class="fa-solid fa-gear"></i> 대표계좌 설정</div>
    <br />

    <!-- Tab Section -->
    <div class="exchange-rate-section">
      <h2 class="tab-title">환율</h2>
      <div class="last-updated">매매기준율 2024.11.20 16:25:55</div>
      <div class="rate-list">
        <div class="rate-item">
          <span class="currency">USD</span>
          <span class="rate">1,392.20</span>
        </div>
        <div class="rate-item">
          <span class="currency">JPY</span>
          <span class="rate">895.59</span>
        </div>
        <div class="rate-item">
          <span class="currency">EUR</span>
          <span class="rate">1,473.92</span>
        </div>
      </div>
      <div class="action-buttons">
        <button class="action-button">환전신청</button>
        <button class="action-button">KB환율표</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Main Page */
.main-page {
  font-family: "Pretendard", sans-serif;
  padding: 5px;
  width: 360px;
  margin-top: 60px;
  background-color: #f8fafc; /* 밝은 배경 */
}

.header-section {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.flex {
  display: flex;
  align-items: center; /* 요소를 세로 중앙 정렬 */
  gap: 12px; /* 요소 간 간격 */
}

.logo-img {
  width: 40px; /* 로고 크기 */
  height: 40px;
  border-radius: 50%; /* 원형 이미지 */
  object-fit: cover; /* 이미지 비율 유지 */
}

.account-label {
  font-size: 14px; /* 텍스트 크기 */
  font-weight: 500; /* 텍스트 두께 */
  color: #6b7280; /* 텍스트 색상 */
}

.account-title {
  font-size: 18px;
  font-weight: 600;
  color: rgb(34, 34, 34);
}

.menu-button {
  background: transparent;
  border: none;
  font-size: 20px;
  color: #6b7280;
  cursor: pointer;
}

.account-number {
  margin-top: 8px;
  font-size: 14px;
  color: #374151;
  display: flex;
  align-items: center;
  gap: 4px;
}

.copy-icon {
  font-size: 14px;
  color: #6b7280;
  cursor: pointer;
}

/* Balance Section */
.balance-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding: 16px;
  border-radius: 12px;
  background-color: #f9fafb;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.balance-amount {
  font-size: 24px;
  font-weight: bold;
  color: #111827;
}

.transfer-button {
  font-size: 14px;
  color: #ffffff;
  background-color: #a8a7a4;
  padding: 8px 120px;
  border: none;
}

.transfer-button:hover {
  background-color: #f4c700;
  transform: translateY(-2px);
}

/* 전체 섹션 */
.exchange-rate-section {
  width: 100%;
  max-width: 400px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 0 auto;
}

/* 제목 */
.tab-title {
  font-size: 18px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 10px;
}

/* 업데이트 시간 */
.last-updated {
  font-size: 12px;
  color: #6b7280;
  margin-bottom: 20px;
  text-align: right;
}

/* 환율 리스트 */
.rate-list {
  margin-bottom: 20px;
}

.rate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e5e7eb;
}

.rate-item:last-child {
  border-bottom: none; /* 마지막 아이템에 밑줄 제거 */
}

.currency {
  font-size: 16px;
  font-weight: 500;
  color: #374151;
}

.rate {
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.word {
  font-family: "Pretendard", sans-serif;
  color: #515254;
  font-size: 16px;
  text-align: center;
}

/* 버튼들 */
.action-buttons {
  display: flex;
  gap: 10px;
}

.action-button {
  flex: 1;
  padding: 12px 0;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  background-color: #f9fafb;
  text-align: center;
  transition: all 0.3s;
}

.action-button:hover {
  background-color: #f3f4f6;
  color: #111827;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
<script setup lang="ts">
import TrendBanner from "@/components/TrendBanner.vue";
</script>