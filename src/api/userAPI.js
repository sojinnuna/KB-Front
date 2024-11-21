import axios from 'axios';

const customApi = axios.create({
  baseURL: 'http://localhost:8080/api/user',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function register() {
  try {
    const response = await customApi.post('/register');
    return response.data;
  } catch (error) {
    console.error('get 요청 에러: ', error);
    throw error;
  }
}

export async function login() {
  try {
    const response = await customApi.post(`/login`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cart detail:', error);
    throw error; // 오류 발생 시 오류를 던져줌
  }
}

export async function logout() {
  try {
    const response = await customApi.post('/logout');
    return response.data;
  } catch (error) {
    console.error('Error posting cart:', error);
    throw error; // 오류 발생 시 오류를 던져줌
  }
}
