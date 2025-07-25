<template>
  <div class="auth-content">
    <!-- ton formulaire -->

    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const error = ref('');

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  error.value = '';
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    });
    router.push('/dashboard');
  } catch (err: any) {
    console.error('Login error:', err);
    error.value = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
  }
};

defineEmits(['switch-to-register']);
</script>

<style scoped>
.error-message {
  color: #e74c3c;
  margin-top: 10px;
  font-weight: 600;
}
</style>
