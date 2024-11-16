<script setup>
import Footer from '@/components/Footer.vue'
</script>

<template>
  <div class="bc">
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<style scoped>
.bc{
  background-color: #EEF4F9;
  height: 100%;
}
</style>
