<script setup lang="ts">
import HeaderNavPanel from '@/components/HeaderNavPanel.vue';
import MeditationsCardsList from '@/components/MeditationsCardsList.vue';
</script>

<template>
  <div class="page-container">
    <HeaderNavPanel />
    <MeditationsCardsList />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
}
</style>
