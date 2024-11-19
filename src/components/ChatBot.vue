<template>
  <div>
    <!-- 논모달 챗봇 버튼 -->
    <button class="chatbot-button" @click="toggleChat">
      <img
        src="C:/Marts/KBITSME_F/src/assets/images/rabbit.png"
        alt="Chatbot Icon"
      />
    </button>

    <!-- 논모달 챗봇 창 -->
    <div v-if="isChatOpen" class="chat-modal">
      <h1 class="chat-title">KB 챗봇</h1>
      <div class="chat-content">
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
        <!-- 입력 폼 -->
        <form @submit.prevent="sendMessage" class="chat-form">
          <input
            v-model="inputText"
            placeholder="메시지를 입력하세요"
            class="chat-input"
            required
          />
          <button type="submit" class="send-button">전송</button>
        </form>
      </div>
      <button @click="toggleChat" class="close-chat">닫기</button>
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
/* 논모달 챗봇 버튼 */
.chatbot-button {
  position: fixed;
  bottom: 120px;
  right: 5px;
  width: 80px;
  height: 80px;
  background-color: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1001;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.chatbot-button img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 50%;
}

/* 논모달 챗봇 창 */
.chat-modal {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 300px;
  height: 400px;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 15px;
}

.chat-modal .chat-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.chat-modal .chat-content {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
}

.chat-modal .chat-form {
  display: flex;
  gap: 10px;
}

.chat-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.send-button {
  background-color: #08af2a;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0a9a25;
}

.chat-modal .close-chat {
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
}

.chat-modal .close-chat:hover {
  background-color: #d33;
}

.chat-message {
  margin-bottom: 10px;
}

.chat-message.user {
  text-align: right;
  color: #555;
}
</style>
