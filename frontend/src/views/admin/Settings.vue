<template>
  <div class="container flex min-h-screen">
    <aside class="sidebar w-72 bg-gray-900 text-white p-5">
      <div class="logo pb-5 border-b border-gray-700">
        <h1 class="text-xl font-medium">Système de Gestion Administrative</h1>
      </div>

      <div class="user-info py-5 border-b border-gray-700">
        <h2 class="text-lg mb-1">Bonjour, Admin User !</h2>
        <p class="text-sm text-gray-400">Admin User - ADMIN</p>
      </div>

      <nav class="admin-menu py-2">
        <ul>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300">
            <span class="material-icons mr-2 text-xl">dashboard</span> Tableau de bord
          </li>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300">
            <span class="material-icons mr-2 text-xl">people</span> Utilisateurs
          </li>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300">
            <span class="material-icons mr-2 text-xl">inventory</span> Inventaire
          </li>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300">
            <span class="material-icons mr-2 text-xl">shopping_cart</span> Commandes
          </li>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300">
            <span class="material-icons mr-2 text-xl">beach_access</span> Congés
          </li>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300" @click="navigateToDocuments">
            <span class="material-icons mr-2 text-xl">description</span> Documents
          </li>
          <li class="active flex items-center p-3 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors duration-300" @click="navigateToSettings">
            <span class="material-icons mr-2 text-xl">settings</span> Paramètres
          </li>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300">
            <span class="material-icons mr-2 text-xl">logout</span> Déconnexion
          </li>
        </ul>
      </nav>
    </aside>

    <main class="content flex-1 p-5 overflow-y-auto bg-gray-50">
      <div class="dashboard-header mb-8">
        <h2 class="text-2xl font-normal text-gray-700">Paramètres du système</h2>
        <p class="text-gray-600">Gérez les configurations de votre application administrative</p>
      </div>

      <div class="settings-container bg-white rounded-lg shadow-md p-8">
        <div class="settings-tabs flex border-b border-gray-200 mb-5">
          <div
            class="settings-tab px-5 py-2 cursor-pointer border-b-2 transition-all duration-300"
            :class="{ 'border-blue-600 text-blue-600 font-medium': activeTab === 'general', 'border-transparent hover:bg-gray-50': activeTab !== 'general' }"
            @click="activeTab = 'general'"
          >
            Général
          </div>
          <div
            class="settings-tab px-5 py-2 cursor-pointer border-b-2 transition-all duration-300"
            :class="{ 'border-blue-600 text-blue-600 font-medium': activeTab === 'security', 'border-transparent hover:bg-gray-50': activeTab !== 'security' }"
            @click="activeTab = 'security'"
          >
            Sécurité
          </div>
          <div
            class="settings-tab px-5 py-2 cursor-pointer border-b-2 transition-all duration-300"
            :class="{ 'border-blue-600 text-blue-600 font-medium': activeTab === 'notifications', 'border-transparent hover:bg-gray-50': activeTab !== 'notifications' }"
            @click="activeTab = 'notifications'"
          >
            Notifications
          </div>
          <div
            class="settings-tab px-5 py-2 cursor-pointer border-b-2 transition-all duration-300"
            :class="{ 'border-blue-600 text-blue-600 font-medium': activeTab === 'appearance', 'border-transparent hover:bg-gray-50': activeTab !== 'appearance' }"
            @click="activeTab = 'appearance'"
          >
            Apparence
          </div>
        </div>

        <div id="general" class="settings-content" :class="{ active: activeTab === 'general' }">
          <form>
            <div class="form-row flex gap-5 mb-5">
              <div class="form-group flex-1">
                <label for="company-name" class="block mb-2 font-medium text-gray-800">Nom de l'organisation</label>
                <input type="text" id="company-name" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600"
                  value="Ministère de l'Administration">
              </div>
              <div class="form-group flex-1">
                <label for="timezone" class="block mb-2 font-medium text-gray-800">Fuseau horaire</label>
                <select id="timezone" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600">
                  <option value="Europe/Paris" selected>Europe/Paris (UTC+1)</option>
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">America/New York (UTC-5)</option>
                </select>
              </div>
            </div>

            <div class="form-group mb-5">
              <label for="default-language" class="block mb-2 font-medium text-gray-800">Langue par défaut</label>
              <select id="default-language" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600">
                <option value="fr" selected>Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <div class="form-group mb-5">
              <label for="date-format" class="block mb-2 font-medium text-gray-800">Format de date</label>
              <select id="date-format" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600">
                <option value="dd/mm/yyyy" selected>JJ/MM/AAAA</option>
                <option value="mm/dd/yyyy">MM/JJ/AAAA</option>
                <option value="yyyy-mm-dd">AAAA-MM-JJ</option>
              </select>
            </div>

            <div class="form-group mb-5">
              <label class="block mb-2 font-medium text-gray-800">Options système</label>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="maintenance-mode" checked class="mr-2">
                <label for="maintenance-mode">Activer le mode maintenance</label>
              </div>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="auto-updates" class="mr-2">
                <label for="auto-updates">Mises à jour automatiques</label>
              </div>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="backup-enabled" checked class="mr-2">
                <label for="backup-enabled">Sauvegardes automatiques</label>
              </div>
            </div>

            <div class="settings-actions flex justify-end gap-3 mt-8 pt-5 border-t border-gray-200">
              <button type="button" class="btn bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500 transition-colors duration-300">Annuler</button>
              <button type="submit" class="btn bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">Enregistrer</button>
            </div>
          </form>
        </div>

        <div id="security" class="settings-content" :class="{ active: activeTab === 'security' }">
          <form>
            <div class="form-group mb-5">
              <label class="block mb-2 font-medium text-gray-800">Politique de mot de passe</label>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="complex-passwords" checked class="mr-2">
                <label for="complex-passwords">Exiger des mots de passe complexes</label>
              </div>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="password-expiration" class="mr-2">
                <label for="password-expiration">Expiration des mots de passe (90 jours)</label>
              </div>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="two-factor-auth" checked class="mr-2">
                <label for="two-factor-auth">Authentification à deux facteurs pour les admins</label>
              </div>
            </div>

            <div class="form-group mb-5">
              <label for="session-timeout" class="block mb-2 font-medium text-gray-800">Délai d'expiration de session (minutes)</label>
              <input type="number" id="session-timeout" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600" value="30" min="5" max="1440">
            </div>

            <div class="form-group mb-5">
              <label for="login-attempts" class="block mb-2 font-medium text-gray-800">Tentatives de connexion autorisées avant blocage</label>
              <input type="number" id="login-attempts" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600" value="5" min="1" max="10">
            </div>

            <div class="danger-zone mt-10 p-5 border border-red-500 rounded-lg bg-red-50">
              <h3 class="text-red-600 mb-4 text-lg font-semibold">Zone de danger</h3>
              <p class="text-gray-700 mb-4">Ces actions sont irréversibles. Soyez certain de ce que vous faites.</p>
              <button type="button" @click="purgeData" class="btn bg-red-600 text-white px-5 py-2 rounded-md hover:bg-red-700 transition-colors duration-300">Purger les données obsolètes</button>
            </div>

            <div class="settings-actions flex justify-end gap-3 mt-8 pt-5 border-t border-gray-200">
              <button type="button" class="btn bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500 transition-colors duration-300">Annuler</button>
              <button type="submit" class="btn bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">Enregistrer</button>
            </div>
          </form>
        </div>

        <div id="notifications" class="settings-content" :class="{ active: activeTab === 'notifications' }">
          <form>
            <div class="form-group mb-5">
              <label class="block mb-2 font-medium text-gray-800">Notifications par email</label>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="notif-system" checked class="mr-2">
                <label for="notif-system">Alertes système</label>
              </div>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="notif-orders" checked class="mr-2">
                <label for="notif-orders">Nouvelles commandes</label>
              </div>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="notif-leaves" class="mr-2">
                <label for="notif-leaves">Demandes de congé</label>
              </div>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="notif-documents" checked class="mr-2">
                <label for="notif-documents">Documents signés</label>
              </div>
            </div>

            <div class="form-group mb-5">
              <label for="notif-email" class="block mb-2 font-medium text-gray-800">Email de notification</label>
              <input type="email" id="notif-email" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600" value="admin@ministere.gouv.fr">
            </div>

            <div class="form-group mb-5">
              <label class="block mb-2 font-medium text-gray-800">Fréquence des rapports</label>
              <select id="report-frequency" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600">
                <option value="daily">Quotidien</option>
                <option value="weekly" selected>Hebdomadaire</option>
                <option value="monthly">Mensuel</option>
              </select>
            </div>

            <div class="settings-actions flex justify-end gap-3 mt-8 pt-5 border-t border-gray-200">
              <button type="button" class="btn bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500 transition-colors duration-300">Annuler</button>
              <button type="submit" class="btn bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">Enregistrer</button>
            </div>
          </form>
        </div>

        <div id="appearance" class="settings-content" :class="{ active: activeTab === 'appearance' }">
          <form>
            <div class="form-group mb-5">
              <label for="theme" class="block mb-2 font-medium text-gray-800">Thème de l'application</label>
              <select id="theme" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600">
                <option value="light" selected>Clair</option>
                <option value="dark">Sombre</option>
                <option value="system">Système</option>
              </select>
            </div>

            <div class="form-group mb-5">
              <label for="primary-color" class="block mb-2 font-medium text-gray-800">Couleur principale</label>
              <input type="color" id="primary-color" class="form-control w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-600" value="#3498db">
            </div>

            <div class="form-group mb-5">
              <label class="block mb-2 font-medium text-gray-800">Options d'affichage</label>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="compact-mode" class="mr-2">
                <label for="compact-mode">Mode compact</label>
              </div>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="show-avatars" checked class="mr-2">
                <label for="show-avatars">Afficher les avatars</label>
              </div>
              <div class="checkbox-group flex items-center mb-2">
                <input type="checkbox" id="animations" checked class="mr-2">
                <label for="animations">Animations</label>
              </div>
            </div>

            <div class="settings-actions flex justify-end gap-3 mt-8 pt-5 border-t border-gray-200">
              <button type="button" class="btn bg-gray-400 text-white px-5 py-2 rounded-md hover:bg-gray-500 transition-colors duration-300">Annuler</button>
              <button type="submit" class="btn bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">Enregistrer</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const activeTab = ref('general');

const purgeData = () => {
  if (confirm('Êtes-vous sûr de vouloir purger les données obsolètes ? Cette action est irréversible.')) {
    alert('Purge des données en cours...');
    // Ici, vous ajouteriez le code pour effectuer la purge via une API
  }
};

const navigateToDocuments = () => {
  router.push({ name: 'admin-documents' });
};

const navigateToSettings = () => {
  router.push({ name: 'admin-settings' });
};
</script>

<style scoped>
/* Styles spécifiques non couverts par Tailwind ou pour des ajustements précis */
.settings-content:not(.active) {
  display: none;
}
</style>