<template>
  <div class="exchange-rate-widget">
    <!-- 환율 정보 -->
    <div class="currency-info">
      <img
        :src="selectedCountry.flag"
        :alt="selectedCountry.name"
        class="currency-flag"
      />
      <div class="currency-details">
        <span class="currency-name">{{ selectedCountry.name }}</span>
        <span class="currency-rate">
          {{ exchangeRate !== null ? exchangeRate.toFixed(2) : "Loading..." }}
        </span>
      </div>
    </div>

    <!-- 나라 선택 버튼 -->
    <button class="select-country-button" @click="openModal">
      나라 선택하기
    </button>

    <!-- 모달 -->
    <div v-if="isModalOpen" class="modal-overlay">
      <div class="modal-content">
        <h3>나라를 선택하세요</h3>
        <ul class="country-list">
          <li
            v-for="country in countries"
            :key="country.code"
            class="country-item"
            @click="selectCountry(country)"
          >
            <img :src="country.flag" :alt="country.name" class="country-flag" />
            <span>{{ country.name }}</span>
          </li>
        </ul>
        <button class="close-button" @click="closeModal">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ExchangeRateWidget",
  data() {
    return {
      selectedCountry: {
        name: "미국 USD",
        code: "USD",
        flag: "https://flagcdn.com/us.svg",
      }, // 선택된 국가
      exchangeRate: null, // 환율 정보
      isModalOpen: false, // 모달 열림 상태
      countries: [
        {
          name: "미국 USD",
          code: "USD",
          flag: "https://flagcdn.com/us.svg",
        },
        {
          name: "일본 JPY",
          code: "JPY",
          flag: "https://flagcdn.com/jp.svg",
        },
        {
          name: "유럽 EUR",
          code: "EUR",
          flag: "https://flagcdn.com/eu.svg",
        },
      ], // 선택 가능한 국가 리스트
    };
  },
  methods: {
    async fetchExchangeRate(countryCode) {
      try {
        const response = await axios.get(
          `/api/exchange-rate?currency=${countryCode}`
        );
        console.log("API Response:", response.data); // 응답 데이터 확인
        this.exchangeRate = response.data.exchangeRate || response.data; // 응답 구조에 맞게 수정
      } catch (error) {
        console.error("환율 정보를 가져오는 중 오류 발생:", error);
        this.exchangeRate = null;
      }
    },
    openModal() {
      this.isModalOpen = true; // 모달 열기
    },
    closeModal() {
      this.isModalOpen = false; // 모달 닫기
    },
    selectCountry(country) {
      console.log("Selected Country:", country); // 선택한 국가 로그
      this.selectedCountry = { ...country }; // Reactivity 보장을 위한 새로운 객체
      this.fetchExchangeRate(country.code); // 선택된 국가의 환율 데이터 가져오기
      this.closeModal(); // 모달 닫기
    },
  },
  mounted() {
    // 기본적으로 미국(USD)의 환율 데이터를 가져옴
    this.fetchExchangeRate(this.selectedCountry.code);
  },
};
</script>

<style scoped>
.exchange-rate-widget {
  width: 180px;
  height: 196.25px;
  border-radius: 16px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}

.currency-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.currency-flag {
  width: 32px;
  height: 32px;
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

.select-country-button {
  width: 100%;
  height: 32px;
  border: none;
  background-color: #1e90ff;
  color: white;
  border-radius: 8px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.select-country-button:hover {
  background-color: #1c7ed6;
}

/* 모달 스타일 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 20px;
  width: 300px;
  text-align: center;
}

.country-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.country-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.country-item:hover {
  background-color: #f0f0f0;
}

.country-flag {
  width: 24px;
  height: 24px;
}

.close-button {
  margin-top: 10px;
  width: 100%;
  height: 32px;
  border: none;
  background-color: #1e90ff;
  color: white;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.close-button:hover {
  background-color: #1c7ed6;
}
</style>
