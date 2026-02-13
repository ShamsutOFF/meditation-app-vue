import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { API_ROUTES, client } from '@/api.ts';
import type { ILoginResponse } from '@/interfaces/ILoginResp.ts';
import { useNotificationStore } from './notification.store';
import type { AxiosError } from 'axios';

const TOKEN_STORE_KEY = 'token-store';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>();
  const notificationStore = useNotificationStore();

  const initialValue = localStorage.getItem(TOKEN_STORE_KEY);
  if (initialValue) {
    token.value = initialValue;
  }

  function setToken(newToken: string) {
    token.value = newToken;
    localStorage.setItem(TOKEN_STORE_KEY, newToken);
  }

  function clearToken() {
    token.value = undefined;
    localStorage.removeItem(TOKEN_STORE_KEY);
  }

  const getToken = computed(() => token.value);

  async function login(username: string, password: string) {
    try {
      const { data } = await client().post<ILoginResponse>(API_ROUTES.auth.login, {
        username: username,
        // email: email,
        password: password,
      });
      setToken(data.data.token);
      notificationStore.success('Успешный вход!');
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      if (axiosError.response?.status === 401) {
        notificationStore.error('Неверный username или пароль');
      } else if (axiosError.response?.status === 404) {
        notificationStore.error('Пользователь не найден');
      } else if (axiosError.code === 'ECONNABORTED') {
        notificationStore.error('Превышено время ожидания. Проверьте подключение к интернету');
      } else {
        notificationStore.error('Ошибка при входе. Попробуйте позже');
      }

      console.error('Login error:', error);
      return false;
    }
  }

  async function register(userData: { username: string; email: string; password: string }) {
    try {
      const { data } = await client().post(API_ROUTES.auth.register, userData);
      notificationStore.success('Регистрация успешна! Теперь вы можете войти');
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string; errors?: Record<string, string[]> }>;

      if (axiosError.response?.status === 422) {
        const errors = axiosError.response.data?.errors;
        if (errors) {
          // Показываем первую ошибку валидации
          const firstError = Object.values(errors)[0]?.[0];
          notificationStore.error(firstError || 'Проверьте введенные данные');
        } else {
          notificationStore.error('Пользователь с таким email уже существует');
        }
      } else if (axiosError.response?.status === 409) {
        notificationStore.error('Пользователь с таким email уже существует');
      } else {
        notificationStore.error('Ошибка при регистрации. Попробуйте позже');
      }

      console.error('Register error:', error);
      return false;
    }
  }

  return { getToken, login, register, setToken, clearToken };
});
