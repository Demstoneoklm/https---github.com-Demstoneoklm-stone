<template>
  <main class="content">
    <div class="dashboard-header">
      <h2>Gestion des demandes de congés</h2>
    </div>

    <div class="leave-summary">
      <div class="summary-card">
        <h4>Jours restants</h4>
        <div class="value remaining">{{ remainingLeaveDays }}</div>
      </div>
      <div class="summary-card">
        <h4>Congés pris</h4>
        <div class="value">{{ takenLeaveDays }}</div>
      </div>
      <div class="summary-card">
        <h4>En attente</h4>
        <div class="value">{{ pendingRequests.length }}</div>
      </div>
      <div class="summary-card">
        <h4>Refusés</h4>
        <div class="value">{{ rejectedRequests.length }}</div>
      </div>
    </div>

    <div class="leave-section">
      <div class="leave-actions">
        <button class="btn btn-primary" @click="toggleLeaveForm">
          <span class="material-icons">add</span> Nouvelle demande
        </button>
        <div>
          <button class="btn btn-success">
            <span class="material-icons">file_download</span> Exporter
          </button>
        </div>
      </div>

      <div class="leave-form" v-show="showLeaveForm">
        <h3>Nouvelle demande de congé</h3>
        <form @submit.prevent="submitLeaveRequest">
          <div class="form-row">
            <div class="form-group">
              <label for="leaveType">Type de congé</label>
              <select id="leaveType" class="form-control" v-model="newRequest.type">
                <option value="paid">Congé payé</option>
                <option value="sick">Congé maladie</option>
                <option value="unpaid">Congé sans solde</option>
                <option value="other">Autre</option>
              </select>
            </div>
            <div class="form-group">
              <label for="employee">Employé</label>
              <select id="employee" class="form-control" v-model="newRequest.employeeId">
                <option v-for="user in users" :key="user.id" :value="user.id">{{ user.firstName }} {{ user.lastName }}</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="startDate">Date de début</label>
              <input type="date" id="startDate" class="form-control" v-model="newRequest.startDate">
            </div>
            <div class="form-group">
              <label for="endDate">Date de fin</label>
              <input type="date" id="endDate" class="form-control" v-model="newRequest.endDate">
            </div>
          </div>

          <div class="form-group">
            <label for="reason">Motif</label>
            <textarea id="reason" class="form-control" rows="3" v-model="newRequest.reason"></textarea>
          </div>

          <div class="form-group">
            <button type="submit" class="btn btn-primary">Soumettre</button>
            <button type="button" class="btn" @click="toggleLeaveForm()"
              style="margin-left: 10px;">Annuler</button>
          </div>
        </form>
      </div>

      <h3>Historique des congés</h3>
      <table class="leave-table">
        <thead>
          <tr>
            <th>Employé</th>
            <th>Type</th>
            <th>Période</th>
            <th>Durée</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="leaveStore.requests.length === 0">
            <td colspan="6" style="text-align: center; padding: 20px;">Aucune demande de congé.</td>
          </tr>
          <tr v-for="request in leaveStore.requests" :key="request.id">
            <td>{{ getEmployeeName(request.employeeId) }}</td>
            <td>{{ request.type }}</td>
            <td>{{ formatDate(request.startDate) }} - {{ formatDate(request.endDate) }}</td>
            <td>{{ request.duration }} jours</td>
            <td :class="getStatusClass(request.status)">{{ request.status }}</td>
            <td>
              <button class="btn" style="padding: 5px 10px;">
                <span class="material-icons" style="font-size: 1.2rem;">visibility</span>
              </button>
              <button v-if="request.status === 'pending'" class="btn btn-success" style="padding: 5px 10px; margin-left: 5px;" @click="approveRequest(request.id)">
                <span class="material-icons" style="font-size: 1.2rem;">check</span>
              </button>
              <button v-if="request.status === 'pending'" class="btn btn-danger" style="padding: 5px 10px; margin-left: 5px;" @click="rejectRequest(request.id)">
                <span class="material-icons" style="font-size: 1.2rem;">close</span>
              </button>
              <button class="btn btn-danger" style="padding: 5px 10px; margin-left: 5px;" @click="deleteRequest(request.id)">
                <span class="material-icons" style="font-size: 1.2rem;">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="leave-section">
      <h3>Demandes en attente de validation</h3>
      <table class="leave-table">
        <thead>
          <tr>
            <th>Employé</th>
            <th>Type</th>
            <th>Période</th>
            <th>Durée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="pendingRequests.length === 0">
            <td colspan="5" style="text-align: center; padding: 20px;">Aucune demande en attente.</td>
          </tr>
          <tr v-for="request in pendingRequests" :key="request.id">
            <td>{{ getEmployeeName(request.employeeId) }}</td>
            <td>{{ request.type }}</td>
            <td>{{ formatDate(request.startDate) }} - {{ formatDate(request.endDate) }}</td>
            <td>{{ request.duration }} jours</td>
            <td>
              <button class="btn btn-success" style="padding: 5px 10px;" @click="approveRequest(request.id)">
                <span class="material-icons" style="font-size: 1.2rem;">check</span>
              </button>
              <button class="btn btn-danger" style="padding: 5px 10px; margin-left: 5px;" @click="rejectRequest(request.id)">
                <span class="material-icons" style="font-size: 1.2rem;">close</span>
              </button>
              <button class="btn" style="padding: 5px 10px; margin-left: 5px;">
                <span class="material-icons" style="font-size: 1.2rem;">visibility</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useLeaveStore } from '../../stores/leave';
