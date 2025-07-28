import { defineStore } from 'pinia';
import { documentService } from '../services/documents.service';

export const useDocumentsStore = defineStore('documents', {
  state: () => ({
    documents: [],
    loading: false,
    error: null,
  }),
  actions: {
    async fetchDocuments() {
      this.loading = true;
      try {
        const response = await documentService.getDocuments();
        this.documents = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async createDocument(documentData) {
      this.loading = true;
      try {
        const response = await documentService.createDocument(documentData);
        this.documents.push(response.data);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async updateDocument(id, documentData) {
      this.loading = true;
      try {
        const response = await documentService.updateDocument(id, documentData);
        const index = this.documents.findIndex(doc => doc.id === id);
        if (index !== -1) {
          this.documents[index] = response.data;
        }
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    async deleteDocument(id) {
      this.loading = true;
      try {
        await documentService.deleteDocument(id);
        this.documents = this.documents.filter(doc => doc.id !== id);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
  },
});