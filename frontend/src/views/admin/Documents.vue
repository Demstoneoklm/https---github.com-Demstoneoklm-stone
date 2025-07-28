
<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Gestion des Documents</h1>

    <div class="mb-6">
      <button @click="openCreateModal" class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
        Ajouter un Document
      </button>
    </div>

    <DataTable :data="documents" title="Liste des Documents">
      <template #item-actions="{ item }">
        <a :href="`http://localhost:3001/api/documents/${item.id}/download`" target="_blank" class="ml-2 text-blue-600 hover:text-blue-900">Télécharger</a>
        <button @click="openEditModal(item)" class="ml-2 text-indigo-600 hover:text-indigo-900">Modifier</button>
        <button @click="deleteDocument(item.id)" class="ml-2 text-red-600 hover:text-red-900">Supprimer</button>
      </template>
    </DataTable>

    <Modal :is-open="isModalOpen" @close="closeModal">
      <template #title>{{ isEditMode ? 'Modifier le document' : 'Ajouter un document' }}</template>
      <template #content>
        <DocumentForm :initial-data="selectedDocument" :edit-mode="isEditMode" @submit="handleDocumentSubmit" />
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
import DocumentForm from '../../components/forms/DocumentForm.vue';
import { documentService } from '../../services/documents.service';

const documents = ref([]);
const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedDocument = ref(null);

const fetchDocuments = async () => {
  try {
    const response = await documentService.getDocuments();
    documents.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des documents:', error);
  }
};

const openCreateModal = () => {
  isEditMode.value = false;
  selectedDocument.value = null;
  isModalOpen.value = true;
};

const openEditModal = (document) => {
  isEditMode.value = true;
  selectedDocument.value = { ...document };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedDocument.value = null;
};

const handleDocumentSubmit = async (documentData) => {
  try {
    if (isEditMode.value) {
      await documentService.updateDocument(selectedDocument.value.id, documentData);
    } else {
      const formData = new FormData();
      for (const key in documentData) {
        if (key === 'file' && documentData[key]) {
          formData.append(key, documentData[key]);
        } else if (key !== 'file') {
          formData.append(key, documentData[key]);
        }
      }
      await documentService.createDocument(formData);
    }
    await fetchDocuments();
    closeModal();
  } catch (error) {
    console.error('Erreur lors de la soumission du document:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue.');
  }
};

const deleteDocument = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
    try {
      await documentService.deleteDocument(id);
      await fetchDocuments();
    } catch (error) {
      console.error('Erreur lors de la suppression du document:', error);
      alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
  }
};

onMounted(fetchDocuments);
</script>
