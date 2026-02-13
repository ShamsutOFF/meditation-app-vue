<script setup lang="ts">
import LogoIcon from '@/icons/LogoIcon.vue';
import NavTab from '@/components/NavTab.vue';
import StatIcon from '@/icons/StatIcon.vue';
import RunMeditationIcon from '@/icons/RunMeditationIcon.vue';
import ExitIcon from '@/icons/ExitIcon.vue';
import { useAuthStore } from '@/stores/auth.store.ts';
import { useUserStore } from '@/stores/user.store.ts';
import { useStatsStore } from '@/stores/stats.store.ts';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const userStore = useUserStore();
const statsStore = useStatsStore();
const router = useRouter();

function logout() {
  authStore.clearToken();
  userStore.clearProfile();
  userStore.clearFeeling();
  statsStore.clearStats();
  router.push({ name: 'auth' });
}
</script>

<template>
  <div class="header-container">
    <LogoIcon />
    <nav class="nav-panel">
      <NavTab
        :icon="RunMeditationIcon"
        text="Медитация"
        to="home"
      />
      <div class="nav-divider" />
      <NavTab
        :icon="StatIcon"
        text="Статистика"
        to="stat"
      />
      <div class="nav-divider" />
      <div @click="logout">
        <NavTab
          :icon="ExitIcon"
          text="Выход"
        />
      </div>
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
