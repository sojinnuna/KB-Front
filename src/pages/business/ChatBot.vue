<template>
  <div class="chat-container">
    <h1 class="chat-title">KB 챗봇</h1>
    <div class="chat-window">
      <div class="chat-messages">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="['message', message.type]"
        >
          <!-- 유저 메시지 -->
          <div v-if="message.type === 'user'" class="message-content">
            {{ message.text }}
          </div>

          <!-- 챗봇 메시지 -->
          <div v-else class="message-content">
            <div v-if="message.isVideo">
              <p>{{ message.text }}</p>
              <div class="video-wrapper">
                <iframe
                  :src="`https://www.youtube.com/embed/${message.videoId}`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  class="video-iframe"
                ></iframe>
              </div>
            </div>
            <div v-else>
              {{ message.text }}
            </div>
          </div>
        </div>
      </div>
      <form @submit.prevent="askQuestion" class="chat-input-form">
        <input
          type="text"
          v-model="question"
          placeholder="질문을 입력해주세요."
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

        // 동영상 URL과 텍스트를 포함한 응답인 경우 처리
        const responseText = result.data;
        const videoMatch = responseText.match(
          /URL: https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/
        );

        if (videoMatch) {
          const videoId = videoMatch[1];

          this.messages.push({
            type: "bot",
            text: responseText.split("URL:")[0].trim(),
            isVideo: true,
            videoId,
          });
        } else {
          // 일반 텍스트 응답 처리
          this.messages.push({
            type: "bot",
            text: responseText,
            isVideo: false,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          type: "bot",
          text: "질문을 처리하는 중 오류가 발생했습니다.",
          isVideo: false,
        });
      } finally {
        this.question = ""; // 입력 창 초기화
      }
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eef4f9; /* 배경색 */
}

.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: none; /* 제한된 너비 제거 */
  margin: 0;
  background-color: #eef4f9;
  border-radius: 0; /* 둥근 테두리 제거 */
  padding: 0;
  box-shadow: none; /* 그림자 제거 */
}

.chat-title {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
  color: #333;
}

.chat-window {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100% - 60px); /* 제목과 입력 영역을 제외한 높이 */
  border: none;
  border-radius: 0;
  background-color: white;
  overflow: hidden;
  position: relative;
}

.chat-messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 70%;
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
  background-color: white;
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

/* 비디오 스타일 */
.video-wrapper {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 16 / 9;
  margin-top: 10px;
}

.video-iframe {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: none;
}
</style>
