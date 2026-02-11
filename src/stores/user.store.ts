import { defineStore } from 'pinia';
import { ref } from 'vue';

export type FeelingType = 'calm' | 'relax' | 'focus' | 'anxious';

export const useUserStore = defineStore('user', () => {
  const selectedFeeling = ref<FeelingType | null>(null);

  const setFeeling = (feeling: FeelingType) => {
    selectedFeeling.value = feeling;
  };

  const clearFeeling = () => {
    selectedFeeling.value = null;
  };

  return {
    selectedFeeling,
    setFeeling,
    clearFeeling,
  };
});
