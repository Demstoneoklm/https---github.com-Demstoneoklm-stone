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
          <li class="flex items-center p-3 cursor-pointer bg-blue-600 hover:bg-blue-700 transition-colors duration-300 active">
            <span class="material-icons mr-2 text-xl">description</span> Documents
          </li>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300">
            <span class="material-icons mr-2 text-xl">assessment</span> Rapports
          </li>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300" @click="navigateToSettings">
            <span class="material-icons mr-2 text-xl">settings</span> Paramètres
          </li>
          <li class="flex items-center p-3 cursor-pointer hover:bg-gray-800 transition-colors duration-300">
            <span class="material-icons mr-2 text-xl">logout</span> Déconnexion
          </li>
        </ul>
      </nav>
    </aside>

    <main class="content flex-1 p-5 overflow-y-auto bg-gray-50">
      <div class="documents-header flex justify-between items-center mb-8">
        <h2 class="text-2xl font-normal text-gray-700">Gestion des Documents</h2>
        <button @click="openModal" class="btn bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 transition-colors duration-300">
          <span class="material-icons mr-1">add</span>
          Ajouter un document
        </button>
      </div>

      <div class="documents-grid grid gap-5 mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <!-- Document Cards -->
        <div v-for="doc in documents" :key="doc.id" class="document-card bg-white rounded-lg p-5 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
          <div class="document-header flex justify-between mb-4">
            <span class="document-type text-xs px-2 py-1 rounded bg-blue-100 text-blue-700">{{ doc.type }}</span>
            <span class="document-date text-xs text-gray-500">{{ doc.date }}</span>
          </div>
          <h3 class="document-title text-lg mb-2 text-gray-800">{{ doc.title }}</h3>
          <p class="document-description text-sm text-gray-600 mb-4 leading-relaxed">{{ doc.description }}</p>
          <div class="document-footer flex justify-between items-center">
            <span class="document-author text-xs text-gray-500">Par: {{ doc.author }}</span>
            <div class="document-actions">
              <button @click="downloadDocument(doc.id)" title="Télécharger" class="text-gray-500 ml-2 hover:text-blue-600 transition-colors duration-300">
                <span class="material-icons">download</span>
              </button>
              <button @click="editDocument(doc.id)" title="Modifier" class="text-gray-500 ml-2 hover:text-blue-600 transition-colors duration-300">
                <span class="material-icons">edit</span>
              </button>
              <button @click="deleteDocument(doc.id)" title="Supprimer" class="text-gray-500 ml-2 hover:text-red-600 transition-colors duration-300">
                <span class="material-icons">delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <!-- Modal pour ajouter un document -->
  <div v-if="isModalOpen" class="modal fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div class="modal-content bg-white p-8 rounded-lg w-full max-w-lg">
      <div class="modal-header flex justify-between items-center mb-5">
        <h3 class="text-xl text-gray-800">Ajouter un nouveau document</h3>
        <button @click="closeModal" class="close-modal text-gray-500 text-2xl cursor-pointer hover:text-gray-700">&times;</button>
      </div>
      <form @submit.prevent="submitDocumentForm">
        <div class="form-group mb-5">
          <label for="documentTitle" class="block mb-2 text-gray-800">Titre du document</label>
          <input type="text" id="documentTitle" v-model="form.title" required class="w-full p-3 border border-gray-300 rounded-md">
        </div>

        <div class="form-group mb-5">
          <label for="documentType" class="block mb-2 text-gray-800">Type de document</label>
          <select id="documentType" v-model="form.type" required class="w-full p-3 border border-gray-300 rounded-md">
            <option value="">Sélectionner un type</option>
            <option value="Contrat">Contrat</option>
            <option value="Procédure">Procédure</option>
            <option value="Règlement">Règlement</option>
            <option value="Rapport">Rapport</option>
            <option value="Annonce">Annonce</option>
            <option value="Autre">Autre</option>
          </select>
        </div>

        <div class="form-group mb-5">
          <label for="documentDescription" class="block mb-2 text-gray-800">Description</label>
          <textarea id="documentDescription" v-model="form.description" class="w-full p-3 border border-gray-300 rounded-md min-h-[100px] resize-y"></textarea>
        </div>

        <div class="form-group mb-5">
          <label class="block mb-2 text-gray-800">Fichier</label>
          <div @click="triggerFileInput" class="file-upload border-2 border-dashed border-gray-300 p-5 text-center rounded-md cursor-pointer hover:border-blue-600 transition-colors duration-300">
            <span class="material-icons text-gray-500 text-3xl">cloud_upload</span>
            <p class="text-gray-600">Glissez-déposez votre fichier ici ou cliquez pour sélectionner</p>
            <input type="file" id="documentFile" ref="fileInput" @change="handleFileChange" style="display: none;">
          </div>
          <p v-if="form.file" class="text-sm text-gray-700 mt-2">Fichier sélectionné: {{ form.file.name }}</p>
        </div>

        <div class="modal-footer flex justify-end mt-5">
          <button type="button" @click="closeModal" class="btn-secondary bg-gray-400 text-white px-4 py-2 rounded-md mr-3 hover:bg-gray-500 transition-colors duration-300">Annuler</button>
          <button type="submit" class="btn bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">Enregistrer</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Données statiques pour les documents (simule une API)
