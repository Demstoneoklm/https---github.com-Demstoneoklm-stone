<template>
  <div class="auth-container">
    <div class="auth-tabs">
      <button :class="{ active: isLogin }" @click="isLogin = true">Connexion</button>
      <button :class="{ active: !isLogin }" @click="isLogin = false">Inscription</button>
    </div>

    <div v-if="isLogin">
      <h2>Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="login-email">Email</label>
          <input type="email" id="login-email" v-model="loginEmail" required />
        </div>
        <div class="form-group">
          <label for="login-password">Mot de passe</label>
          <input type="password" id="login-password" v-model="loginPassword" required />
        </div>
        <button type="submit">Se connecter</button>
      </form>
    </div>

    <div v-else>
      <h2>Inscription</h2>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="register-firstName">Prénom</label>
          <input type="text" id="register-firstName" v-model="registerFirstName" required />
        </div>
        <div class="form-group">
          <label for="register-lastName">Nom</label>
          <input type="text" id="register-lastName" v-model="registerLastName" required />
        </div>
        <div class="form-group">
          <label for="register-email">Email</label>
          <input type="email" id="register-email" v-model="registerEmail" required />
        </div>
        <div class="form-group">
          <label for="register-password">Mot de passe</label>
          <input type="password" id="register-password" v-model="registerPassword" required />
        </div>
        <div class="form-group checkbox-group">
          <input type="checkbox" id="acceptedTerms" v-model="acceptedTerms" required>
          <label for="acceptedTerms">J'accepte les termes et conditions</label>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const isLogin = ref(true);

// Login form refs
const loginEmail = ref('');
const loginPassword = ref('');

// Register form refs
const registerFirstName = ref('');
const registerLastName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const acceptedTerms = ref(false); // Ajout du champ acceptedTerms

const handleLogin = async () => {
  try {
    await authStore.login(loginEmail.value, loginPassword.value);
    if (authStore.user && authStore.user.role === 'user') {
      router.push('/citizen/dashboard');
    } else {
      router.push('/admin'); // Redirige vers le tableau de bord admin
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
  }
};

const handleRegister = async () => {
  console.log('Valeur de acceptedTerms avant envoi:', acceptedTerms.value);
  try {
    await authStore.register(
      registerEmail.value,
      registerPassword.value,
      registerFirstName.value,
      registerLastName.value,
      acceptedTerms.value // Inclure acceptedTerms dans l'appel à l'API
    );
        router.push('/citizen/login'); // Rediriger vers la page de connexion citoyenne
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
  }
};
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.auth-tabs {
  display: flex;
  margin-bottom: 20px;
}

.auth-tabs button {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f0f0f0;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, border-color 0.3s;
}

.auth-tabs button:first-child {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

.auth-tabs button:last-child {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

.auth-tabs button.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
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

input[type="text"],
input[type="email"],
input[type="password"] {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group.checkbox-group {
  display: flex;
  align-items: center;
  margin-top: 15px;
}

.form-group.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-right: 10px;
}

.form-group.checkbox-group label {
  margin-bottom: 0;
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
</style>
