<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Dashboard Admin</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard title="Total Utilisateurs" :value="stats.totalUsers" :icon="UsersIcon" />
      <StatCard title="Total Documents" :value="stats.totalDocuments" :icon="DocumentTextIcon" />
      <StatCard title="Articles en Inventaire" :value="stats.totalInventoryItems" :icon="CubeTransparentIcon" />
      <StatCard title="Demandes en Attente" :value="stats.pendingRequests" :icon="ClockIcon" />
    </div>

    <div class="bg-white shadow rounded-lg p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Aperçu Rapide</h2>
      <!-- Ici, vous pouvez ajouter des graphiques ou des listes rapides -->
      <p class="text-gray-600">Plus de contenu pour le dashboard sera ajouté ici.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import StatCard from '../../components/ui/StatCard.vue';
import { UsersIcon, DocumentTextIcon, CubeTransparentIcon, ClockIcon } from '@heroicons/vue/24/outline';
import { adminService } from '../../services/admin.service'; // Correction ici

const stats = ref({
  totalUsers: 0,
  totalDocuments: 0,
  totalInventoryItems: 0,
  pendingRequests: 0,
});

onMounted(async () => {
  try {
    const response = await adminService.getDashboardStats();
    stats.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques du dashboard:', error);
  }
});
</script>