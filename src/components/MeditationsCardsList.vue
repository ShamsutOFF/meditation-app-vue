<script setup lang="ts">
import MeditationCard from '@/components/MeditationCard.vue';
import { useMeditationsStore } from '@/stores/meditations.store.ts';
import { onMounted } from 'vue';

const meditationsStore = useMeditationsStore();
onMounted(() => {
  meditationsStore.fetchMeditations();
});
</script>

<template>
  <div class="meditation-list">
    <MeditationCard
      v-for="meditation in meditationsStore.meditations"
      :key="meditation.id"
      :meditation="meditation"
    />
  </div>
</template>

<style scoped>
.meditation-list {
  display: inline-grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 22px;
  row-gap: 24px;
}
</style>
