<script setup lang="ts">
import StartIcon from '@/icons/StartIcon.vue';
import type { IMeditation } from '@/interfaces/IMeditation.ts';
import { useRouter } from 'vue-router';

const props = defineProps<{
  meditation: IMeditation;
}>();

const router = useRouter();

const startMeditation = () => {
  router.push({
    name: 'meditation',
    params: { id: props.meditation.id },
  });
};
</script>

<template>
  <div class="meditation-card">
    <div class="meditation-card__title">{{ props.meditation.title }}</div>
    <div class="meditation-card__description">{{ props.meditation.description }}</div>
    <div>
      <div class="start-button-wrapper">
        <button class="start-button" @click="startMeditation">
          <span class="start-button__text">Начать</span>
          <StartIcon class="start-button__icon" />
        </button>
      </div>
      <div class="duration">{{ props.meditation.duration_min }} мин</div>
    </div>
  </div>
</template>

<style scoped>
.meditation-card {
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 170px;
  border-radius: 20px;
  background-color: var(--color-card-bg);
  position: relative; /* Для позиционирования кнопки */
}

.meditation-card__title {
  font-size: 25px;
  font-weight: 500;
  padding-left: 30px;
  padding-top: 22px;
}

.meditation-card__description {
  font-size: 15px;
  font-weight: 500;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 16px; /* Отступ снизу для кнопки */
  line-height: 1.4; /* Лучшая читаемость */
}

.start-button-wrapper {
  padding-left: 30px; /* Отступ от левого края карточки */
}

.start-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px; /* Расстояние между текстом и иконкой */
  height: 40px;
  min-width: 110px;
  border-radius: 10px;
  border: none;
  background-color: var(--color-bg-main);
  color: var(--color-white);
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  padding: 0 16px; /* Горизонтальные отступы */
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.start-button:hover {
  background-color: var(--color-bg-main-dark); /* Добавьте этот цвет в переменные */
}

.start-button__text {
  white-space: nowrap;
}

.start-button__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Иконка не будет сжиматься */
}

.duration {
  position: absolute;
  top: 116px;
  right: 30px;
  font-size: 15px;
  font-weight: 500;
  color: var(--color-bg-main);
}
</style>
