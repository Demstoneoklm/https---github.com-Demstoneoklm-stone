"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokens = (userId) => {
    return {
        accessToken: jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '15m' }),
        refreshToken: jsonwebtoken_1.default.sign({ id: userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' })
    };
};
exports.generateTokens = generateTokens;
