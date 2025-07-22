import { Request, Response } from 'express';
import { PDFDocument, rgb } from 'pdf-lib';
import { ArchivingService } from '../services/archiving.service';
import { CryptoService } from '../services/crypto.service';
import { Buffer } from 'buffer';
import { ArchiveParams } from '../types/archive-params'; // ✅ Import cohérent

export class SignatureController {
    async addSignatureToPdf(req: Request, res: Response) {
        try {
            const { pdfBase64, signatureData } = req.body;

            const pdfDoc = await PDFDocument.load(pdfBase64);
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
            const pdfBuffer = Buffer.from(pdfBytes);

            const { encrypted, iv, tag } = CryptoService.encrypt(pdfBuffer);

            const archivingService = new ArchivingService();
            const archiveResult = await archivingService.archiveSignedDocument({
                encryptedData: encrypted,  // ✅ correspond à l'interface
                iv: iv,
                authTag: tag
            });

            res.status(200).json({
                ...archiveResult,
                signedPdf: pdfBuffer.toString('base64')
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Erreur lors de l\'ajout de la signature'
            });
        }
    }
}
