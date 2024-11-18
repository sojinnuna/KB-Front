import { defineStore } from 'pinia';
import {
    getCustomPage,
    saveCustomPage,
    deleteCustomPage,
} from '@/api/customApi.js';

export const useCustomStore = defineStore('custom', {
    state: () => ({
        customPage: null,
        widget: [],
    }),
    actions: {
        // 모든 장바구니 아이템을 가져오는 메서드
        async getCustomPage() {
            try {
                const data = await getCustomPage();
                this.customPage = data;
                console.log(this.customPage);
            } catch (error) {
                console.error('get 요청 에러: ', error);
            }
        },

        // 장바구니에 새 아이템을 추가하는 메서드
        async saveCartItem(customPage) {
            try {
                await saveCustomPage(customPage);
                this.customPage.push(customPage);
            } catch (error) {
                console.error('post 요청 에러: ', error);
            }
        },

        // 장바구니에서 아이템을 삭제하는 메서드
        async removeCartItem() {
            try {
                await deleteCustomPage();
                this.customPage = null;
            } catch (error) {
                console.error('delete 요청 에러: ', error);
            }
        },
    },
});
