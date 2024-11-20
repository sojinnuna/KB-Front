<template>
  <div class="bc">
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="loading" class="loading text-center">
      <div class="spinner-grow" style="width: 3rem; height: 3rem" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div
      class="contentBox"
      v-if="!loading && Object.keys(topTrendingKeywords).length"
    >
      <div class="contentParents">
        <br />
        <swiper
          :pagination="{ dynamicBullets: true }"
          :modules="[Pagination, Autoplay]"
          class="mySwipe trendBox"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
        >
          <swiper-slide
            v-for="(keyword, group) in topTrendingKeywords"
            :key="group"
          >
            <div class="content" @click="navigateToLoading(group, keyword)">
              <div class="fin">
                지금 트렌드는 <strong>[{{ keyword }}]</strong><br />
                {{ group }}에 어울리는 KB금융상품은?
              </div>
              <div class="emoji">
                <img class="ThreedEmoji" :src="getEmoji(group)" alt="emoji" />
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const router = useRouter();
const topTrendingKeywords = ref({});
const topSavingsKeywords = ref({});
const newsMap = ref({});
const errorMessage = ref("");
const loading = ref(false);

const fetchTopTrendNews = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await axios.get("/api/top-trend-news");
    console.log("API 응답 데이터:", response.data);

    if (response.data.success) {
      topTrendingKeywords.value = response.data.keywords || {};
      newsMap.value = response.data.news || {};
    } else {
      errorMessage.value =
        response.data.message || "데이터를 가져오는 중 오류가 발생했습니다.";
    }
  } catch (error) {
    errorMessage.value = "뉴스 데이터를 가져오는 중 오류가 발생했습니다.";
    console.error("오류:", error);
  } finally {
    loading.value = false;
  }
};
const fetchTopTrendSavingNews = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    const response = await axios.get("/api/top-savings-news");
    console.log("API 응답 데이터:", response.data);

    if (response.data.success) {
      topSavingsKeywords.value = response.data.keywords || {};
      savingNewsMap.value = response.data.news || {};
    } else {
      errorMessage.value =
        response.data.message || "데이터를 가져오는 중 오류가 발생했습니다.";
    }
  } catch (error) {
    errorMessage.value = "뉴스 데이터를 가져오는 중 오류가 발생했습니다.";
    console.error("오류:", error);
  } finally {
    loading.value = false;
  }
};

// 클릭 시 Loading 페이지로 이동하면서 group 파라미터 전송
const navigateToLoading = (group, keyword) => {
  router.push({ path: "/loading", query: { group, keyword } }); // 쿼리 파라미터로 group 전달
};
const navigateToSavingLoading = (group, keyword) => {
  router.push({ path: "/Savingloading", query: { group, keyword } }); // 쿼리 파라미터로 group 전달
};

const getEmoji = (group) => {
  const emojiMap = {
    여행: "/images/airplane_3d.png",
    쇼핑: "/images/shopping_cart_3d.png",
    금융: "/images/money_bag_3d.png",
    음식: "/images/hamburger_3d.png",
    반려동물: "/images/cat_with_wry_smile_3d.png",
    엔터테인먼트: "/images/film_frames_3d.png",
    자동차: "/images/bus_3d.png",
    건강: "/images/stethoscope_3d.png",
    교육: "/images/books_3d.png",
    기술: "/images/mobile_phone_3d.png",
  };
  return emojiMap[group] || "😁";
};

onMounted(() => {
  fetchTopTrendNews();
  fetchTopTrendSavingNews();
});
</script>

<style scoped>
.contentBox {
  height: 14vh;
}

.loading {
  color: #ffcc00;
  font-weight: bold;
  margin: 20px 0;
}
.error {
  color: red;
}
.trendBox {
  font-size: 16px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  max-width: 330px;
  max-height: 85px;
  background-color: #efeff1;
  margin: 0 auto;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 25px;
  cursor: pointer;
}

.fin {
  text-align: left;
}

.emoji {
  text-align: right;
}

.ThreedEmoji {
  width: 30px;
}

.contentParents {
  height: 130px;
  background-color: white;
}
</style>
