<script setup lang="ts">
import FeelingTab from '@/components/FeelingTab.vue';
import CalmIcon from '@/icons/CalmIcon.vue';
import AnxiousIcon from '@/icons/AnxiousIcon.vue';
import FocusIcon from '@/icons/FocusIcon.vue';
import RelaxIcon from '@/icons/RelaxIcon.vue';
import { useUserStore, type FeelingType } from '@/stores/user.store';
import { onMounted, computed } from 'vue';

const userStore = useUserStore();

interface Feeling {
  id: FeelingType;
  icon: typeof CalmIcon;
  text: string;
}

const feelings: Feeling[] = [
  { id: 'calm', icon: CalmIcon, text: 'Спокойно' },
  { id: 'relax', icon: RelaxIcon, text: 'Расслабленно' },
  { id: 'focus', icon: FocusIcon, text: 'Фокусировано' },
  { id: 'anxious', icon: AnxiousIcon, text: 'Тревожно' },
];

const selectFeeling = async (feeling: FeelingType) => {
  if (!userStore.isSavingFeeling) {
    await userStore.setFeeling(feeling);
  }
};

const displayName = computed(() => {
  return userStore.profile?.username || 'Пользователь';
});

onMounted(async () => {
  if (!userStore.profile) {
    await userStore.fetchProfile();
  }
});
</script>

<template>
  <div class="users-panel-wrapper">
    <img class="users-panel-avatar" src="/user-avatar.png" alt="Аватарка пользователя" />
    <div class="users-panel-name">Добро пожаловать, {{ displayName }}!</div>
    <div class="users-panel-question">Как вы сегодня себя чувствуете?</div>

    <div class="users-panel-feelings">
      <FeelingTab
        v-for="feeling in feelings"
        :key="feeling.id"
        :icon="feeling.icon"
        :text="feeling.text"
        :selected="userStore.selectedFeeling === feeling.id"
        :disabled="userStore.isSavingFeeling"
        @click="selectFeeling(feeling.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.users-panel-wrapper {
  display: flex;
  flex-direction: column;
  padding: 24px;
}

.users-panel-avatar {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
  margin-bottom: 30px;
}

.users-panel-name {
  font-weight: 500;
  font-size: 30px;
  line-height: 100%;
  color: var(--color-white);
  margin-bottom: 12px;
}

.users-panel-question {
  font-family: Alegreya Sans, serif;
  font-weight: 400;
  font-size: 22px;
  line-height: 100%;
  color: var(--color-white);
  opacity: 0.7;
  margin-bottom: 40px;
}

.users-panel-feelings {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
  max-width: 360px;
}
</style>
