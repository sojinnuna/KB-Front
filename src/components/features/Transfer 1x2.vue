<template>
  <div class="exchange-rate-widget">
    <div class="currency-info">
      <img
        src="https://flagcdn.com/us.svg"
        alt="미국 국기"
        class="currency-flag"
      />
      <div class="currency-details">
        <span class="currency-name">미국 USD</span>
        <span class="currency-rate">
          {{ exchangeRate ? exchangeRate.toFixed(2) : "Loading..." }}
        </span>
      </div>
    </div>

    <!-- 충전 버튼 -->
    <button class="charge-button" @click="goToChargePage">
      환율 보러 가기
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ExchangeRateWidget",
  data() {
    return {
      exchangeRate: null, // 환율 정보를 저장할 데이터
    };
  },
  methods: {
    async fetchExchangeRate() {
      try {
        // Java 백엔드 API 호출
        const response = await axios.get("/api/exchange-rate");
        this.exchangeRate = response.data; // 환율 데이터를 상태에 저장
      } catch (error) {
        console.error("환율 정보를 가져오는 중 오류 발생:", error);
        this.exchangeRate = null; // 오류 시 기본값 설정
      }
    },
    goToChargePage() {
      this.$router.push("/charge"); // 충전 페이지로 이동
    },
  },
  mounted() {
    this.fetchExchangeRate(); // 컴포넌트 마운트 시 API 호출
  },
};
</script>

<style scoped>
.exchange-rate-widget {
  width: 180px; /* 1x2 크기 */
  height: 98.125px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.logo-container {
  align-self: flex-start;
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.logo {
  width: 24px;
  height: 24px;
}

.currency-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
}

.currency-flag {
  width: 24px;
  height: 24px;
}

.currency-details {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.currency-name {
  font-weight: bold;
}

.currency-rate {
  color: #1e90ff;
}

.charge-button {
  width: 100%;
  height: 24px;
  border: none;
  background-color: #1e90ff;
  color: white;
  border-radius: 4px;
  font-size: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.charge-button:hover {
  background-color: #1c7ed6;
}
</style>
