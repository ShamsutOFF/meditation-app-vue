<script setup lang="ts">
import HeaderNavPanel from '@/components/HeaderNavPanel.vue';
import StatCard from '@/components/StatCard.vue';
import { useStatsStore } from '@/stores/stats.store';
import { onMounted, computed } from 'vue';

const statsStore = useStatsStore();

const statCards = computed(() => [
  {
    value: statsStore.summary?.totalMinutes || 0,
    label: 'Минут медитации',
    color: 'green' as const,
  },
  {
    value: statsStore.summary?.totalCalm || 0,
    label: 'Спокойных дней',
    color: 'light-green' as const,
  },
  {
    value: statsStore.summary?.totalRelax || 0,
    label: 'Расслабленных дней',
    color: 'blue' as const,
  },
  {
    value: statsStore.summary?.totalFocus || 0,
    label: 'Фокусированных дней',
    color: 'yellow' as const,
  },
  {
    value: statsStore.summary?.totalAnxiety || 0,
    label: 'Тревожных дней',
    color: 'red' as const,
  },
]);

onMounted(async () => {
  await statsStore.fetchStats();
});
</script>

<template>
  <div class="page-stat-container">
    <HeaderNavPanel />

    <div v-if="statsStore.isLoadingStats" class="page-stat-loading">
      Загрузка статистики...
    </div>

    <div v-else class="page-stat-content">
      <StatCard
        v-for="(stat, index) in statCards"
        :key="index"
        :value="stat.value"
        :label="stat.label"
        :color="stat.color"
      />
    </div>
  </div>
</template>

<style scoped>
.page-stat-container {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
}

.page-stat-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  padding: 40px 24px;
}

.page-stat-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 24px;
  color: var(--color-white);
  opacity: 0.7;
}

/* Адаптив для планшетов */
@media (max-width: 1024px) {
  .page-stat-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Адаптив для мобилок */
@media (max-width: 640px) {
  .page-stat-content {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 24px 16px;
  }
}
</style>
