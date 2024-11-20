<template>
  <div class="exchange-rate-widget" :style="widgetStyle">
    <div class="header">
      <p>살때 환율 2024.11.20, 13:56</p>
    </div>
    <div class="currency-list">
      <div
        v-for="(currency, index) in currencyInfo"
        :key="index"
        class="currency-item"
      >
        <img :src="currency.flag" :alt="`${currency.name} flag`" class="flag" />
        <span class="currency-name">{{ currency.name }}</span>
        <span class="currency-rate">{{ currency.rate.toFixed(2) }}</span>
        <span :class="['currency-change', currency.isIncrease ? 'up' : 'down']">
          {{ currency.isIncrease ? '▲' : '▼' }} {{ currency.change.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExchangeRateWidget',
  data() {
    return {
      currencyInfo: [
        {
          name: '미국 USD',
          rate: 1203.0,
          change: 1.3,
          flag: 'https://flagcdn.com/us.svg',
          isIncrease: true,
        },
        {
          name: '일본 JPY',
          rate: 933.0,
          change: -1.1,
          flag: 'https://flagcdn.com/jp.svg',
          isIncrease: false,
        },
        {
          name: '유럽 EUR',
          rate: 1501.0,
          change: 0.0,
          flag: 'https://flagcdn.com/eu.svg',
          isIncrease: false,
        },
      ],
      widgetStyle: {
        width: '180px', // 가로 크기를 2배로 설정
        height: '98.125px', // 세로 크기 설정
      },
    };
  },
};
</script>

<style scoped>
.exchange-rate-widget {
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 5px;
  font-family: 'Arial', sans-serif;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease; /* 호버 효과에 부드러운 전환 추가 */
}

.exchange-rate-widget:hover {
  background-color: #f9f9f9; /* 배경색 변경 */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15); /* 그림자 효과 추가 */
}

.header {
  text-align: center;
  margin-bottom: 3px; /* 여백 조정 */
}

.header p {
  margin: 0;
  color: #777;
  font-size: 8px; /* 텍스트 크기 줄이기 */
}

.currency-list {
  width: 100%;
  overflow: hidden; /* 리스트 내용이 넘치지 않도록 설정 */
  margin-top: 3px;
}

.currency-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
  font-size: 8px; /* 텍스트 크기 줄이기 */
  border-bottom: 1px solid #f0f0f0;
  transition: background-color 0.3s ease; /* 호버 효과 부드럽게 전환 */
}

.currency-item:hover {
  background-color: #f0f0f0; /* 항목 호버 시 배경색 변경 */
}

.flag {
  width: 16px; /* 플래그 크기 조정 */
  height: 16px;
}

.currency-name {
  flex-grow: 1;
  margin-left: 5px;
  text-align: left;
}

.currency-rate {
  font-weight: bold;
}

.currency-change {
  font-size: 8px; /* 텍스트 크기 줄이기 */
}

.up {
  color: red;
}

.down {
  color: blue;
}
</style>
