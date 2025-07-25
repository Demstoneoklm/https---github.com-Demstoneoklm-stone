<template>
  <form @submit.prevent="handleRegister">
    <!-- Tes champs de formulaire ici -->

    <!-- Message d'erreur -->
    <div v-if="error" class="error-message">{{ error }}</div>

    <!-- Bouton avec LoadingSpinner -->
    <button type="submit" :disabled="isLoading" class="btn btn-primary">
      <LoadingSpinner v-if="isLoading" />
      <span v-else>S'inscrire</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import LoadingSpinner from '@/components/LoadingSpinner.vue'; // Assure-toi que ce composant existe

const authStore = useAuthStore();
const router = useRouter();

const error = ref('');
const isLoading = ref(false);

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  department: '',
  role: '',
  acceptedTerms: false
});

const handleRegister = async () => {
  error.value = '';
  isLoading.value = true;

  if (form.password !== form.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas';
    isLoading.value = false;
    return;
  }

  if (
    form.password.length < 8 ||
    !/[A-Z]/.test(form.password) ||
    !/[0-9]/.test(form.password)
  ) {
    error.value = 'Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre';
    isLoading.value = false;
    return;
  }

  try {
    await authStore.register(form);
    router.push('/login');
  } catch (err: any) {
    console.error('Registration error:', err);
    error.value = err.message || "Erreur lors de l'inscription. Veuillez réessayer.";
  } finally {
    isLoading.value = false;
  }
};

defineEmits(['switch-to-login']);
</script>

<style scoped>
.error-message {
  color: #e74c3c;
  margin-top: 10px;
  font-weight: 600;
}
</style>
