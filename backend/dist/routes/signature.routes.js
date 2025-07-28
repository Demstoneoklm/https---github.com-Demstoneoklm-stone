"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signature_controller_1 = require("../controllers/signature.controller");
const router = (0, express_1.Router)();
const signatureController = new signature_controller_1.SignatureController();
router.post('/sign', signatureController.addSignatureToPdf.bind(signatureController));
exports.default = router;
