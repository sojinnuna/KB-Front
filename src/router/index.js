import { createRouter, createWebHistory } from "vue-router";
import UIUX from "@/pages/UIUX.vue";
import Trend from "@/pages/trend/Trend.vue";
import Loading from "@/pages/product/Loading.vue";
import MatchingProducts from "@/pages/product/MatchingProducts.vue";
import Accountbook from "@/pages/account/Accountbook.vue";
import ChatBot from "@/pages/business/ChatBot.vue";
import CustomCommunity from "@/pages/customCommunity/CustomCommunity.vue";
import DetailPage from "@/pages/customCommunity/DetailPage.vue";
import UiuxEdit from "@/pages/UiuxEdit.vue";
import MatchingSavings from "@/pages/product/MatchingSavings.vue";
import SavingLoading from "@/pages/product/SavingLoading.vue";
import HomePage from "@/pages/HomePage.vue";
import UiuxTransfer from "@/pages/uiuxTransfer.vue";
import CustomList from "@/pages/customCommunity/CustomList.vue";
import SearchResult from "@/pages/product/SearchResult.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    { path: "/", name: "homepage", component: HomePage },
    {
      path: "/trend",
      name: "trend",
      component: Trend,
      meta: {hideHeader: true}
    },
    {
      path: "/searchResult",
      name: "searchResult",
      component: SearchResult,
      meta: {hideHeader: true}
    },
    {
      path: "/loading",
      name: "loading",
      component: Loading,
      meta: {hideHeader: true}
    },
    {
      path: "/savingLoading",
      name: "savingLoading",
      component: SavingLoading,
      meta: {hideHeader: true}
    },
    {
      path: "/matchingProducts",
      name: "matchingProducts",
      component: MatchingProducts,
      meta: {hideHeader: true}
    },
    {
      path: "/matchingSavings",
      name: "matchingSavings",
      component: MatchingSavings,
      meta: {hideHeader: true}
    },
    {
      path: "/uiux",
      name: "UiUx",
      component: UIUX,
    },
    {
      path: "/uiuxedit",
      name: "UiuxEdit",
      component: UiuxEdit,
    },

    {
      path: "/chatbot",
      name: "chatbot",
      component: ChatBot,
    },
    {
      path: "/customCommunity",
      name: "customCommunity",
      component: CustomCommunity,
      meta: {hideHeader: true}
    },
    {
      path: "/detailPage",
      name: "detailPage",
      component: DetailPage,
      meta: { hideHeader: true , hideChatBot:true},
    },
    {
      path: "/home",
      name: "homepage",
      component: HomePage,
    },
    {
      path: "/customList",
      name: "customList",
      component: CustomList,
      meta: { hideHeader: true },
    },
    {
      path: "/transfer",
      name: "Transfer",
      component: UiuxTransfer,
    },
  ],
});

export default router;
