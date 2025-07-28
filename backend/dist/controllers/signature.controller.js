"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureController = void 0;
const pdf_lib_1 = require("pdf-lib");
const archiving_service_1 = require("../services/archiving.service");
const crypto_service_1 = require("../services/crypto.service");
const buffer_1 = require("buffer");
class SignatureController {
    async addSignatureToPdf(req, res) {
        try {
            const { pdfBase64, signatureData } = req.body;
            const pdfDoc = await pdf_lib_1.PDFDocument.load(pdfBase64);
            const pngImage = await pdfDoc.embedPng(signatureData);
            const pages = pdfDoc.getPages();
            const firstPage = pages[0];
            firstPage.drawImage(pngImage, {
                x: 50,
                y: 50,
                width: 150,
                height: 50,
            });
            const pdfBytes = await pdfDoc.save();
            const pdfBuffer = buffer_1.Buffer.from(pdfBytes);
            const { encrypted, iv, tag } = crypto_service_1.CryptoService.encrypt(pdfBuffer);
            const archivingService = new archiving_service_1.ArchivingService();
            const archiveResult = await archivingService.archiveSignedDocument({
                encryptedData: encrypted, // ✅ correspond à l'interface
                iv: iv,
                authTag: tag
            });
            res.status(200).json({
                ...archiveResult,
                signedPdf: pdfBuffer.toString('base64')
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de l\'ajout de la signature'
            });
        }
    }
}
exports.SignatureController = SignatureController;
