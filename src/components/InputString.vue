<script setup lang="ts">
defineProps<{
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}>();

const data = defineModel<string>({ required: false }); // Добавьте required: false
</script>

<template>
  <input
    class="input-string"
    v-model="data"
    :type="type || 'text'"
    :placeholder="placeholder"
    :disabled="disabled"
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
  padding: 0 0 10px 0;
  outline: none;
}

.input-string:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input-string::placeholder {
  color: var(--color-input-placeholder);
}

.input-string:focus {
  outline: none;
  border-bottom: 1px solid var(--color-white);
}

/* Стили для автозаполнения */
.input-string:-webkit-autofill,
.input-string:-webkit-autofill:hover,
.input-string:-webkit-autofill:focus,
.input-string:-webkit-autofill:active {
  -webkit-box-shadow: 0 0 0 30px transparent inset !important;
  -webkit-text-fill-color: var(--color-white) !important;
  transition: background-color 5000s ease-in-out 0s;
  border-bottom: 1px solid var(--color-white) !important;
}
</style>
