<script setup lang="ts">
import { useNotificationStore } from '@/stores/notification.store';
import { storeToRefs } from 'pinia';

const notificationStore = useNotificationStore();
const { notifications } = storeToRefs(notificationStore);
</script>

<template>
  <div class="notifications-container">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="`notification--${notification.type}`"
      >
        <span class="notification__message">{{ notification.message }}</span>
        <button
          class="notification__close"
          @click="notificationStore.removeNotification(notification.id)"
        >
          ✕
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notifications-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}

.notification {
  min-width: 300px;
  max-width: 400px;
  padding: 12px 16px;
  border-radius: 8px;
  background-color: var(--color-white);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  pointer-events: auto;
  animation: slideIn 0.3s ease;
}

.notification--success {
  background-color: #4caf50;
  color: white;
}

.notification--error {
  background-color: #f44336;
  color: white;
}

.notification--info {
  background-color: #2196f3;
  color: white;
}

.notification__message {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
}

.notification__close {
  background: none;
  border: none;
  color: currentColor;
  cursor: pointer;
  font-size: 18px;
  padding: 0 4px;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.notification__close:hover {
  opacity: 1;
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
