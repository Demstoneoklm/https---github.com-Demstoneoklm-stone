
import api from './api';

export const documentService = {
  getDocuments: async () => {
    return api.get('/documents');
  },
  createDocument: async (formData) => {
    return api.post('/documents', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateDocument: async (id, documentData) => {
    return api.put(`/documents/${id}`, documentData);
  },
  deleteDocument: async (id) => {
    return api.delete(`/documents/${id}`);
  },
  downloadDocument: async (id) => {
    return api.get(`/documents/${id}/download`, {
      responseType: 'blob', // Important pour télécharger des fichiers
    });
  },
};
