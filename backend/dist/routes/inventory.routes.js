"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_controller_1 = __importDefault(require("../controllers/inventory.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.get('/', inventory_controller_1.default.getInventoryItems);
router.post('/', auth_middleware_1.authorizeAdmin, inventory_controller_1.default.createInventoryItem);
router.put('/:id', auth_middleware_1.authorizeAdmin, inventory_controller_1.default.updateInventoryItem);
router.delete('/:id', auth_middleware_1.authorizeAdmin, inventory_controller_1.default.deleteInventoryItem);
router.get('/stats', inventory_controller_1.default.getInventoryStats);
exports.default = router;
