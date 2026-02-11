<script setup lang="ts">
import { type Component } from 'vue';

interface Props {
  icon: Component;
  text: string;
  selected?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  selected: false,
});

const emit = defineEmits<{
  click: [];
}>();

const handleClick = () => {
  emit('click');
};
</script>

<template>
  <div class="feeling-tab" @click="handleClick">
    <div class="feeling__icon-wrapper" :class="{ 'feeling__icon-wrapper--selected': props.selected }">
      <component :is="props.icon" class="feeling__icon" />
    </div>
    <span class="feeling__text">{{ props.text }}</span>
  </div>
</template>

<style scoped>
.feeling-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feeling__icon-wrapper {
  width: 62px;
  height: 65px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.feeling__icon-wrapper--selected {
  background-color: rgba(255, 255, 255, 0.9);
}

.feeling__icon {
  width: 40px;
  height: 40px;
  transition: all 0.3s ease;
}

.feeling__icon-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.feeling__icon-wrapper--selected:hover {
  background-color: rgba(255, 255, 255, 1);
}

.feeling__text {
  font-weight: 400;
  font-size: 12px;
  line-height: 100%;
  color: var(--color-white);
  text-align: center;
}
</style>
