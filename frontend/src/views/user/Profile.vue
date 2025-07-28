<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Mon Profil</h1>

    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Informations Personnelles</h2>
      <UserForm :initial-data="userProfile" edit-mode @submit="handleProfileUpdate" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserForm from '../../components/forms/UserForm.vue';
import { profileService } from '../../services/profile.service'; // Correction ici

const userProfile = ref(null);

onMounted(async () => {
  try {
    const response = await profileService.getUserProfile();
    userProfile.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement du profil utilisateur:', error);
  }
});

const handleProfileUpdate = async (updatedData) => {
  try {
    await profileService.updateUserProfile(updatedData);
    alert('Profil mis à jour avec succès !');
  } catch (error) {
    console.error('Erreur lors de la mise à jour du profil:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue lors de la mise à jour du profil.');
  }
};
</script>