import { defineStore } from 'pinia';
import { ref } from 'vue';

export type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: number;
  message: string;
  type: NotificationType;
  timeout?: number;
}

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref<Notification[]>([]);
  let nextId = 0;

  function addNotification(message: string, type: NotificationType = 'info', timeout: number = 5000) {
    const id = nextId++;
    notifications.value.push({ id, message, type, timeout });

    if (timeout > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, timeout);
    }

    return id;
  }

  function removeNotification(id: number) {
    const index = notifications.value.findIndex(n => n.id === id);
    if (index !== -1) {
      notifications.value.splice(index, 1);
    }
  }

  function success(message: string, timeout?: number) {
    return addNotification(message, 'success', timeout);
  }

  function error(message: string, timeout?: number) {
    return addNotification(message, 'error', timeout);
  }

  function info(message: string, timeout?: number) {
    return addNotification(message, 'info', timeout);
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    success,
    error,
    info,
  };
});
