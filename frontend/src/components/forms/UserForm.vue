
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="firstName" class="block text-sm font-medium text-gray-700">Prénom</label>
      <input type="text" id="firstName" v-model="form.firstName" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="lastName" class="block text-sm font-medium text-gray-700">Nom</label>
      <input type="text" id="lastName" v-model="form.lastName" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input type="email" id="email" v-model="form.email" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div v-if="!editMode">
      <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
      <input type="password" id="password" v-model="form.password" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="role" class="block text-sm font-medium text-gray-700">Rôle</label>
      <select id="role" v-model="form.role"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        <option value="employee">Employé</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <div>
      <label for="department" class="block text-sm font-medium text-gray-700">Département</label>
      <input type="text" id="department" v-model="form.department"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700">Téléphone</label>
      <input type="text" id="phone" v-model="form.phone"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
      {{ editMode ? 'Mettre à jour' : 'Créer' }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  initialData: Object,
  editMode: { type: Boolean, default: false },
});

const emit = defineEmits(['submit']);

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'employee',
  department: '',
  phone: '',
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.value = { ...newData, password: '' }; // Ne pas pré-remplir le mot de passe
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>
