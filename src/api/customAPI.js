import axios from 'axios';

const customApi = axios.create({
    baseURL: 'http://localhost:8080/api/custom', // 채권 API 엔드 포인트
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function getCustomPage() {
    try {
        const response = await customApi.get('/page');
        return response.data;
    } catch (error) {
        console.error('get 요청 에러: ', error);
        throw error;
    }
}

export async function saveCustomPage(customPage) {
    try {
        const response = await customApi.post(`/page`, customPage);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart detail:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}

export async function deleteCustomPage() {
    try {
        const response = await customApi.delete('/page', cartItem);
        return response.data;
    } catch (error) {
        console.error('Error posting cart:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}
