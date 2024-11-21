// src/api/customApi.js
import axios from 'axios';

const customApi = axios.create({
    baseURL: 'http://localhost:8080/api/custom', // 채권 API 엔드포인트
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // 세션 쿠키를 포함하여 요청
});

// GET /api/custom/page
export async function getCustomPage() {
    try {
        const response = await customApi.get('/page');
        return response.data;
    } catch (error) {
        console.error('GET 요청 에러: ', error);
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
