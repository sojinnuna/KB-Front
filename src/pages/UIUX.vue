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
      :style="{ top: `${widget.y}px`, left: `${widget.x}px` }"
      draggable="true"
      @dragstart="onDragStart(index, $event)"
      @dragend="onDragEnd(index, $event)"
    >
      <div class="widget-content">
        <span>{{ widget.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiUx',

  data() {
    return {
      isBottomSheetVisible: false,
      bottomSheetZIndex: 1, // 바텀 시트의 z-index 초기값
      isEditingMode: false, // 편집 모드 여부
      widgets: [], // 위젯 목록
      features: [
        '계좌이체',
        '최근거래내역조회',
        '내계좌전체보기',
        '상품가입',
        '환전',
        'ATM/창구출금',
        '증명서발급',
        '인증/보안',
        '고객센터',
      ], // 기능 목록
      isDragging: false, // 드래그 상태 관리
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
    // 로컬 스토리지에서 위젯 위치 로드
    const storedWidgetPositions = localStorage.getItem('widgetPositions');
    if (storedWidgetPositions) {
      this.widgets = JSON.parse(storedWidgetPositions);
    }
  },
  methods: {
    navigateToUiuxEdit() {
      this.$router.push('/uiuxedit'); // /uiuxedit 페이지로 이동
    },

    onDragStart(index, event) {
      this.isDragging = true;
      this.dragIndex = index;
      this.offsetX = event.offsetX;
      this.offsetY = event.offsetY;
    },
    onDragEnd(index, event) {
      if (!this.isDragging) return;

      const newX = event.pageX - this.offsetX;
      const newY = event.pageY - this.offsetY;

      // 그리드에 맞춰 위치 스냅
      this.widgets[index].x =
        Math.round(newX / this.gridSpacingX) * this.gridSpacingX;
      this.widgets[index].y =
        Math.round(newY / this.gridSpacingY) * this.gridSpacingY;

      // 로컬 스토리지에 저장
      localStorage.setItem('widgetPositions', JSON.stringify(this.widgets));

      this.isDragging = false;
      this.dragIndex = null;
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
  width: 200px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.widget {
  position: absolute;
  width: 90px; /* 그리드 칸의 너비 */
  height: 98.125px; /* 그리드 칸의 높이 */
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
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
