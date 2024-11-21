<script setup>
import loginAPI from "@/api/loginAPI.js";
import router from "@/router/index.js";
import { reactive, ref } from "vue";

// 상태 관리
const error = ref('');
const user = reactive({
  userId: '',
  userPassword: '',
});

// 로그인 함수
const login = async () => {
  try {
    await loginAPI.login(user);
    alert('로그인에 성공했습니다!');
    router.push({ path: '/', replace: true });
  } catch (e) {
    error.value = e.response?.data?.message || '로그인에 실패했습니다.';
    user.userPassword = ''; // 비밀번호 초기화
  }
};
login();
</script>

<template>
  <div class="login-container">
    <h1>로그인</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="userId">아이디</label>
        <input
            id="userId"
            type="text"
            v-model="user.userId"
            placeholder="아이디를 입력하세요"
            required
        />
      </div>

      <div class="form-group">
        <label for="userPassword">비밀번호</label>
        <input
            id="userPassword"
            type="password"
            v-model="user.userPassword"
            placeholder="비밀번호를 입력하세요"
            required
        />
      </div>

      <p v-if="error" class="error-message">
        <strong>에러:</strong> {{ error }}
      </p>

      <button
          type="submit"
          class="login-btn"
          :disabled="!user.userId || !user.userPassword"
      >
        로그인
      </button>
    </form>
  </div>
</template>

<style scoped>
/* 전체 컨테이너 스타일 */
.login-container {
  max-width: 300px;
  margin: 150px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}
input:focus {
  border-color: #fc0;
  box-shadow: 0 0 5px rgba(252, 192, 0, 0.5);
  outline: none;
}

.login-btn:hover {
  background-color: #cca40d;
  transform: scale(1.02);
}
/* 제목 스타일 */
h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

/* 폼 그룹 스타일 */
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}


.login-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  background-color: #fdd;
  padding: 10px;
  border: 1px solid red;
  border-radius: 5px;
}
/* 로그인 버튼 스타일 */
.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #fc0;;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #cca40d;;
}
</style>
