<template>
  <div class="main-page" ref="captureArea">
    <!-- 새로운 상자 -->
    <div class="plus-box2" @click="saveWidgetPositions">
      <span class="plus-sign">저장하기</span>
    </div>

    <!-- 기존 + 버튼 -->
    <div
      v-if="!isBottomSheetVisible"
      class="plus-box"
      @click="toggleBottomSheet"
    >
      <span class="plus-sign">위젯 추가하기</span>
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
        <div
          class="feature-item"
          v-for="(feature, index) in features"
          :key="index"
        >
          <div class="feature-content" @click="toggleDropdown(index)">
            <i class="fa-solid fa-circle-plus" style="color: #08af2a"></i>
            <span>&nbsp;{{ feature.name }}</span>
          </div>
          <div v-if="feature.isDropdownOpen" class="dropdown-content">
            <p
              v-for="(option, optionIndex) in feature.options"
              :key="optionIndex"
              @click="addWidget(option)"
            >
              {{ option.displayName }}
            </p>
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
      <!-- 동적 컴포넌트 렌더링 -->
      <component :is="widget.component" />
      <button
        v-if="isEditingMode"
        class="delete-button"
        @click.stop="deleteWidget(index)"
      >
        x
      </button>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import axios from "axios";
import { getCustomPage, saveCustomPage } from "../api/customAPI";
import Account1x1 from "../components/features/Account 1x1.vue";
import Account1x2 from "../components/features/Account 1x2.vue";
import Account2x4 from "../components/features/Account 2x4.vue";
import Exchange1x1 from "../components/features/Exchange 1x1.vue";
import Exchange1x2 from "../components/features/Exchange 1x2.vue";
import Exchange2x2 from "../components/features/Exchange 2x2.vue";

