
<template>
  <aside class="w-64 bg-gray-800 text-white p-4">
    <div class="text-2xl font-semibold mb-6">Stone Admin</div>
    <nav>
      <ul>
        <li class="mb-2">
          <router-link to="/admin/dashboard" class="block py-2 px-4 rounded hover:bg-gray-700">
            Dashboard
          </router-link>
        </li>
        <li class="mb-2">
          <router-link to="/admin/users" class="block py-2 px-4 rounded hover:bg-gray-700">
            Utilisateurs
          </router-link>
        </li>
        <li class="mb-2">
          <router-link to="/admin/documents" class="block py-2 px-4 rounded hover:bg-gray-700">
            Documents
          </router-link>
        </li>
        <li class="mb-2">
          <router-link to="/admin/inventory" class="block py-2 px-4 rounded hover:bg-gray-700">
            Inventaire
          </router-link>
        </li>
        <li class="mb-2">
          <router-link to="/admin/add-employee" class="block py-2 px-4 rounded hover:bg-gray-700">
            Ajouter Employé
          </router-link>
        </li>
        <li class="mb-2">
          <router-link to="/user/dashboard" class="block py-2 px-4 rounded hover:bg-gray-700">
            Mon Dashboard
          </router-link>
        </li>
        <li class="mb-2">
          <router-link to="/user/profile" class="block py-2 px-4 rounded hover:bg-gray-700">
            Mon Profil
          </router-link>
        </li>
        <li class="mb-2">
          <router-link to="/user/requests" class="block py-2 px-4 rounded hover:bg-gray-700">
            Mes Demandes
          </router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
/* Styles spécifiques à la sidebar */
</style>
