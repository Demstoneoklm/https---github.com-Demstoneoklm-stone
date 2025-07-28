<template>
  <main class="content">
    <div class="page-header">
      <h2>Gestion des Utilisateurs</h2>
      <button class="btn btn-primary" @click="openCreateModal">
        <span class="material-icons" style="font-size: 1rem; vertical-align: middle;">person_add</span>
        Ajouter un utilisateur
      </button>
    </div>

    <div class="users-actions">
      <div class="search-bar">
        <span class="material-icons">search</span>
        <input type="text" placeholder="Rechercher un utilisateur..." v-model="searchQuery" @input="handleSearch">
      </div>
      <div>
        <select class="btn" style="padding: 9px 15px;" v-model="selectedRole" @change="handleRoleFilter">
          <option value="">Tous les rôles</option>
          <option value="admin">Administrateur</option>
          <option value="manager">Manager</option>
          <option value="employee">Employé</option>
          <option value="guest">Invité</option>
        </select>
        <select class="btn" style="padding: 9px 15px; margin-left: 10px;" v-model="selectedStatus" @change="handleStatusFilter">
          <option value="">Tous les statuts</option>
          <option value="active">Actif</option>
          <option value="inactive">Inactif</option>
        </select>
      </div>
    </div>

    <table class="users-table">
      <thead>
        <tr>
          <th>Utilisateur</th>
          <th>Rôle</th>
          <th>Département</th>
          <th>Téléphone</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="paginatedUsers.length === 0">
          <td colspan="6" style="text-align: center; padding: 20px;">Aucun utilisateur trouvé.</td>
        </tr>
        <tr v-for="user in paginatedUsers" :key="user.id">
          <td>
            <div class="user-info-cell">
              <div class="user-avatar">{{ user.firstName.charAt(0) }}{{ user.lastName.charAt(0) }}</div>
              <div>
                <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                <div class="user-email">{{ user.email }}</div>
              </div>
            </div>
          </td>
          <td><span :class="['user-role', `role-${user.role}`]">{{ user.role }}</span></td>
          <td>{{ user.department || 'N/A' }}</td>
          <td>{{ user.phone || 'N/A' }}</td>
          <td><span :class="['user-status', user.isVerified ? 'status-active' : 'status-inactive']"></span> {{ user.isVerified ? 'Actif' : 'Inactif' }}</td>
          <td class="action-btns">
            <span class="material-icons" title="Éditer" @click="openEditModal(user)">edit</span>
            <span class="material-icons" title="Supprimer" @click="deleteUser(user.id)">delete</span>
            <!-- <span class="material-icons" title="Voir détails">visibility</span> -->
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button class="pagination-btn" @click="changePage(currentPage - 1)" :disabled="currentPage === 1"><span class="material-icons">chevron_left</span></button>
      <button v-for="page in totalPages" :key="page" class="pagination-btn" :class="{ active: page === currentPage }" @click="changePage(page)">{{ page }}</button>
      <button class="pagination-btn" @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"><span class="material-icons">chevron_right</span></button>
    </div>
  </main>

  <!-- Modal pour ajouter/modifier un utilisateur -->
  <Modal :is-open="isModalOpen" @close="closeModal">
    <template #title>{{ isEditMode ? "Modifier l'utilisateur" : "Ajouter un utilisateur" }}</template>
    <template #content>
      <UserForm :initial-data="selectedUser" :edit-mode="isEditMode" @submit="handleUserSubmit" />
    </template>
    <template #actions>
      <button @click="closeModal" class="btn btn-secondary">
        Annuler
      </button>
    </template>
  </Modal>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useUsersStore } from '../../stores/users';
import Modal from '../../components/ui/Modal.vue';
import UserForm from '../../components/forms/UserForm.vue';

const usersStore = useUsersStore();

const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedUser = ref(null);
const searchQuery = ref('');
const selectedRole = ref('');
const selectedStatus = ref('');
const currentPage = ref(1);
const itemsPerPage = 5; // Nombre d'éléments par page