const documents = ref([
  {
    id: 1,
    type: 'Contrat',
    date: '15/07/2023',
    title: 'Contrat de travail CDI',
    description: 'Modèle standard de contrat à durée indéterminée pour les nouveaux employés.',
    author: 'Admin User'
  },
  {
    id: 2,
    type: 'Procédure',
    date: '10/07/2023',
    title: 'Procédure RH',
    description: 'Processus complet pour la gestion des demandes de congés et absences.',
    author: 'Marie Martin'
  },
  {
    id: 3,
    type: 'Règlement',
    date: '05/07/2023',
    title: 'Règlement intérieur',
    description: 'Règlement intérieur de l\'entreprise mis à jour pour 2023.',
    author: 'Admin User'
  },
  {
    id: 4,
    type: 'Rapport',
    date: '30/06/2023',
    title: 'Rapport trimestriel Q2',
    description: 'Analyse des performances et résultats du deuxième trimestre 2023.',
    author: 'Jean Dupont'
  },
  {
    id: 5,
    type: 'Annonce',
    date: '25/06/2023',
    title: 'Annonce événement d\'entreprise',
    description: 'Détails sur le prochain événement d\'équipe prévu pour le mois d\'août.',
    author: 'Admin User'
  }
]);

// Gestion du modal
const isModalOpen = ref(false);
const fileInput = ref(null); // Référence pour l'input de type fichier

const form = ref({
  title: '',
  type: '',
  description: '',
  file: null
});

const openModal = () => {
  isModalOpen.value = true;
  // Réinitialiser le formulaire à l'ouverture
  form.value = {
    title: '',
    type: '',
    description: '',
    file: null
  };
};

const closeModal = () => {
  isModalOpen.value = false;
};

const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  form.value.file = event.target.files[0];
};

const submitDocumentForm = () => {
  // Ici, vous ajouteriez la logique pour envoyer les données du formulaire à votre API
  console.log('Formulaire soumis:', form.value);
  alert('Document ajouté avec succès (simulé)!');
  closeModal();
};

// Actions sur les documents (simulées)
const downloadDocument = (id) => {
  alert(`Télécharger le document avec l'ID: ${id}`);
  // Logique réelle pour le téléchargement
};

const editDocument = (id) => {
  alert(`Modifier le document avec l'ID: ${id}`);
  // Logique réelle pour la modification (ouvrir le modal avec les données pré-remplies)
};

const deleteDocument = (id) => {
  if (confirm(`Êtes-vous sûr de vouloir supprimer le document avec l'ID: ${id} ?`)) {
    documents.value = documents.value.filter(doc => doc.id !== id);
    alert('Document supprimé (simulé)!');
  }
};

const navigateToSettings = () => {
  router.push({ name: 'admin-settings' });
};
</script>

<style scoped>
/* Styles spécifiques non couverts par Tailwind ou pour des ajustements précis */
.sidebar {
  /* Tailwind: bg-gray-900 text-white p-5 */
  /* Custom: */
}

.logo h1 {
  /* Tailwind: text-xl font-medium */
  /* Custom: */
}

.user-info h2 {
  /* Tailwind: text-lg mb-1 */
  /* Custom: */
}

.user-info p {
  /* Tailwind: text-sm text-gray-400 */
  /* Custom: */
}

.admin-menu li.active {
  /* Tailwind: bg-blue-600 hover:bg-blue-700 */
  /* Custom: */
}

.content {
  /* Tailwind: flex-1 p-5 overflow-y-auto bg-gray-50 */
  /* Custom: */
}

.documents-header h2 {
  /* Tailwind: text-2xl font-normal text-gray-700 */
  /* Custom: */
}

.btn {
  /* Tailwind: bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700 */
  /* Custom: */
}

.documents-grid {
  /* Tailwind: grid gap-5 mb-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */
  /* Custom: */
}

.document-card {
  /* Tailwind: bg-white rounded-lg p-5 shadow-md hover:shadow-lg transform hover:-translate-y-1 */
  /* Custom: */
}

.document-type {
  /* Tailwind: text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 */
  /* Custom: */
}

.document-date {
  /* Tailwind: text-xs text-gray-500 */
  /* Custom: */
}

.document-title {
  /* Tailwind: text-lg mb-2 text-gray-800 */
  /* Custom: */
}

.document-description {
  /* Tailwind: text-sm text-gray-600 mb-4 leading-relaxed */
  /* Custom: */
}

.document-author {
  /* Tailwind: text-xs text-gray-500 */
  /* Custom: */
}

.document-actions button {
  /* Tailwind: text-gray-500 ml-2 hover:text-blue-600 */
  /* Custom: */
}

.modal {
  /* Tailwind: fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 */
  /* Custom: */
}

.modal-content {
  /* Tailwind: bg-white p-8 rounded-lg w-full max-w-lg */
  /* Custom: */
}

.modal-header h3 {
  /* Tailwind: text-xl text-gray-800 */
  /* Custom: */
}

.close-modal {
  /* Tailwind: text-gray-500 text-2xl cursor-pointer hover:text-gray-700 */
  /* Custom: */
}

.form-group label {
  /* Tailwind: block mb-2 text-gray-800 */
  /* Custom: */
}

.form-group input,
.form-group select,
.form-group textarea {
  /* Tailwind: w-full p-3 border border-gray-300 rounded-md */
  /* Custom: */
}

.form-group textarea {
  /* Tailwind: min-h-[100px] resize-y */
  /* Custom: */
}

.file-upload {
  /* Tailwind: border-2 border-dashed border-gray-300 p-5 text-center rounded-md cursor-pointer hover:border-blue-600 */
  /* Custom: */
}

.modal-footer {
  /* Tailwind: flex justify-end mt-5 */
  /* Custom: */
}

.btn-secondary {
  /* Tailwind: bg-gray-400 text-white px-4 py-2 rounded-md mr-3 hover:bg-gray-500 */
  /* Custom: */
}
</style>
