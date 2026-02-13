<script setup lang="ts">
import ButtonText from '@/components/ButtonText.vue';
import InputString from '@/components/InputString.vue';
import { ref, watch, computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store.ts';
import { useRouter } from 'vue-router';
import LogoBigIcon from '@/icons/LogoBigIcon.vue';

const authStore = useAuthStore();
const router = useRouter();
const isLoading = ref(false);

// Режимы страницы
type AuthMode = 'login' | 'register';
const mode = ref<AuthMode>('login');

// Форма
const form = ref<{
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}>({});

// Переключение режимов
const toggleMode = () => {
  mode.value = mode.value === 'login' ? 'register' : 'login';
  form.value = {
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined
  };
};

// Заголовок кнопки
const buttonText = computed(() =>
  mode.value === 'login' ? 'Войти в приложение' : 'Зарегистрироваться'
);

// Текст ссылки
const linkText = computed(() =>
  mode.value === 'login'
    ? 'Нет аккаунта?'
    : 'Уже есть аккаунт?'
);

// Валидация формы
const isFormValid = computed(() => {
  if (mode.value === 'login') {
    return form.value.username && form.value.password;
  } else {
    return form.value.username &&
      form.value.email &&
      form.value.password &&
      form.value.confirmPassword &&
      form.value.password === form.value.confirmPassword;
  }
});

async function onSubmit(event: Event) {
  event.preventDefault();

  if (!isFormValid.value || isLoading.value) return;

  isLoading.value = true;

  try {
    if (mode.value === 'login') {
      const success = await authStore.login(form.value.username!, form.value.password!);

      if (success) {
        // Редирект сразу после успешного логина
        await router.push({ name: 'home' });
      } else {
        // Очистка пароля при ошибке
        form.value.password = undefined;
      }
    } else {
      const success = await authStore.register({
        username: form.value.username!,
        email: form.value.email!,
        password: form.value.password!
      });

      if (success) {
        mode.value = 'login';
        form.value = {};
      }
    }
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="auth">
    <div class="auth__container">
      <LogoBigIcon />

      <form class="auth__form" @submit="onSubmit">
        <InputString
          v-model="form.username"
          placeholder="Имя пользователя"
          type="text"
          :disabled="isLoading"
        />

        <InputString
          v-if="mode === 'register'"
          v-model="form.email"
          placeholder="Email"
          type="email"
          :disabled="isLoading"
        />

        <InputString
          v-model="form.password"
          placeholder="Пароль"
          type="password"
          :disabled="isLoading"
        />

        <InputString
          v-if="mode === 'register'"
          v-model="form.confirmPassword"
          placeholder="Подтвердите пароль"
          type="password"
          :disabled="isLoading"
        />

        <ButtonText
          type="submit"
          :disabled="!isFormValid || isLoading"
        >
          {{ buttonText }}
        </ButtonText>
      </form>

      <button
        class="auth__link"
        @click="toggleMode"
        :disabled="isLoading"
      >
        {{ linkText }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.auth {
  display: grid;
  place-items: center;
  min-height: 100vh;
  background-image: url('/image_bg.png');
  background-size: cover;
  background-repeat: no-repeat;
}

.auth__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  max-width: 400px; /* Ограничиваем ширину контейнера */
  /* Отступы по бокам на мобилках */
  padding: 0 20px 40px;
}

.auth__link:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.auth__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  width: 100%;
}

.auth__link {
  background: none;
  border: none;
  color: var(--color-white);
  font-size: 16px;
  cursor: pointer;
  text-decoration: underline;
  opacity: 0.8;
  transition: opacity 0.2s;
  padding: 8px;
}

.auth__link:hover {
  opacity: 1;
}
</style>
