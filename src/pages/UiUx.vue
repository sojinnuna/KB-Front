<template>
  <div class="main-page">
    <Header />
    <!-- + 버튼 클릭 시 바텀 시트 표시, 바텀 시트 열리면 + 버튼 숨김 -->
    <div
      v-if="!isBottomSheetVisible"
      class="plus-box"
      @click="toggleBottomSheet"
    >
      <span class="plus-sign">+</span>
    </div>

    <!-- 바텀 시트 (toggle 상태에 따라 보여짐) -->
    <div v-if="isBottomSheetVisible" class="bottom-sheet">
      <div class="bottom-sheet-header">
        <h4>추가할 기능을 선택해주세요</h4>
      </div>

      <div class="bottom-sheet-body">
        <!-- 아이콘을 삽입할 곳 -->
        <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
        <span> 계좌이체</span>
        <hr />
        <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
        <span> 최근거래내역조회</span>
        <hr />
        <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
        <span> 내계좌전체보기</span>
        <hr />
        <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
        <span> 상품가입</span>
        <hr />
        <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
        <span> 환전</span>
        <hr />
        <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
        <span> ATM/창구출금</span>
        <hr />
        <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
        <span> 증명서발급</span>
        <hr />
        <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
        <span> 인증/보안</span>
        <hr />
        <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
        <span> 고객센터</span>
        <hr />
      </div>

      <div class="bottom-sheet-footer">
        <button @click="toggleBottomSheet">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
// Header.vue 컴포넌트 불러오기
import Header from '@/components/Header.vue';

export default {
  name: 'UiUx',
  components: {
    Header,
  },
  data() {
    return {
      // 바텀 시트 표시 여부 상태
      isBottomSheetVisible: false,
    };
  },
  methods: {
    // 바텀 시트 열기/닫기 토글 함수
    toggleBottomSheet() {
      this.isBottomSheetVisible = !this.isBottomSheetVisible;
    },
  },
};
</script>

<style scoped>
.main-page {
  padding: 20px;
  width: 360px;
  height: 750px; /* Footer.vue 메뉴바 공간을 고려 */
  margin: 0 auto;
  background-color: #eef4f9; /* 강제로 배경색 적용 */
}

.plus-box {
  position: fixed;
  bottom: 110px; /* 푸터 위에 위치하도록 설정 */
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.plus-sign {
  font-size: 60px;
  font-weight: bolder;
  color: rgb(0, 0, 0);
}

/* 바텀 시트 스타일 */
.bottom-sheet {
  position: fixed;
  top: 15%; /* 화면 상단으로 더 올리기 */
  left: 50%; /* 가로 중앙 */
  transform: translateX(-50%); /* 정확히 가로 중앙 정렬 */
  width: 330px;
  height: 700px;

  background-color: white;
  max-height: 70vh; /* 화면 높이의 최대 70%로 제한 */
  border-radius: 20px;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* 바텀 시트 헤더 스타일 (h4 고정) */
.bottom-sheet-header {
  width: 100%;
  position: sticky;
  top: 0;
  background-color: white;
  padding: 10px 0;
  text-align: center;
  z-index: 1;
}

/* 스크롤되는 바디 영역 */
.bottom-sheet-body {
  width: 100%;
  overflow-y: auto;
  max-height: 70vh; /* 내용이 많을 경우 스크롤 추가 */
  padding-top: 10px;
}

/* 버튼 스타일 */
.bottom-sheet-footer {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.bottom-sheet button {
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.2);
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 38px;
  width: 130px;
  font-weight: bolder;
}
</style>
