<script setup lang="ts">
defineProps<{
  value: number;
  label: string;
  color: 'green' | 'light-green' | 'blue' | 'yellow' | 'red';
}>();

const colorMap = {
  green: '#4A9B8E',
  'light-green': '#86BC42',
  blue: '#6FA5B5',
  yellow: '#A4A862',
  red: '#A85D5D',
};
</script>

<template>
  <div class="stat-card" :style="{ '--card-color': colorMap[color] }">
    <div class="stat-card__value">{{ value }}</div>
    <div class="stat-card__label">{{ label }}</div>
  </div>
</template>

<style scoped>
.stat-card {
  background: linear-gradient(
    to bottom,
    var(--card-color) 0%,
    var(--card-color) 60%,
    color-mix(in srgb, var(--card-color) 70%, black) 100%
  );
  border-radius: 16px;
  padding: 40px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  min-height: 180px;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.3) 0%,
    transparent 100%
  );
  pointer-events: none;
}

.stat-card__value {
  font-weight: 700;
  font-size: 80px;
  line-height: 100%;
  color: var(--color-white);
  margin-bottom: 12px;
  position: relative;
  z-index: 1;
}

.stat-card__label {
  font-weight: 400;
  font-size: 18px;
  line-height: 120%;
  color: var(--color-white);
  position: relative;
  z-index: 1;
}
</style>
