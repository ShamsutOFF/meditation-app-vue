<script setup lang="ts">
defineProps<{
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}>();
</script>

<template>
  <button class="button" :type="type || 'button'" :disabled="disabled">
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
  padding: 0 54px;
  border: none;
  color: var(--color-white);
  font-size: 25px;
  width: 100%;
  white-space: nowrap;
  transition: background-color 0.2s ease; /* Изменили здесь */
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button:hover:not(:disabled) {
  background-color: var(--color-button-hover);
}
</style>

