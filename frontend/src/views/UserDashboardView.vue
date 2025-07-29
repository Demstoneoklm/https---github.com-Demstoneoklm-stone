<template>
  <div class="user-dashboard">
    <h1>Bienvenue sur votre tableau de bord utilisateur !</h1>
    <p>Ceci est votre espace personnel.</p>
    <button @click="logout">Déconnexion</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.user-dashboard {
  padding: 20px;
  text-align: center;
}
</style>
