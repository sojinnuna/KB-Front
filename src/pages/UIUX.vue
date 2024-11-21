<template>
  <div class="main-page">
    <!-- 기존 + 버튼 -->
    <div class="plus-box" @click="navigateToUiuxEdit">
      <span class="plus-sign">+</span>
    </div>

    <!-- 위젯들 렌더링 -->
    <div
      v-for="(widget, index) in widgets"
      :key="index"
      class="widget"
      :style="{ top: widget.y + 'px', left: widget.x + 'px' }"
    >
      <!-- 동적 컴포넌트 렌더링 -->
      <component :is="widget.component" />
    </div>
  </div>
</template>

<script>
import { getCustomPage, saveCustomPage } from '../api/customAPI';
import Account1x1 from '../components/features/Account 1x1.vue';
import Account1x2 from '../components/features/Account 1x2.vue';
import Account2x4 from '../components/features/Account 2x4.vue';
import Exchange1x1 from '../components/features/Exchange 1x1.vue';
import Exchange1x2 from '../components/features/Exchange 1x2.vue';
import Exchange2x2 from '../components/features/Exchange 2x2.vue';
import Game1x1 from '../components/features/game1x1.vue';
export default {
  name: 'UiUx',
  components: {
    Account1x1,
    Account1x2,
    Account2x4,
    Exchange1x1,
    Exchange1x2,
    Exchange2x2,
    Game1x1,
  },
  data() {
    return {
      isBottomSheetVisible: false,
      bottomSheetZIndex: 1, // 바텀 시트의 z-index 초기값
      isEditingMode: false, // 편집 모드 여부
      widgets: [], // 위젯 목록
      features: [
        {
          name: '계좌 조회',
          isDropdownOpen: false,
          options: [
            { id: '1', displayName: '1x1', component: 'Account1x1' },
            { id: '2', displayName: '1x2', component: 'Account1x2' },
            { id: '3', displayName: '2x4', component: 'Account2x4' },
          ],
        },
        {
          name: '환율 조회',
          isDropdownOpen: false,
          options: [
            { id: '4', displayName: '1x1', component: 'Exchange1x1' },
            { id: '5', displayName: '1x2', component: 'Exchange1x2' },
            { id: '6', displayName: '2x2', component: 'Exchange2x2' },
          ],
        },
        {
          name: '참참참 게임',
          isDropdownOpen: false,
          options: [{ id: '7', displayName: '1x1', component: 'Game1x1' }],
        },
      ], // 기능 목록
      dragIndex: null, // 현재 드래그 중인 위젯 인덱스
      offsetX: 0, // 드래그 시작 시 offset 값
      offsetY: 0, // 드래그 시작 시 offset 값
      gridHeight: 785 - 60 - 110, // 헤더와 + 버튼을 제외한 그리드 높이 계산
      gridWidth: 360, // 화면 너비
      gridSize: { x: 4, y: 6 }, // 그리드의 가로(8)와 세로(4) 크기 8, 4
      gridSpacingX: 90, // 각 그리드의 간격(픽셀) 45
      gridSpacingY: 98.125,
    };
  },
  mounted() {
    this.initSavedPage();
  },
  methods: {
    navigateToUiuxEdit() {
      this.$router.push('/uiuxedit'); // /uiuxedit 페이지로 이동
    },

    async initSavedPage() {
      const userDataString = localStorage.getItem('user');
      const userData = JSON.parse(userDataString);
      const userNum = userData.userNum;

      const saveCustomPage = await getCustomPage(userNum);

      console.log(saveCustomPage);

      if (saveCustomPage) {
        localStorage.setItem('customPageData', JSON.stringify(saveCustomPage));

        const pageData = JSON.parse(localStorage.getItem('customPageData'));
        this.widgets = pageData.layoutData;
      }
    },
  },
};
</script>

<style scoped>
.main-page {
  padding: 5px;
  width: 360px;
  height: 570px;
  margin-top: 60px;
  background-color: #eef4f9;
  position: relative;
}
.plus-box {
  position: fixed;
  bottom: 114px;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 50px;
  background-color: rgba(220, 210, 210, 0.2);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-bottom:10px;
}

.widget {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  z-index: 1;
}

.widget-content {
  text-align: center;
  font-size: 14px;
  color: #333;
}

.plus-sign {
  font-size: 40px;
  font-weight: bolder;
  color: rgb(0, 0, 0);
}
.widgets-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;
}
</style>
