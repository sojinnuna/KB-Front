<template>
  <div class="widget-container">
    <div class="header">내 계좌 잔액</div>
    <div class="balance">{{ formattedBalance }}</div>
    <button class="action-button" @click="showDetails">자세히</button>
  </div>
</template>

<script>
export default {
  name: 'Widget',
  data() {
    return {
      balance: 1234567, // 초기 잔액 데이터
    };
  },
  computed: {
    // 잔액을 '₩1,234,567' 형식으로 포맷
    formattedBalance() {
      return `₩${this.balance.toLocaleString()}`;
    },
  },
  methods: {
    showDetails() {
      // '자세히' 버튼 클릭 시 알림
      alert('잔액 상세 보기');
    },
  },
};
</script>

<style scoped>
.widget-container {
  width: 90px;
  height: 98.125px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transition: all 0.3s ease;
}

.header {
  font-size: 12px;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.balance {
  font-size: 14px;
  color: #28a745; /* 잔액 표시 색상 */
  margin-bottom: 5px;
}

.action-button {
  font-size: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 4px;
  cursor: pointer;
}

.action-button:hover {
  background-color: #0056b3; /* 버튼 hover 효과 */
}
</style>
