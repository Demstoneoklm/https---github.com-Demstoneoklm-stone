import api from './api';

export const leaveService = {
  getLeaveRequests: async () => {
    // Mock data for now
    return {
      data: [
        { id: 1, employee: 'Marie Martin', type: 'Congé payé', startDate: '2023-07-15', endDate: '2023-07-20', duration: 5, status: 'approved' },
        { id: 2, employee: 'Jean Dupont', type: 'Congé maladie', startDate: '2023-07-10', endDate: '2023-07-12', duration: 2, status: 'approved' },
        { id: 3, employee: 'Admin User', type: 'Congé payé', startDate: '2023-08-05', endDate: '2023-08-15', duration: 10, status: 'pending' },
        { id: 4, employee: 'Pierre Lambert', type: 'Congé sans solde', startDate: '2023-06-20', endDate: '2023-06-22', duration: 2, status: 'rejected' },
        { id: 5, employee: 'Sophie Leroy', type: 'Congé payé', startDate: '2023-09-01', endDate: '2023-09-10', duration: 9, status: 'pending' },
        { id: 6, employee: 'Thomas Moreau', type: 'Congé maladie', startDate: '2023-07-15', endDate: '2023-07-17', duration: 2, status: 'pending' },
      ]
    };
    // return api.get('/leave-requests'); // Uncomment when backend is ready
  },
  createLeaveRequest: async (requestData) => {
    console.log('Creating leave request:', requestData);
    // return api.post('/leave-requests', requestData); // Uncomment when backend is ready
    return { data: { id: Math.random(), ...requestData, status: 'pending' } }; // Mock response
  },
  approveLeaveRequest: async (id) => {
    console.log('Approving leave request:', id);
    // return api.put(`/leave-requests/${id}/approve`); // Uncomment when backend is ready
    return { data: { id, status: 'approved' } }; // Mock response
  },
  rejectLeaveRequest: async (id) => {
    console.log('Rejecting leave request:', id);
    // return api.put(`/leave-requests/${id}/reject`); // Uncomment when backend is ready
    return { data: { id, status: 'rejected' } }; // Mock response
  },
  deleteLeaveRequest: async (id) => {
    console.log('Deleting leave request:', id);
    // return api.delete(`/leave-requests/${id}`); // Uncomment when backend is ready
    return { data: { id } }; // Mock response
  },
};