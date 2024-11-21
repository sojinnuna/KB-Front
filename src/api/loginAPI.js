import axios from 'axios';

const loginApi = axios.create({
    baseURL: 'http://localhost:8080/api/user',
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function login(user) {
    try {
        const response = await loginApi.post('/login', user);
        return response.data;
    } catch (error) {
        console.error('로그인 요청 에러: ', error);
        throw error;
    }
}


export default class loginAPI {
}