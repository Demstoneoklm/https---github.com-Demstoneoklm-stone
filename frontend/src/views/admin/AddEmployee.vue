

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Ajouter un Nouvel Employé</h1>
    <div class="bg-white shadow rounded-lg p-6">
      <UserForm @submit="handleAddEmployee" />
    </div>
  </div>
</template>

<script setup>
import UserForm from '../../components/forms/UserForm.vue';
import { useAdminService } from '../../services/admin.service';
import { useRouter } from 'vue-router';

const adminService = useAdminService();
const router = useRouter();

const handleAddEmployee = async (userData) => {
  try {
    // Assurez-vous que le rôle est défini sur 'employee' lors de la création d'un employé
    userData.role = 'employee'; 
    await adminService.createUser(userData);
    alert('Employé ajouté avec succès !');
    router.push('/admin/users'); // Rediriger vers la liste des utilisateurs
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'employé:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue lors de l\'ajout de l\'employé.');
  }
};
</script>

