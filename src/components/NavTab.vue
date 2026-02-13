<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { Component } from 'vue';

interface Props {
  icon: Component;
  text: string;
  to: string;
}

const props = defineProps<Props>();
const route = useRoute();

const isActive = computed(() => route.path === props.to);
</script>

<template>
  <RouterLink :to="props.to" active-class="router-link-active" class="nav-tab">
    <div class="nav-tab__icon">
      <component :is="props.icon" :is-active="isActive" />
    </div>
    <span class="nav-tab__text">{{ props.text }}</span>
  </RouterLink>
</template>

<style scoped>
.nav-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 8px;
}

.nav-tab:hover .nav-tab__text {
  opacity: 1;
}

.nav-tab--active {
}

.nav-tab__icon {
  margin-bottom: 4px;
}

.nav-tab__text {
  font-weight: 400;
  font-size: 22px;
  line-height: 100%;
  color: var(--color-white);
  opacity: 0.5;
}

/* Стили для активной ссылки через классы vue-router */
.nav-tab.router-link-active {
}

.nav-tab.router-link-exact-active {
  /* Стили для точного совпадения маршрута */
}
</style>
