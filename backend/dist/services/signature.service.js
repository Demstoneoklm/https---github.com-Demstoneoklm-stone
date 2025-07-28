"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signDocument = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = 'http://localhost:3001/api/signature'; // Adaptez selon votre configuration backend
const signDocument = async (pdfBase64, signatureData) => {
    try {
        const response = await axios_1.default.post(`${API_URL}/sign`, {
            pdfBase64,
            signatureData
        });
        return response.data;
    }
    catch (error) {
        console.error('Error signing document:', error);
        throw error;
    }
};
exports.signDocument = signDocument;