// Computed properties for filtering and pagination
const filteredUsers = computed(() => {
  let filtered = usersStore.users;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(user =>
      user.firstName.toLowerCase().includes(query) ||
      user.lastName.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  }

  if (selectedRole.value) {
    filtered = filtered.filter(user => user.role === selectedRole.value);
  }

  if (selectedStatus.value) {
    const status = selectedStatus.value === 'active';
    filtered = filtered.filter(user => user.isVerified === status);
  }

  return filtered;
});

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredUsers.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredUsers.value.length / itemsPerPage);
});

// Methods
const fetchUsers = async () => {
  await usersStore.fetchUsers();
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
      await usersStore.updateUser(selectedUser.value.id, userData);
    } else {
      await usersStore.createUser(userData);
    }
    await fetchUsers(); // Re-fetch users to update the list
    closeModal();
  } catch (error) {
    console.error('Erreur lors de la soumission de l\'utilisateur:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue.');
  }
};

const deleteUser = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
    try {
      await usersStore.deleteUser(id);
      await fetchUsers(); // Re-fetch users to update the list
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
  }
};

const handleSearch = () => {
  currentPage.value = 1; // Reset page on search
};

const handleRoleFilter = () => {
  currentPage.value = 1; // Reset page on filter
};

const handleStatusFilter = () => {
  currentPage.value = 1; // Reset page on filter
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
/* Contenu principal */
.content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.page-header h2 {
    font-weight: 400;
    color: #555;
}

/* Styles spécifiques à la page Utilisateurs */
.users-actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.search-bar {
    position: relative;
    width: 300px;
}

.search-bar input {
    width: 100%;
    padding: 10px 15px 10px 40px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
}

.search-bar .material-icons {
    position: absolute;
    left: 10px;
    top: 10px;
    color: #7f8c8d;
}

.btn {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
}

.users-table {
    width: 100%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    border-collapse: collapse;
}

.users-table th,
.users-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.users-table th {
    background-color: #f8f9fa;
    color: #7f8c8d;
    font-weight: 500;
}

.users-table tr:hover {
    background-color: #f8f9fa;
}

.user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #3498db;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    margin-right: 10px;
}

.user-info-cell {
    display: flex;
    align-items: center;
}

.user-name {
    font-weight: 500;
    color: #2c3e50;
}

.user-email {
    font-size: 0.8rem;
    color: #7f8c8d;
}

.user-role {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.role-admin {
    background-color: #e3f2fd;
    color: #1976d2;
}

.role-manager {
    background-color: #e8f5e9;
    color: #388e3c;
}

.role-employee, .role-user { /* Ajout de .role-employee */
    background-color: #f3e5f5;
    color: #8e24aa;
}

.role-guest {
    background-color: #fbe9e7;
    color: #d84315;
}

.user-status {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 5px;
}

.status-active {
    background-color: #27ae60;
}

.status-inactive {
    background-color: #e74c3c;
}

.action-btns .material-icons {
    color: #7f8c8d;
    cursor: pointer;
    margin: 0 5px;
    transition: color 0.3s;
}

.action-btns .material-icons:hover {
    color: #3498db;
}

/* Pagination */
.pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.pagination-btn {
    padding: 8px 12px;
    margin: 0 5px;
    border: 1px solid #ddd;
    background-color: white;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
}

.pagination-btn:hover {
    background-color: #f8f9fa;
}

.pagination-btn.active {
    background-color: #3498db;
    color: white;
    border-color: #3498db;
}

/* Modal */
/* Les styles du modal sont déjà dans Modal.vue, mais je les garde ici pour la cohérence si vous les avez fournis */
.modal {
    display: none; /* Géré par la prop is-open du composant Modal */
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    width: 500px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    overflow: hidden;
}

.modal-header {
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-header h3 {
    font-weight: 500;
    color: #2c3e50;
}

.modal-body {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #7f8c8d;
    font-size: 0.9rem;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
}

.modal-footer {
    padding: 15px 20px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
}

.btn-secondary {
    background-color: #95a5a6;
    color: white;
    margin-right: 10px;
}

.btn-secondary:hover {
    background-color: #7f8c8d;
}

.close-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #7f8c8d;
    font-size: 1.2rem;
}
</style>