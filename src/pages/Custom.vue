<template>
  <div>
    <footer class="footer fixed-bottom">
      <hr style="margin-top: 0%;">
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <router-link to="/" class="nav-link text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-house icon-large"></i>
            <span>Home</span>
          </router-link>
        </li>
        <li class="nav-item item-margin">
          <router-link to="/shop" class="nav-link text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-bag-shopping icon-large"></i>
            <span>금융상품</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/wish" class="nav-link text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-star icon-large"></i>
            <span>관심</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/dict" class="nav-link text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-book-bookmark icon-large"></i>
            <span>사전</span>
          </router-link>
        </li>
        <li class="nav-item item-margin last-item">
          <router-link to="/auth" class="nav-link text-body-secondary d-flex flex-column align-items-center">
            <i class="fa-solid fa-user icon-large"></i>
            <span>마이페이지</span>
          </router-link>
        </li>
      </ul>
    </footer>
  </div>
</template>

<style scoped>
.footer {
  width: 100vw;
  background-color: #f8f9fa;
  padding-bottom: 5px;
}

.nav {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 0;
}

.icon-large {
  font-size: 24px; /* 아이콘 크기를 고정 */
  transition: color 0.3s;
}

.nav-link {
  text-align: center;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70px; /* 가로 크기를 70으로 설정 */
}

.item-margin {
  margin: 0 5px; /* 양쪽에 약간의 여백 추가 */
}

.last-item {
  margin-left: 10px; /* 마지막 항목에 추가 여백 */
}

/* hover 효과 */
.nav-link:hover .icon-large {
  color: #FFBB00;
}
</style>
<script setup lang="ts">
import Footer from "@/components/Footer.vue";
</script>