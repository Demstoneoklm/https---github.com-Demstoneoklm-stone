

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Gestion de l'Inventaire</h1>

    <div class="mb-6">
      <button @click="openCreateModal" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Ajouter un Article
      </button>
    </div>

    <DataTable :data="inventoryItems" title="Liste des Articles en Inventaire">
      <template #item-actions="{ item }">
        <button @click="openEditModal(item)" class="ml-2 text-indigo-600 hover:text-indigo-900">Modifier</button>
        <button @click="deleteItem(item.id)" class="ml-2 text-red-600 hover:text-red-900">Supprimer</button>
      </template>
    </DataTable>

    <Modal :is-open="isModalOpen" @close="closeModal">
      <template #title>{{ isEditMode ? 'Modifier l\'article' : 'Ajouter un article' }}</template>
      <template #content>
        <InventoryForm :initial-data="selectedItem" :edit-mode="isEditMode" @submit="handleItemSubmit" />
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
import InventoryForm from '../../components/forms/InventoryForm.vue';
import { useInventoryService } from '../../services/inventory.service';

const inventoryService = useInventoryService();
const inventoryItems = ref([]);
const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedItem = ref(null);

const fetchInventoryItems = async () => {
  try {
    const response = await inventoryService.getInventoryItems();
    inventoryItems.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des articles d\'inventaire:', error);
  }
};

const openCreateModal = () => {
  isEditMode.value = false;
  selectedItem.value = null;
  isModalOpen.value = true;
};

const openEditModal = (item) => {
  isEditMode.value = true;
  selectedItem.value = { ...item };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedItem.value = null;
};

const handleItemSubmit = async (itemData) => {
  try {
    if (isEditMode.value) {
      await inventoryService.updateInventoryItem(selectedItem.value.id, itemData);
    } else {
      await inventoryService.createInventoryItem(itemData);
    }
    await fetchInventoryItems();
    closeModal();
  } catch (error) {
    console.error('Erreur lors de la soumission de l\'article:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue.');
  }
};

const deleteItem = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
    try {
      await inventoryService.deleteInventoryItem(id);
      await fetchInventoryItems();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
  }
};

onMounted(fetchInventoryItems);
</script>

