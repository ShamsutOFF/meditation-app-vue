import type { IMeditation } from '@/interfaces/IMeditation.ts'
import { API_ROUTES, http } from '@/api.ts';
import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMeditationsStore = defineStore('meditations', () => {
  const meditations = ref<IMeditation[]>([]);

  async function fetchMeditations() {
    const { data } = await http.get(API_ROUTES.meditations);
    meditations.value = data.data.meditations;
  }
  return {
    meditations,
    fetchMeditations,
  };
});
