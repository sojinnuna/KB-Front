<template>
  <div class="chat-container">
    <h1 class="chat-title">KB 스타뱅킹 챗봇</h1>
    <div class="chat-window">
      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type]"
        >
          <div class="message-content">{{ message.text }}</div>
        </div>
      </div>
      <form @submit.prevent="askQuestion" class="chat-input-form">
        <input
          type="text"
          v-model="question"
          placeholder="질문을 입력하세요..."
          required
          class="chat-input"
        />
        <button type="submit" class="chat-send-button">전송</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      question: "",
      messages: [], // 대화 메시지 저장
    };
  },
  methods: {
    async askQuestion() {
      // 유저 메시지 추가
      this.messages.push({ type: "user", text: this.question });

      try {
        const result = await axios.post(
          "http://localhost:8080/chatbot/ask",
          null,
          {
            params: {
              question: this.question,
            },
          }
        );
        // 챗봇 응답 메시지 추가
        this.messages.push({
          type: "bot",
          text: `챗봇 응답: ${result.data}`,
        });
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          type: "bot",
          text: "질문을 처리하는 중 오류가 발생했습니다.",
        });
      } finally {
        this.question = ""; // 입력 창 초기화
      }
    },
  },
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background-color: #eef4f9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.chat-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.chat-window {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  overflow: hidden;
  position: relative;
}

.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 80%;
  padding: 10px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.5;
}

.message.user {
  align-self: flex-end;
  background-color: #dcf8c6;
  color: #333;
}

.message.bot {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: #333;
}

.message-content {
  word-wrap: break-word;
}

.chat-input-form {
  display: flex;
  gap: 10px;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.chat-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 15px;
  font-size: 14px;
  outline: none;
}

.chat-send-button {
  padding: 10px 20px;
  background-color: #08af2a;
  color: white;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-size: 14px;
}

.chat-send-button:hover {
  background-color: #0a9a25;
}

.chat-send-button:active {
  background-color: #078a1f;
}
</style>
