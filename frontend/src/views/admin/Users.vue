

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Gestion des Utilisateurs</h1>

    <div class="mb-6">
      <button @click="openCreateModal" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Ajouter un Utilisateur
      </button>
    </div>

    <DataTable :data="users" title="Liste des Utilisateurs">
      <template #item-actions="{ item }">
        <button @click="openEditModal(item)" class="ml-2 text-indigo-600 hover:text-indigo-900">Modifier</button>
        <button @click="deleteUser(item.id)" class="ml-2 text-red-600 hover:text-red-900">Supprimer</button>
      </template>
    </DataTable>

    <Modal :is-open="isModalOpen" @close="closeModal">
      <template #title>{{ isEditMode ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur' }}</template>
      <template #content>
        <UserForm :initial-data="selectedUser" :edit-mode="isEditMode" @submit="handleUserSubmit" />
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
import UserForm from '../../components/forms/UserForm.vue';
import { useAdminService } from '../../services/admin.service';

const adminService = useAdminService();
const users = ref([]);
const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedUser = ref(null);

const fetchUsers = async () => {
  try {
    const response = await adminService.getUsers();
    users.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des utilisateurs:', error);
  }
};

const openCreateModal = () => {
  isEditMode.value = false;
  selectedUser.value = null;
  isModalOpen.value = true;
};

const openEditModal = (user) => {
  isEditMode.value = true;
  selectedUser.value = { ...user };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedUser.value = null;
};

const handleUserSubmit = async (userData) => {
  try {
    if (isEditMode.value) {
      await adminService.updateUser(selectedUser.value.id, userData);
    } else {
      await adminService.createUser(userData);
    }
    await fetchUsers();
    closeModal();
  } catch (error) {
    console.error('Erreur lors de la soumission de l\'utilisateur:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue.');
  }
};

const deleteUser = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    try {
      await adminService.deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
  }
};

onMounted(fetchUsers);
</script>

