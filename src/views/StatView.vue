<script setup lang="ts">
import HeaderNavPanel from '@/components/HeaderNavPanel.vue';
</script>

<template>
  <div class="page-stat-container">
    <HeaderNavPanel />
    <div class="page-stat-content">Контент страницы статистики</div>
  </div>
</template>

<style scoped>
.page-stat-container {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
