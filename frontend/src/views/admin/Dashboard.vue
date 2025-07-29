<template>
  <div class="container">
    <aside class="sidebar">
      <div class="logo">
        <h1>Système de Gestion Administrative</h1>
      </div>

      <div class="user-info">
        <h2>Bonjour, {{ authStore.user?.firstName }} {{ authStore.user?.lastName }} !</h2>
        <p>{{ authStore.user?.firstName }} {{ authStore.user?.lastName }} - {{ authStore.user?.role?.toUpperCase() }}</p>
      </div>

      <nav class="admin-menu">
        <ul>
          <router-link to="/admin/dashboard" custom v-slot="{ navigate, isActive }">
            <li :class="{ active: isActive }" @click="navigate">
              <span class="material-icons">dashboard</span> Tableau de bord
            </li>
          </router-link>
          <router-link to="/admin/users" custom v-slot="{ navigate, isActive }">
            <li :class="{ active: isActive }" @click="navigate">
              <span class="material-icons">people</span> Utilisateurs
            </li>
          </router-link>
          <router-link to="/admin/inventory" custom v-slot="{ navigate, isActive }">
            <li :class="{ active: isActive }" @click="navigate">
              <span class="material-icons">inventory</span> Inventaire
            </li>
          </router-link>
          <router-link to="/admin/leave" custom v-slot="{ navigate, isActive }">
            <li :class="{ active: isActive }" @click="navigate">
              <span class="material-icons">beach_access</span> Congés
            </li>
          </router-link>
          <router-link to="/admin/documents" custom v-slot="{ navigate, isActive }">
            <li :class="{ active: isActive }" @click="navigate">
              <span class="material-icons">description</span> Documents
            </li>
          </router-link>
          <li><span class="material-icons">assessment</span> Rapports</li>
          <li @click="authStore.logout()" style="cursor: pointer;"><span class="material-icons">logout</span> Déconnexion</li>
        </ul>
      </nav>
    </aside>

    <main class="content">
      <div class="dashboard-header">
        <h2>Voici un aperçu de votre système de gestion administrative.</h2>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <h3>Utilisateurs</h3>
          <p>Total</p>
          <span class="stat-value">{{ stats.totalUsers }}</span>
        </div>

        <div class="stat-card">
          <h3>Commandes Actives</h3>
          <p>En cours</p>
          <span class="stat-value">{{ stats.activeOrders }}</span>
        </div>

        <div class="stat-card">
          <h3>Congés en Attente</h3>
          <p>Demandes</p>
          <span class="stat-value">{{ stats.pendingLeaves }}</span>
        </div>

        <div class="stat-card">
          <h3>Articles en Rupture</h3>
          <p>Stock</p>
          <span class="stat-value">{{ stats.outOfStockItems }}</span>
        </div>

        <div class="stat-card">
          <h3>Nouveaux Documents</h3>
          <p>Non lus</p>
          <span class="stat-value">{{ stats.newDocuments }}</span>
        </div>

        <div class="stat-card">
          <h3>Croissance Mensuelle</h3>
          <p>+{{ stats.monthlyGrowth }}%</p>
          <span class="stat-value positive">↑ {{ stats.monthlyGrowth }}%</span>
        </div>
      </div>

      <div class="quick-actions">
        <h3>Actions Rapides</h3>
        <div class="actions-grid">
          <router-link to="/admin/users" custom v-slot="{ navigate }">
            <div class="action-card" @click="navigate">
              <span class="material-icons">person_add</span>
              <h4>Gérer Utilisateurs</h4>
              <p>Ajouter ou modifier des comptes</p>
            </div>
          </router-link>

        </div>
      </div>

      <div class="recent-activity">
        <h3>Activités Récentes</h3>
        <div class="activity-list">
          <div class="activity-item">
            <span class="material-icons">add_shopping_cart</span>
            <div>
              <p>Nouvelle commande créée par Jean Dupont</p>
              <small>il y a 2 heures</small>
            </div>
          </div>

          <div class="activity-item">
            <span class="material-icons">check_circle</span>
            <div>
              <p>Demande de congé approuvée pour Marie Martin</p>
              <small>il y a 4 heures</small>
            </div>
          </div>

          <div class="activity-item">
            <span class="material-icons">warning</span>
            <div>
              <p>Stock faible détecté : Papier A4</p>
              <small>Aujourd'hui</small>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { adminService } from '../../services/admin.service';

