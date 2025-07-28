"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = require("./config/database");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const documents_routes_1 = __importDefault(require("./routes/documents.routes"));
const inventory_routes_1 = __importDefault(require("./routes/inventory.routes"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
(0, dotenv_1.config)(); // Charge les variables d'environnement
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Configuration CORS
app.use((0, cors_1.default)({
    origin: [
        process.env.BASE_URL || 'http://localhost:3000',
        'http://localhost:5173' // Vite dev server
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Middleware Express
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Routes
app.use('/api/auth', auth_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/documents', documents_routes_1.default);
app.use('/api/inventory', inventory_routes_1.default);
app.use('/api/profile', profile_routes_1.default);
// Lancement du serveur après connexion DB
const startServer = async () => {
    try {
        await (0, database_1.connectDB)();
        app.listen(PORT, () => {
            console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
        });
    }
    catch (err) {
        console.error('❌ Erreur lors du démarrage du serveur :', err);
        process.exit(1);
    }
};
startServer();
