<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue';

const props = defineProps<{
  durationMin: number;
}>();

const emit = defineEmits<{
  complete: [completedMin: number];
  stop: [completedMin: number];
}>();

const totalSeconds = ref(props.durationMin * 60);
const secondsLeft = ref(totalSeconds.value);
const isRunning = ref(false);
const isPaused = ref(false);
let intervalId: number | null = null;

const timeDisplay = computed(() => {
  const minutes = Math.floor(secondsLeft.value / 60);
  const seconds = secondsLeft.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
});

const progress = computed(() => {
  return ((totalSeconds.value - secondsLeft.value) / totalSeconds.value) * 100;
});

function start() {
  if (isRunning.value) return;

  isRunning.value = true;
  isPaused.value = false;

  intervalId = window.setInterval(() => {
    if (secondsLeft.value > 0) {
      secondsLeft.value--;
    } else {
      complete();
    }
  }, 1000);
}

function pause() {
  if (!isRunning.value) return;

  isPaused.value = true;
  isRunning.value = false;

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function resume() {
  if (!isPaused.value) return;
  start();
}

function stop() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  const completedMin = Math.ceil((totalSeconds.value - secondsLeft.value) / 60);
  emit('stop', completedMin);
}

function complete() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  isRunning.value = false;
  emit('complete', props.durationMin);
}

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});

defineExpose({
  start,
  pause,
  resume,
  stop,
});
</script>

<template>
  <div class="timer">
    <div class="timer__circle">
      <svg class="timer__progress" viewBox="0 0 200 200">
        <circle
          class="timer__progress-bg"
          cx="100"
          cy="100"
          r="90"
        />
        <circle
          class="timer__progress-bar"
          cx="100"
          cy="100"
          r="90"
          :style="{
            strokeDashoffset: 565.48 - (565.48 * progress) / 100
          }"
        />
      </svg>

      <div class="timer__content">
        <img
          src="/meditation-bg.png"
          alt="Meditation"
          class="timer__image"
        />
        <div class="timer__time">{{ timeDisplay }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 0;
}

.timer__circle {
  position: relative;
  width: 400px;
  height: 400px;
}

.timer__progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: rotate(-90deg);
}

.timer__progress-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 4;
}

.timer__progress-bar {
  fill: none;
  stroke: var(--color-white);
  stroke-width: 4;
  stroke-dasharray: 565.48;
  stroke-dashoffset: 565.48;
  transition: stroke-dashoffset 1s linear;
  stroke-linecap: round;
}

.timer__content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 360px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.timer__image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
}

.timer__time {
  position: relative;
  z-index: 1;
  font-size: 72px;
  font-weight: 700;
  color: var(--color-white);
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
}
</style>
