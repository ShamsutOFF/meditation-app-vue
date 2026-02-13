<script setup lang="ts">
defineProps<{
  type?: string;
}>();
</script>

<template>
  <button class="button" :type="type || 'button'">
    <slot />
  </button>
</template>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-button-bg);
  cursor: pointer;
  border-radius: 10px;
  height: 60px;
  padding: 0 54px; /* Убрал вертикальные padding, добавил горизонтальные */
  border: none;
  color: var(--color-white);
  font-size: 25px;
  width: 100%; /* Кнопка на всю ширину контейнера */
  white-space: nowrap; /* Текст в одну строку */
}

.button:hover {
  background: var(--color-button-hover);
}
</style>
