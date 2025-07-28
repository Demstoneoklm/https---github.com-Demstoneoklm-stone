<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div class="form-grid">
      <div class="form-group">
        <label for="firstName" class="block text-sm font-medium text-gray-700 required-field">Prénom</label>
        <input type="text" id="firstName" v-model="form.firstName" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="form-group">
        <label for="lastName" class="block text-sm font-medium text-gray-700 required-field">Nom</label>
        <input type="text" id="lastName" v-model="form.lastName" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="form-group">
        <label for="email" class="block text-sm font-medium text-gray-700 required-field">Email</label>
        <input type="email" id="email" v-model="form.email" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="form-group">
        <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
        <input type="tel" id="phone" v-model="form.phone"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="form-group">
        <label for="role" class="block text-sm font-medium text-gray-700 required-field">Rôle</label>
        <select id="role" v-model="form.role" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="employee">Employé</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
          <option value="guest">Invité</option>
        </select>
      </div>
      <div class="form-group">
        <label for="department" class="block text-sm font-medium text-gray-700">Département</label>
        <select id="department" v-model="form.department"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
          <option value="">Sélectionner un département</option>
          <option value="hr">Ressources Humaines</option>
          <option value="finance">Finance</option>
          <option value="it">Informatique</option>
          <option value="operations">Opérations</option>
          <option value="other">Autre</option>
        </select>
      </div>
      <div class="form-group" v-if="!editMode">
        <label for="password" class="block text-sm font-medium text-gray-700 required-field">Mot de passe</label>
        <input type="password" id="password" v-model="form.password" @input="checkPasswordStrength" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        <div class="password-strength">
          Force du mot de passe: <span :class="passwordStrengthClass">{{ passwordStrengthText }}</span>
        </div>
      </div>
      <div class="form-group" v-if="!editMode">
        <label for="confirm-password" class="block text-sm font-medium text-gray-700 required-field">Confirmer le mot de passe</label>
        <input type="password" id="confirm-password" v-model="form.confirmPassword" required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
      </div>
      <div class="form-group full-width">
        <label for="notes" class="block text-sm font-medium text-gray-700">Notes supplémentaires</label>
        <textarea id="notes" v-model="form.notes" rows="3"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
      </div>
    </div>
    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
      {{ editMode ? 'Mettre à jour' : 'Créer' }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  initialData: Object,
  editMode: { type: Boolean, default: false },
});

const emit = defineEmits(['submit']);

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

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.value = { ...newData, password: '', confirmPassword: '' }; // Ne pas pré-remplir le mot de passe
  }
}, { immediate: true });

const handleSubmit = () => {
  if (!props.editMode && form.value.password !== form.value.confirmPassword) {
    alert('Les mots de passe ne correspondent pas !');
    return;
  }

  // Créer une copie des données du formulaire sans confirmPassword et notes
  const userData = {
    firstName: form.value.firstName,
    lastName: form.value.lastName,
    email: form.value.email,
    phone: form.value.phone,
    role: form.value.role,
    department: form.value.department,
  };

  // Ajouter le mot de passe uniquement en mode création
  if (!props.editMode) {
    userData.password = form.value.password;
  }

  emit('submit', userData);
};
</script>

<style scoped>
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group.full-width {
  grid-column: span 2;
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
</style>