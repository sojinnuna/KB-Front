<template>
  <div class="remittance-widget" :style="widgetStyle">
    <div class="header">
      <p>간편 이체</p>
    </div>
    <div class="content">
      <!-- 송금할 계좌 입력을 숫자로 변경하고 위치를 보낼 금액 아래로 이동 -->
      <div class="input-group">
        <label for="recipient">송금할 계좌 입력</label>
        <input
            type="number"
            v-model="recipient"
            id="recipient"
            placeholder="계좌번호를 입력하세요"
        />
      </div>

      <!-- 보낼 금액 입력 위치를 위로 이동 -->
      <div class="input-group">
        <label for="balance">보낼 금액</label>
        <input
            type="number"
            v-model="balance"
            id="balance"
            placeholder="금액을 입력하세요"
        />
      </div>

      <div class="button-group">
        <button @click="sendMoney" :disabled="!balance || !recipient">
          송금하기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RemittanceWidget',
  data() {
    return {
      balance: '', // 송금 금액
      recipient: '', // 수신자 계좌번호
      senderAccountNumber: '33333322111111', // 송금하는 계좌번호 (예시, 실제로는 로그인한 사용자 계좌로 설정)
      widgetStyle: {
        width: '340px', // 2배 가로 크기 (기준 90px * 2)
        height: '196.25px', // 2배 세로 크기 (기준 98.125px * 2)
      },
    };
  },
  methods: {
    async sendMoney() {
      if (this.balance && this.recipient) {
        try {
          const accountDTO = {
            senderAccountNumber: this.senderAccountNumber, // 송금하는 계좌번호
            receiverAccountNumber: this.recipient, // 수신자 계좌번호
            balance: this.balance, // 송금 금액
          };

          const response = await fetch('http://localhost:8080/api/account/transfer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountDTO),
          });

          if (!response.ok) {
            throw new Error('송금 실패: ' + response.statusText);
          }

          const data = await response.json();
          alert(`송금이 완료되었습니다!\n금액: ${this.balance}원`);

          // 송금 후 입력 필드 초기화
          this.balance = '';
          this.recipient = '';
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert('모든 항목을 입력해주세요!');
      }
    },
  },
};
</script>


<style scoped>
.remittance-widget {
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.remittance-widget:hover {
  background-color: #f9f9f9;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
}

.header {
  text-align: center;
  margin-bottom: 10px;
}

.header p {
  margin: 0;
  color: #777;
  font-size: 14px;
}

.content {
  width: 100%;
}

.input-group {
  margin: 10px 0;
}

.input-group label {
  font-size: 12px;
  color: #555;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 5px;
  font-size: 14px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #007bff;
}

.button-group {
  width: 100%;
  display: flex;
  justify-content: center;
}

.button-group button {
  width: 100%;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-group button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.button-group button:hover {
  background-color: #0056b3;
}
</style>
