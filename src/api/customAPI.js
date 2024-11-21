// src/api/customApi.js
import axios from 'axios';

const customApi = axios.create({
  baseURL: 'http://localhost:8080/api/custom',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getCustomPage(userNum) {
  try {
    console.log(userNum);
    const response = await customApi.get(
      `/page?userNum=${encodeURIComponent(userNum)}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('get 요청 에러: ', error);
    throw error;
  }
}

// POST /api/custom/page
export async function saveCustomPage(customPage) {
  try {
    const response = await customApi.post('/page', customPage);
    return response.data;
  } catch (error) {
    console.error('POST 요청 에러:', error);
    throw error; // 오류 발생 시 오류를 던져줌
  }
}

// DELETE /api/custom/page/{id}
export async function deleteCustomPage(id) {
  try {
    const response = await customApi.delete(`/page/${id}`);
    return response.data;
  } catch (error) {
    console.error('DELETE 요청 에러:', error);
    throw error; // 오류 발생 시 오류를 던져줌
  }
}

export default customApi;
