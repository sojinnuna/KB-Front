<template>
  <div class="main-page">
    <!-- <Header /> -->
    <!-- + 버튼 클릭 시 바텀 시트 표시, 바텀 시트 열리면 + 버튼 숨김 -->
    <div
      v-if="!isBottomSheetVisible"
      class="plus-box"
      @click="toggleBottomSheet"
    >
      <span class="plus-sign">+</span>
    </div>

    <!-- 바텀 시트 (toggle 상태에 따라 보여짐) -->
    <div
      v-if="isBottomSheetVisible"
      class="bottom-sheet"
      :style="{ zIndex: bottomSheetZIndex }"
    >
      <div class="bottom-sheet-header">
        <h4>추가할 기능을 선택해주세요</h4>
      </div>

      <div class="bottom-sheet-body">
        <!-- 클릭 가능한 기능 항목 -->
        <div
          class="feature-item"
          v-for="(feature, index) in features"
          :key="index"
          @click="handleFeatureClick(feature)"
        >
          <div class="feature-content">
            <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
            <span>&nbsp;{{ feature }}</span>
          </div>
          <hr class="feature-divider" />
        </div>
      </div>

      <div class="bottom-sheet-footer">
        <button @click="toggleBottomSheet">닫기</button>
      </div>
    </div>

    <!-- 위젯이 표시될 위치 관리 -->
    <div
      v-for="(widget, index) in widgets"
      :key="index"
      class="widget"
      :style="{ top: widget.y + 'px', left: widget.x + 'px' }"
      @mousedown="startDrag($event, index)"
    >
      <div class="widget-content">
        <span>{{ widget.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
  name: 'UiUx',
  components: {
    Header,
  },
  data() {
    return {
      isBottomSheetVisible: false,
      bottomSheetZIndex: 1, // 바텀 시트의 z-index 초기값
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
      gridSize: { x: 8, y: 4 }, // 그리드의 가로(8)와 세로(4) 크기
      gridSpacing: 45, // 각 그리드의 간격(픽셀)
    };
  },
  methods: {
    toggleBottomSheet() {
      this.isBottomSheetVisible = !this.isBottomSheetVisible;
      this.bottomSheetZIndex = this.isBottomSheetVisible ? 999 : 1;
    },
    handleFeatureClick(feature) {
      alert(`${feature} 기능을 선택했습니다.`);
      // 기능 클릭 시 위젯 추가
      const widget = {
        name: feature,
        x: 10, // 초기 X 좌표 (0으로 시작)
        y: 60, // 초기 Y 좌표 (0으로 시작)
        zindex: 1,
      };

      // 위젯 위치가 다른 위젯과 겹치지 않도록 확인
      let isOverlapping = true;
      while (isOverlapping) {
        isOverlapping = false;
        for (const existingWidget of this.widgets) {
          if (this.isOverlapping(widget, existingWidget)) {
            widget.y += 100; // 100px만큼 y축 위치를 내려서 겹침 방지
            isOverlapping = true;
            break;
          }
        }
      }

      this.widgets.push(widget);
      this.isBottomSheetVisible = false; // 바텀 시트 숨기기
    },

    isOverlapping(widget1, widget2) {
      return (
        widget1.x < widget2.x + 100 &&
        widget1.x + 100 > widget2.x &&
        widget1.y < widget2.y + 100 &&
        widget1.y + 100 > widget2.y
      );
    },

    startDrag(event, index) {
      this.isDragging = true;
      this.dragIndex = index;
      this.offsetX = event.clientX - this.widgets[index].x;
      this.offsetY = event.clientY - this.widgets[index].y;

      // 마우스 움직임에 따라 위치 변경
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },

    onDrag(event) {
      if (this.isDragging) {
        let newX = event.clientX - this.offsetX;
        let newY = event.clientY - this.offsetY;

        // 그리드 내에서 위치 제한
        newX = Math.max(
          0,
          Math.min(newX, this.gridSpacing * (this.gridSize.x - 1))
        );
        newY = Math.max(60, Math.min(newY, this.gridHeight - 100));

        // 위젯의 x, y 좌표가 화면 바깥으로 나가지 않도록 제한
        this.widgets[this.dragIndex].x = Math.min(
          Math.max(newX, 0), // x좌표 제한 (왼쪽 경계)
          this.gridWidth - 100 // x좌표 제한 (오른쪽 경계)
        );

        this.widgets[this.dragIndex].y = Math.min(
          Math.max(newY, 60), // y좌표 제한 (위쪽 경계)
          this.gridHeight - 100 // y좌표 제한 (아래쪽 경계)
        );
      }
    },
    stopDrag() {
      this.isDragging = false;
      this.dragIndex = null;
      document.removeEventListener('mousemove', this.onDrag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
  },
};
</script>

<style scoped>
.main-page {
  padding: 20px;
  width: 360px;
  height: 785px;
  margin: 0 auto;
  background-color: #eef4f9;
  position: relative;
}

.plus-box {
  position: fixed;
  bottom: 120px;
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

.widget {
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
}

.widget-content {
  text-align: center;
  font-size: 14px;
  color: #333;
}

.plus-sign {
  font-size: 60px;
  font-weight: bolder;
  color: rgb(0, 0, 0);
}

/* 바텀 시트 스타일 */
.bottom-sheet {
  position: fixed;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 330px;
  height: auto;
  background-color: white;
  max-height: 70vh;
  border-radius: 20px;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.3);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* 바텀 시트 헤더 스타일 */
.bottom-sheet-header {
  width: 100%;
  position: sticky;
  top: 0;
  background-color: white;
  padding: 10px 0;
  text-align: center;
  z-index: 1;
}

.feature-item {
  display: flex; /* 아이콘과 텍스트를 가로로 배치 */
  align-items: flex-start;
  width: 100%;
  cursor: pointer;
  padding: 10px 0; /* 아이콘과 텍스트 주변에 여백 추가 */
  white-space: nowrap; /* 텍스트 줄바꿈 방지 */
  flex-direction: column; /* 수직으로 요소를 배치 */
}

.feature-content {
  display: flex;
  width: 100%; /* 부모의 넓이를 100%로 설정 */
  align-items: center; /* 아이콘과 텍스트의 수직 정렬 */
  gap: 5px; /* 아이콘과 텍스트 간격 */
  justify-content: flex-start; /* 아이콘과 텍스트의 수평 왼쪽 정렬 */
}

.feature-divider {
  width: 100%;
  border: none; /* 기존 스타일 유지, 필요에 따라 변경 가능 */
  border-top: 1px solid #333; /* 선 스타일 지정 */
  margin: 0; /* 양옆 여백 제거 */
  box-sizing: border-box; /* 요소 크기를 정확히 맞추기 위해 사용 */
}

/* 스크롤되는 바디 영역 */
.bottom-sheet-body {
  width: 100%;
  overflow-y: auto;
  max-height: 70vh;
  padding-top: 10px;
}

/* 각 기능 항목 스타일 */
.feature-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  cursor: pointer;
}

.feature-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

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

/* 그리드 스타일: 4x8 그리드 */
.main-page {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0;
  position: relative;
}
</style>
