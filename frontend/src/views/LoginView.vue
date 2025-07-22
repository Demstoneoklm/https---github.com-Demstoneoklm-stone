<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async ({ email, password }: { email: string; password: string }) => {
  try {
    await authStore.login(email, password);
    router.push('/dashboard');
  } catch (error) {
    alert('Identifiants incorrects');
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 class="text-2xl font-bold mb-6 text-center">Connexion</h1>
      <LoginForm @submit="handleLogin" />
    </div>
  </div>
</template>