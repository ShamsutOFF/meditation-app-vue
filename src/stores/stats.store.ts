import { defineStore } from 'pinia';
import { ref } from 'vue';
import { API_ROUTES, client } from '@/api';
import type { IStatsGetResponse } from '@/interfaces/IStatsResp';
import { useNotificationStore } from './notification.store';
import type { AxiosError } from 'axios';

interface StatsSummary {
  totalAnxiety: number;
  totalCalm: number;
  totalFocus: number;
  totalMinutes: number;
  totalRelax: number;
}

export const useStatsStore = defineStore('stats', () => {
  const summary = ref<StatsSummary | null>(null);
  const isLoadingStats = ref(false);
  const notificationStore = useNotificationStore();

  async function fetchStats() {
    isLoadingStats.value = true;
    try {
      const { data } = await client().get<IStatsGetResponse>(API_ROUTES.stats);

      summary.value = {
        totalAnxiety: data.data.summary.total_anxiety,
        totalCalm: data.data.summary.total_calm,
        totalFocus: data.data.summary.total_focus,
        totalMinutes: data.data.summary.total_minutes,
        totalRelax: data.data.summary.total_relax,
      };

      return true;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        notificationStore.error('Требуется авторизация');
      } else {
        notificationStore.error('Ошибка загрузки статистики');
      }

      console.error('Fetch stats error:', error);
      return false;
    } finally {
      isLoadingStats.value = false;
    }
  }

  function clearStats() {
    summary.value = null;
  }

  return {
    summary,
    isLoadingStats,
    fetchStats,
    clearStats,
  };
});
