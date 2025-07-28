

import { Request, Response } from 'express';
import Document from '../models/Document.model';
import fs from 'fs';
import path from 'path';

const documentsController = {
    getDocuments: async (req: Request, res: Response) => {
        try {
            const documents = await Document.findAll({
                include: ['author']
            });
            res.status(200).json(documents);
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération des documents.', error });
        }
    },

    createDocument: async (req: Request, res: Response) => {
        const { title, description, type, isPublic } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ message: 'Aucun fichier n\'a été téléversé.' });
        }

        try {
            const newDocument = await Document.create({
                title,
                description,
                type,
                filename: file.originalname,
                filepath: file.path,
                filesize: file.size,
                mimetype: file.mimetype,
                authorId: req.user!.id,
                isPublic: isPublic !== undefined ? isPublic : true
            });

            res.status(201).json(newDocument);
        } catch (error) {
            // En cas d'erreur, supprimer le fichier téléversé
            if (fs.existsSync(file.path)) {
                fs.unlinkSync(file.path);
            }
            res.status(500).json({ message: 'Erreur du serveur lors de la création du document.', error });
        }
    },

    updateDocument: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, type, isPublic } = req.body;

        try {
            const document = await Document.findByPk(id);
            if (!document) {
                return res.status(404).json({ message: 'Document non trouvé.' });
            }

            // Vérifier les permissions (seul l'auteur ou un admin peut modifier)
            if (document.authorId !== req.user!.id && req.user!.role !== 'admin') {
                return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à modifier ce document.' });
            }

            document.title = title || document.title;
            document.description = description === undefined ? document.description : description;
            document.type = type || document.type;
            if (isPublic !== undefined) {
                document.isPublic = isPublic;
            }

            await document.save();
            res.status(200).json(document);
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la mise à jour du document.', error });
        }
    },

    deleteDocument: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const document = await Document.findByPk(id);
            if (!document) {
                return res.status(404).json({ message: 'Document non trouvé.' });
            }

            // Vérifier les permissions (seul l'auteur ou un admin peut supprimer)
            if (document.authorId !== req.user!.id && req.user!.role !== 'admin') {
                return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce document.' });
            }

            // Supprimer le fichier physique
            if (fs.existsSync(document.filepath)) {
                fs.unlinkSync(document.filepath);
            }

            await document.destroy();
            res.status(200).json({ message: 'Document supprimé avec succès.' });
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la suppression du document.', error });
        }
    },

    downloadDocument: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const document = await Document.findByPk(id);
            if (!document) {
                return res.status(404).json({ message: 'Document non trouvé.' });
            }

            // Vérifier si le document est public ou si l'utilisateur a les droits
            if (!document.isPublic && document.authorId !== req.user!.id && req.user!.role !== 'admin') {
                return res.status(403).json({ message: 'Accès refusé à ce document.' });
            }

            const filePath = path.resolve(document.filepath);
            if (fs.existsSync(filePath)) {
                res.download(filePath, document.filename);
            } else {
                res.status(404).json({ message: 'Fichier non trouvé sur le serveur.' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors du téléchargement du document.', error });
        }
    }
};

export default documentsController;
