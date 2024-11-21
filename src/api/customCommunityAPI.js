import axios from 'axios';

const customCommunityPage = axios.create({
    baseURL: 'http://localhost:8080/api/community', // 채권 API 엔드 포인트
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function getCommunityPages() {
    try {
        const response = await customCommunityPage.get('/pages');
        return response.data;
    } catch (error) {
        console.error('get 요청 에러: ', error);
        throw error;
    }
}

export async function downloadCommunity(customCommunityPage) {
    try {
        const response = await customCommunityPage.get(`/page/download`, customCommunityPage);
        return response.data;
    } catch (error) {
        console.error('Error downloadCommunity ', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}

export async function shareCommunity(customCommunityPage) {
    try {
        const response = await customCommunityPage.post('/pages/share', customCommunityPage);
        return response.data;
    } catch (error) {
        console.error('Error posting sharing:', error);
        throw error; // 오류 발생 시 오류를 던져줌
    }
}

export async function heartCommunity(customCommunityPage){
    try{
        const response=await customCommunityPage.post('/pages/heart',customCommunityPage);
        return response.data;
    }catch(error){
        console.error('Error Posting heart',error);
        throw error;
    }
}
