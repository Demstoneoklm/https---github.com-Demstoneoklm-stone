
<template>
  <header class="bg-white shadow p-4 flex justify-between items-center">
    <h1 class="text-2xl font-semibold text-gray-800">{{ pageTitle }}</h1>
    <div class="flex items-center space-x-4">
      <span class="text-gray-600">Bienvenue, {{ userName }}</span>
      <button @click="logout" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Déconnexion
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const router = useRouter();

const pageTitle = ref('Dashboard'); // Ceci sera mis à jour par les vues
const userName = computed(() => authStore.user ? `${authStore.user.firstName} ${authStore.user.lastName}` : 'Utilisateur');

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};

// Vous pouvez ajouter une logique pour mettre à jour pageTitle en fonction de la route
// Par exemple, en utilisant watch(router.currentRoute, ...) ou en le passant via props
</script>

<style scoped>
/* Styles spécifiques à l'en-tête */
</style>
