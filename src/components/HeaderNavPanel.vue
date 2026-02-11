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
      <div class="nav-divider" />
      <NavTab
        :icon="StatIcon"
        text="Статистика"
        to="/"
      />
      <div class="nav-divider" />
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
  gap: 60px;
  align-items: center;
}
.nav-divider {
  width: 3px;
  height: 92px;
  background-color: #3A5051;
  align-self: center;
}
</style>
