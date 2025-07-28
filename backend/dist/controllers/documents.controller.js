"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Document_model_1 = __importDefault(require("../models/Document.model"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const documentsController = {
    getDocuments: async (req, res) => {
        try {
            const documents = await Document_model_1.default.findAll({
                include: ['author']
            });
            res.status(200).json(documents);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération des documents.', error });
        }
    },
    createDocument: async (req, res) => {
        const { title, description, type, isPublic } = req.body;
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'Aucun fichier n\'a été téléversé.' });
        }
        try {
            const newDocument = await Document_model_1.default.create({
                title,
                description,
                type,
                filename: file.originalname,
                filepath: file.path,
                filesize: file.size,
                mimetype: file.mimetype,
                authorId: req.user.id,
                isPublic: isPublic !== undefined ? isPublic : true
            });
            res.status(201).json(newDocument);
        }
        catch (error) {
            // En cas d'erreur, supprimer le fichier téléversé
            if (fs_1.default.existsSync(file.path)) {
                fs_1.default.unlinkSync(file.path);
            }
            res.status(500).json({ message: 'Erreur du serveur lors de la création du document.', error });
        }
    },
    updateDocument: async (req, res) => {
        const { id } = req.params;
        const { title, description, type, isPublic } = req.body;
        try {
            const document = await Document_model_1.default.findByPk(id);
            if (!document) {
                return res.status(404).json({ message: 'Document non trouvé.' });
            }
            // Vérifier les permissions (seul l'auteur ou un admin peut modifier)
            if (document.authorId !== req.user.id && req.user.role !== 'admin') {
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
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la mise à jour du document.', error });
        }
    },
    deleteDocument: async (req, res) => {
        const { id } = req.params;
        try {
            const document = await Document_model_1.default.findByPk(id);
            if (!document) {
                return res.status(404).json({ message: 'Document non trouvé.' });
            }
            // Vérifier les permissions (seul l'auteur ou un admin peut supprimer)
            if (document.authorId !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à supprimer ce document.' });
            }
            // Supprimer le fichier physique
            if (fs_1.default.existsSync(document.filepath)) {
                fs_1.default.unlinkSync(document.filepath);
            }
            await document.destroy();
            res.status(200).json({ message: 'Document supprimé avec succès.' });
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la suppression du document.', error });
        }
    },
    downloadDocument: async (req, res) => {
        const { id } = req.params;
        try {
            const document = await Document_model_1.default.findByPk(id);
            if (!document) {
                return res.status(404).json({ message: 'Document non trouvé.' });
            }
            // Vérifier si le document est public ou si l'utilisateur a les droits
            if (!document.isPublic && document.authorId !== req.user.id && req.user.role !== 'admin') {
                return res.status(403).json({ message: 'Accès refusé à ce document.' });
            }
            const filePath = path_1.default.resolve(document.filepath);
            if (fs_1.default.existsSync(filePath)) {
                res.download(filePath, document.filename);
            }
            else {
                res.status(404).json({ message: 'Fichier non trouvé sur le serveur.' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors du téléchargement du document.', error });
        }
    }
};
exports.default = documentsController;
