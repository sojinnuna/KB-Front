<template>
  <div class="main-page">
    <!-- + 버튼 클릭 시 바텀 시트 표시, 바텀 시트 열리면 + 버튼 숨김 -->

    <div
        v-if="!isBottomSheetVisible"
        class="plus-box"
        @click="toggleBottomSheet"
    >
      <span class="plus-sign">{{ isEditingMode ? '완료' : '+' }}</span>
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
        @mousedown="isEditingMode && startDrag($event, index)"
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
  components: {},
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
  methods: {
    toggleBottomSheet() {
      if (this.isEditingMode) {
        // 편집 모드에서 "완료" 버튼 클릭 시 편집 모드 종료
        this.isEditingMode = false;
        this.widgets.forEach((widget) => {
          widget.draggable = false; // 드래그 비활성화
        });
      } else {
        this.isBottomSheetVisible = !this.isBottomSheetVisible;
        this.bottomSheetZIndex = this.isBottomSheetVisible ? 999 : 1;
        this.isEditingMode = true; // 편집 모드 시작
        this.widgets.forEach((widget) => {
          widget.draggable = true; // 편집 모드에서 드래그 활성화
        });
      }
    },
    handleFeatureClick(feature) {
      alert(`${feature} 기능을 선택했습니다.`);
      // 기능 클릭 시 위젯 추가
      const widget = {
        name: feature,
        x: 0, // 초기 X 좌표 (0으로 시작)
        y: 0, // 초기 Y 좌표 (0으로 시작)
        zindex: 1,
        draggable: this.isEditingMode, // 편집 모드일 때만 드래그 가능
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

    // 위젯 간 겹침을 확인하는 메서드
    isOverlapping(widget1, widget2) {
      return (
          widget1.x < widget2.x + this.gridSpacingX &&
          widget1.x + this.gridSpacingX > widget2.x &&
          widget1.y < widget2.y + this.gridSpacingY &&
          widget1.y + this.gridSpacingY > widget2.y
      );
    },

    // 드래그 시작 시 좌표 및 상태 설정
    startDrag(event, index) {
      if (!this.widgets[index].draggable) return; // 드래그가 비활성화된 경우 처리 안 함

      this.isDragging = true;
      this.dragIndex = index;
      this.offsetX = event.clientX - this.widgets[index].x;
      this.offsetY = event.clientY - this.widgets[index].y;

      // 마우스 움직임에 따라 위치 변경
      document.addEventListener('mousemove', this.onDrag);
      document.addEventListener('mouseup', this.stopDrag);
    },

    // 드래그 중 위치 갱신
    onDrag(event) {
      if (this.isDragging) {
        let newX = event.clientX - this.offsetX;
        let newY = event.clientY - this.offsetY;

        // 그리드 내에서 위치 제한
        newX = Math.max(
            0,
            Math.min(newX, this.gridSpacingX * (this.gridSize.x - 1))
        );
        newY = Math.max(
            0, Math.min(newY, this.gridHeight - 110
        ));

        // 위젯의 x, y 좌표가 화면 바깥으로 나가지 않도록 제한
        this.widgets[this.dragIndex].x = Math.min(
            Math.max(newX, 0), // x좌표 제한 (왼쪽 경계)
            this.gridWidth - 90 // x좌표 제한 (오른쪽 경계)
        );

        this.widgets[this.dragIndex].y = Math.min(
            Math.max(newY, 0), // y좌표 제한 (위쪽 경계)
            this.gridHeight - 130 // y좌표 제한 (아래쪽 경계)
        );

        // 드래그 중인 위젯과 다른 위젯들이 겹치지 않도록 체크
        let isOverlapping = false;
        for (const existingWidget of this.widgets) {
          if (
            this.isOverlapping(this.widgets[this.dragIndex], existingWidget)
          ) {
            isOverlapping = true;
            break;
          }
        }

        if (!isOverlapping) {
          // 겹치지 않으면 위치를 갱신
          this.widgets[this.dragIndex].x = newX;
          this.widgets[this.dragIndex].y = newY;
        }
      }
    },

    // 드래그 종료 후 위치 업데이트
    stopDrag() {
      if (this.isDragging) {
        this.isDragging = false;

        // 현재 드래그 중인 위젯
        const widget = this.widgets[this.dragIndex];

        // 가장 가까운 그리드 셀로 위치 조정
        widget.x = Math.round(widget.x / this.gridSpacingX) * this.gridSpacingX;
        widget.y = Math.round((widget.y - 60) / this.gridSpacingY) * this.gridSpacingY + 60;

        // 화면 바깥으로 나가지 않도록 제한
        widget.x = Math.min(
            Math.max(widget.x, 0), // x 좌표 최소값 (왼쪽)
            this.gridSpacingX * (this.gridSize.x - 1) // x 좌표 최대값 (오른쪽)
        );

        widget.y = Math.min(
            Math.max(widget.y, 60), // y 좌표 최소값 (위쪽)
            60 + this.gridSpacingY * (this.gridSize.y - 1) // y 좌표 최대값 (아래쪽)
        );

        // 겹치는 위젯이 있으면 위치를 조정
        this.resolveOverlap(widget);

        this.dragIndex = null;

        // 이벤트 리스너 제거
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("mouseup", this.stopDrag);
      }
    },

    resolveOverlap(widget) {
      let isOverlapping = true;

      while (isOverlapping) {
        isOverlapping = false;

        for (const otherWidget of this.widgets) {
          if (widget !== otherWidget && this.isOverlapping(widget, otherWidget)) {
            isOverlapping = true;

            // 위치를 오른쪽으로 이동 (한 칸 크기만큼)
            widget.x += this.gridSpacingX;

            // 화면 경계를 넘어가면 다음 줄로 이동
            if (widget.x >= this.gridSpacingX * this.gridSize.x) {
              widget.x = 0;
              widget.y += this.gridSpacingY;
            }

            // 화면 바깥으로 나가지 않도록 제한
            if (widget.y > 60 + this.gridSpacingY * (this.gridSize.y - 1)) {
              widget.y = 60; // 다시 처음 줄로 이동
            }

            break;
          }
        }
      }
    }
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

  /* 그리드 스타일: 가로 4칸, 세로 8칸 */
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 가로 그리드 8칸 */
  grid-template-rows: repeat(6, 1fr); /* 세로 그리드 4칸 */
  gap: 1px;
  position: relative;
  background-color: #eef4f9;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1) 1px,
      transparent 1px
  ),
  linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: calc(360px / 4) calc(580px / 6);
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
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 0;
  position: relative;
}
</style>