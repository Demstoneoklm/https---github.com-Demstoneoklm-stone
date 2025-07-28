
<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nom de l'article</label>
      <input type="text" id="name" v-model="form.name" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="reference" class="block text-sm font-medium text-gray-700">Référence</label>
      <input type="text" id="reference" v-model="form.reference" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="category" class="block text-sm font-medium text-gray-700">Catégorie</label>
      <select id="category" v-model="form.category" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        <option value="Fournitures de bureau">Fournitures de bureau</option>
        <option value="Matériel informatique">Matériel informatique</option>
        <option value="Mobilier">Mobilier</option>
        <option value="Entretien">Entretien</option>
        <option value="Autre">Autre</option>
      </select>
    </div>
    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea id="description" v-model="form.description"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
    </div>
    <div>
      <label for="quantity" class="block text-sm font-medium text-gray-700">Quantité</label>
      <input type="number" id="quantity" v-model.number="form.quantity" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="alertThreshold" class="block text-sm font-medium text-gray-700">Seuil d'alerte</label>
      <input type="number" id="alertThreshold" v-model.number="form.alertThreshold" required
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="supplier" class="block text-sm font-medium text-gray-700">Fournisseur</label>
      <input type="text" id="supplier" v-model="form.supplier"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
    </div>
    <div>
      <label for="location" class="block text-sm font-medium text-gray-700">Emplacement</label>
      <input type="text" id="location" v-model="form.location"
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
  name: '',
  reference: '',
  category: 'Fournitures de bureau',
  description: '',
  quantity: 0,
  alertThreshold: 5,
  supplier: '',
  location: '',
});

watch(() => props.initialData, (newData) => {
  if (newData) {
    form.value = { ...newData };
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('submit', form.value);
};
</script>
