"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => async (req, res, next) => {
    try {
        console.log('Validation: Données reçues pour le schéma:', req.body);
        // Valider directement req.body car nos schémas (loginSchema, registerSchema) sont pour le corps de la requête
        await schema.parseAsync(req.body);
        console.log('Validation: Schéma validé avec succès.');
        next();
    }
    catch (error) {
        console.error('Validation: Erreur de validation:', error.errors);
        return res.status(400).json(error.errors);
    }
};
exports.validateRequest = validateRequest;
