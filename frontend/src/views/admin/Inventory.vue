<template>
  <main class="content">
    <div class="page-header">
      <h2>Gestion de l'Inventaire <span class="alert-badge" v-if="lowStockItems.length > 0">{{ lowStockItems.length }} alertes</span></h2>
      <button class="btn btn-primary" @click="openCreateModal">
        <span class="material-icons" style="font-size: 1rem; vertical-align: middle;">add</span>
        Ajouter un article
      </button>
    </div>

    <div class="inventory-stats">
      <div class="stat-card">
        <h3>Articles en stock</h3>
        <span class="stat-value">{{ totalItemsInStock }}</span>
        <span class="material-icons">inventory_2</span>
      </div>
      <div class="stat-card">
        <h3>Catégories</h3>
        <span class="stat-value">{{ uniqueCategories.length }}</span>
        <span class="material-icons">category</span>
      </div>
      <div class="stat-card warning">
        <h3>Articles en rupture</h3>
        <span class="stat-value">{{ outOfStockItems.length }}</span>
        <span class="material-icons">warning</span>
      </div>
      <div class="stat-card success">
        <h3>Stock total</h3>
        <span class="stat-value">{{ totalQuantityInStock }}</span>
        <span class="material-icons">warehouse</span>
      </div>
    </div>

    <div class="inventory-actions">
      <div class="search-bar">
        <span class="material-icons">search</span>
        <input type="text" placeholder="Rechercher un article..." v-model="searchQuery" @input="handleSearch">
      </div>
      <div>
        <select class="btn" style="padding: 9px 15px;" v-model="selectedCategory" @change="handleCategoryFilter">
          <option value="">Toutes les catégories</option>
          <option v-for="category in uniqueCategories" :key="category" :value="category">{{ category }}</option>
        </select>
        <select class="btn" style="padding: 9px 15px; margin-left: 10px;" v-model="selectedStockStatus" @change="handleStockStatusFilter">
          <option value="">Tous les statuts</option>
          <option value="high">Stock élevé</option>
          <option value="medium">Stock moyen</option>
          <option value="low">Stock faible</option>
          <option value="out">En rupture</option>
        </select>
      </div>
    </div>

    <table class="inventory-table">
      <thead>
        <tr>
          <th>Article</th>
          <th>Catégorie</th>
          <th>Référence</th>
          <th>Stock</th>
          <th>Seuil d'alerte</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="paginatedItems.length === 0">
          <td colspan="6" style="text-align: center; padding: 20px;">Aucun article trouvé.</td>
        </tr>
        <tr v-for="item in paginatedItems" :key="item.id">
          <td>
            <div class="item-info-cell">
              <div class="item-image">
                <span class="material-icons">{{ getItemIcon(item.category) }}</span>
              </div>
              <div>
                <div class="item-name">{{ item.name }}</div>
                <div class="item-category">{{ item.category }}</div>
              </div>
            </div>
          </td>
          <td>{{ item.category }}</td>
          <td>{{ item.reference }}</td>
          <td>
            <div>{{ item.quantity }} / {{ item.maxQuantity || 'N/A' }}</div>
            <div class="stock-progress">
              <div :class="['progress-bar', getStockLevelClass(item.quantity, item.alertThreshold)]" :style="{ width: getStockPercentage(item.quantity, item.maxQuantity) + '%' }"></div>
            </div>
            <span :class="['stock-level', getStockLevelClass(item.quantity, item.alertThreshold)]">{{ getStockStatusText(item.quantity, item.alertThreshold) }}</span>
          </td>
          <td>{{ item.alertThreshold }}</td>
          <td class="action-btns">
            <span class="material-icons" title="Éditer" @click="openEditModal(item)">edit</span>
            <span class="material-icons" title="Supprimer" @click="deleteItem(item.id)">delete</span>
            <!-- <span class="material-icons" title="Voir détails">visibility</span> -->
            <!-- <span class="material-icons" title="Commander">add_shopping_cart</span> -->
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

  <!-- Modal pour ajouter/modifier un article -->
  <Modal :is-open="isModalOpen" @close="closeModal">
    <template #title>{{ isEditMode ? "Modifier l'article" : "Ajouter un article" }}</template>
    <template #content>
      <InventoryForm :initial-data="selectedItem" :edit-mode="isEditMode" @submit="handleItemSubmit" />
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
import { useInventoryStore } from '../../stores/inventory';
import Modal from '../../components/ui/Modal.vue';
import InventoryForm from '../../components/forms/InventoryForm.vue';

const inventoryStore = useInventoryStore();

const isModalOpen = ref(false);
const isEditMode = ref(false);
const selectedItem = ref(null);
const searchQuery = ref('');
const selectedCategory = ref('');
const selectedStockStatus = ref('');
const currentPage = ref(1);
const itemsPerPage = 5; // Nombre d'éléments par page

// Computed properties for statistics
const totalItemsInStock = computed(() => {
  return inventoryStore.items.filter(item => item.quantity > 0).length;
});

const uniqueCategories = computed(() => {
  const categories = new Set();
  inventoryStore.items.forEach(item => categories.add(item.category));
  return Array.from(categories);
});

const outOfStockItems = computed(() => {
  return inventoryStore.items.filter(item => item.quantity === 0);
});

const lowStockItems = computed(() => {
  return inventoryStore.items.filter(item => item.quantity > 0 && item.quantity <= item.alertThreshold);
});

const totalQuantityInStock = computed(() => {
  return inventoryStore.items.reduce((sum, item) => sum + item.quantity, 0);
});

