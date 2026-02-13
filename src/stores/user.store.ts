import { defineStore } from 'pinia';
import { ref } from 'vue';
import { API_ROUTES, client } from '@/api';
import type { IProfileResponse } from '@/interfaces/IProfileResp';
import { useNotificationStore } from './notification.store';
import type { AxiosError } from 'axios';

export type FeelingType = 'calm' | 'relax' | 'focus' | 'anxious';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  lastLoginAt: string;
}

export const useUserStore = defineStore('user', () => {
  const selectedFeeling = ref<FeelingType | null>(null);
  const profile = ref<UserProfile | null>(null);
  const isLoadingProfile = ref(false);
  const notificationStore = useNotificationStore();

  const setFeeling = (feeling: FeelingType) => {
    selectedFeeling.value = feeling;
  };

  const clearFeeling = () => {
    selectedFeeling.value = null;
  };

  async function fetchProfile() {
    isLoadingProfile.value = true;
    try {
      const { data } = await client().get<IProfileResponse>(API_ROUTES.profile);

      profile.value = {
        id: data.data.user.id,
        username: data.data.user.username,
        email: data.data.user.email,
        lastLoginAt: data.data.user.last_login_at,
      };

      return true;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        notificationStore.error('Требуется авторизация');
      } else {
        notificationStore.error('Ошибка загрузки профиля');
      }

      console.error('Fetch profile error:', error);
      return false;
    } finally {
      isLoadingProfile.value = false;
    }
  }

  function clearProfile() {
    profile.value = null;
  }

  return {
    selectedFeeling,
    profile,
    isLoadingProfile,
    setFeeling,
    clearFeeling,
    fetchProfile,
    clearProfile,
  };
});
