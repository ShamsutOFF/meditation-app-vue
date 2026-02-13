import type { IMeditation } from '@/interfaces/IMeditation.ts'
import { API_ROUTES, client } from '@/api.ts';
import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useNotificationStore } from './notification.store';
import type { AxiosError } from 'axios';

export const useMeditationsStore = defineStore('meditations', () => {
  const meditations = ref<IMeditation[]>([]);
  const notificationStore = useNotificationStore();

  async function fetchMeditations() {
    try {
      const { data } = await client().get(API_ROUTES.meditations);
      meditations.value = data.data.meditations;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        notificationStore.error('Требуется авторизация');
      } else {
        notificationStore.error('Ошибка загрузки медитаций');
      }

      console.error('Fetch meditations error:', error);
    }
  }

  return {
    meditations,
    fetchMeditations,
  };
});
