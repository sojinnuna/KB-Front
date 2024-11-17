<template>
  <div class="navbar">
    <router-link to="/" class="nav-item home" exact-active-class="active">
      <i class="fa-solid fa-file-invoice"></i>
      <span>전체계좌</span>
    </router-link>
    <router-link
      to="/myassets"
      class="nav-item my-assets"
      exact-active-class="active"
    >
      <i class="fa-solid fa-bag-shopping"></i>
      <span>금융상품</span>
    </router-link>
    <router-link
      to="/accountbook"
      class="nav-item account-book"
      exact-active-class="active"
    >
      <i class="fa-solid fa-chart-pie"></i>
      <span>자산관리</span>
    </router-link>
    <router-link
      to="/accountbook"
      class="nav-item account-book"
      exact-active-class="active"
    >
      <i class="fa-solid fa-gift"></i>
      <span>혜택</span>
    </router-link>
    <router-link
      to="/businesscard"
      class="nav-item business-card"
      exact-active-class="active"
    >
      <i class="fa-solid fa-mobile-retro"></i>
      <span>통신</span>
    </router-link>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff')
    format('woff');
  font-weight: 400;
  font-style: normal;
}

body,
h2,
label,
button,
input,
span {
  font-family: 'Pretendard', sans-serif;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: white;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 0;
  max-width: 360px;
  width: 100%;
  z-index: 999;
}

.navbar .nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  color: #555;
  flex: 1;
  text-decoration: none;
}

.navbar .nav-item i {
  font-size: 24px;
  margin-bottom: 15px;
  transition: background-color 0.3s, border-radius 0.3s;
}

.navbar .nav-item.active i {
  background-color: #dcdcdc; /* 회색 배경 */
  border-radius: 50%; /* 동그란 모양 */
  padding: 5px; /* 아이콘 주위에 여백을 추가하여 원 형태로 보이도록 */
}

/* 버튼 스타일 */
.pay-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 60px;
  background-color: #6981d6;
  border-radius: 40px;
  color: white;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  border: none;
}

/* 아이콘과 텍스트를 수직으로 쌓기 위한 스타일 */
.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 활성화된 네비게이션 아이템 스타일 */
.navbar .nav-item.active {
  color: #7189ff;
  font-weight: bold;
}

/* flex-grow 조정 삭제 */
.nav-item:nth-child(4),
.nav-item:nth-child(2) {
  flex-grow: 1;
}
</style>