export default {
  name: "UiuxEdit",
  components: {
    Account1x1,
    Account1x2,
    Account2x4,
    Exchange1x1,
    Exchange1x2,
    Exchange2x2,
  },
  data() {
    return {
      pageID: null,
      isBottomSheetVisible: false,
      bottomSheetZIndex: 1, // 바텀 시트의 z-index 초기값
      isEditingMode: true, // 편집 모드 여부
      widgets: [], // 위젯 목록
      features: [
        {
          name: "계좌 조회",
          isDropdownOpen: false,
          options: [
            {
              id: "1",
              displayName: "1x1",
              component: "Account1x1",
              height: 100,
              width: 90,
            },
            {
              id: "2",
              displayName: "1x2",
              component: "Account1x2",
              height: 100,
              width: 180,
            },
            {
              id: "3",
              displayName: "2x4",
              component: "Account2x4",
              height: 200,
              width: 360,
            },
          ],
        },
        {
          name: "환율 조회",
          isDropdownOpen: false,
          options: [
            { id: "4", displayName: "1x1", component: "Exchange1x1" },
            { id: "5", displayName: "1x2", component: "Exchange1x2" },
            { id: "6", displayName: "2x2", component: "Exchange2x2" },
          ],
        },
      ], // 기능 목록
      isDragging: false, // 드래그 상태 관리
      dragIndex: null, // 현재 드래그 중인 위젯 인덱스
      initialX: 0,
      initialY: 0,
      offsetX: 0, // 드래그 시작 시 offset 값
      offsetY: 0, // 드래그 시작 시 offset 값
      gridHeight: 785 - 60 - 110, // 헤더와 + 버튼을 제외한 그리드 높이 계산
      gridWidth: 360, // 화면 너비
      gridSize: { x: 4, y: 5 }, // 그리드의 가로(8)와 세로(4) 크기 8, 4
      gridSpacingX: 90, // 각 그리드의 간격(픽셀) 45
      gridSpacingY: 100,
    };
  },
  mounted() {
    this.initSavedPage();
  },
  methods: {
    addWidget(option) {
      const isFeatureAdded = this.widgets.some(
        (widget) => widget.id === option.id
      );
      if (isFeatureAdded) {
        alert(`${option.displayName} 기능은 이미 추가된 기능입니다.`);
        return;
      }

      const widget = {
        id: option.id,
        name: option.displayName,
        component: option.component,
        x: 0,
        y: 0,
        h: option.height,
        w: option.width,
      };

      // 화면의 가로, 세로 크기 계산
      const maxGridWidth = this.gridSize.x * this.gridSpacingX;
      const maxGridHeight = this.gridSize.y * this.gridSpacingY;

      let isPlaced = false;

      // 빈 공간을 찾는 반복문
      for (let y = 0; y < maxGridHeight; y += this.gridSpacingY) {
        for (let x = 0; x < maxGridWidth; x += this.gridSpacingX) {
          widget.x = x;
          widget.y = y;

          // 겹치는지 확인
          const hasOverlap = this.widgets.some((existingWidget) =>
            this.isOverlapping(widget, existingWidget)
          );

          // 겹치지 않는 위치를 찾으면 배치
          if (
            !hasOverlap &&
            widget.x + widget.w <= maxGridWidth &&
            widget.y + widget.h <= maxGridHeight
          ) {
            isPlaced = true;
            break;
          }
        }
        if (isPlaced) break;
      }

      // 빈 공간이 없는 경우
      if (!isPlaced) {
        alert('배치할 공간이 부족합니다.');
        return;
      }

      this.widgets.push(widget);
      this.isBottomSheetVisible = false; // 바텀 시트 숨기기
    },
    // 위젯 삭제 메서드
    deleteWidget(index) {
      this.widgets.splice(index, 1);
      alert("위젯이 삭제되었습니다.");
    },

    // 드롭다운 토글 메서드
    toggleDropdown(index) {
      this.features[index].isDropdownOpen =
        !this.features[index].isDropdownOpen;
    },

    initSavedPage() {
      if (localStorage.getItem("customPageData")) {
        const pageData = JSON.parse(localStorage.getItem("customPageData"));
        this.widgets = pageData.layoutData;
        this.pageID = pageData.pageID;
      }
    },

    async saveWidgetPositions() {
      const userDataString = localStorage.getItem("user");
      const userData = JSON.parse(userDataString);
      const userNum = userData.userNum;

      let customPage = {
        userNum: userNum,
        layoutData: this.widgets,
        imagePath: "null",
      };

      if (this.pageID) {
        customPage.pageID = this.pageID;
      }

      try {
        // API 호출
        const response = await saveCustomPage(customPage);
        await this.captureAndSave();

        // API 응답에 따른 처리
        alert("사용자 설정이 저장되었습니다: " + response.message);
        this.$router.push("/uiux");
      } catch (error) {
        console.error("API 요청 실패:", error);
        alert("저장에 실패했습니다. 다시 시도해주세요.");
      }
    },

    toggleBottomSheet() {
      this.isBottomSheetVisible = !this.isBottomSheetVisible;
      this.bottomSheetZIndex = this.isBottomSheetVisible ? 999 : 1;
    },

    isOverlapping(widget1, widget2) {
      return (
        widget1.x < widget2.x + widget2.w &&
        widget1.x + widget1.w > widget2.x &&
        widget1.y < widget2.y + widget2.h &&
        widget1.y + widget1.h > widget2.y
      );
    },

    // 드래그 시작 시 좌표 및 상태 설정
    startDrag(event, index) {
      console.log("asdfads");
      this.isDragging = true;
      this.dragIndex = index;

      const widget = this.widgets[this.dragIndex];

      this.initialX = widget.x;
      this.initialY = widget.y;

      this.offsetX = event.clientX - widget.x;
      this.offsetY = event.clientY - widget.y;

      // 마우스 움직임에 따라 위치 변경
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.stopDrag);
    },

    // 드래그 중 위치 갱신
    onDrag(event) {
      if (!this.isDragging || this.dragIndex === null) return;

      const widget = this.widgets[this.dragIndex];

      let newX = event.clientX - this.offsetX;
      let newY = event.clientY - this.offsetY;

      // 그리드 내에서 위치 제한
      newX = Math.max(0, Math.min(newX, this.gridWidth - this.gridSpacingX));
      newY = Math.max(0, Math.min(newY, this.gridHeight - this.gridSpacingY));

      // 위젯의 x, y 좌표가 화면 바깥으로 나가지 않도록 제한
      widget.x = Math.min(
        Math.max(newX, 0), // x좌표 제한 (왼쪽 경계)
        this.gridWidth - 90 // x좌표 제한 (오른쪽 경계)
      );

      widget.y = Math.min(
        Math.max(newY, 0), // y좌표 제한 (위쪽 경계)
        this.gridHeight - 110 // y좌표 제한 (아래쪽 경계)
      );
    },

    // 드래그 종료 후 위치 업데이트
    stopDrag() {
      if (this.isDragging) {
        this.isDragging = false;

        const widget = this.widgets[this.dragIndex];

        // 가장 가까운 그리드 셀로 위치 조정
        widget.x = Math.round(widget.x / this.gridSpacingX) * this.gridSpacingX;
        widget.y = Math.round(widget.y / this.gridSpacingY) * this.gridSpacingY;

        // 화면 바깥으로 나가지 않도록 제한
        widget.x = Math.min(
          Math.max(widget.x, 0),
          this.gridSpacingX * this.gridSize.x - widget.w
        );
        widget.y = Math.min(
          Math.max(widget.y, 0),
          this.gridSpacingY * this.gridSize.y - widget.h
        );

        // 겹침 해소
        this.resolveOverlap(widget);

        this.dragIndex = null;

        // 이벤트 리스너 제거
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("mouseup", this.stopDrag);
      }
    },

    resolveOverlap(widget) {
      const maxGridWidth = this.gridSize.x * this.gridSpacingX;
      const maxGridHeight = this.gridSize.y * this.gridSpacingY;

      let isOverlapping = true;

      while (isOverlapping) {
        isOverlapping = false;

        for (const otherWidget of this.widgets) {
          if (
            widget !== otherWidget &&
            this.isOverlapping(widget, otherWidget)
          ) {
            isOverlapping = true;

            // 다음 칸으로 이동
            widget.x += this.gridSpacingX;

            // 화면을 넘어가면 다음 줄로 이동
            if (widget.x + widget.w > maxGridWidth) {
              widget.x = 0;
              widget.y += this.gridSpacingY;
            }

            // 화면 바깥으로 나가지 않도록 제한
            if (widget.y + widget.h > maxGridHeight) {
              widget.x = this.initialX;
              widget.y = this.initialY;
              return;
            }
          }
        }
      }
    },

    async captureAndSave() {
      try {
        const element = this.$refs.captureArea;
        if (!element) {
          throw new Error("캡쳐할 요소를 찾을 수 없습니다.");
        }

        const canvas = await html2canvas(element, { scale: 2 });
        const imageData = canvas.toDataURL("image/jpeg", 0.8);

        // 이미지 크기 제한 (예: 최대 너비 800px)
        const img = new Image();
        img.src = imageData;
        await new Promise((resolve) => {
          img.onload = resolve;
        });

        const MAX_WIDTH = 800;
        let { width, height } = img;
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }

        const resizedCanvas = document.createElement("canvas");
        resizedCanvas.width = width;
        resizedCanvas.height = height;
        const ctx = resizedCanvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        const resizedImageData = resizedCanvas.toDataURL("image/jpeg");

        // 서버로 전송
        await axios.post("/api/community/capture", {
          sharedID: this.sharedID,
          imagePath: resizedImageData,
          userNum: this.userNum,
        });

        alert("화면이 성공적으로 저장되었습니다!");
      } catch (error) {
        console.error("화면 캡쳐 요청 에러:", error);
        alert("화면을 저장하는 데 실패했습니다.");
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
  bottom: 114px; /* 하단에서의 간격 */
  left: 30%; /* 화면의 45% 지점 */
  transform: translateX(-50%); /* 버튼의 중심을 정확히 조정 */
  width: 130px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2); /* 반투명한 배경 */
  border-radius: 15px; /* 둥근 모서리 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10; /* 다른 요소 위에 렌더링 */
}

.plus-box2 {
  position: fixed;
  bottom: 114px; /* 동일한 하단 간격 */
  left: calc(30% + 150px); /* `.plus-box`의 오른쪽으로 이동 */
  transform: translateX(-50%);
  width: 130px;
  height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
}
.delete-button {
  position: absolute;
  top: 4px; /* 위젯의 상단 */
  right: 4px; /* 위젯의 오른쪽 */
  transform: translate(50%, -50%); /* 약간의 위치 조정을 위해 변환 */
  background-color: #fff;
  color: #333;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
  z-index: 10; /* 삭제 버튼이 위젯 콘텐츠 위에 나타나도록 설정 */
}

.widget {
  position: absolute;
  /* width: 90px;
  height: 98.125px; 
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 15px; */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: grab;
  z-index: 1;
}

.plus-sign {
  font-size: 18px;
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
