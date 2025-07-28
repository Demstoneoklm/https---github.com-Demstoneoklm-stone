<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Mes Demandes</h1>

    <div class="mb-6">
      <button @click="openCreateModal" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Faire une Nouvelle Demande
      </button>
    </div>

    <DataTable :data="userRequests" title="Mes Demandes">
      <template #item-actions="{ item }">
        <span :class="getStatusClass(item.status)" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full">
          {{ item.status }}
        </span>
      </template>
    </DataTable>

    <Modal :is-open="isModalOpen" @close="closeModal">
      <template #title>Faire une Nouvelle Demande</template>
      <template #content>
        <form @submit.prevent="handleRequestSubmit" class="space-y-4">
          <div>
            <label for="requestType" class="block text-sm font-medium text-gray-700">Type de Demande</label>
            <select id="requestType" v-model="newRequest.type" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
              <option value="Congé">Congé</option>
              <option value="Matériel">Matériel</option>
              <option value="Formation">Formation</option>
              <option value="Support">Support</option>
              <option value="Autre">Autre</option>
            </select>
          </div>
          <div>
            <label for="requestTitle" class="block text-sm font-medium text-gray-700">Titre</label>
            <input type="text" id="requestTitle" v-model="newRequest.title" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
          </div>
          <div>
            <label for="requestDescription" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="requestDescription" v-model="newRequest.description" required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"></textarea>
          </div>
          <button type="submit" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Envoyer la Demande
          </button>
        </form>
      </template>
      <template #actions>
        <button @click="closeModal" class="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400">
          Annuler
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import DataTable from '../../components/ui/DataTable.vue';
import Modal from '../../components/ui/Modal.vue';
import { profileService } from '../../services/profile.service'; // Correction ici

const userRequests = ref([]);
const isModalOpen = ref(false);
const newRequest = ref({
  type: 'Congé',
  title: '',
  description: '',
});

const fetchUserRequests = async () => {
  try {
    const response = await profileService.getUserRequests();
    userRequests.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des demandes utilisateur:', error);
  }
};

const openCreateModal = () => {
  isModalOpen.value = true;
  newRequest.value = {
    type: 'Congé',
    title: '',
    description: '',
  };
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleRequestSubmit = async () => {
  try {
    await profileService.createUserRequest(newRequest.value);
    alert('Demande envoyée avec succès !');
    await fetchUserRequests();
    closeModal();
  } catch (error) {
    console.error('Erreur lors de l\'envoi de la demande:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue lors de l\'envoi de la demande.');
  }
};

const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

onMounted(fetchUserRequests);
</script>