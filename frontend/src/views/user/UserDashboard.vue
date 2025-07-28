<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Mon Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard title="Mes Demandes en Attente" :value="userStats.pendingRequests" :icon="ClockIcon" />
      <StatCard title="Documents Consultés" :value="userStats.documentsViewed" :icon="DocumentTextIcon" />
      <StatCard title="Articles Empruntés" :value="userStats.borrowedItems" :icon="CubeTransparentIcon" />
    </div>

    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Activités Récentes</h2>
      <p class="text-gray-600">Vos activités récentes seront affichées ici.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StatCard from '../../components/ui/StatCard.vue';
import { ClockIcon, DocumentTextIcon, CubeTransparentIcon } from '@heroicons/vue/24/outline';
// Importez le service utilisateur approprié
// import { userService } from '../../services/users.service'; // Correction ici

const userStats = ref({
  pendingRequests: 0,
  documentsViewed: 0,
  borrowedItems: 0,
});

onMounted(async () => {
  // Ici, vous feriez un appel API pour récupérer les statistiques de l'utilisateur
  // try {
  //   const response = await userService.getUserStats();
  //   userStats.value = response.data;
  // } catch (error) {
  //   console.error('Erreur lors du chargement des statistiques utilisateur:', error);
  // }
  // Données fictives pour l'exemple
  userStats.value = {
    pendingRequests: 3,
    documentsViewed: 15,
    borrowedItems: 2,
  };
});
</script>