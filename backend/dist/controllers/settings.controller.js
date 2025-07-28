"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Placeholder pour les paramètres en mémoire (à remplacer par une base de données)
let appSettings = {
    general: {
        companyName: 'Ministère de l\'Administration',
        timezone: 'Europe/Paris',
        defaultLanguage: 'fr',
        dateFormat: 'dd/mm/yyyy',
        maintenanceMode: false,
        autoUpdates: false,
        backupEnabled: true,
    },
    security: {
        complexPasswords: true,
        passwordExpiration: false,
        twoFactorAuth: true,
        sessionTimeout: 30,
        loginAttempts: 5,
    },
    notifications: {
        notifSystem: true,
        notifOrders: true,
        notifLeaves: false,
        notifDocuments: true,
        notifEmail: 'admin@ministere.gouv.fr',
        reportFrequency: 'weekly',
    },
    appearance: {
        theme: 'light',
        primaryColor: '#3498db',
        compactMode: false,
        showAvatars: true,
        animations: true,
    },
};
const getSettings = (req, res) => {
    try {
        return res.status(200).json(appSettings);
    }
    catch (error) {
        console.error('Erreur lors de la récupération des paramètres:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};
const updateSettings = (req, res) => {
    try {
        const updatedSettings = req.body;
        // Ici, vous devriez valider updatedSettings avec Zod ou un autre validateur
        // Pour l'exemple, nous fusionnons simplement
        appSettings = { ...appSettings, ...updatedSettings };
        return res.status(200).json(appSettings);
    }
    catch (error) {
        console.error('Erreur lors de la mise à jour des paramètres:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};
const purgeData = (req, res) => {
    try {
        // Implémentez ici la logique de purge des données
        // Par exemple, supprimer les logs anciens, les données temporaires, etc.
        console.log('Purge des données obsolètes effectuée.');
        return res.status(200).json({ message: 'Purge des données obsolètes effectuée avec succès.' });
    }
    catch (error) {
        console.error('Erreur lors de la purge des données:', error);
        return res.status(500).json({ message: 'Erreur interne du serveur.' });
    }
};
exports.default = {
    getSettings,
    updateSettings,
    purgeData,
};
