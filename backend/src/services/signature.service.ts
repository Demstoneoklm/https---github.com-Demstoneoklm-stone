import axios from 'axios';

const API_URL = 'http://localhost:3001/api/signature'; // Adaptez selon votre configuration backend

export const signDocument = async (pdfBase64: string, signatureData: string) => {
    try {
        const response = await axios.post(`${API_URL}/sign`, {
            pdfBase64,
            signatureData
        });
        return response.data;
    } catch (error) {
        console.error('Error signing document:', error);
        throw error;
    }
};