import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store.ts';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFoundView.vue'),
      name: 'notFound',
    },
    {
      path: '/',
      component: () => import('@/views/AuthView.vue'),
      name: 'auth'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/stat',
      name: 'stat',
      component: () => import('@/views/StatView.vue'),
    },
    {
      path: '/meditation/:id',
      name: 'meditation',
      component: () => import('@/views/MeditationView.vue'),
      props: true,
    },
  ],
});


router.beforeEach((to) => {
  const authStore = useAuthStore();
  if (!authStore.getToken && to.name != 'auth') {
    return { name: 'auth' };
  }
});

