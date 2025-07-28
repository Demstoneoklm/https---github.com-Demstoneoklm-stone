"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = __importDefault(require("../controllers/admin.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken, auth_middleware_1.authorizeAdmin);
router.get('/users', admin_controller_1.default.getUsers);
router.post('/users', admin_controller_1.default.createUser);
router.put('/users/:id', admin_controller_1.default.updateUser);
router.delete('/users/:id', admin_controller_1.default.deleteUser);
router.get('/dashboard/stats', admin_controller_1.default.getDashboardStats);
exports.default = router;
