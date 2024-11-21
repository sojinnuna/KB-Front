<template>
  <div class="exchange-rate-widget">
    <div class="logo-container">
      <img src="/images/kb-logo.png" alt="국민은행 로고" class="logo" />
    </div>

    <div class="currency-info">
      <img
        src="https://flagcdn.com/us.svg"
        alt="미국 국기"
        class="currency-flag"
      />
      <span class="currency-name">미국 USD</span>
    </div>

    <button class="charge-button" @click="goToChargePage">충전</button>
  </div>
</template>

<script>
export default {
  name: "ExchangeRateWidget",
  methods: {
    goToChargePage() {
      this.$router.push("/charge"); // 경로 찾아야함
    },
  },
};
</script>

<style scoped>
.exchange-rate-widget {
  width: 90px;
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
}

.currency-flag {
  width: 16px;
  height: 16px;
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
