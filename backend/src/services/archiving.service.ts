import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Essayez l'une de ces solutions :

// Solution 1 - Chemin relatif
import { ArchiveParams } from '../types/archive-params';

// Solution 2 - Chemin absolu (si vous avez configuré baseUrl dans tsconfig.json)
// import { ArchiveParams } from '@/types/archive-params';

export class ArchivingService {
    private readonly ARCHIVE_DIR = path.join(__dirname, '../../secure_archive');

    constructor() {
        if (!fs.existsSync(this.ARCHIVE_DIR)) {
            fs.mkdirSync(this.ARCHIVE_DIR, { mode: 0o700 }); // Permissions restrictives
        }
    }

    async archiveSignedDocument({ encryptedData, iv, authTag }: ArchiveParams) {
        const documentId = crypto.randomBytes(16).toString('hex');

        const hash = crypto.createHash('sha256').update(encryptedData).digest('hex');

        const filename = `${documentId}_${hash.slice(0, 8)}.enc`;
        const filepath = path.join(this.ARCHIVE_DIR, filename);

        // Stockage du fichier chiffré
        await fs.promises.writeFile(filepath, encryptedData);

        const metadata = {
            iv,
            authTag,
            createdAt: new Date().toISOString()
        };

        await fs.promises.writeFile(
            filepath + '.meta.json',
            JSON.stringify(metadata, null, 2),
            { encoding: 'utf-8' }
        );

        return {
            documentId,
            hash,
            filepath,
            archivedAt: new Date()
        };
    }
}