// Computed properties for filtering and pagination
const filteredItems = computed(() => {
  let filtered = inventoryStore.items;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.reference.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );
  }

  if (selectedCategory.value) {
    filtered = filtered.filter(item => item.category === selectedCategory.value);
  }

  if (selectedStockStatus.value) {
    filtered = filtered.filter(item => {
      const status = getStockStatusText(item.quantity, item.alertThreshold);
      switch (selectedStockStatus.value) {
        case 'high': return status === 'Élevé';
        case 'medium': return status === 'Moyen';
        case 'low': return status === 'Faible';
        case 'out': return status === 'Rupture';
        default: return true;
      }
    });
  }

  return filtered;
});

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredItems.value.length / itemsPerPage);
});

// Helper functions for stock status
const getStockPercentage = (quantity, maxQuantity) => {
  if (!maxQuantity || maxQuantity === 0) return 0;
  return (quantity / maxQuantity) * 100;
};

const getStockLevelClass = (quantity, alertThreshold) => {
  if (quantity === 0) return 'stock-out';
  if (quantity <= alertThreshold) return 'low';
  // Assuming a maxQuantity is needed for medium/high, otherwise just use alertThreshold
  // For simplicity, let's define medium as > alertThreshold and < 2*alertThreshold, high otherwise
  if (quantity > alertThreshold && quantity < alertThreshold * 2) return 'medium';
  return 'high';
};

const getStockStatusText = (quantity, alertThreshold) => {
  if (quantity === 0) return 'Rupture';
  if (quantity <= alertThreshold) return 'Faible';
  if (quantity > alertThreshold && quantity < alertThreshold * 2) return 'Moyen';
  return 'Élevé';
};

const getItemIcon = (category) => {
  switch (category) {
    case 'Fournitures de bureau': return 'description';
    case 'Matériel informatique': return 'computer';
    case 'Mobilier': return 'chair';
    case 'Entretien': return 'cleaning_services';
    default: return 'category';
  }
};

// Methods
const fetchInventoryItems = async () => {
  await inventoryStore.fetchInventoryItems();
};

const openCreateModal = () => {
  isEditMode.value = false;
  selectedItem.value = null;
  isModalOpen.value = true;
};

const openEditModal = (item) => {
  isEditMode.value = true;
  selectedItem.value = { ...item };
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedItem.value = null;
};

const handleItemSubmit = async (itemData) => {
  try {
    if (isEditMode.value) {
      await inventoryStore.updateInventoryItem(selectedItem.value.id, itemData);
    } else {
      await inventoryStore.createInventoryItem(itemData);
    }
    await fetchInventoryItems(); // Re-fetch items to update the list
    closeModal();
  } catch (error) {
    console.error('Erreur lors de la soumission de l\'article:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue.');
  }
};

const deleteItem = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
    try {
      await inventoryStore.deleteInventoryItem(id);
      await fetchInventoryItems(); // Re-fetch items to update the list
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'article:', error);
      alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
  }
};

const handleSearch = () => {
  currentPage.value = 1; // Reset page on search
};

const handleCategoryFilter = () => {
  currentPage.value = 1; // Reset page on filter
};

const handleStockStatusFilter = () => {
  currentPage.value = 1; // Reset page on filter
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

onMounted(fetchInventoryItems);
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

/* Styles spécifiques à la page Inventaire */
.inventory-actions {
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

.inventory-table {
    width: 100%;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
    border-collapse: collapse;
}

.inventory-table th,
.inventory-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.inventory-table th {
    background-color: #f8f9fa;
    color: #7f8c8d;
    font-weight: 500;
}

.inventory-table tr:hover {
    background-color: #f8f9fa;
}

.item-image {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    object-fit: cover;
    margin-right: 10px;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #7f8c8d;
}

.item-info-cell {
    display: flex;
    align-items: center;
}

.item-name {
    font-weight: 500;
    color: #2c3e50;
}

.item-category {
    font-size: 0.8rem;
    color: #7f8c8d;
}

.stock-level {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 500;
}

.stock-high {
    background-color: #e8f5e9;
    color: #388e3c;
}

.stock-medium {
    background-color: #fff8e1;
    color: #ffa000;
}

.stock-low {
    background-color: #ffebee;
    color: #d32f2f;
}

.stock-out {
    background-color: #f5f5f5;
    color: #616161;
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
    width: 600px;
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

.form-row {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
}

.form-group {
    flex: 1;
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    color: #7f8c8d;
    font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
}

.form-group textarea {
    min-height: 80px;
    resize: vertical;
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

/* Alertes stock faible */
.alert-badge {
    display: inline-block;
    padding: 3px 6px;
    background-color: #e74c3c;
    color: white;
    border-radius: 10px;
    font-size: 0.7rem;
    margin-left: 5px;
    vertical-align: middle;
}

/* Barre de progression du stock */
.stock-progress {
    height: 6px;
    background-color: #ecf0f1;
    border-radius: 3px;
    margin-top: 5px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    background-color: #27ae60;
}

.progress-bar.medium {
    background-color: #f39c12;
}

.progress-bar.low {
    background-color: #e74c3c;
}

/* Cartes de statistiques inventaire */
.inventory-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
    margin-bottom: 20px;
}

.stat-card {
    background-color: white;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
    font-size: 0.9rem;
    color: #7f8c8d;
    margin-bottom: 10px;
}

.stat-value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
}

.stat-card .material-icons {
    float: right;
    font-size: 2rem;
    color: #bdc3c7;
}

.stat-card.warning {
    border-left: 4px solid #e74c3c;
}

.stat-card.success {
    border-left: 4px solid #27ae60;
}
</style>