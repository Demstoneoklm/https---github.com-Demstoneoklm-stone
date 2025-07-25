<template>
  <div class="auth-content">
    <div class="auth-header">
      <h2>Connectez-vous</h2>
      <p>Entrez vos identifiants pour accéder à votre espace administratif</p>
    </div>

    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="login-email">Email</label>
        <input 
          type="email" 
          id="login-email" 
          v-model="email"
          class="form-control" 
          placeholder="votre@email.com"
          required
        >
      </div>

      <div class="form-group">
        <label for="login-password">Mot de passe</label>
        <div class="input-with-icon">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            id="login-password" 
            v-model="password"
            class="form-control"
            placeholder="Votre mot de passe" 
            required
          >
          <span 
            class="material-icons" 
            @click="togglePasswordVisibility"
          >
            {{ showPassword ? 'visibility' : 'visibility_off' }}
          </span>
        </div>
        <div class="auth-footer">
          <a href="#" @click.prevent="handleForgotPassword">Mot de passe oublié ?</a>
        </div>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isLoading">
        <LoadingSpinner v-if="isLoading" />
        <span v-else>Se connecter</span>
      </button>

      <div class="auth-divider">ou</div>

      <button type="button" class="btn btn-google" @click="loginWithGoogle">
        <img src="@/assets/google-logo.png" alt="Google" width="20">
        Se connecter avec Google
      </button>
    </form>

    <div class="auth-footer">
      Vous n'avez pas de compte ? 
      <a href="#" @click.prevent="$emit('switch-to-register')">S'inscrire</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import LoadingSpinner from '@/components/LoadingSpinner.vue'; // Assure-toi que ce composant existe

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isLoading = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  isLoading.value = true;
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    });
    router.push('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
  } finally {
    isLoading.value = false;
  }
};

const loginWithGoogle = () => {
  console.log('Login with Google');
};

const handleForgotPassword = () => {
  const email = prompt('Entrez votre email pour réinitialiser votre mot de passe:');
  if (email) {
    console.log('Demande de réinitialisation pour:', email);
  }
};
</script>
