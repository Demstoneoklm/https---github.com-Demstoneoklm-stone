<template>
  <div class="auth-content">
    <div class="auth-header">
      <h2>Créez un compte</h2>
      <p>Remplissez le formulaire pour créer un compte administrateur</p>
    </div>

    <form @submit.prevent="handleRegister">
      <div class="form-row">
        <div class="form-group">
          <label for="register-firstname">Prénom</label>
          <input 
            type="text" 
            id="register-firstname" 
            v-model="form.firstName"
            class="form-control" 
            placeholder="Votre prénom"
            required
          >
        </div>
        <div class="form-group">
          <label for="register-lastname">Nom</label>
          <input 
            type="text" 
            id="register-lastname" 
            v-model="form.lastName"
            class="form-control" 
            placeholder="Votre nom"
            required
          >
        </div>
      </div>

      <div class="form-group">
        <label for="register-email">Email professionnel</label>
        <input 
          type="email" 
          id="register-email" 
          v-model="form.email"
          class="form-control" 
          placeholder="votre@email.com"
          required
        >
      </div>

      <div class="form-group">
        <label for="register-password">Mot de passe</label>
        <div class="input-with-icon">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            id="register-password" 
            v-model="form.password"
            @input="checkPasswordStrength"
            class="form-control"
            placeholder="Créez un mot de passe" 
            required
          >
          <span 
            class="material-icons" 
            @click="togglePasswordVisibility"
          >
            {{ showPassword ? 'visibility' : 'visibility_off' }}
          </span>
        </div>
        <div class="password-strength">
          <div 
            class="password-strength-bar" 
            :style="{
              width: passwordStrength.width + '%',
              backgroundColor: passwordStrength.color
            }"
          ></div>
        </div>
        <small class="password-hint">
          Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre.
        </small>
      </div>

      <div class="form-group">
        <label for="register-confirm-password">Confirmez le mot de passe</label>
        <div class="input-with-icon">
          <input 
            :type="showConfirmPassword ? 'text' : 'password'" 
            id="register-confirm-password" 
            v-model="form.confirmPassword"
            class="form-control"
            placeholder="Confirmez votre mot de passe" 
            required
          >
          <span 
            class="material-icons" 
            @click="toggleConfirmPasswordVisibility"
          >
            {{ showConfirmPassword ? 'visibility' : 'visibility_off' }}
          </span>
        </div>
      </div>

      <div class="form-group">
        <label for="register-department">Département/Service</label>
        <select 
          id="register-department" 
          v-model="form.department"
          class="form-control" 
          required
        >
          <option value="" disabled selected>Sélectionnez votre département</option>
          <option value="rh">Ressources Humaines</option>
          <option value="finance">Finance</option>
          <option value="it">Informatique</option>
          <option value="administration">Administration</option>
          <option value="direction">Direction</option>
        </select>
      </div>

      <div class="form-group">
        <label for="register-role">Rôle</label>
        <select 
          id="register-role" 
          v-model="form.role"
          class="form-control" 
          required
        >
          <option value="" disabled selected>Sélectionnez votre rôle</option>
          <option value="admin">Administrateur</option>
          <option value="manager">Gestionnaire</option>
          <option value="user">Utilisateur</option>
        </select>
      </div>

      <div class="form-group terms">
        <input 
          type="checkbox" 
          id="register-terms" 
          v-model="form.acceptedTerms"
          required
        >
        <label for="register-terms">
          J'accepte les <a href="#">conditions d'utilisation</a> et la <a href="#">politique de confidentialité</a>
        </label>
      </div>

      <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>

    <div class="auth-footer">
      Vous avez déjà un compte ? 
      <a href="#" @click.prevent="$emit('switch-to-login')">Se connecter</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

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

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordStrength = reactive({
  width: 0,
  color: '#e74c3c'
});

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPasswordVisibility = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const checkPasswordStrength = () => {
  const password = form.password;
  let strength = 0;

  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  const width = strength * 25;
  let color = '#e74c3c'; // Rouge

  if (strength >= 3) color = '#f39c12'; // Orange
  if (strength >= 5) color = '#27ae60'; // Vert

  passwordStrength.width = width;
  passwordStrength.color = color;
};

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    alert('Les mots de passe ne correspondent pas');
    return;
  }

  if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
    alert('Le mot de passe doit contenir au moins 8 caractères, une majuscule et un chiffre');
    return;
  }

  try {
    await authStore.register(form);
    emit('switch-to-login');
  } catch (error) {
    console.error('Registration error:', error);
    // Gérer l'erreur (afficher un message à l'utilisateur)
  }
};

const emit = defineEmits(['switch-to-login']);
</script>

<style scoped>
.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

.password-strength {
  margin-top: 5px;
  height: 4px;
  background-color: #eee;
  border-radius: 2px;
  overflow: hidden;
}

.password-strength-bar {
  height: 100%;
  transition: width 0.3s, background-color 0.3s;
}

.password-hint {
  color: #7f8c8d;
  display: block;
  margin-top: 5px;
}

.terms label {
  display: inline;
  font-weight: normal;
  margin-left: 8px;
}

/* Réutiliser les autres styles de LoginForm.vue */
</style>