const authStore = useAuthStore();

const stats = ref({
  totalUsers: 0,
  activeOrders: 0,
  pendingLeaves: 0,
  outOfStockItems: 0,
  newDocuments: 0,
  monthlyGrowth: 0,
});

onMounted(async () => {
  try {
    const response = await adminService.getDashboardStats();
    // Assurez-vous que votre API backend renvoie ces champs
    stats.value = {
      totalUsers: response.data.totalUsers || 0,
      activeOrders: response.data.activeOrders || 0, // Assurez-vous que votre API renvoie ceci
      pendingLeaves: response.data.pendingRequests || 0, // Utilise pendingRequests de l'API
      outOfStockItems: response.data.outOfStockItems || 0, // Assurez-vous que votre API renvoie ceci
      newDocuments: response.data.newDocuments || 0, // Assurez-vous que votre API renvoie ceci
      monthlyGrowth: response.data.monthlyGrowth || 0, // Assurez-vous que votre API renvoie ceci
    };
  } catch (error) {
    console.error('Erreur lors du chargement des statistiques du dashboard:', error);
  }
});
</script>

<style scoped>
/* Reset et styles de base */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f5f5f5;
    color: #333;
}

.container {
    display: flex;
    min-height: 100vh;
}

/* Sidebar */
.sidebar {
    width: 280px;
    background-color: #2c3e50;
    color: white;
    padding: 20px 0;
}

.logo {
    padding: 0 20px 20px;
    border-bottom: 1px solid #34495e;
}

.logo h1 {
    font-size: 1.2rem;
    font-weight: 500;
}

.user-info {
    padding: 20px;
    border-bottom: 1px solid #34495e;
}

.user-info h2 {
    font-size: 1.1rem;
    margin-bottom: 5px;
}

.user-info p {
    font-size: 0.9rem;
    color: #bdc3c7;
}

.admin-menu ul {
    list-style: none;
    padding: 10px 0;
}

.admin-menu li {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.admin-menu li:hover {
    background-color: #34495e;
}

.admin-menu li.active {
    background-color: #3498db;
}

.admin-menu li span {
    margin-right: 10px;
    font-size: 1.2rem;
}

/* Contenu principal */
.content {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
}

.dashboard-header {
    margin-bottom: 30px;
}

.dashboard-header h2 {
    font-weight: 400;
    color: #555;
}

/* Cartes de statistiques */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.stat-card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
    font-size: 1rem;
    color: #7f8c8d;
    margin-bottom: 5px;
}

.stat-card p {
    font-size: 0.9rem;
    color: #bdc3c7;
    margin-bottom: 10px;
}

.stat-value {
    font-size: 1.8rem;
    font-weight: 600;
    color: #2c3e50;
}

.stat-value.positive {
    color: #27ae60;
}

/* Actions rapides */
.quick-actions {
    margin-bottom: 30px;
}

.quick-actions h3 {
    margin-bottom: 15px;
    font-weight: 500;
}

.actions-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.action-card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s;
}

.action-card:hover {
    transform: translateY(-5px);
}

.action-card span {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 10px;
}

.action-card h4 {
    margin-bottom: 5px;
    color: #2c3e50;
}

.action-card p {
    font-size: 0.9rem;
    color: #7f8c8d;
}

/* Activités récentes */
.recent-activity {
    margin-bottom: 30px;
}

.recent-activity h3 {
    margin-bottom: 15px;
    font-weight: 500;
}

.activity-list {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.activity-item {
    display: flex;
    padding: 15px 20px;
    border-bottom: 1px solid #eee;
    align-items: center;
}

.activity-item:last-child {
    border-bottom: none;
}

.activity-item span {
    font-size: 1.5rem;
    margin-right: 15px;
    color: #3498db;
}

.activity-item p {
    margin-bottom: 3px;
    color: #2c3e50;
}

.activity-item small {
    color: #7f8c8d;
    font-size: 0.8rem;
}

.activity-item .material-icons.warning {
    color: #e74c3c;
}

.activity-item .material-icons.check_circle {
    color: #27ae60;
}
</style>