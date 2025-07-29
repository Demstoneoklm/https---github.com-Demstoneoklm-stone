<template>
  <form @submit.prevent="handleRegister">
    <div class="form-group">
      <label for="firstName">Prénom</label>
      <input type="text" id="firstName" v-model="form.firstName" required />
    </div>
    <div class="form-group">
      <label for="lastName">Nom</label>
      <input type="text" id="lastName" v-model="form.lastName" required />
    </div>
    <div class="form-group">
      <label for="email">Email professionnel</label>
      <input type="email" id="email" v-model="form.email" required />
    </div>
    <div class="form-group">
      <label for="password">Mot de passe</label>
      <input type="password" id="password" v-model="form.password" required />
    </div>
    <div class="form-group">
      <label for="confirmPassword">Confirmez le mot de passe</label>
      <input type="password" id="confirmPassword" v-model="form.confirmPassword" required />
    </div>
    <div class="form-group">
      <label for="department">Département</label>
      <select id="department" v-model="form.department">
        <option value="">Sélectionner un département</option>
        <option value="hr">Ressources Humaines</option>
        <option value="finance">Finance</option>
        <option value="it">Informatique</option>
        <option value="operations">Opérations</option>
        <option value="other">Autre</option>
      </select>
    </div>
    <div class="form-group">
      <label for="role">Rôle</label>
      <select id="role" v-model="form.role">
        <option value="">Sélectionner un rôle</option>
        <option value="employee">Employé</option>
        <option value="manager">Manager</option>
        <option value="guest">Invité</option>
      </select>
    </div>
    <div class="form-group checkbox-group">
      <input type="checkbox" id="acceptedTerms" v-model="form.acceptedTerms" />
      <label for="acceptedTerms">J'accepte les conditions d'utilisation et la politique de confidentialité</label>
    </div>

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

  // Validation pour acceptedTerms côté client (en plus de la validation Zod côté serveur)
  if (!form.acceptedTerms) {
    error.value = 'Vous devez accepter les conditions d\'utilisation et la politique de confidentialité';
    isLoading.value = false;
    return;
  }

  try {
    await authStore.register(form);
    router.push('/user-dashboard'); // Redirige vers le tableau de bord utilisateur après l'inscription
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
.form-group {
  margin-bottom: 15px;
}
.checkbox-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.checkbox-group input[type="checkbox"] {
  margin-right: 10px;
}
</style>