<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMeditationsStore } from '@/stores/meditations.store';
import { useStatsStore } from '@/stores/stats.store';
import { useNotificationStore } from '@/stores/notification.store';
import HeaderNavPanel from '@/components/HeaderNavPanel.vue';
import MeditationTimer from '@/components/MeditationTimer.vue';
import { client, API_ROUTES } from '@/api';
import type { AxiosError } from 'axios';

const route = useRoute();
const router = useRouter();
const meditationsStore = useMeditationsStore();
const statsStore = useStatsStore();
const notificationStore = useNotificationStore();

const meditationId = Number(route.params.id);
const timerRef = ref<InstanceType<typeof MeditationTimer> | null>(null);
const isPlaying = ref(false);
const hasStarted = ref(false);

const meditation = computed(() =>
  meditationsStore.meditations.find(m => m.id === meditationId)
);

onMounted(async () => {
  if (!meditation.value) {
    await meditationsStore.fetchMeditations();

    if (!meditation.value) {
      notificationStore.error('Медитация не найдена');
      router.push({ name: 'home' });
    }
  }
});

function togglePlay() {
  if (!timerRef.value) return;

  if (!hasStarted.value) {
    timerRef.value.start();
    hasStarted.value = true;
    isPlaying.value = true;
  } else if (isPlaying.value) {
    timerRef.value.pause();
    isPlaying.value = false;
  } else {
    timerRef.value.resume();
    isPlaying.value = true;
  }
}

function stopMeditation() {
  if (!timerRef.value) return;
  timerRef.value.stop();
}

function goBack() {
  router.push({ name: 'home' });
}

async function saveDuration(completedMin: number) {
  if (completedMin === 0) {
    notificationStore.info('Медитация не была завершена');
    router.push({ name: 'home' });
    return;
  }

  try {
    await client().post(API_ROUTES.stats, {
      type: 'duration_min',
      value: completedMin,
    });

    notificationStore.success(`Медитация завершена! ${completedMin} мин сохранено`);
    await statsStore.fetchStats();
    router.push({ name: 'stat' });
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401) {
      notificationStore.error('Требуется авторизация');
    } else {
      notificationStore.error('Ошибка сохранения медитации');
    }

    console.error('Save duration error:', error);
  }
}

async function handleComplete(completedMin: number) {
  await saveDuration(completedMin);
}

async function handleStop(completedMin: number) {
  if (completedMin > 0) {
    await saveDuration(completedMin);
  } else {
    router.push({ name: 'home' });
  }
}

// Предупреждение при попытке уйти со страницы
onBeforeUnmount(() => {
  if (hasStarted.value && isPlaying.value) {
    const confirmLeave = confirm('Медитация не завершена. Вы уверены, что хотите выйти?');
    if (!confirmLeave) {
      return false;
    }
  }
});
</script>

<template>
  <div class="page-meditation-container">
    <HeaderNavPanel />

    <div v-if="meditation" class="page-meditation-content">
      <MeditationTimer
        ref="timerRef"
        :duration-min="meditation.duration_min"
        @complete="handleComplete"
        @stop="handleStop"
      />

      <div class="meditation-info">
        <h1 class="meditation-info__title">{{ meditation.title }}</h1>
        <p class="meditation-info__description">{{ meditation.description }}</p>
      </div>

      <div class="meditation-controls">
        <button
          class="control-btn control-btn--secondary"
          @click="goBack"
          :disabled="hasStarted"
        >
          <span>✕</span>
        </button>

        <button
          class="control-btn control-btn--primary"
          @click="togglePlay"
        >
          <span v-if="!isPlaying">▶</span>
          <span v-else>❚❚</span>
        </button>

        <button
          class="control-btn control-btn--secondary"
          @click="stopMeditation"
          :disabled="!hasStarted"
        >
          <span>↻</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-meditation-container {
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
  min-height: 100vh;
}

.page-meditation-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 40px 24px;
}

.meditation-info {
  text-align: center;
  max-width: 600px;
  margin-bottom: 40px;
}

.meditation-info__title {
  font-size: 48px;
  font-weight: 500;
  color: var(--color-white);
  margin-bottom: 16px;
}

.meditation-info__description {
  font-size: 20px;
  color: var(--color-white);
  opacity: 0.7;
  line-height: 1.4;
}

.meditation-controls {
  display: flex;
  gap: 40px;
  align-items: center;
}

.control-btn {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.control-btn--primary {
  width: 100px;
  height: 100px;
  background-color: var(--color-white);
  color: var(--color-bg-main);
  font-size: 40px;
}

.control-btn--primary:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
}

.control-btn--secondary {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
}

.control-btn--secondary:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
</style>