import { useUsersStore } from '../../stores/users'; // Pour récupérer la liste des employés

const leaveStore = useLeaveStore();
const usersStore = useUsersStore();

const showLeaveForm = ref(false);
const newRequest = ref({
  employeeId: null,
  type: 'paid',
  startDate: '',
  endDate: '',
  reason: '',
});

// Computed properties for summary cards
const remainingLeaveDays = computed(() => 25); // Placeholder
const takenLeaveDays = computed(() => 5);     // Placeholder

const pendingRequests = computed(() => {
  return leaveStore.requests.filter(req => req.status === 'pending');
});

const approvedRequests = computed(() => {
  return leaveStore.requests.filter(req => req.status === 'approved');
});

const rejectedRequests = computed(() => {
  return leaveStore.requests.filter(req => req.status === 'rejected');
});

const getEmployeeName = (employeeId) => {
  const user = usersStore.users.find(u => u.id === employeeId);
  return user ? `${user.firstName} ${user.lastName}` : 'Inconnu';
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusClass = (status) => {
  switch (status) {
    case 'pending': return 'status-pending';
    case 'approved': return 'status-approved';
    case 'rejected': return 'status-rejected';
    default: return '';
  }
};

// Methods
const toggleLeaveForm = () => {
  showLeaveForm.value = !showLeaveForm.value;
  if (!showLeaveForm.value) {
    // Reset form when closing
    newRequest.value = {
      employeeId: null,
      type: 'paid',
      startDate: '',
      endDate: '',
      reason: '',
    };
  }
};

const submitLeaveRequest = async () => {
  // Calculate duration
  const start = new Date(newRequest.value.startDate);
  const end = new Date(newRequest.value.endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const requestData = {
    ...newRequest.value,
    duration: diffDays,
  };

  try {
    await leaveStore.createLeaveRequest(requestData);
    alert('Demande de congé soumise avec succès !');
    toggleLeaveForm(); // Hide form after submission
    await leaveStore.fetchLeaveRequests(); // Refresh list
  } catch (error) {
    console.error('Erreur lors de la soumission de la demande de congé:', error);
    alert(error.response?.data?.message || 'Une erreur est survenue.');
  }
};

const approveRequest = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir approuver cette demande ?')) {
    try {
      await leaveStore.approveLeaveRequest(id);
      alert('Demande approuvée !');
    } catch (error) {
      console.error('Erreur lors de l\'approbation de la demande:', error);
      alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
  }
};

const rejectRequest = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir rejeter cette demande ?')) {
    try {
      await leaveStore.rejectLeaveRequest(id);
      alert('Demande rejetée !');
    } catch (error) {
      console.error('Erreur lors du rejet de la demande:', error);
      alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
  }
};

const deleteRequest = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
    try {
      await leaveStore.deleteLeaveRequest(id);
      alert('Demande supprimée !');
    } catch (error) {
      console.error('Erreur lors de la suppression de la demande:', error);
      alert(error.response?.data?.message || 'Une erreur est survenue.');
    }
  }
};

onMounted(async () => {
  await leaveStore.fetchLeaveRequests();
  await usersStore.fetchUsers(); // Fetch users for the employee dropdown
});
</script>

<style scoped>
/* Styles existants conservés */
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

/* Nouveaux styles spécifiques aux congés */
.leave-section {
    margin-bottom: 30px;
}

.leave-section h3 {
    margin-bottom: 15px;
    font-weight: 500;
}

.leave-actions {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}

.btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 500;
    display: flex;
    align-items: center;
    transition: background-color 0.3s;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
}

.btn-success {
    background-color: #27ae60;
    color: white;
}

.btn-success:hover {
    background-color: #219955;
}

.btn-danger {
    background-color: #e74c3c;
    color: white;
}

.btn-danger:hover {
    background-color: #c0392b;
}

.btn span {
    margin-right: 5px;
}

.leave-table {
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.leave-table th,
.leave-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
}

.leave-table th {
    background-color: #f8f9fa;
    color: #555;
    font-weight: 500;
}

.leave-table tr:hover {
    background-color: #f5f5f5;
}

.status-pending {
    color: #f39c12;
    font-weight: 500;
}

.status-approved {
    color: #27ae60;
    font-weight: 500;
}

.status-rejected {
    color: #e74c3c;
    font-weight: 500;
}

.leave-form {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
}

.form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
}

.form-row {
    display: flex;
    gap: 20px;
}

.form-row .form-group {
    flex: 1;
}

.leave-summary {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 30px;
}

.summary-card {
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    text-align: center;
}

.summary-card h4 {
    color: #7f8c8d;
    margin-bottom: 10px;
    font-size: 1rem;
}

.summary-card .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: #2c3e50;
}

.summary-card .value.remaining {
    color: #27ae60;
}
</style>
