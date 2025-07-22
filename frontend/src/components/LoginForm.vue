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

      <button type="submit" class="btn btn-primary">Se connecter</button>

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

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const handleLogin = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    });
    router.push('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    // Gérer l'erreur (afficher un message à l'utilisateur)
  }
};

const loginWithGoogle = () => {
  // Implémenter la logique OAuth
  console.log('Login with Google');
};

const handleForgotPassword = () => {
  const email = prompt('Entrez votre email pour réinitialiser votre mot de passe:');
  if (email) {
    console.log('Demande de réinitialisation pour:', email);
    // Implémenter la logique de réinitialisation
  }
};
</script>

<style scoped>
/* Styles spécifiques au formulaire de connexion */
.auth-content {
  display: block;
}

.auth-header {
  margin-bottom: 30px;
}

.auth-header h2 {
  font-size: 1.8rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.auth-header p {
  color: #7f8c8d;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #2c3e50;
  font-size: 0.95rem;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.3s;
}

.form-control:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.input-with-icon {
  position: relative;
}

.input-with-icon .material-icons {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #7f8c8d;
  cursor: pointer;
}

.btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 10px;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-google {
  background-color: white;
  color: #2c3e50;
  border: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn-google:hover {
  background-color: #f9f9f9;
}

.auth-divider {
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.auth-divider::before,
.auth-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid #eee;
}

.auth-divider::before {
  margin-right: 15px;
}

.auth-divider::after {
  margin-left: 15px;
}

.auth-footer {
  margin-top: 30px;
  text-align: center;
  font-size: 0.9rem;
  color: #7f8c8d;
}

.auth-footer a {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
}
</style>