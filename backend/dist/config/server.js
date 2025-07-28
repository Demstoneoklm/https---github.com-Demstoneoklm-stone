"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureServer = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const configureServer = (app) => {
    // Middleware de parsing
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // Sécurité
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173'
    }));
    // Gestion des erreurs
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: 'Internal Server Error' });
    });
};
exports.configureServer = configureServer;
