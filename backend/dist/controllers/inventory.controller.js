"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryItem_model_1 = require("../models/InventoryItem.model");
const inventoryController = {
    getInventoryItems: async (req, res) => {
        try {
            const items = await InventoryItem_model_1.InventoryItem.findAll();
            res.status(200).json(items);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération de l\'inventaire.', error });
        }
    },
    createInventoryItem: async (req, res) => {
        const { name, reference, category, description, quantity, alertThreshold, supplier, location } = req.body;
        try {
            const newItem = await InventoryItem_model_1.InventoryItem.create({
                name,
                reference,
                category,
                description,
                quantity,
                alertThreshold,
                supplier,
                location
            });
            res.status(201).json(newItem);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la création de l\'élément d\'inventaire.', error });
        }
    },
    updateInventoryItem: async (req, res) => {
        const { id } = req.params;
        const { name, reference, category, description, quantity, alertThreshold, supplier, location } = req.body;
        try {
            const item = await InventoryItem_model_1.InventoryItem.findByPk(id);
            if (!item) {
                return res.status(404).json({ message: 'Élément d\'inventaire non trouvé.' });
            }
            item.name = name || item.name;
            item.reference = reference || item.reference;
            item.category = category || item.category;
            item.description = description === undefined ? item.description : description;
            item.quantity = quantity === undefined ? item.quantity : quantity;
            item.alertThreshold = alertThreshold === undefined ? item.alertThreshold : alertThreshold;
            item.supplier = supplier === undefined ? item.supplier : supplier;
            item.location = location === undefined ? item.location : location;
            await item.save();
            res.status(200).json(item);
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la mise à jour de l\'élément d\'inventaire.', error });
        }
    },
    deleteInventoryItem: async (req, res) => {
        const { id } = req.params;
        try {
            const item = await InventoryItem_model_1.InventoryItem.findByPk(id);
            if (!item) {
                return res.status(404).json({ message: 'Élément d\'inventaire non trouvé.' });
            }
            await item.destroy();
            res.status(200).json({ message: 'Élément d\'inventaire supprimé avec succès.' });
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la suppression de l\'élément d\'inventaire.', error });
        }
    },
    getInventoryStats: async (req, res) => {
        try {
            const totalItems = await InventoryItem_model_1.InventoryItem.sum('quantity');
            const lowStockItems = await InventoryItem_model_1.InventoryItem.count({ where: { quantity: { $lt: 10 } } }); // Exemple de seuil bas
            res.status(200).json({
                totalItems: totalItems || 0,
                lowStockItems
            });
        }
        catch (error) {
            res.status(500).json({ message: 'Erreur du serveur lors de la récupération des statistiques de l\'inventaire.', error });
        }
    }
};
exports.default = inventoryController;
