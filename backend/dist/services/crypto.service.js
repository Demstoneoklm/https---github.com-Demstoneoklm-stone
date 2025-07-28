"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptoService = void 0;
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class CryptoService {
    static encrypt(data) {
        const iv = crypto_1.default.randomBytes(this.IV_LENGTH);
        const salt = crypto_1.default.randomBytes(this.SALT_LENGTH);
        const key = crypto_1.default.pbkdf2Sync(process.env.ENCRYPTION_KEY, salt, 100000, this.KEY_LENGTH, 'sha512');
        const cipher = crypto_1.default.createCipheriv(this.ALGORITHM, key, iv);
        const encrypted = Buffer.concat([
            cipher.update(data),
            cipher.final(),
        ]);
        const tag = cipher.getAuthTag();
        return {
            encrypted,
            iv: iv.toString('hex'),
            tag: tag.toString('hex')
        };
    }
    static decrypt(encrypted, iv, tag) {
        const ivBuffer = Buffer.from(iv, 'hex');
        const tagBuffer = Buffer.from(tag, 'hex');
        const key = crypto_1.default.pbkdf2Sync(process.env.ENCRYPTION_KEY, Buffer.from(process.env.ENCRYPTION_SALT, 'hex'), 100000, this.KEY_LENGTH, 'sha512');
        const decipher = crypto_1.default.createDecipheriv(this.ALGORITHM, key, ivBuffer);
        decipher.setAuthTag(tagBuffer);
        return Buffer.concat([
            decipher.update(encrypted),
            decipher.final()
        ]);
    }
}
exports.CryptoService = CryptoService;
CryptoService.ALGORITHM = 'aes-256-gcm';
CryptoService.IV_LENGTH = 16;
CryptoService.SALT_LENGTH = 64;
CryptoService.TAG_LENGTH = 16;
CryptoService.KEY_LENGTH = 32;
