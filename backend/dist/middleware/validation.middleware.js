"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateRequest = void 0;
const zod_1 = require("zod");
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            // Valider le body de la requête
            req.body = schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                // Formatter les erreurs Zod de manière lisible
                const errors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code
                }));
                return res.status(400).json({
                    error: 'Données de validation invalides',
                    details: errors
                });
            }
            // Erreur inattendue
            console.error('Erreur de validation inattendue:', error);
            return res.status(500).json({
                error: 'Erreur interne du serveur'
            });
        }
    };
};
exports.validateRequest = validateRequest;
const validateQuery = (schema) => {
    return (req, res, next) => {
        try {
            req.query = schema.parse(req.query);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code
                }));
                return res.status(400).json({
                    error: 'Paramètres de requête invalides',
                    details: errors
                });
            }
            console.error('Erreur de validation des paramètres:', error);
            return res.status(500).json({
                error: 'Erreur interne du serveur'
            });
        }
    };
};
exports.validateQuery = validateQuery;
const validateParams = (schema) => {
    return (req, res, next) => {
        try {
            req.params = schema.parse(req.params);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                const errors = error.errors.map(err => ({
                    field: err.path.join('.'),
                    message: err.message,
                    code: err.code
                }));
                return res.status(400).json({
                    error: 'Paramètres d\'URL invalides',
                    details: errors
                });
            }
            console.error('Erreur de validation des paramètres URL:', error);
            return res.status(500).json({
                error: 'Erreur interne du serveur'
            });
        }
    };
};
exports.validateParams = validateParams;
