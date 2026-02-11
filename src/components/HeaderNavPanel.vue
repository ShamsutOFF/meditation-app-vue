<script setup lang="ts">
import LogoIcon from '@/icons/LogoIcon.vue';
import NavTab from '@/components/NavTab.vue';
import StatIcon from '@/icons/StatIcon.vue';
import RunMeditationIcon from '@/icons/RunMeditationIcon.vue';
import ExitIcon from '@/icons/ExitIcon.vue';

</script>

<template>
  <div class="header-container">
    <LogoIcon />
    <nav class="nav-panel">
      <NavTab
        :icon="RunMeditationIcon"
        text="Медитация"
        to="/"
      />
      <NavTab
        :icon="StatIcon"
        text="Статистика"
        to="/"
      />
      <NavTab
        :icon="ExitIcon"
        text="Выход"
        to="/"
      />
    </nav>
  </div>
</template>

<style scoped>
.header-container  {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
}

.nav-panel {
  display: flex;
  gap: 16px;
  align-items: center;
}
</style>
