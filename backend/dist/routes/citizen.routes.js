"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const citizen_controller_1 = require("../controllers/citizen.controller");
const router = (0, express_1.Router)();
router.post('/register', citizen_controller_1.registerCitizen);
router.post('/login', citizen_controller_1.loginCitizen);
exports.default = router;
