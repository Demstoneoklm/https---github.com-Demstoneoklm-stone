<template>
    <div class="container">
        <aside class="sidebar">
            <div class="logo">
                <h1>Espace Utilisateur</h1>
            </div>

            <div class="user-info">
                <h2>Bonjour, {{ userName }} !</h2>
            </div>

            <nav class="user-menu">
                <ul>
                    <li :class="{ active: activeMenu === 'dashboard' }" @click="setActiveMenu('dashboard')"><span
                            class="material-icons">dashboard</span> Tableau de bord</li>
                    <li :class="{ active: activeMenu === 'profile' }" @click="setActiveMenu('profile')"><span
                            class="material-icons">person</span> Mon Profil</li>
                    <li :class="{ active: activeMenu === 'requests' }" @click="setActiveMenu('requests')"><span
                            class="material-icons">request_quote</span> Mes Demandes</li>
                    <li :class="{ active: activeMenu === 'documents' }" @click="setActiveMenu('documents')"><span
                            class="material-icons">description</span> Mes Documents</li>
                    <li :class="{ active: activeMenu === 'notifications' }" @click="setActiveMenu('notifications')"><span
                            class="material-icons">notifications</span> Notifications</li>
                    <li :class="{ active: activeMenu === 'help' }" @click="setActiveMenu('help')"><span
                            class="material-icons">help</span> Aide</li>
                    <li @click="logout"><span class="material-icons">logout</span> Déconnexion</li>
                </ul>
            </nav>
        </aside>

        <main class="content">
            <div class="dashboard-header">
                <h2>Bienvenue dans votre espace personnel</h2>
            </div>

            <div class="stats-grid">
                <div class="stat-card">
                    <h3>Demandes en Cours</h3>
                    <p>En attente de validation</p>
                    <span class="stat-value">3</span>
                </div>

                <div class="stat-card">
                    <h3>Documents Partagés</h3>
                    <p>Accès récents</p>
                    <span class="stat-value">7</span>
                </div>

                <div class="stat-card">
                    <h3>Notifications</h3>
                    <p>Non lues</p>
                    <span class="stat-value">2</span>
                </div>
            </div>

            <div class="quick-actions">
                <h3>Actions Rapides</h3>
                <div class="actions-grid">
                    <div class="action-card">
                        <span class="material-icons">add_circle</span>
                        <h4>Nouvelle Demande</h4>
                        <p>Créer une nouvelle demande</p>
                    </div>

                    <div class="action-card">
                        <span class="material-icons">description</span>
                        <h4>Voir Documents</h4>
                        <p>Accéder à vos documents</p>
                    </div>
                </div>
            </div>

            <div class="recent-activity">
                <h3>Activités Récentes</h3>
                <div class="activity-list">
                    <div class="activity-item">
                        <span class="material-icons">description</span>
                        <div>
                            <p>Nouveau document partagé: Procédure RH 2023</p>
                            <small>il y a 2 jours</small>
                        </div>
                    </div>

                    <div class="activity-item">
                        <span class="material-icons">pending</span>
                        <div>
                            <p>Votre demande de matériel est en traitement</p>
                            <small>il y a 3 jours</small>
                        </div>
                    </div>

                    <div class="activity-item">
                        <span class="material-icons">notifications</span>
                        <div>
                            <p>Nouvelle notification système</p>
                            <small>il y a 4 jours</small>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../stores/auth.store';

const authStore = useAuthStore();
const router = useRouter();

const userName = computed(() => {
    return authStore.user ? `${authStore.user.firstName} ${authStore.user.lastName}` : 'Citoyen';
});

const activeMenu = ref('dashboard');

const setActiveMenu = (menu) => {
    activeMenu.value = menu;
    // Ici, vous pouvez ajouter la logique pour naviguer vers différentes sections
    // ou afficher/masquer des composants en fonction du menu actif.
};

const logout = () => {
    authStore.clearAuthData();
    router.push('/citizen/login');
};
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

.user-menu ul {
    list-style: none;
    padding: 10px 0;
}

.user-menu li {
    padding: 12px 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.3s;
}

.user-menu li:hover {
    background-color: #34495e;
}

.user-menu li.active {
    background-color: #3498db;
}

.user-menu li span {
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
    grid-template-columns: repeat(2, 1fr);
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
