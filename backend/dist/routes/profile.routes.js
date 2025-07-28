"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profile_controller_1 = __importDefault(require("../controllers/profile.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.get('/', profile_controller_1.default.getUserProfile);
router.put('/', profile_controller_1.default.updateUserProfile);
router.get('/requests', profile_controller_1.default.getUserRequests);
router.post('/requests', profile_controller_1.default.createUserRequest);
exports.default = router;
