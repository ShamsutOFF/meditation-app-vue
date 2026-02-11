<script setup lang="ts">
import HeaderNavPanel from '@/components/HeaderNavPanel.vue';
import MeditationsCardsList from '@/components/MeditationsCardsList.vue';
import UsersLeftPanel from '@/components/UsersLeftPanel.vue';
</script>

<template>
  <div class="page-container">
    <HeaderNavPanel />
    <div class="page-content">
      <UsersLeftPanel />
      <MeditationsCardsList />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
}
.page-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 100px;
}
</style>
