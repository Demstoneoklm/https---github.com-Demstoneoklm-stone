import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';

export const configureServer = (app: Express) => {
    // Middleware de parsing
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Sécurité
    app.use(helmet());
    app.use(cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173'
    }));

    // Gestion des erreurs
    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    });
};
