import { defineStore } from 'pinia';
import { ref } from 'vue';
import { API_ROUTES, client } from '@/api';
import type { IProfileResponse } from '@/interfaces/IProfileResp';
import type { IStatsSaveResponse } from '@/interfaces/IStatsResp';
import { useNotificationStore } from './notification.store';
import type { AxiosError } from 'axios';

export type FeelingType = 'calm' | 'relax' | 'focus' | 'anxious';

interface UserProfile {
  id: number;
  username: string;
  email: string;
  lastLoginAt: string;
}

// Маппинг типов настроений на названия полей в API
const FEELING_TYPE_MAP: Record<FeelingType, string> = {
  calm: 'feeling_calm',
  relax: 'feeling_relax',
  focus: 'feeling_focus',
  anxious: 'feeling_anxiety',
};

export const useUserStore = defineStore('user', () => {
  const selectedFeeling = ref<FeelingType | null>(null);
  const profile = ref<UserProfile | null>(null);
  const isLoadingProfile = ref(false);
  const isSavingFeeling = ref(false);
  const notificationStore = useNotificationStore();

  async function setFeeling(feeling: FeelingType) {
    selectedFeeling.value = feeling;
    await saveFeelingToServer(feeling);
  }

  function clearFeeling() {
    selectedFeeling.value = null;
  }

  async function saveFeelingToServer(feeling: FeelingType) {
    isSavingFeeling.value = true;
    try {
      const feelingType = FEELING_TYPE_MAP[feeling];

      await client().post<IStatsSaveResponse>(API_ROUTES.stats, {
        type: feelingType,
        value: 1,
      });

      notificationStore.success('Настроение сохранено');
      return true;
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response?.status === 401) {
        notificationStore.error('Требуется авторизация');
      } else {
        notificationStore.error('Ошибка сохранения настроения');
      }

      console.error('Save feeling error:', error);
      return false;
    } finally {
      isSavingFeeling.value = false;
    }
  }

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
    isSavingFeeling,
    setFeeling,
    clearFeeling,
    fetchProfile,
    clearProfile,
  };
});
