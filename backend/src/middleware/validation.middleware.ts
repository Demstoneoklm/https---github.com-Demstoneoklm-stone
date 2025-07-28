import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateRequest = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // Valider le body de la requête
            req.body = schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
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

export const validateQuery = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.query = schema.parse(req.query);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
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

export const validateParams = (schema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.params = schema.parse(req.params);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
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