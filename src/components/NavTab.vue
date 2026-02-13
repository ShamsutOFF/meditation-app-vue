<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import type { Component } from 'vue';

interface Props {
  icon: Component;
  text: string;
  to?: string; // Делаем опциональным
}

const props = defineProps<Props>();
const route = useRoute();

const isActive = computed(() => props.to ? route.name === props.to : false);
</script>

<template>
  <!-- Если есть to - используем RouterLink, иначе - обычный div -->
  <RouterLink
    v-if="props.to"
    :to="{ name: props.to }"
    active-class="router-link-active"
    class="nav-tab"
  >
    <div class="nav-tab__icon">
      <component :is="props.icon" :is-active="isActive" />
    </div>
    <span class="nav-tab__text">{{ props.text }}</span>
  </RouterLink>

  <div
    v-else
    class="nav-tab nav-tab--clickable"
  >
    <div class="nav-tab__icon">
      <component :is="props.icon" :is-active="false" />
    </div>
    <span class="nav-tab__text">{{ props.text }}</span>
  </div>
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

.nav-tab--clickable {
  cursor: pointer;
}

.nav-tab:hover .nav-tab__text {
  opacity: 1;
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

.nav-tab.router-link-active .nav-tab__text {
  opacity: 1;
}
</style>
