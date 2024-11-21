<template>
  <div class="widget-container">
    <div class="header">내 계좌 잔액</div>
    <div class="balance">{{ formattedBalance }}</div>
    <button class="action-button" @click="showDetails">자세히</button>
  </div>
</template>
<script>
import axios from "axios";


export default {
  name: "Widget",
  data() {
    return {
      accountNumber: '33333322111111',
      balance: 0, // 초기 잔액 데이터 (숫자)
    };
  },
  computed: {
    // 잔액을 '₩1,234,567' 형식으로 포맷
    formattedBalance() {
      return `₩${this.balance.toLocaleString()}`;
    },
  },
  methods: {
    // '자세히' 버튼 클릭 시 알림
    showDetails() {
      alert("잔액 상세 보기");
    },
    // 서버에서 잔액 데이터 가져오기
    async fetchBalance() {
      try {
        const response = await axios.get(`http://localhost:8080/api/account/${this.accountNumber}`);
        if (response.status === 200) {
          this.balance = response.data.balance; // 서버에서 받은 잔액 데이터
        } else {
          console.error("데이터를 가져오는 데 실패했습니다.");
          alert("잔액 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("API 호출 중 오류:", error);
        alert("API 호출 중 오류가 발생했습니다.");
      }
    },
  },
  mounted() {
    this.fetchBalance(); // 컴포넌트가 마운트될 때 API 호출
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
