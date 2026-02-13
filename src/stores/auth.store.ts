import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { API_ROUTES, client } from '@/api.ts';
import type { ILoginResponse } from '@/interfaces/ILoginResp.ts';

const TOKEN_STORE_KEY = 'token-store';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>();

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

  async function login(email: string, password: string) {
    const { data } = await client().post<ILoginResponse>(API_ROUTES.auth.login, {
      email: email,
      password: password,
    });
    setToken(data.data.token);
  }
  return { getToken, login, setToken, clearToken };
});
