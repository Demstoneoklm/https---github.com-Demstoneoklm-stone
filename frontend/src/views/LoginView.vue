<template>
  <div class="auth-content">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe</label>
        <div class="input-with-icon">
          <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password" required />
          <span class="material-icons" @click="togglePasswordVisibility">
            {{ showPassword ? 'visibility_off' : 'visibility' }}
          </span>
        </div>
      </div>
      <button type="submit">Se connecter</button>
    </form>

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
    await authStore.login({ email: email.value, password: password.value });
    router.push('/admin'); // Redirige vers le tableau de bord admin
  } catch (err: any) {
    console.error('Login error:', err);
    error.value = err.message || 'Échec de la connexion. Veuillez vérifier vos identifiants.';
  }
};

// defineEmits(['switch-to-register']); // Commenté car non utilisé dans ce contexte
</script>

<style scoped>
.auth-content {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
}

input[type="email"],
input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.input-with-icon {
  position: relative;
}

.input-with-icon .material-icons {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #7f8c8d;
}

button[type="submit"] {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button[type="submit"]:hover {
  background-color: #218838;
}

.error-message {
  color: #e74c3c;
  text-align: center;
  margin-top: 15px;
}
</style>