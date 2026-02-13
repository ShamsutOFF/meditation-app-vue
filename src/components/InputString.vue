<script setup lang="ts">
defineProps<{
  placeholder?: string;
  type?: string;
}>();

const data = defineModel<string>();
</script>

<template>
  <input
    class="input-string"
    v-model="data"
    :type="type || 'text'"
    :placeholder="placeholder"
  />
</template>

<style scoped>
.input-string {
  border: none;
  border-bottom: 1px solid var(--color-white);
  background-color: transparent;
  color: var(--color-white);
  font-size: 24px;
  width: 100%;
  padding: 0 0 10px 0; /* Отступ снизу 10px */
  outline: none; /* Убирает рамку при фокусе */
}

.input-string::placeholder {
  color: var(--color-input-placeholder);
}

/* Убираем стандартную подсветку при фокусе */
.input-string:focus {
  outline: none;
  border-bottom: 1px solid var(--color-white); /* Сохраняем тот же стиль */
}
</style>
