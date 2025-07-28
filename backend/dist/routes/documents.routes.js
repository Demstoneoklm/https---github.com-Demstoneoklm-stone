"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documents_controller_1 = __importDefault(require("../controllers/documents.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticateToken);
router.get('/', documents_controller_1.default.getDocuments);
router.post('/', upload_middleware_1.upload.single('file'), documents_controller_1.default.createDocument);
router.put('/:id', documents_controller_1.default.updateDocument);
router.delete('/:id', documents_controller_1.default.deleteDocument);
router.get('/:id/download', documents_controller_1.default.downloadDocument);
exports.default = router;
