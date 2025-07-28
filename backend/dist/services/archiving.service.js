"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchivingService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
// Solution 2 - Chemin absolu (si vous avez configuré baseUrl dans tsconfig.json)
// import { ArchiveParams } from '@/types/archive-params';
class ArchivingService {
    constructor() {
        this.ARCHIVE_DIR = path_1.default.join(__dirname, '../../secure_archive');
        if (!fs_1.default.existsSync(this.ARCHIVE_DIR)) {
            fs_1.default.mkdirSync(this.ARCHIVE_DIR, { mode: 0o700 }); // Permissions restrictives
        }
    }
    async archiveSignedDocument({ encryptedData, iv, authTag }) {
        const documentId = crypto_1.default.randomBytes(16).toString('hex');
        const hash = crypto_1.default.createHash('sha256').update(encryptedData).digest('hex');
        const filename = `${documentId}_${hash.slice(0, 8)}.enc`;
        const filepath = path_1.default.join(this.ARCHIVE_DIR, filename);
        // Stockage du fichier chiffré
        await fs_1.default.promises.writeFile(filepath, encryptedData);
        const metadata = {
            iv,
            authTag,
            createdAt: new Date().toISOString()
        };
        await fs_1.default.promises.writeFile(filepath + '.meta.json', JSON.stringify(metadata, null, 2), { encoding: 'utf-8' });
        return {
            documentId,
            hash,
            filepath,
            archivedAt: new Date()
        };
    }
}
exports.ArchivingService = ArchivingService;
