
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
      <input type="text" id="title" v-model="form.title" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea id="description" v-model="form.description"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
    </div>
    <div>
      <label for="type" class="block text-sm font-medium text-gray-700">Type</label>
      <select id="type" v-model="form.type" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        <option value="Contrat">Contrat</option>
        <option value="Procédure">Procédure</option>
        <option value="Règlement">Règlement</option>
        <option value="Rapport">Rapport</option>
        <option value="Annonce">Annonce</option>
        <option value="Autre">Autre</option>
      </select>
    </div>
    <div v-if="!editMode">
      <label for="file" class="block text-sm font-medium text-gray-700">Fichier</label>
      <input type="file" id="file" @change="handleFileChange" required
        class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
    </div>
    <div>
      <label for="isPublic" class="flex items-center">
        <input type="checkbox" id="isPublic" v-model="form.isPublic"
          class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        <span class="ml-2 text-sm text-gray-900">Public</span>
      </label>
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
  title: '',
  description: '',
  type: 'Contrat',
  file: null,
  isPublic: true,
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.value = { ...newData, file: null }; // Ne pas pré-remplir le fichier
  }
}, { immediate: true });

const handleFileChange = (event) => {
  form.value.file = event.target.files[0];
};

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>
