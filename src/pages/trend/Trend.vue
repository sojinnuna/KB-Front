<template>
  <div class="bc">
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div>
      <input
          class="d-inline search"
          type="text"
          placeholder="금융상품을 검색해보세요"
          v-model="searchQuery"
      />
      <button class="searchBtn" @click="handleSearch">
        <i class="d-inline bi bi-search"></i>
      </button>
    </div>
    <div class="box">
      <h3>카드</h3>
      <div v-if="loading" class="loading text-center">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="contentBox" v-if="!loading && Object.keys(topTrendingKeywords).length">
        <div class="contentParents">
          <swiper
              :pagination="{ dynamicBullets: true }"
              :modules="[Pagination, Autoplay]"
              class="mySwipe trendBox"
              :loop="true"
              :autoplay="{ delay: 3000, disableOnInteraction: false }"
          >
            <swiper-slide v-for="(keyword, group) in topTrendingKeywords" :key="group">
              <div class="content" @click="navigateToLoading(group, keyword)">
                <div class="fin">
                  <strong> 지금 트렌드는 [{{ keyword }}]<br />
                  {{ group }}엔 KB 카드상품!</strong>
                </div>
                <div class="emoji">
                  <img class="ThreedEmoji" :src="getEmoji(group)" alt="emoji" />
                </div>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <br><br>

      <h3>예적금</h3>
      <div v-if="loading" class="loading text-center">
        <div class="spinner-grow" style="width: 3rem; height: 3rem;" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="contentBox" v-if="!loading && Object.keys(topSavingsKeywords).length">
        <div class="contentParents">
          <swiper
              :pagination="{ dynamicBullets: true }"
              :modules="[Pagination, Autoplay]"
              class="mySwipe trendBox"
              :loop="true"
              :autoplay="{ delay: 3000, disableOnInteraction: false }"
          >
            <swiper-slide v-for="(keyword, group) in topSavingsKeywords" :key="group">
              <div class="content" @click="navigateToSavingLoading(group, keyword)">
                <div class="fin">
                  <strong> 지금 트렌드는 [{{ keyword }}]<br />
                    {{ group }}엔 KB 예적금상품!</strong>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
const searchQuery = ref('');
const router = useRouter();
const topTrendingKeywords = ref({});
const topSavingsKeywords = ref({});
const newsMap = ref({});
const savingNewsMap = ref({});
const errorMessage = ref('');
const loading = ref(false);

const handleSearch = () => {
  if (searchQuery.value.trim() === '') {
    alert('검색어를 입력해주세요.');
    return;
  }

  router.push({
    path: '/searchResult',
    query: { query: searchQuery.value.trim() }
  });
};

const fetchTopTrendNews = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await axios.get('/api/top-trend-news');
    console.log("API 응답 데이터:", response.data);

    if (response.data.success) {
      topTrendingKeywords.value = response.data.keywords || {};
      newsMap.value = response.data.news || {};
    } else {
      errorMessage.value = response.data.message || '데이터를 가져오는 중 오류가 발생했습니다.';
    }
  } catch (error) {
    errorMessage.value = '뉴스 데이터를 가져오는 중 오류가 발생했습니다.';
    console.error("오류:", error);
  } finally {
    loading.value = false;
  }
};
const fetchTopTrendSavingNews = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    const response = await axios.get('/api/top-savings-news');
    console.log("API 응답 데이터:", response.data);

    if (response.data.success) {
      topSavingsKeywords.value = response.data.keywords || {};
      savingNewsMap.value = response.data.news || {};
    } else {
      errorMessage.value = response.data.message || '데이터를 가져오는 중 오류가 발생했습니다.';
    }
  } catch (error) {
    errorMessage.value = '뉴스 데이터를 가져오는 중 오류가 발생했습니다.';
    console.error("오류:", error);
  } finally {
    loading.value = false;
  }
};



// 클릭 시 Loading 페이지로 이동하면서 group 파라미터 전송
const navigateToLoading = (group, keyword) => {
  router.push({ path: '/loading', query: { group, keyword } }); // 쿼리 파라미터로 group 전달
};
const navigateToSavingLoading = (group, keyword) => {
  router.push({ path: '/Savingloading', query: { group, keyword } }); // 쿼리 파라미터로 group 전달
};

const getEmoji = (group) => {
  const emojiMap = {
    여행: '/images/airplane_3d.png',
    쇼핑: '/images/shopping_cart_3d.png',
    금융: '/images/money_bag_3d.png',
    음식: '/images/hamburger_3d.png',
    반려동물: '/images/cat_with_wry_smile_3d.png',
    엔터테인먼트: '/images/film_frames_3d.png',
    자동차: '/images/bus_3d.png',
    건강: '/images/stethoscope_3d.png',
    교육: '/images/books_3d.png',
    기술: '/images/mobile_phone_3d.png',
    어린이: '/images/child_3d_light.png',
    청소년: '/images/child_3d_light.png',
    미래: '/images/rocket_3d.png',
    노랑풍선: '/images/balloon_3d.png',
    할인쿠폰: '/images/roll_of_paper_3d.png',
    직장인: '/images/office_worker_3d_default.png',
    목돈: '/images/money_with_wings_3d.png',
    사회초년생: '/images/woman_3d_default.png',
    재테크: '/images/bank_3d.png'
  };
  return emojiMap[group] || '😁';
};

onMounted(() => {
  fetchTopTrendNews();
  fetchTopTrendSavingNews();
});
</script>

<style scoped>
.searchBtn{
  border:none;
  background-color: transparent;
}
.box{
  padding: 20px;
  height: 500px;
}
.contentBox{
  height: 20vh;
}

.loading {
  color: #FFCC00;
  font-weight: bold;
  margin: 20px 0;
}
.error {
  color: red;
}
.trendBox {
  font-size: 15px;
  border-radius: 20px;
  width: 100%;
  height: 100%;
  max-width: 340px;
  max-height: 185px;
  background-color: #EFEFF1;
  margin: 0 auto;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  padding: 30px;
  cursor: pointer;
}

.fin {
  text-align: left;
}

.emoji {
  text-align: right;
}

.ThreedEmoji{
  width: 50px;
}


.contentParents{
  height: 135px;
}
.mySwipe{
  --swiper-theme-color: #ffaa00;
}
.searchBtn .bi{
  font-size: 30px;
  margin-left: -30px;

}
.bc{
  top:43px;
  position: relative;
}
.search{
  width: 250px;
  margin: 30px;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom-width: thin;
  background-color: rgba(238, 244, 249, 1);
}
</style>
