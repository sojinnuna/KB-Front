<template>
  <div>
    <h1>KB 스타뱅킹 챗봇</h1>
    <form @submit.prevent="askQuestion">
      <label for="question">질문을 입력하세요:</label>
      <input type="text" v-model="question" required />
      <button type="submit">질문하기</button>
    </form>
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      question: "",
      response: "",
    };
  },
  methods: {
    async askQuestion() {
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
        this.response = `챗봇 응답: ${result.data}`;
      } catch (error) {
        console.error("Error:", error);
        this.response =
          "질문을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.";
      }
    },
  },
};
</script>

<style scoped>
/* 간단한 스타일 */
form {
  margin-bottom: 1rem;
}
button {
  margin-left: 0.5rem;
}
</style>
