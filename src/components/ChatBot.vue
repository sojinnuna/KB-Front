<template>
  <div v-if="!$route.meta.hideChatBot">
    <button class="chatbot-button" @click="toggleChat">
      <img src="/images/rabbit2.png" alt="Chatbot Icon" />
    </button>

    <!-- 논모달 챗봇 창 -->
    <div v-if="isChatOpen" class="chat-modal">
      <!-- 헤더 -->
      <div class="chat-header">
        <div class="chat-title">
          <i class="fa-solid fa-comment-dots"></i> KB 가이드 챗봇
        </div>
        <button @click="toggleChat" class="close-chat">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <!-- 대화 내용 -->
      <div class="chat-content" ref="chatContent">
        <!-- 챗봇 메시지 -->
        <div
          v-for="(message, index) in messages"
          :key="index"
          class="chat-message"
          :class="message.type"
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

      <!-- 풋터 입력 폼 -->
      <div class="chat-footer">
        <form @submit.prevent="sendMessage" class="chat-form">
          <input
            v-model="inputText"
            placeholder="메시지를 입력하세요..."
            class="chat-input"
            required
          />
          <button type="submit" class="send-button">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import { useChatStore } from "@/stores/chat";

export default {
  name: "Chatbot",
  setup() {
    const isChatOpen = ref(false); // 챗봇 창 열기/닫기 상태
    const inputText = ref(""); // 현재 입력 중인 질문
    const chatStore = useChatStore(); // Pinia 스토어

    // 스토어에서 메시지 가져오기
    const messages = computed(() => chatStore.messages);

    // 챗봇 창 열기/닫기
    const toggleChat = () => {
      isChatOpen.value = !isChatOpen.value;
    };

    // 질문 전송
    const sendMessage = async () => {
      if (inputText.value.trim()) {
        // 사용자 메시지 추가
        chatStore.addMessage({ type: "user", text: inputText.value });

        try {
          const result = await axios.post(
            "http://localhost:8080/chatbot/ask",
            null,
            {
              params: {
                question: inputText.value,
              },
            }
          );

          const responseText = result.data;

          // 응답 내 동영상 URL 처리
          const videoMatch = responseText.match(
            /URL: https:\/\/www\.youtube\.com\/watch\?v=([\w-]+)/
          );

          if (videoMatch) {
            const videoId = videoMatch[1];
            chatStore.addMessage({
              type: "bot",
              text: responseText.split("URL:")[0].trim(),
              isVideo: true,
              videoId,
            });
          } else {
            chatStore.addMessage({
              type: "bot",
              text: responseText,
              isVideo: false,
            });
          }
        } catch (error) {
          console.error("Error:", error);
          chatStore.addMessage({
            type: "bot",
            text: "질문을 처리하는 중 오류가 발생했습니다.",
            isVideo: false,
          });
        }

        inputText.value = ""; // 입력 초기화
      }
    };

    return {
      isChatOpen,
      inputText,
      messages,
      toggleChat,
      sendMessage,
    };
  },
};
</script>

<style scoped>
.video-iframe {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
}
/* 논모달 챗봇 버튼 */
.chatbot-button {
  position: fixed;
  bottom: 120px; /* 화면 하단에서 20px 위 */
  right: 5px; /* 화면 오른쪽에서 20px 안쪽 */
  width: 100px; /* 버튼 크기 조정 */
  height: 100px; /* 버튼 크기 조정 */
  background-color: transparent; /* 배경색 제거 */
  border: none; /* 버튼 테두리 제거 */
  border-radius: 50%; /* 버튼을 원형으로 만듦 */
  cursor: pointer;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0; /* 기본 여백 제거 */
}

.chatbot-button img {
  width: 100%; /* 버튼 크기에 맞춰 이미지 크기 조정 */
  height: 100%; /* 버튼 크기에 맞춰 이미지 크기 조정 */
  object-fit: contain; /* 이미지 비율 유지 */
  border-radius: 50%; /* 이미지도 원형으로 */
}
/* 논모달 챗봇 창 */
.chat-modal {
  position: fixed;
  bottom: 100px; /* 챗봇 버튼 위 */
  right: 20px;
  width: 300px;
  height: 500px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 0;
}

/* 헤더 */
.chat-header {
  background-color: #fed100;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.chat-modal .chat-title {
  font-size: 18px;
  font-weight: bold;
}

.chat-modal .close-chat {
  background-color: transparent;
  color: white;
  border: none;
  cursor: pointer;
}

.chat-modal .close-chat:hover {
  color: #d33;
}

.chat-modal .chat-content {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  word-wrap: break-word;
  word-break: break-all;
}

/* 풋터 */
.chat-footer {
  background-color: #ffcc00;
  padding: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  align-items: center;
}

/* 입력창과 전송 버튼 하단 고정 */
.chat-modal .chat-form {
  display: flex;
  flex: 1;
  gap: 10px;
}

.chat-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.send-button {
  background-color: #ffcc00;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-message.user {
  text-align: right;
  color: #555;
  margin-left: auto;
  background-color: #add8e6;
  border-radius: 10px 0 10px 10px;
  max-width: fit-content;
}

.chat-message.bot {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: #333;
  border-radius: 0 10px 10px 10px;
  max-width: fit-content;
}

.chat-message {
  max-width: 80%;
  padding: 10px;
  font-size: 14px;
  line-height: 1.4;
  position: relative;
  word-wrap: break-word;
  word-break: break-all;
}

/* 챗봇 메시지 */
.chat-message.bot::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: -10px;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 10px 10px 10px 0;
  border-color: transparent #f1f1f1 transparent transparent;
}
</style>
