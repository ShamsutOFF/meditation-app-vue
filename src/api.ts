import axios from 'axios';
import { useAuthStore } from '@/stores/auth.store.ts';

export const API_ROUTES = {
  meditations: '/meditations',
  auth: {
    login: `auth/login`,
    register: `auth/register`,
  },
  profile: '/profile',
  stats: '/stats',
};

export function client() {
  const authStore = useAuthStore();
  return axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000,
    headers: {
      Authorization: `Bearer ${authStore.getToken}`,
    },
  });
}
