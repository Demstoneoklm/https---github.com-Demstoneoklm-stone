"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validation_middleware_1 = require("../middlewares/validation.middleware");
const auth_schema_1 = require("../schemas/auth.schema");
const router = (0, express_1.Router)();
// Routes publiques
router.post('/register', (0, validation_middleware_1.validateRequest)(auth_schema_1.registerSchema), auth_controller_1.default.register);
router.post('/login', (0, validation_middleware_1.validateRequest)(auth_schema_1.loginSchema), auth_controller_1.default.login); // validateRequest(loginSchema) est réactivé
router.get('/verify-email', auth_controller_1.default.verifyEmail);
// Routes de déconnexion
router.post('/logout', auth_controller_1.default.logout);
// Routes protégées (à ajouter plus tard avec middleware d'authentification)
const auth_middleware_1 = require("../middlewares/auth.middleware");
router.use(auth_middleware_1.authenticateToken);
router.get('/me', auth_controller_1.default.getMe);
// router.put('/profile', updateProfile);
exports.default = router;
