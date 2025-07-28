<template>
  <main class="content">
    <div class="registration-container">
      <div class="registration-header">
        <h2><span class="material-icons"
            style="vertical-align: middle; margin-right: 10px;">person_add</span>Inscription d'un nouvel
          utilisateur</h2>
        <p>Veuillez remplir tous les champs obligatoires pour créer un nouveau compte</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="form-grid">
          <div class="form-group">
            <label for="firstname" class="required-field">Prénom</label>
            <input type="text" id="firstname" v-model="form.firstName" required>
          </div>

          <div class="form-group">
            <label for="lastname" class="required-field">Nom</label>
            <input type="text" id="lastname" v-model="form.lastName" required>
          </div>

          <div class="form-group">
            <label for="email" class="required-field">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>

          <div class="form-group">
            <label for="phone">Téléphone</label>
            <input type="tel" id="phone" v-model="form.phone">
          </div>

          <div class="form-group">
            <label for="role" class="required-field">Rôle</label>
            <select id="role" v-model="form.role" required>
              <option value="">Sélectionner un rôle</option>
              <option value="admin">Administrateur</option>
              <option value="manager">Gestionnaire</option>
              <option value="employee">Employé</option>
              <option value="guest">Invité</option>
            </select>
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
            <label for="password" class="required-field">Mot de passe</label>
            <input type="password" id="password" v-model="form.password" @input="checkPasswordStrength" required>
            <div id="password-strength" class="password-strength">
              Force du mot de passe: <span :class="passwordStrengthClass">{{ passwordStrengthText }}</span>
            </div>
          </div>

          <div class="form-group">
            <label for="confirm-password" class="required-field">Confirmer le mot de passe</label>
            <input type="password" id="confirm-password" v-model="form.confirmPassword" required>
          </div>

          <div class="form-group full-width">
            <label for="notes">Notes supplémentaires</label>
            <textarea id="notes" v-model="form.notes" rows="3"
              style="width: 100%; padding: 12px 15px; border: 1px solid #ddd; border-radius: 4px;"></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-secondary" @click="router.push('/admin/users')">Annuler</button>
            <button type="submit" class="btn btn-primary">Enregistrer</button>
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUsersStore } from '../../stores/users';

const router = useRouter();
const usersStore = useUsersStore();

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: 'employee',
  department: '',
  password: '',
  confirmPassword: '',
  notes: '',
});

const passwordStrength = ref(0);

const passwordStrengthText = computed(() => {
  if (passwordStrength.value === 0) return 'Non évalué';
  if (passwordStrength.value < 3) return 'Faible';
  if (passwordStrength.value < 5) return 'Moyenne';
  return 'Forte';
});

const passwordStrengthClass = computed(() => {
  if (passwordStrength.value === 0) return '';
  if (passwordStrength.value < 3) return 'strength-weak';
  if (passwordStrength.value < 5) return 'strength-medium';
  return 'strength-strong';
});

const checkPasswordStrength = () => {
  const password = form.value.password;
  let strength = 0;

  if (password.length > 7) strength += 1;
  if (password.length > 11) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  passwordStrength.value = strength;
};

const handleSubmit = async () => {
  if (form.value.password !== form.value.confirmPassword) {
    alert('Les mots de passe ne correspondent pas !');
    return;
  }

  try {
    // Créer une copie des données du formulaire sans confirmPassword et notes
    const userData = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      phone: form.value.phone,
      role: form.value.role,
      department: form.value.department,
      password: form.value.password,
    };

    await usersStore.createUser(userData);
    alert('Utilisateur créé avec succès !');
    router.push('/admin/users'); // Rediriger vers la liste des utilisateurs
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue lors de la création de l\'utilisateur.');
  }
};
</script>

<style scoped>
/* Styles spécifiques à l'inscription */
.content {
    flex: 1;
    padding: 40px;
    overflow-y: auto;
}

.registration-container {
    max-width: 800px;
    margin: 0 auto;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    padding: 30px;
}

.registration-header {
    margin-bottom: 30px;
    text-align: center;
}

.registration-header h2 {
    color: #2c3e50;
    font-weight: 500;
    margin-bottom: 10px;
}

.registration-header p {
    color: #7f8c8d;
    font-size: 0.95rem;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group.full-width {
    grid-column: span 2;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #2c3e50;
    font-size: 0.9rem;
    font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.95rem;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    border-color: #3498db;
    outline: none;
}

.form-actions {
    grid-column: span 2;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
}

.btn {
    padding: 12px 25px;
    border: none;
    border-radius: 4px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
}

.btn-secondary {
    background-color: #95a5a6;
    color: white;
    margin-right: 15px;
}

.btn-secondary:hover {
    background-color: #7f8c8d;
}

.required-field::after {
    content: " *";
    color: #e74c3c;
}

.password-strength {
    margin-top: 5px;
    font-size: 0.8rem;
    color: #7f8c8d;
}

.strength-weak {
    color: #e74c3c;
}

.strength-medium {
    color: #f39c12;
}

.strength-strong {
    color: #27ae60;
}

@media (max-width: 768px) {
    .form-grid {
        grid-template-columns: 1fr;
    }

    .form-group.full-width {
        grid-column: span 1;
    }

    .form-actions {
        grid-column: span 1;
        flex-direction: column;
    }

    .btn-secondary {
        margin-right: 0;
        margin-bottom: 10px;
    }
}
</style>
