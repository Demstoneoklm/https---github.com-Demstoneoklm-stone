
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

export const validateRequest = (schema: AnyZodObject) => 
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Validation: Données reçues pour le schéma:', req.body);
            // Valider directement req.body car nos schémas (loginSchema, registerSchema) sont pour le corps de la requête
            await schema.parseAsync(req.body);
            console.log('Validation: Schéma validé avec succès.');
            next();
        } catch (error: any) {
            console.error('Validation: Erreur de validation:', error.errors);
            return res.status(400).json(error.errors);
        }
    };
