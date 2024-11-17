import {createRouter, createWebHistory} from 'vue-router'
import Trend from "@/pages/trend/Trend.vue";
import Shop from "@/pages/trend/Shop.vue";
import Loading from "@/pages/product/Loading.vue";
import MatchingProducts from "@/pages/product/MatchingProducts.vue";
import UIUX from '@/pages/UIUX.vue';

const routes = [
    {
        path: '/uiux',
        name: 'UiUx',
        component: UIUX,
    },
    {
        path: '/trend',
        name: 'trend',
        component: Trend
    },
    {
        path: '/shop',
        name: 'shop',
        component: Shop
    },
    {
        path: '/loading',
        name: 'loading',
        component: Loading
    },
    {
        path: '/matchingProducts',
        name: 'matchingProducts',
        component: MatchingProducts
    },
// 다른 경로를 추가할 수 있습니다.
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

